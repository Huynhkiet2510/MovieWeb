import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Movie<span className="text-red-500">Zone</span></h2>
          <p className="text-gray-400">Nơi bạn có thể xem và tìm kiếm các bộ phim yêu thích mọi lúc mọi nơi.</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="/" className="hover:text-blue-500 transition-colors">Trang chủ</a></li>
            <li><a href="/movies" className="hover:text-blue-500 transition-colors">Phim</a></li>
            <li><a href="/about" className="hover:text-blue-500 transition-colors">Giới thiệu</a></li>
            <li><a href="/contact" className="hover:text-blue-500 transition-colors">Liên hệ</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Follow Us</h3>
          <div className="flex justify-center space-x-4">
            <a href="#" className="hover:text-blue-500 transition-colors">Facebook</a>
            <a href="#" className="hover:text-blue-500 transition-colors">Twitter</a>
            <a href="#" className="hover:text-blue-500 transition-colors">Instagram</a>
          </div>
        </div>
      </div>
      <div className="mt-10 border-t border-gray-700 pt-6 text-center text-gray-500 text-sm">
        &copy; 2025 MovieZone. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
