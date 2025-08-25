export default function LocationsGrid() {
  const locations = [
    'Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide',
    'Gold Coast', 'Newcastle', 'Canberra', 'Sunshine Coast'
  ];
  
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Service Locations</h2>
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
          {locations.map(location => (
            <a
              key={location}
              href={`/locations/${location.toLowerCase().replace(' ', '-')}`}
              className="text-center p-4 border rounded hover:bg-gray-50"
            >
              {location}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}