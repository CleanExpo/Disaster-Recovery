'use client';

import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Plus, 
  Trash2, 
  Truck, 
  Users, 
  Wrench, 
  Package,
  Home,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';

interface Vehicle {
  type: string;
  make: string;
  model: string;
  year: string;
  registration: string;
  capacity: string;
}

interface Employee {
  name: string;
  role: string;
  certifications: string;
  yearsExperience: string;
}

interface EquipmentResourcesData {
  // Equipment Categories
  waterExtractionEquipment: string[];
  dryingEquipment: string[];
  airQualityEquipment: string[];
  cleaningEquipment: string[];
  safetyEquipment: string[];
  measurementTools: string[];
  
  // Vehicles
  vehicles: Vehicle[];
  
  // Team
  totalEmployees: string;
  certifiedTechnicians: string;
  employees: Employee[];
  
  // Facilities
  officeLocation: string;
  warehouseLocation: string;
  warehouseSize: string;
  
  // Capacity
  simultaneousProjects: string;
  emergencyResponseTime: string;
  coverage24x7: boolean;
  
  // Suppliers
  primarySuppliers: string;
  equipmentMaintenance: string;
  
  // Emergency Resources
  emergencyContacts: string;
  backupEquipment: boolean;
  subcontractorNetwork: boolean;
}

interface Step4Props {
  data: Partial<EquipmentResourcesData>;
  onNext: (data: EquipmentResourcesData) => void;
  onBack: () => void;
}

const equipmentOptions = {
  waterExtraction: [
    'Truck-mounted extraction unit',
    'Portable extraction units',
    'Submersible pumps',
    'Wet/dry vacuums',
    'Water claws',
    'Extraction wands',
    'Ride-on extractors'
  ],
  drying: [
    'Axial air movers',
    'Centrifugal air movers',
    'Refrigerant dehumidifiers',
    'Desiccant dehumidifiers',
    'LGR dehumidifiers',
    'Heat drying systems',
    'Injectidry systems'
  ],
  airQuality: [
    'Air scrubbers',
    'HEPA filtration units',
    'Negative air machines',
    'Hydroxyl generators',
    'Ozone generators',
    'Thermal foggers',
    'ULV foggers'
  ],
  cleaning: [
    'Pressure washers',
    'Steam cleaners',
    'Carpet cleaning machines',
    'Upholstery cleaning tools',
    'HEPA vacuums',
    'Soda blasters',
    'Dry ice blasting equipment'
  ],
  safety: [
    'PPE sets (complete)',
    'Respirators (P2/N95)',
    'Full-face respirators',
    'Tyvek suits',
    'Safety harnesses',
    'Gas detectors',
    'First aid kits',
    'Emergency lighting'
  ],
  measurement: [
    'Moisture meters (pin type)',
    'Moisture meters (pinless)',
    'Thermo-hygrometers',
    'Infrared cameras',
    'Borescopes',
    'Data loggers',
    'Psychrometric calculators'
  ]
};

