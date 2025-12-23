"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import PromoHeader from './components/promo';
import { db } from '@/firebase/config'; 
import { doc, getDoc } from "firebase/firestore";

const HEADER_BG = "bg-[#43534B]"; 
const MAIN_BG = "bg-white"; 

const ContentCardPlaceholder = ({imageUrl}) => (
    <div className="bg-white rounded-lg p-3 shadow-md border-2 border-gray-400">
        <div className="bg-gray-200 h-40 flex items-center justify-center rounded-lg relative overflow-hidden text-gray-500 text-sm">
            <img 
                src={imageUrl} 
                className="w-full h-full object-cover"
            />
        </div>
    </div>
);

const HeroSlider = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [backgrounds, setBackgrounds] = useState([]); 
    const [loading, setLoading] = useState(true);
    const sliderRef = useRef(null);

    useEffect(() => {
        const fetchBackgrounds = async () => {
            try {
                const docRef = doc(db, "ayasa", "main");
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const data = docSnap.data();
                    const images = [data.bg1, data.bg2, data.bg3].filter(img => img && img !== "");
                    setBackgrounds(images);
                }
            } catch (error) {
                console.error("Error fetching background images:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBackgrounds();
    }, []);

    const handleScroll = () => {
        if (sliderRef.current) {
            const { scrollLeft, clientWidth } = sliderRef.current;
            const newIndex = Math.round(scrollLeft / clientWidth);
            if (newIndex !== activeIndex) {
                setActiveIndex(newIndex);
            }
        }
    };

    const goToSlide = (index) => {
        setActiveIndex(index);
        if (sliderRef.current) {
            sliderRef.current.scrollTo({
                left: index * sliderRef.current.clientWidth,
                behavior: "smooth",
            });
        }
    };

    if (loading) return <div className="w-full h-[50vh] bg-gray-200 animate-pulse" />;

    return (
            <div className="relative w-full h-[50vh] md:h-[70vh] overflow-hidden">
              <div 
                ref={sliderRef}
                className="flex h-full w-full overflow-x-scroll snap-x snap-mandatory scroll-smooth"
                onScroll={handleScroll}
                style={{ WebkitOverflowScrolling: 'touch', msOverflowStyle: 'none', scrollbarWidth: 'none' }}
              >
                {backgrounds.map((src, index) => (
                    <div
                        key={index}
                        className="flex-shrink-0 w-full h-full snap-center"
                        style={{ width: '100%' }}
                    >
                        <div
                            className="w-full h-full bg-cover bg-center"
                            style={{ 
                                backgroundImage: `url(${src})`,
                                backgroundBlendMode: 'multiply',
                                backgroundColor: 'rgba(0, 0, 0, 0.45)', 
                            }}
                        />
                    </div>
                ))}
            </div>
            

            <div className="absolute inset-0 z-10 flex flex-col justify-start">      
                <PromoHeader />
            </div>
            <div
              className="w-full h-full bg-cover bg-center z-10 absolute bottom-0 transform"
              style={{ backgroundImage: "url('/bawah.png')" }}
            />
            
            <div className="absolute bottom-4 left-0 right-0 z-10 flex justify-center space-x-2">
                {backgrounds.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                            index === activeIndex ? "bg-white scale-110" : "bg-gray-400 opacity-70 hover:opacity-100"
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
            
        </div>
    );
};

export default function Home() {
    return (
        <div className={`min-h-screen ${MAIN_BG}`}>
            
            <HeroSlider />
            
            <section className={`py-12 px-4 ${MAIN_BG}`}>
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-3xl font-bold text-center text-black mb-2">
                        AYASA HOUSE
                    </h2>
                    <p className="text-sm text-center text-gray-600 max-w-3xl mx-auto mb-8">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <ContentCardPlaceholder imageUrl="/1.jpeg" />
                        <ContentCardPlaceholder imageUrl="/19.jpeg" />
                        <ContentCardPlaceholder imageUrl="/2.jpeg" />
                    </div>
                </div>
            </section>
            
            <section className={`py-12 px-4 ${HEADER_BG}`}>
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-3xl font-bold text-center text-white mb-2">
                        3 SPACIOUS BEDROOMS
                    </h2>
                    <p className="text-sm text-center text-gray-300 max-w-3xl mx-auto mb-8">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <ContentCardPlaceholder imageUrl="/5.jpeg" />
                        <ContentCardPlaceholder imageUrl="/18.jpeg" />
                        <ContentCardPlaceholder imageUrl="/6.jpeg" />
                    </div>

                    <div className="flex justify-center mt-10"> 
                        <Link href="/accommodation#room" className="text-sm font-bold border-b-2 border-white pb-0.5 hover:text-blue-600 text-white hover:border-blue-600 transition">
                            SEE MORE
                        </Link>
                    </div>
                </div>
            </section>

            <section className={`py-12 px-4 ${MAIN_BG}`}>
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-3xl font-bold text-center text-black mb-2">
                        KITCHEN, DINING, & GARDEN AREA
                    </h2>
                    <p className="text-sm text-center text-gray-600 max-w-3xl mx-auto mb-8">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <ContentCardPlaceholder imageUrl="/9.jpeg" />
                        <ContentCardPlaceholder imageUrl="/12.jpeg" />
                        <ContentCardPlaceholder imageUrl="/2.jpeg" />
                    </div>

                    <div className="flex justify-center mt-10"> 
                        <Link href="/accommodation#other" className="text-sm font-bold border-b-2 border-black pb-0.5 hover:text-gray-600 text-black hover:border-gray-600 transition">
                            SEE MORE
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}

