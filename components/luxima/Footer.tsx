export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Luxima</h3>
            <p className="text-gray-400 text-sm">
              Premium Property Development
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <p className="text-gray-400 text-sm">
              Email: info@laksanabusinesspark.id
              <br />
              Phone: +62 21 555 5555
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Links</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="/luxima" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="/luxima#about" className="hover:text-white transition-colors">About</a></li>
              <li><a href="/luxima#products" className="hover:text-white transition-colors">Products</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500 text-xs">
          &copy; {new Date().getFullYear()} Luxima. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
