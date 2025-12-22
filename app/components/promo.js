// components/promo.js
"use client";
import React, { useState, useEffect } from 'react';
import Link from "next/link";
// Asumsi: Anda memiliki file konfigurasi Firebase yang mengekspor db (Firestore instance)
import { db } from '@/firebase/config'; // <-- Sesuaikan path ini jika berbeda
import { doc, getDoc } from "firebase/firestore";

const HEADER_BG = "bg-[#43534B]"; 
const PROMO_CARD_BG = "bg-blue-500/0"; // Warna abu-abu gelap dari desain

// --- Sub Komponen: Tampilan Promo atau Logo ---
const PromoContent = ({ data }) => {
    // 1. Kasus Promo dari Firebase (jika gambar dan deskripsi ada)
    if (data && data.gambar && data.desk) {
        return (
            <div className="flex flex-col items-center justify-center p-6 space-y-4">
                {/* Kontainer Gambar Promo (Sesuai Desain) */}
                <div className="relative w-full max-w-lg h-48 border-4 border-white rounded-lg shadow-xl overflow-hidden">
                    {/* Menggunakan <img> jika Anda menggunakan Next/Image */}
                    {/* Karena ini hanya contoh, menggunakan div dengan background-image */}
                    <div
                        className="w-full h-full bg-cover bg-center"
                        style={{ backgroundImage: `url(${data.gambar})` }}
                    />
                    {/* Label 'Promo' di bawah gambar */}
                    <div className="absolute bottom-0 w-full text-center bg-black bg-opacity-40 text-white py-1">
                        Promo
                    </div>
                </div>

                {/* Deskripsi Promo */}
                <p className="text-white text-sm text-center max-w-xl">
                    {data.desk}
                </p>
                
                {/* Indikator Titik (Jika ada logika carousel/slider, ini harus diubah) */}
                <div className="flex space-x-2">
                    <div className="w-2 h-2 rounded-full bg-white opacity-50"></div>
                    <div className="w-2 h-2 rounded-full bg-white opacity-50"></div>
                    <div className="w-2 h-2 rounded-full bg-white bg-opacity-100"></div>
                </div>
            </div>
        );
    } 
    
    // 2. Kasus Fallback (Jika data dari Firebase bernilai null atau kosong)
    return (
        <div className="flex flex-col items-center justify-center h-full p-6">
            <img 
                src="/logo.png" // Menggunakan src default: logo.png
                alt="AYASA HOUSE Logo" 
                className="w-40 h-auto" // Sesuaikan ukuran logo
            />
        </div>
    );
};


// --- Komponen Utama: PromoHeader ---
const PromoHeader = () => {
    const [promoData, setPromoData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPromo = async () => {
            try {
                // Mengambil dokumen 'promo' dari koleksi 'ayasa' (sesuai screenshot: /ayasa/promo)
                const docRef = doc(db, "ayasa", "promo");
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setPromoData(docSnap.data());
                } else {
                    // Jika dokumen tidak ada, set data menjadi null agar Fallback Logo ditampilkan
                    setPromoData(null); 
                }
            } catch (error) {
                console.error("Error fetching promo data:", error);
                // Jika terjadi error, set data menjadi null agar Fallback Logo ditampilkan
                setPromoData(null);
            } finally {
                setLoading(false);
            }
        };

        // Pastikan db ada sebelum mencoba mengambil data
        if (db) {
            fetchPromo();
        } else {
            setLoading(false);
            // Ini akan membuat promoData menjadi null, memicu Fallback
        }
    }, []);

    return (
        <div className={`w-full`}>
            {/* Area Konten Promo / Logo */}
            <div className={`w-full flex justify-center py-8`}>
                <div className="max-w-6xl mx-auto w-full">
                    {loading ? (
                        // Tampilan Loading
                        <div className="h-64 flex items-center justify-center text-white/70">Loading Promo...</div>
                    ) : (
                        <PromoContent data={promoData} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default PromoHeader;