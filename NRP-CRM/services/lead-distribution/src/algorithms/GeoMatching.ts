import { getDistance, isPointWithinRadius, getCenter } from 'geolib';
import { Location, ContractorInfo } from '../models/Lead';

export interface GeoMatchResult {
  contractorId: string;
  distance: number; // in kilometers
  isWithinRadius: boolean;
  travelTime?: number; // estimated travel time in minutes
}

export interface GeoMatchCriteria {
  maxDistance?: number;
  preferredDistance?: number;
  includeEstimatedTravelTime?: boolean;
  sortByDistance?: boolean;
}

export class GeoMatching {
  private static readonly EARTH_RADIUS_KM = 6371;
  private static readonly AVERAGE_SPEED_KMH = 50; // Average city driving speed

  /**
   * Calculate distance between two locations using Haversine formula
   */
  static calculateDistance(
    location1: Location,
    location2: Location
  ): number {
    const distance = getDistance(
      {
        latitude: location1.coordinates.latitude,
        longitude: location1.coordinates.longitude
      },
      {
        latitude: location2.coordinates.latitude,
        longitude: location2.coordinates.longitude
      }
    );
    
    // Convert meters to kilometers and round to 2 decimal places
    return Math.round((distance / 1000) * 100) / 100;
  }

  /**
   * Check if a contractor is within service radius of a location
   */
  static isWithinServiceRadius(
    jobLocation: Location,
    contractor: ContractorInfo
  ): boolean {
    const distance = this.calculateDistance(jobLocation, contractor.location);
    return distance <= contractor.serviceRadius;
  }

  /**
   * Find all contractors within a specified radius of a job location
   */
  static findContractorsInRadius(
    jobLocation: Location,
    contractors: ContractorInfo[],
    maxRadius: number
  ): GeoMatchResult[] {
    const results: GeoMatchResult[] = [];

    for (const contractor of contractors) {
      const distance = this.calculateDistance(jobLocation, contractor.location);
      const isWithinRadius = distance <= maxRadius;
      const isWithinContractorRadius = distance <= contractor.serviceRadius;

      // Only include if within both the job's max radius AND contractor's service radius
      if (isWithinRadius && isWithinContractorRadius) {
        results.push({
          contractorId: contractor.contractorId,
          distance,
          isWithinRadius: true,
          travelTime: this.estimateTravelTime(distance)
        });
      }
    }

    return results.sort((a, b) => a.distance - b.distance);
  }

  /**
   * Match contractors to a job location based on geographic criteria
   */
  static matchContractors(
    jobLocation: Location,
    contractors: ContractorInfo[],
    criteria: GeoMatchCriteria = {}
  ): GeoMatchResult[] {
    const {
      maxDistance = 100, // Default 100km max radius
      preferredDistance = 25, // Default 25km preferred radius
      includeEstimatedTravelTime = true,
      sortByDistance = true
    } = criteria;

    const results: GeoMatchResult[] = [];

    for (const contractor of contractors) {
      // Skip if contractor is not available
      if (!contractor.isAvailable) continue;

      const distance = this.calculateDistance(jobLocation, contractor.location);
      const isWithinMaxRadius = distance <= maxDistance;
      const isWithinContractorRadius = distance <= contractor.serviceRadius;
      const isWithinPreferredRadius = distance <= preferredDistance;

      // Only include contractors within acceptable range
      if (isWithinMaxRadius && isWithinContractorRadius) {
        const result: GeoMatchResult = {
          contractorId: contractor.contractorId,
          distance,
          isWithinRadius: isWithinPreferredRadius
        };

        if (includeEstimatedTravelTime) {
          result.travelTime = this.estimateTravelTime(distance);
        }

        results.push(result);
      }
    }

    // Sort by distance if requested
    if (sortByDistance) {
      results.sort((a, b) => a.distance - b.distance);
    }

    return results;
  }

  /**
   * Estimate travel time based on distance
   */
  static estimateTravelTime(distanceKm: number): number {
    // Base calculation using average speed
    let travelTimeMinutes = (distanceKm / this.AVERAGE_SPEED_KMH) * 60;

    // Add buffer time for urban areas (traffic, stops, etc.)
    if (distanceKm < 5) {
      travelTimeMinutes += 10; // City traffic buffer
    } else if (distanceKm < 20) {
      travelTimeMinutes += 15; // Suburban buffer
    } else {
      travelTimeMinutes += 20; // Rural/highway buffer
    }

    return Math.round(travelTimeMinutes);
  }

