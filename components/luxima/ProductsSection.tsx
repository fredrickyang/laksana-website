export default function ProductsSection() {
  return (
    <section id="products" className="py-20 px-6 bg-white">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="border rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-2">Warehouse Units</h3>
            <p className="text-gray-600">High-quality warehouse units for your business needs.</p>
          </div>
          <div className="border rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-2">Commercial Spaces</h3>
            <p className="text-gray-600">Modern commercial spaces in strategic locations.</p>
          </div>
          <div className="border rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-2">Retail Properties</h3>
            <p className="text-gray-600">Premium retail properties for growing businesses.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
