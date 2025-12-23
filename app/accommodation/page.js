"use client";

import { useEffect, useState } from "react";
import { db } from "@/firebase/config"; 
import { doc, onSnapshot } from "firebase/firestore";

const HEADER_BG = "bg-[#43534B]"; 

const ImagePlaceholder = ({ text, isVertical = false, imageUrl, features=[] }) => (
    <div className="text-center">
        <div 
            className={`bg-white rounded-lg p-3 shadow-md border-2 border-gray-400 ${
                isVertical ? 'aspect-[3/4]' : 'aspect-video'
            } mx-auto `}
        >
            <div className="bg-gray-200 h-full flex items-center justify-center rounded-lg relative overflow-hidden text-sm text-gray-500">
                {imageUrl ? (
                    <img 
                        src={imageUrl} 
                        alt={text} 
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <span>Loading {text}...</span>
                )}
            </div>
            <p className={`mt-3 font-semibold text-sm ${isVertical ? 'text-white' : 'text-black'}`}>{text}</p>

                <div className="flex flex-col mt-6">
                {features.map((item, index) => (
                    <RoomBox key={index} text={item.text} imageUrl={item.icon} />
                ))}
                </div>
        </div>

    </div>
);

const InfoBox = ({ text, imageUrl }) => (
    <div className="flex items-center bg-white border border-gray-400 rounded-lg p-2 mb-3 shadow-sm">
        <div className="w-10 h-10 flex-shrink-0 bg-gray-100 rounded-full overflow-hidden flex items-center justify-center border border-gray-200">
            {imageUrl ? (
                <img src={imageUrl} alt="icon" className="w-full h-full object-cover" />
            ) : (
                <div className="w-6 h-6 bg-gray-300 rounded-full"></div> 
            )}
        </div>
        <span className="ml-8 font-bold text-sm text-black tracking-wide uppercase">{text}</span>
    </div>
);

const RoomBox = ({ text, imageUrl }) => (
    <div className="flex items-center bg-gray-50 border border-gray-300 rounded-lg p-1.5 mb-2 shadow-sm mx-5">
        <div className="w-8 h-8 flex-shrink-0 bg-white rounded-full overflow-hidden flex items-center justify-center border border-gray-200">
            {imageUrl ? (
                <img src={imageUrl} alt="icon" className="w-full h-full object-contain p-1" />
            ) : (
                <div className="w-4 h-4 bg-gray-300 rounded-full"></div> 
            )}
        </div>
        <span className="ml-4 font-bold text-xs text-black tracking-tight uppercase leading-tight text-left">
            {text}
        </span>
    </div>
);

