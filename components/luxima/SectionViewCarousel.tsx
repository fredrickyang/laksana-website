export default function SectionViewCarousel() {
  return (
    <section className="py-20 px-6 bg-gray-50">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Gallery</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="aspect-video bg-gray-200 rounded-lg" />
          <div className="aspect-video bg-gray-200 rounded-lg" />
          <div className="aspect-video bg-gray-200 rounded-lg" />
        </div>
      </div>
    </section>
  );
}
