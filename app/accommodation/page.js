"use client";

import { useEffect, useState } from "react";
import { db } from "@/firebase/config"; 
import { doc, onSnapshot } from "firebase/firestore";

const HEADER_BG = "bg-[#43534B]"; // Hijau tua

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
    // Referensi ke dokumen ayasa/foto
    const docRef = doc(db, "ayasa", "akomodasi");

    // Ambil data secara real-time
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
            {/* Header */}
            <p className="text-xs text-gray-500 mb-2 ">
                Home / <span className="font-semibold text-black">Accommodation</span>
            </p>

            <h1 className="text-3xl font-bold text-black mb-5">Accommodation</h1>
        </div>

        {/* --- 1. SPACES FOR GATHERING --- */}
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
                    
                    {/* md:col-span-2 agar di desktop dia memenuhi lebar bawah, tapi di mobile tetap 1 kolom biasa */}
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

        {/* --- 2. GATHERING --- */}
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

        {/* --- 3. OTHER --- */}
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

        {/* --- SECTION: RULES & BENEFIT --- */}
        <section className="bg-white py-16 w-full">
            <div className="max-w-5xl mx-auto px-4">
                <h2 className="text-3xl font-bold text-center text-black mb-12 tracking-widest">RULES & BENEFIT</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Kolom Kiri: RULES */}
                    <div className="border-2 border-gray-400 rounded-2xl p-6">
                        <h3 className="text-xl font-bold text-center text-black mb-6">RULES</h3>
                        <div className="flex flex-col">
                            <InfoBox text="NO SMOKING" imageUrl="/r1.png" />                             
                            <InfoBox text="NO PETS" imageUrl="/r2.png" />
                            <InfoBox text="MAX 10 GUESTS" imageUrl="/r3.png" />                            
                            <InfoBox text="NO LOUD MUSIC" imageUrl="/r4.png" />
                        </div>
                    </div>

                    {/* Kolom Kanan: BENEFIT */}
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

// "use client";

// import { useEffect, useState } from "react";
// import { db } from "@/firebase/config"; 
// import { doc, onSnapshot } from "firebase/firestore";

// const HEADER_BG = "bg-[#43534B]"; // Hijau tua

// // Komponen Card yang lebih kecil dengan Judul & Deskripsi
// const ContentCard = ({ title, description, imageUrl, isVertical = false, darkText = false }) => (
//     <div className="flex flex-col items-center max-w-[280px] mx-auto group">
//         <div 
//             className={`w-full bg-white rounded-xl p-2 shadow-lg border border-gray-300 transition-transform duration-300 group-hover:scale-105 ${
//                 isVertical ? 'aspect-[3/4]' : 'aspect-video'
//             } overflow-hidden`}
//         >
//             <div className="bg-gray-100 h-full w-full flex items-center justify-center rounded-lg relative overflow-hidden">
//                 {imageUrl ? (
//                     <img 
//                         src={imageUrl} 
//                         alt={title} 
//                         className="w-full h-full object-cover"
//                     />
//                 ) : (
//                     <span className="text-xs text-gray-400 animate-pulse">Loading Image...</span>
//                 )}
//             </div>
//         </div>
        
//         {/* Judul dan Deskripsi */}
//         <div className={`mt-4 text-center ${darkText ? 'text-black' : 'text-white'}`}>
//             <h3 className="font-bold text-base uppercase tracking-wider">{title}</h3>
//             <p className="mt-1 text-xs opacity-80 leading-relaxed line-clamp-2">
//                 {description || "Deskripsi singkat mengenai area ini untuk memberikan informasi lebih lanjut."}
//             </p>
//         </div>
//     </div>
// );

// export default function AccommodationPage() {
//   const [photoData, setPhotoData] = useState({});

//   useEffect(() => {
//     const docRef = doc(db, "ayasa", "foto");
//     const unsubscribe = onSnapshot(docRef, (docSnap) => {
//       if (docSnap.exists()) {
//         setPhotoData(docSnap.data());
//       }
//     });
//     return () => unsubscribe();
//   }, []);

//   return (
//     <div className="bg-white min-h-screen">
//         <div className="max-w-6xl mx-auto px-4 py-12">
//             {/* Breadcrumb & Title */}
//             <nav className="text-xs text-gray-400 mb-2">Home / <b>Accommodation</b></nav>
//             <h1 className="text-4xl font-extrabold text-black mb-12">Accommodation</h1>

//             {/* --- SECTION 1: SPACES FOR GATHERING --- */}
//             <section className={`${HEADER_BG} p-10 rounded-3xl mb-12 shadow-2xl`}>
//                 <h2 className="text-2xl font-bold text-center text-white mb-10 tracking-widest">SPACES FOR GATHERING</h2>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
//                     <ContentCard 
//                         title="Outdoor Spot" 
//                         description="Area terbuka hijau yang segar untuk berkumpul santai." 
//                         imageUrl={photoData["1"]} 
//                         isVertical={true} 
//                     />
//                     <ContentCard 
//                         title="Indoor Spot" 
//                         description="Ruangan dalam yang hangat dengan desain minimalis." 
//                         imageUrl={photoData["2"]} 
//                         isVertical={true} 
//                     />
//                     <ContentCard 
//                         title="Fire Pit" 
//                         description="Tempat api unggun untuk suasana malam yang akrab." 
//                         imageUrl={photoData["3"]} 
//                         isVertical={true} 
//                     />
//                 </div>
//             </section>

//             {/* --- SECTION 2: GATHERING (White) --- */}
//             <section className="bg-gray-50 p-10 rounded-3xl mb-12 border border-gray-200">
//                 <h2 className="text-2xl font-bold text-center text-black mb-10 tracking-widest">GATHERING</h2>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 max-w-4xl mx-auto">
//                     <ContentCard 
//                         title="Cozy Corner" 
//                         description="Sudut tenang untuk membaca buku atau sekadar ngopi." 
//                         imageUrl={photoData["4"]} 
//                         darkText={true}
//                     />
//                     <ContentCard 
//                         title="Balcony Spot" 
//                         description="Pemandangan indah langsung dari lantai atas." 
//                         imageUrl={photoData["5"]} 
//                         darkText={true}
//                     />
//                 </div>
//             </section>

//             {/* --- SECTION 3: OTHER --- */}
//             <section className={`${HEADER_BG} p-10 rounded-3xl shadow-2xl`}>
//                 <h2 className="text-2xl font-bold text-center text-white mb-10 tracking-widest">OTHER FACILITIES</h2>
//                 <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
//                     <ContentCard 
//                         title="Parking Area" 
//                         description="Area parkir luas dan aman untuk kendaraan tamu." 
//                         imageUrl={photoData["6"]} 
//                         isVertical={true} 
//                     />
//                     <ContentCard 
//                         title="Laundry Room" 
//                         description="Fasilitas cuci mandiri yang praktis dan bersih." 
//                         imageUrl={photoData["7"]} 
//                         isVertical={true} 
//                     />
//                     <ContentCard 
//                         title="Relax Spot" 
//                         description="Area khusus untuk relaksasi total." 
//                         imageUrl={photoData["8"]} 
//                         isVertical={true} 
//                     />
//                 </div>
//             </section>
//         </div>
//     </div>
//   );
// }