export default function AccommodationPage() {
  const [photoData, setPhotoData] = useState({});

  useEffect(() => {
    const docRef = doc(db, "ayasa", "akomodasi");

    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        setPhotoData(docSnap.data());
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="bg-white">
        <div className="max-w-5xl mx-auto px-4 py-8">
            <p className="text-xs text-gray-500 mb-2 ">
                Home / <span className="font-semibold text-black">Accommodation</span>
            </p>

            <h1 className="text-3xl font-bold text-black mb-5">Accommodation</h1>
        </div>

        <section id="room" className={`${HEADER_BG} p-6`}>
            <div className="max-w-5xl mx-auto pb-8 pt-5">
                <div className="flex flex-col items-center justify-center mb-6 text-white">
                    <h2 className="text-2xl font-bold">ROOMS</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ImagePlaceholder 
                        text="UPSTAIRS BEDROOM EAST" 
                        imageUrl={photoData["ka1"]} 
                        features={[
                            { text: "2 TWIN SIZE BED", icon: "/r1.png" },
                            { text: "AIR CONDITIONER", icon: "/r2.png" },
                            { text: "TABLE", icon: "/r2.png" },
                            { text: "WIFI", icon: "/r2.png" },
                            { text: "WATER BOTTLE", icon: "/r2.png" }
                        ]}
                    />

                    <ImagePlaceholder 
                        text="UPSTAIRS BEDROOM WEST" 
                        imageUrl={photoData["ka2"]} 
                        features={[
                            { text: "QUEEN SIZE BED", icon: "/r1.png" },
                            { text: "AIR CONDITIONER", icon: "/r2.png" },
                            { text: "TABLE", icon: "/r2.png" },
                            { text: "WIFI", icon: "/r2.png" },
                            { text: "WATER BOTTLE", icon: "/r2.png" }
                        ]}
                    />
                    
                    <div className="md:col-span-2 flex justify-center">
                        <div className="w-full md:w-1/2">
                            <ImagePlaceholder 
                                text="DOWNSTAIRS BEDROOM" 
                                imageUrl={photoData["kb"]}
                                features={[
                                    { text: "QUEEN SIZE BED", icon: "/r1.png" },
                                    { text: "INDOOR BATHROOM", icon: "/r1.png" },
                                    { text: "AIR CONDITIONER", icon: "/r2.png" },
                                    { text: "TABLE", icon: "/r2.png" },
                                    { text: "WIFI", icon: "/r2.png" },
                                    { text: "WATER BOTTLE", icon: "/r2.png" }
                                ]}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section className="bg-white p-6 text-black">
            <div className="max-w-5xl mx-auto px-4 pb-8 pt-5">
                <div className="flex flex-col items-center justify-center mb-6">
                    <h2 className="text-2xl font-bold">BATHROOM</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ImagePlaceholder text="UPSTAIRS BATHROOM" isVertical={false} imageUrl={photoData["kma"]} />
                    <ImagePlaceholder text="DOWNSTAIRS BATHROOM" isVertical={false} imageUrl={photoData["kmb"]} />
                </div>
            </div>
        </section>

        <section id="other" className={`${HEADER_BG} p-6`}>
            <div className="max-w-5xl mx-auto pb-8 pt-5">
                <div className="flex flex-col items-center justify-center mb-6 text-white">
                    <h2 className="text-2xl font-bold">OTHER</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ImagePlaceholder text="KITCHEN" imageUrl={photoData["d"]} />
                    <ImagePlaceholder text="DINING" imageUrl={photoData["rm"]} />

                    <div className="md:col-span-2 flex justify-center">
                        <div className="w-full md:w-1/2">
                            <ImagePlaceholder text="GARDEN" imageUrl={photoData["gd"]} />
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section className="bg-white py-16 w-full">
            <div className="max-w-5xl mx-auto px-4">
                <h2 className="text-3xl font-bold text-center text-black mb-12 tracking-widest">RULES & BENEFIT</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="border-2 border-gray-400 rounded-2xl p-6">
                        <h3 className="text-xl font-bold text-center text-black mb-6">RULES</h3>
                        <div className="flex flex-col">
                            <InfoBox text="NO SMOKING" imageUrl="/r1.png" />                             
                            <InfoBox text="NO PETS" imageUrl="/r2.png" />
                            <InfoBox text="MAX 10 GUESTS" imageUrl="/r3.png" />                            
                            <InfoBox text="NO LOUD MUSIC" imageUrl="/r4.png" />
                        </div>
                    </div>

                    <div className="border-2 border-gray-400 rounded-2xl p-6">
                        <h3 className="text-xl font-bold text-center text-black mb-6">BENEFIT</h3>
                        <div className="flex flex-col">
                            <InfoBox text="2 CAR PARKING" imageUrl="/b1.png" />
                            <InfoBox text="NO BREAKFAST INCLUDED" imageUrl="/b2.png"  />
                            <InfoBox text="DRINKING WATER" imageUrl="/b3.png"  />
                            <InfoBox text="CLEAN TOWEL" imageUrl="/b4.png"  />
                            <InfoBox text="WIFI" imageUrl="/b4.png"  />
                            <InfoBox text="IRON" imageUrl="/b4.png"  />
                            <InfoBox text="SPARE ROOM FOR DRIVER" imageUrl="/b4.png"  />
                            <InfoBox text="FREE EARLY CHECK IN IF POSSIBLE" imageUrl="/b4.png"  />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
  );
}