export default function SpecificationSection() {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Specifications</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border rounded-lg p-6">
            <h3 className="font-semibold mb-4">Building Specs</h3>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li>Structure: Steel &amp; Concrete</li>
              <li>Roof: Metal Deck</li>
              <li>Floor: Hardened Concrete</li>
            </ul>
          </div>
          <div className="border rounded-lg p-6">
            <h3 className="font-semibold mb-4">Utilities</h3>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li>Electricity: PLN + Genset Backup</li>
              <li>Water: PDAM + Ground Water</li>
              <li>Internet: Fiber Optic Ready</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
