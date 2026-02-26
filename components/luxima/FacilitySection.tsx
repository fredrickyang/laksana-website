export default function FacilitySection() {
  return (
    <section id="facilities" className="py-20 px-6 bg-gray-50">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Facilities</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center p-6">
            <h3 className="font-semibold mb-2">24/7 Security</h3>
            <p className="text-gray-600 text-sm">Round-the-clock security system</p>
          </div>
          <div className="text-center p-6">
            <h3 className="font-semibold mb-2">Parking Area</h3>
            <p className="text-gray-600 text-sm">Spacious parking facilities</p>
          </div>
          <div className="text-center p-6">
            <h3 className="font-semibold mb-2">Loading Dock</h3>
            <p className="text-gray-600 text-sm">Modern loading and unloading docks</p>
          </div>
          <div className="text-center p-6">
            <h3 className="font-semibold mb-2">Infrastructure</h3>
            <p className="text-gray-600 text-sm">Advanced digital infrastructure</p>
          </div>
        </div>
      </div>
    </section>
  );
}