export default function Step4EquipmentResources({ data, onNext, onBack }: Step4Props) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue
  } = useForm<EquipmentResourcesData>({
    defaultValues: {
      ...data,
      vehicles: data.vehicles || [{ type: '', make: '', model: '', year: '', registration: '', capacity: '' }],
      employees: data.employees || [{ name: '', role: '', certifications: '', yearsExperience: '' }],
      waterExtractionEquipment: data.waterExtractionEquipment || [],
      dryingEquipment: data.dryingEquipment || [],
      airQualityEquipment: data.airQualityEquipment || [],
      cleaningEquipment: data.cleaningEquipment || [],
      safetyEquipment: data.safetyEquipment || [],
      measurementTools: data.measurementTools || []
    }
  });

  const {
    fields: vehicleFields,
    append: appendVehicle,
    remove: removeVehicle
  } = useFieldArray({
    control,
    name: 'vehicles'
  });

  const {
    fields: employeeFields,
    append: appendEmployee,
    remove: removeEmployee
  } = useFieldArray({
    control,
    name: 'employees'
  });

  const [selectedEquipment, setSelectedEquipment] = useState({
    waterExtraction: data.waterExtractionEquipment || [],
    drying: data.dryingEquipment || [],
    airQuality: data.airQualityEquipment || [],
    cleaning: data.cleaningEquipment || [],
    safety: data.safetyEquipment || [],
    measurement: data.measurementTools || []
  });

  const toggleEquipment = (category: keyof typeof selectedEquipment, item: string) => {
    setSelectedEquipment(prev => ({
      ...prev,
      [category]: prev[category].includes(item)
        ? prev[category].filter(e => e !== item)
        : [...prev[category], item]
    }));
  };

  const onSubmit = (formData: EquipmentResourcesData) => {
    const completeData = {
      ...formData,
      waterExtractionEquipment: selectedEquipment.waterExtraction,
      dryingEquipment: selectedEquipment.drying,
      airQualityEquipment: selectedEquipment.airQuality,
      cleaningEquipment: selectedEquipment.cleaning,
      safetyEquipment: selectedEquipment.safety,
      measurementTools: selectedEquipment.measurement
    };
    onNext(completeData);
  };

  const coverage24x7 = watch('coverage24x7');
  const backupEquipment = watch('backupEquipment');
  const subcontractorNetwork = watch('subcontractorNetwork');

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Equipment & Resources</h2>
        <p className="mt-2 text-gray-600">
          Detail your equipment inventory, team capabilities, and operational resources
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Water Extraction Equipment */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Wrench className="mr-2 h-5 w-5 text-blue-600" />
            Water Extraction Equipment
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {equipmentOptions.waterExtraction.map((item) => (
              <label
                key={item}
                className="flex items-center p-2 border rounded cursor-pointer hover:bg-gray-50"
              >
                <input
                  type="checkbox"
                  checked={selectedEquipment.waterExtraction.includes(item)}
                  onChange={() => toggleEquipment('waterExtraction', item)}
                  className="mr-2"
                />
                <span className="text-sm">{item}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Drying Equipment */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Package className="mr-2 h-5 w-5 text-green-600" />
            Drying Equipment
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {equipmentOptions.drying.map((item) => (
              <label
                key={item}
                className="flex items-center p-2 border rounded cursor-pointer hover:bg-gray-50"
              >
                <input
                  type="checkbox"
                  checked={selectedEquipment.drying.includes(item)}
                  onChange={() => toggleEquipment('drying', item)}
                  className="mr-2"
                />
                <span className="text-sm">{item}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Air Quality Equipment */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Package className="mr-2 h-5 w-5 text-purple-600" />
            Air Quality Equipment
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {equipmentOptions.airQuality.map((item) => (
              <label
                key={item}
                className="flex items-center p-2 border rounded cursor-pointer hover:bg-gray-50"
              >
                <input
                  type="checkbox"
                  checked={selectedEquipment.airQuality.includes(item)}
                  onChange={() => toggleEquipment('airQuality', item)}
                  className="mr-2"
                />
                <span className="text-sm">{item}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Cleaning Equipment */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Cleaning Equipment</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {equipmentOptions.cleaning.map((item) => (
              <label
                key={item}
                className="flex items-center p-2 border rounded cursor-pointer hover:bg-gray-50"
              >
                <input
                  type="checkbox"
                  checked={selectedEquipment.cleaning.includes(item)}
                  onChange={() => toggleEquipment('cleaning', item)}
                  className="mr-2"
                />
                <span className="text-sm">{item}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Safety Equipment */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <AlertTriangle className="mr-2 h-5 w-5 text-blue-700" />
            Safety Equipment
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {equipmentOptions.safety.map((item) => (
              <label
                key={item}
                className="flex items-center p-2 border rounded cursor-pointer hover:bg-gray-50"
              >
                <input
                  type="checkbox"
                  checked={selectedEquipment.safety.includes(item)}
                  onChange={() => toggleEquipment('safety', item)}
                  className="mr-2"
                />
                <span className="text-sm">{item}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Measurement Tools */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Measurement & Monitoring Tools</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {equipmentOptions.measurement.map((item) => (
              <label
                key={item}
                className="flex items-center p-2 border rounded cursor-pointer hover:bg-gray-50"
              >
                <input
                  type="checkbox"
                  checked={selectedEquipment.measurement.includes(item)}
                  onChange={() => toggleEquipment('measurement', item)}
                  className="mr-2"
                />
                <span className="text-sm">{item}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Vehicles */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold flex items-center">
              <Truck className="mr-2 h-5 w-5 text-indigo-600" />
              Vehicles
            </h3>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => appendVehicle({ type: '', make: '', model: '', year: '', registration: '', capacity: '' })}
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Vehicle
            </Button>
          </div>

          {vehicleFields.map((field, index) => (
            <div key={field.id} className="mb-4 p-4 border rounded-lg bg-gray-50">
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-medium">Vehicle {index + 1}</h4>
                {vehicleFields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeVehicle(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label>Vehicle Type</Label>
                  <select
                    {...register(`vehicles.${index}.type` as const, { required: 'Type is required' })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="">Select Type</option>
                    <option value="Van">Van</option>
                    <option value="Truck">Truck</option>
                    <option value="Ute">Ute</option>
                    <option value="Trailer">Trailer</option>
                    <option value="Box Truck">Box Truck</option>
                  </select>
                </div>
                
                <div>
                  <Label>Make</Label>
                  <Input
                    {...register(`vehicles.${index}.make` as const, { required: 'Make is required' })}
                    placeholder="e.g., Toyota"
                  />
                </div>
                
                <div>
                  <Label>Model</Label>
                  <Input
                    {...register(`vehicles.${index}.model` as const, { required: 'Model is required' })}
                    placeholder="e.g., HiAce"
                  />
                </div>
                
                <div>
                  <Label>Year</Label>
                  <Input
                    {...register(`vehicles.${index}.year` as const, { required: 'Year is required' })}
                    placeholder="e.g., 2020"
                  />
                </div>
                
                <div>
                  <Label>Registration</Label>
                  <Input
                    {...register(`vehicles.${index}.registration` as const, { required: 'Registration is required' })}
                    placeholder="e.g., ABC123"
                  />
                </div>
                
                <div>
                  <Label>Capacity</Label>
                  <Input
                    {...register(`vehicles.${index}.capacity` as const)}
                    placeholder="e.g., 1000kg"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Team */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Users className="mr-2 h-5 w-5 text-teal-600" />
            Team Information
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <Label htmlFor="totalEmployees">Total Employees</Label>
              <Input
                id="totalEmployees"
                type="number"
                {...register('totalEmployees', { required: 'Total employees is required' })}
                placeholder="e.g., 12"
              />
              {errors.totalEmployees && (
                <p className="text-red-500 text-sm mt-1">{errors.totalEmployees.message}</p>
              )}
            </div>
            
            <div>
              <Label htmlFor="certifiedTechnicians">Certified Technicians</Label>
              <Input
                id="certifiedTechnicians"
                type="number"
                {...register('certifiedTechnicians', { required: 'Number of certified technicians is required' })}
                placeholder="e.g., 8"
              />
              {errors.certifiedTechnicians && (
                <p className="text-red-500 text-sm mt-1">{errors.certifiedTechnicians.message}</p>
              )}
            </div>
          </div>

          <div className="flex justify-between items-center mb-4">
            <h4 className="font-medium">Key Team Members</h4>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => appendEmployee({ name: '', role: '', certifications: '', yearsExperience: '' })}
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Team Member
            </Button>
          </div>

          {employeeFields.map((field, index) => (
            <div key={field.id} className="mb-4 p-4 border rounded-lg bg-gray-50">
              <div className="flex justify-between items-center mb-3">
                <h5 className="text-sm font-medium">Team Member {index + 1}</h5>
                {employeeFields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeEmployee(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Name</Label>
                  <Input
                    {...register(`employees.${index}.name` as const, { required: 'Name is required' })}
                    placeholder="e.g., John Smith"
                  />
                </div>
                
                <div>
                  <Label>Role</Label>
                  <Input
                    {...register(`employees.${index}.role` as const, { required: 'Role is required' })}
                    placeholder="e.g., Lead Technician"
                  />
                </div>
                
                <div>
                  <Label>Certifications</Label>
                  <Input
                    {...register(`employees.${index}.certifications` as const)}
                    placeholder="e.g., IICRC WRT, ASD"
                  />
                </div>
                
                <div>
                  <Label>Years Experience</Label>
                  <Input
                    type="number"
                    {...register(`employees.${index}.yearsExperience` as const)}
                    placeholder="e.g., 5"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Facilities */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Home className="mr-2 h-5 w-5 text-gray-600" />
            Facilities
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="officeLocation">Office Location</Label>
              <Input
                id="officeLocation"
                {...register('officeLocation', { required: 'Office location is required' })}
                placeholder="e.g., 123 Main St, Brisbane QLD 4000"
              />
              {errors.officeLocation && (
                <p className="text-red-500 text-sm mt-1">{errors.officeLocation.message}</p>
              )}
            </div>
            
            <div>
              <Label htmlFor="warehouseLocation">Warehouse/Storage Location</Label>
              <Input
                id="warehouseLocation"
                {...register('warehouseLocation')}
                placeholder="e.g., 456 Industrial Rd, Brisbane QLD 4000"
              />
            </div>
            
            <div>
              <Label htmlFor="warehouseSize">Warehouse Size (sqm)</Label>
              <Input
                id="warehouseSize"
                {...register('warehouseSize')}
                placeholder="e.g., 500"
              />
            </div>
          </div>
        </div>

        {/* Operational Capacity */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <CheckCircle className="mr-2 h-5 w-5 text-green-600" />
            Operational Capacity
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="simultaneousProjects">Simultaneous Projects Capacity</Label>
              <Input
                id="simultaneousProjects"
                type="number"
                {...register('simultaneousProjects', { required: 'Project capacity is required' })}
                placeholder="e.g., 5"
              />
              {errors.simultaneousProjects && (
                <p className="text-red-500 text-sm mt-1">{errors.simultaneousProjects.message}</p>
              )}
            </div>
            
            <div>
              <Label htmlFor="emergencyResponseTime">Emergency Response Time (hours)</Label>
              <Input
                id="emergencyResponseTime"
                {...register('emergencyResponseTime', { required: 'Response time is required' })}
                placeholder="e.g., 2"
              />
              {errors.emergencyResponseTime && (
                <p className="text-red-500 text-sm mt-1">{errors.emergencyResponseTime.message}</p>
              )}
            </div>
          </div>
          
          <div className="mt-4 space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="coverage24x7" 
                checked={coverage24x7}
                onCheckedChange={(checked) => setValue('coverage24x7', checked as boolean)}
              />
              <Label htmlFor="coverage24x7">24/7 Online Emergency Response Available</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="backupEquipment"
                checked={backupEquipment}
                onCheckedChange={(checked) => setValue('backupEquipment', checked as boolean)}
              />
              <Label htmlFor="backupEquipment">Backup Equipment Available</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="subcontractorNetwork"
                checked={subcontractorNetwork}
                onCheckedChange={(checked) => setValue('subcontractorNetwork', checked as boolean)}
              />
              <Label htmlFor="subcontractorNetwork">Subcontractor Network for Overflow</Label>
            </div>
          </div>
        </div>

        {/* Suppliers and Support */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Suppliers & Support</h3>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="primarySuppliers">Primary Equipment/Material Suppliers</Label>
              <Input
                id="primarySuppliers"
                {...register('primarySuppliers', { required: 'Supplier information is required' })}
                placeholder="e.g., Restoration Supply Company, ABC Equipment Rentals"
              />
              {errors.primarySuppliers && (
                <p className="text-red-500 text-sm mt-1">{errors.primarySuppliers.message}</p>
              )}
            </div>
            
            <div>
              <Label htmlFor="equipmentMaintenance">Equipment Maintenance Provider</Label>
              <Input
                id="equipmentMaintenance"
                {...register('equipmentMaintenance')}
                placeholder="e.g., In-house / XYZ Service Company"
              />
            </div>
            
            <div>
              <Label htmlFor="emergencyContacts">24/7 Emergency Contacts</Label>
              <Input
                id="emergencyContacts"
                {...register('emergencyContacts', { required: 'Emergency contacts are required' })}
                placeholder="e.g., Operations Manager: "
              />
              {errors.emergencyContacts && (
                <p className="text-red-500 text-sm mt-1">{errors.emergencyContacts.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-6">
          <Button type="button" variant="outline" onClick={onBack}>
            Back
          </Button>
          <Button type="submit">
            Continue
          </Button>
        </div>
      </form>
    </div>
  );
}