"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X } from 'lucide-react'; 

const HEADER_BG = "bg-[#293c2a]"; // Hijau tua

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isContOpen, setIsContOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Photos", href: "/photos" },
    { name: "Accommodation", href: "/accommodation" },
    { name: "Locations", href: "/locations" },
    { name: "Contact Us", isAction: true },
  ];

  const socialLinks = [
    { href: 'https://whatsapp.com', alt: 'WhatsApp', icon: '/facebook-fill-svgrepo-com.svg' },
    { href: 'https://instagram.com', alt: 'Instagram', icon: '/instagram-fill-svgrepo-com.svg' },
    { href: 'https://airbnb.com', alt: 'AirBnb', icon: '/instagram-fill-svgrepo-com.svg' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 ${HEADER_BG} shadow-lg z-[9999]`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex-shrink-0">
            <span className="text-white text-3xl font-bold">AYASA</span>
            <span className="text-[#c9b091] text-2xl font-bold">House</span>
          </Link>
          
          {/* Menu Desktop */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                item.isAction ? (
                  <button
                    key={item.name}
                    onClick={() => setIsContOpen(!isContOpen)}
                    className="text-gray-300 hover:bg-green-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition"
                  >
                    {item.name}
                  </button>
                ) : (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-gray-300 hover:bg-green-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition"
                  >
                    {item.name}
                  </Link>
                )
              ))}
            </div>
          </div>

          {/* Hamburger Mobile */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Menu Mobile */}
      {isOpen && (
        <div className="md:hidden bg-[#293c2a] border-t border-green-900">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              item.isAction ? (
                <button
                  key={item.name}
                  onClick={() => {
                    setIsContOpen(true);
                    setIsOpen(false);
                  }}
                  className="w-full text-left text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  {item.name}
                </button>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  {item.name}
                </Link>
              )
            ))}
          </div>
        </div>
      )}

      {/* Popup Contact Us (Modal) */}
      {isContOpen && (
        <>
          {/* Overlay Click-to-Close */}
          <div className="fixed inset-0" onClick={() => setIsContOpen(false)} />
          
          <div className="absolute top-16 right-4 w-80 md:w-96 bg-white shadow-2xl rounded-md text-black z-[10000] border border-gray-200 p-6 flex flex-col transition-all">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">CONTACT US</h2>
              <button onClick={() => setIsContOpen(false)} className="text-gray-400 hover:text-black">
                <X size={20} />
              </button>
            </div>
               
            <div className="bg-[#293c2a] border border-gray-200 p-4 mb-4 rounded-sm">
              <h3 className="font-bold text-xs mb-4 border-b border-white pb-2 uppercase tracking-widest text-center"></h3>
              
              <div className="grid grid-cols-3 gap-6 place-items-center mb-4 p-2">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center hover:scale-110 transition-transform duration-200"
                  >
                    <img
                      src={link.icon}
                      alt={link.alt}
                      className="w-10 h-10 object-contain" // Ukuran ikon diperbaiki dari 29 ke 10
                    />
                  </a>
                ))}
              </div>
                
              <div className="flex justify-between font-bold text-sm mt-4 pt-3 border-t border-white text-white">

              </div>
            </div>

          </div>
        </>
      )}
    </nav>
  );
}