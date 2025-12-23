"use client";
import React, { useState, useEffect } from 'react';
import Link from "next/link";
import { db } from '@/firebase/config'; 
import { doc, getDoc } from "firebase/firestore";

const HEADER_BG = "bg-[#43534B]"; 
const PROMO_CARD_BG = "bg-blue-500/0"; 

const PromoContent = ({ data }) => {
    if (data && data.gambar && data.desk) {
        return (
            <div className="flex flex-col items-center justify-center p-6 space-y-4">
                <div className="relative w-full max-w-lg h-48 border-4 border-white rounded-lg shadow-xl overflow-hidden">
                    <div
                        className="w-full h-full bg-cover bg-center"
                        style={{ backgroundImage: `url(${data.gambar})` }}
                    />
                    <div className="absolute bottom-0 w-full text-center bg-black bg-opacity-40 text-white py-1">
                        Promo
                    </div>
                </div>

                <p className="text-white text-sm text-center max-w-xl">
                    {data.desk}
                </p>
                
                <div className="flex space-x-2">
                    <div className="w-2 h-2 rounded-full bg-white opacity-50"></div>
                    <div className="w-2 h-2 rounded-full bg-white opacity-50"></div>
                    <div className="w-2 h-2 rounded-full bg-white bg-opacity-100"></div>
                </div>
            </div>
        );
    } 
    
    return (
        <div className="flex flex-col items-center justify-center h-full p-6">
            <img 
                src="/logo.png" 
                alt="AYASA HOUSE Logo" 
                className="w-40 h-auto" 
            />
        </div>
    );
};


const PromoHeader = () => {
    const [promoData, setPromoData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPromo = async () => {
            try {
                const docRef = doc(db, "ayasa", "promo");
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setPromoData(docSnap.data());
                } else {
                    setPromoData(null); 
                }
            } catch (error) {
                console.error("Error fetching promo data:", error);
                setPromoData(null);
            } finally {
                setLoading(false);
            }
        };

        if (db) {
            fetchPromo();
        } else {
            setLoading(false);
        }
    }, []);

    return (
        <div className={`w-full`}>
            <div className={`w-full flex justify-center py-8`}>
                <div className="max-w-6xl mx-auto w-full">
                    {loading ? (
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