/**
 * Mock Geocoding Service
 * Simulates location services for demo purposes
 */

class MockGeocodeService {
  private locations: Record<string, any> = {
    '2000': { lat: -33.8688, lng: 151.2093, suburb: 'Sydney', state: 'NSW' },
    '3000': { lat: -37.8136, lng: 144.9631, suburb: 'Melbourne', state: 'VIC' },
    '4000': { lat: -27.4698, lng: 153.0251, suburb: 'Brisbane', state: 'QLD' },
    '6000': { lat: -31.9505, lng: 115.8605, suburb: 'Perth', state: 'WA' },
    '5000': { lat: -34.9285, lng: 138.6007, suburb: 'Adelaide', state: 'SA' }
  };
  
  async geocodeAddress(address: string): Promise<any> {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Extract postcode from address
    const postcodeMatch = address.match(/\b\d{4}\b/);
    const postcode = postcodeMatch ? postcodeMatch[0] : '2000';
    
    return this.locations[postcode] || this.locations['2000'];
  }
  
  async reverseGeocode(lat: number, lng: number): Promise<any> {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return {
      formattedAddress: '123 Demo Street, Sydney NSW 2000',
      suburb: 'Sydney',
      state: 'NSW',
      postcode: '2000',
      country: 'Australia'
    };
  }
  
  async calculateDistance(from: any, to: any): Promise<number> {
    // Simple mock distance calculation
    return Math.floor(Math.random() * 50) + 5; // 5-55 km
  }
}

export const mockGeocodeService = new MockGeocodeService();