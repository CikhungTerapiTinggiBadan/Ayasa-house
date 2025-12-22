"use client";

import { useEffect, useState } from "react";
import { db } from "@/firebase/config"; // Sesuaikan dengan path konfigurasi firebase Anda
import { doc, onSnapshot } from "firebase/firestore";

export default function PhotosPage() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Referensi ke dokumen: ayasa -> foto
    const docRef = doc(db, "ayasa", "foto");

    // Listen data secara real-time
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        
        // Mengubah object { "1": "base64...", "2": "base64..." } 
        // menjadi array agar mudah di-map, lalu diurutkan berdasarkan key-nya
        const sortedPhotos = Object.keys(data)
          .sort((a, b) => parseInt(a) - parseInt(b))
          .map((key) => ({
            id: key,
            url: data[key],
          }))
          .filter(photo => photo.url !== ""); // Jangan tampilkan yang kosong

        setPhotos(sortedPhotos);
      }
      setLoading(false);
    });

    return () => unsubscribe(); // Membersihkan listener saat komponen unmount
  }, []);

  // Komponen Card Gambar
  const ImageCard = ({ url, index }) => (
    <div className="bg-white rounded-lg p-3 shadow-md border-2 border-gray-400 aspect-[3/4] hover:scale-105 transition-transform">
      <div className="bg-gray-200 h-full flex items-center justify-center rounded-lg relative overflow-hidden">
        {url ? (
          <img 
            src={url} 
            alt={`Foto ${index}`} 
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-xs text-gray-500">Loading...</span>
        )}
      </div>
    </div>
  );

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-5xl mx-auto px-4 py-8 bg-white">
        {/* Breadcrumb */}
        <p className="text-xs text-gray-500 mb-2">
          Home / <span className="font-semibold text-black">Photos</span>
        </p>

        <h1 className="text-4xl font-bold text-black mb-8">Photos</h1>

        {loading ? (
          <div className="text-center py-10">Memuat Koleksi Foto...</div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {photos.map((photo, index) => (
              <ImageCard key={photo.id} url={photo.url} index={photo.id} />
            ))}
            
            {/* Jika foto kosong */}
            {photos.length === 0 && (
              <p className="col-span-full text-center text-gray-400">Belum ada foto yang diunggah.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}