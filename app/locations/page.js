"use client";
import dynamic from 'next/dynamic';
import { useEffect, useState } from "react";
import { db } from "@/firebase/config";
import { doc, onSnapshot } from "firebase/firestore";

const RoutingMap = dynamic(() => import('@/components/routingmaps'), { 
  ssr: false,
  loading: () => <div className="h-full w-full bg-gray-100 flex items-center justify-center text-gray-400">Loading Map...</div>
});

export default function LocationsPage() {
  const [lokasi, setLokasi] = useState(null);
  const [selectedNearby, setSelectedNearby] = useState(null);
  const [selectedPopular, setSelectedPopular] = useState(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "ayasa", "lokasi"), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        const parse = (obj) => [parseFloat(obj.lat), parseFloat(obj.lon)];
        
        const dataParsed = {
          main: parse(data.main),
          piqali: parse(data.piqali),
          terminal: parse(data.terminal_concat),
          rockBurger: parse(data.the_rock_burger)
        };
        setLokasi(dataParsed);
        // Default selection
        setSelectedNearby({ coords: dataParsed.piqali, label: "Piqali" });
        setSelectedPopular({ coords: dataParsed.terminal, label: "Terminal Concat" });
      }
    });
    return () => unsubscribe();
  }, []);

  if (!lokasi) return <div className="p-10 text-center">Menghubungkan Database...</div>;

  return (
    <div className="bg-white min-h-screen text-black">
      <div className="max-w-5xl mx-auto px-4 py-8">
        
        {/* --- SECTION 1: MAIN LOCATION --- */}
        <section className="mb-16 border-2 border-gray-300 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-center mb-6">LOCATION</h2>
          <div className="aspect-video w-full rounded-xl overflow-hidden border">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3953.513!2d110.387!3d-7.731!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwNDMnNTEuNCJTIDExMMKwMjMnMjIuOSJF!5e0!3m2!1sen!2sid!4v1700000000000"
              width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy">
            </iframe>
          </div>
          <div className="text-center mt-6">
            <a href="https://maps.app.goo.gl/YourLinkHere" target="_blank" className="bg-[#43534B] text-white px-8 py-2 rounded-full font-bold">VIEW ON GOOGLE MAPS</a>
          </div>
        </section>

        {/* --- SECTION 2: NEARBY HOTSPOT --- */}
        <section className="mb-16 border-2 border-gray-300 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-center mb-6">NEARBY HOTSPOT</h2>
          <div className="h-[400px] rounded-xl overflow-hidden border mb-6">
            <RoutingMap start={lokasi.main} end={selectedNearby.coords} label={selectedNearby.label} />
          </div>
          <div className="grid grid-cols-2 gap-4">
             <button onClick={() => setSelectedNearby({coords: lokasi.piqali, label: "Piqali"})} className={`p-4 border rounded-xl flex items-center gap-4 ${selectedNearby.label === "Piqali" ? 'border-red-500 bg-red-50' : ''}`}>
               <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
               <div className="text-left">
                 <p className="font-bold">PIQALI</p>
                 <p className="text-xs text-gray-500">5 Mins / 1 KM</p>
               </div>
             </button>
             {/* Tambahkan button nearby lainnya di sini */}
          </div>
        </section>

        {/* --- SECTION 3: POPULAR HOTSPOT --- */}
        <section className="mb-16 border-2 border-gray-300 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-center mb-6">POPULAR HOTSPOT</h2>
          <div className="h-[400px] rounded-xl overflow-hidden border mb-6">
            <RoutingMap start={lokasi.main} end={selectedPopular.coords} label={selectedPopular.label} />
          </div>
          <div className="grid grid-cols-2 gap-4">
             <button onClick={() => setSelectedPopular({coords: lokasi.terminal, label: "Terminal Concat"})} className={`p-4 border rounded-xl flex items-center gap-4 ${selectedPopular.label === "Terminal Concat" ? 'border-red-500 bg-red-50' : ''}`}>
               <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
               <div className="text-left">
                 <p className="font-bold uppercase text-xs">Terminal Concat</p>
                 <p className="text-xs text-gray-500">12 Mins / 3 KM</p>
               </div>
             </button>
             <button onClick={() => setSelectedPopular({coords: lokasi.rockBurger, label: "The Rock Burger"})} className={`p-4 border rounded-xl flex items-center gap-4 ${selectedPopular.label === "The Rock Burger" ? 'border-red-500 bg-red-50' : ''}`}>
               <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
               <div className="text-left">
                 <p className="font-bold uppercase text-xs">The Rock Burger</p>
                 <p className="text-xs text-gray-500">15 Mins / 4 KM</p>
               </div>
             </button>
          </div>
        </section>

      </div>
    </div>
  );
}