  /**
   * Get contractors within multiple distance bands (rings)
   */
  static getContractorsByDistanceBands(
    jobLocation: Location,
    contractors: ContractorInfo[],
    bands: number[] = [5, 15, 30, 50, 100]
  ): { band: string; contractors: GeoMatchResult[] }[] {
    const results: { band: string; contractors: GeoMatchResult[] }[] = [];
    
    bands.sort((a, b) => a - b); // Ensure bands are sorted

    for (let i = 0; i < bands.length; i++) {
      const minDistance = i === 0 ? 0 : bands[i - 1];
      const maxDistance = bands[i];
      
      const contractorsInBand = contractors
        .map(contractor => {
          const distance = this.calculateDistance(jobLocation, contractor.location);
          return {
            contractorId: contractor.contractorId,
            distance,
            isWithinRadius: distance <= maxDistance,
            travelTime: this.estimateTravelTime(distance)
          };
        })
        .filter(result => 
          result.distance > minDistance && 
          result.distance <= maxDistance &&
          contractors.find(c => c.contractorId === result.contractorId)?.isAvailable
        )
        .sort((a, b) => a.distance - b.distance);

      results.push({
        band: `${minDistance}-${maxDistance}km`,
        contractors: contractorsInBand
      });
    }

    return results;
  }

  /**
   * Find the optimal meeting point for multiple contractors
   */
  static findOptimalMeetingPoint(locations: Location[]): Location | null {
    if (locations.length === 0) return null;
    if (locations.length === 1) return locations[0];

    const coordinates = locations.map(loc => ({
      latitude: loc.coordinates.latitude,
      longitude: loc.coordinates.longitude
    }));

    const center = getCenter(coordinates);
    if (!center) return null;

    // Create a location object with the center coordinates
    return {
      address: 'Optimal Meeting Point',
      suburb: '',
      city: '',
      state: '',
      postcode: '',
      country: 'Australia',
      coordinates: {
        latitude: center.latitude,
        longitude: center.longitude
      }
    };
  }

  /**
   * Check if a point is within a polygon (for service area boundaries)
   */
  static isPointInServiceArea(
    point: Location,
    serviceAreaBounds: { lat: number; lng: number }[]
  ): boolean {
    const x = point.coordinates.latitude;
    const y = point.coordinates.longitude;
    
    let inside = false;
    for (let i = 0, j = serviceAreaBounds.length - 1; i < serviceAreaBounds.length; j = i++) {
      const xi = serviceAreaBounds[i].lat;
      const yi = serviceAreaBounds[i].lng;
      const xj = serviceAreaBounds[j].lat;
      const yj = serviceAreaBounds[j].lng;
      
      if (((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi)) {
        inside = !inside;
      }
    }
    
    return inside;
  }

  /**
   * Calculate service area coverage for a contractor
   */
  static calculateServiceAreaCoverage(
    contractor: ContractorInfo,
    jobLocations: Location[]
  ): {
    totalJobs: number;
    coveredJobs: number;
    coveragePercentage: number;
    averageDistance: number;
  } {
    let coveredJobs = 0;
    let totalDistance = 0;
    let coveredDistances: number[] = [];

    for (const jobLocation of jobLocations) {
      const distance = this.calculateDistance(contractor.location, jobLocation);
      totalDistance += distance;
      
      if (distance <= contractor.serviceRadius) {
        coveredJobs++;
        coveredDistances.push(distance);
      }
    }

    const averageDistance = coveredDistances.length > 0 
      ? coveredDistances.reduce((sum, dist) => sum + dist, 0) / coveredDistances.length
      : 0;

    return {
      totalJobs: jobLocations.length,
      coveredJobs,
      coveragePercentage: jobLocations.length > 0 ? (coveredJobs / jobLocations.length) * 100 : 0,
      averageDistance: Math.round(averageDistance * 100) / 100
    };
  }

  /**
   * Get distance-based priority multiplier
   */
  static getDistancePriorityMultiplier(distance: number): number {
    if (distance <= 5) return 1.5;    // Very close - 50% bonus
    if (distance <= 15) return 1.2;   // Close - 20% bonus  
    if (distance <= 30) return 1.0;   // Normal range - no bonus
    if (distance <= 50) return 0.8;   // Far - 20% penalty
    return 0.6;                       // Very far - 40% penalty
  }

  /**
   * Validate coordinates
   */
  static validateCoordinates(location: Location): boolean {
    const { latitude, longitude } = location.coordinates;
    return latitude >= -90 && latitude <= 90 && longitude >= -180 && longitude <= 180;
  }

  /**
   * Convert address to rough coordinates (basic geocoding simulation)
   * Note: In production, this should integrate with a real geocoding service
   */
  static estimateCoordinatesFromAddress(address: string): { latitude: number; longitude: number } | null {
    // This is a basic simulation - in production, use Google Maps API or similar
    const australianCities: { [key: string]: { lat: number; lng: number } } = {
      'sydney': { lat: -33.8688, lng: 151.2093 },
      'melbourne': { lat: -37.8136, lng: 144.9631 },
      'brisbane': { lat: -27.4698, lng: 153.0251 },
      'perth': { lat: -31.9505, lng: 115.8605 },
      'adelaide': { lat: -34.9285, lng: 138.6007 },
      'darwin': { lat: -12.4634, lng: 130.8456 },
      'hobart': { lat: -42.8821, lng: 147.3272 },
      'canberra': { lat: -35.2809, lng: 149.1300 }
    };

    const lowerAddress = address.toLowerCase();
    for (const [city, coords] of Object.entries(australianCities)) {
      if (lowerAddress.includes(city)) {
        return { latitude: coords.lat, longitude: coords.lng };
      }
    }

    return null; // Unable to estimate
  }
}