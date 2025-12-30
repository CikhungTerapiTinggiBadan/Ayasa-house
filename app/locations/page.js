"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { db } from "@/firebase/config";
import { doc, onSnapshot } from "firebase/firestore";

const RoutingMap = dynamic(() => import("@/components/routingmaps"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-gray-100 flex items-center justify-center text-gray-400">
      Loading Map...
    </div>
  ),
});

export default function LocationsPage() {
  const [lokasi, setLokasi] = useState(null);
  const [selectedNearby, setSelectedNearby] = useState(null);
  const [selectedPopular, setSelectedPopular] = useState(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "ayasa", "lokasi"), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        const parseData = (obj) => ({
          coords: [parseFloat(obj.lat), parseFloat(obj.lon)],
          tipe: obj.tipe || "default",
        });

        const dataParsed = {
          main: [parseFloat(data.main.lat), parseFloat(data.main.lon)], //done
          piqali: parseData(data.piqali), //done
          terminal: parseData(data.terminal_concat), //done
          tugu: parseData(data.tugu), //done
          suraloka: parseData(data.suraloka), //done
          rockBurger: parseData(data.the_rock_burger), //done
          indo: parseData(data.indo), //done
          alfa: parseData(data.alfa), //done
          kamisan: parseData(data.kamisan), 
          kalpark: parseData(data.kalpark), //done
          banteng: parseData(data.banteng), //done
          ugm: parseData(data.ugm), //done
          uii: parseData(data.uii), //done
        };

        setLokasi(dataParsed);

        setSelectedNearby({
          coords: dataParsed.indo.coords,
          label: "Indomaret",
          tipe: dataParsed.indo.tipe,
        });
        setSelectedPopular({
          coords: dataParsed.tugu.coords,
          label: "Stasiun Tugu",
          tipe: dataParsed.tugu.tipe,
        });
      }
    });
    return () => unsubscribe();
  }, []);

  const getIconByTipe = (tipe) => {
    if (tipe === "trans") return "/m1.png";
    if (tipe === "resto") return "/m2.png";
    if (tipe === "market") return "/m3.png";
    if (tipe === "book") return "/m4.png";
    return "/m5.png"; 
  };

  if (!lokasi)
    return <div className="p-10 text-center">Menghubungkan Database...</div>;

  return (
    <div className="bg-white min-h-screen text-black">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <p className="text-xs text-gray-500 mb-2 ">
          Home / <span className="font-semibold text-black">Location</span>
        </p>

        <h1 className="text-3xl font-bold text-black mb-5">Location</h1>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <section className="mb-16 border-2 border-gray-300 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-center mb-6">LOCATION</h2>
          <div className="aspect-video w-full rounded-xl overflow-hidden border">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3953.513!2d110.387!3d-7.731!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwNDMnNTEuNCJTIDExMMKwMjMnMjIuOSJF!5e0!3m2!1sen!2sid!4v1700000000000"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
          <div className="text-center mt-6">
            <a
              href="https://maps.app.goo.gl/YourLinkHere"
              target="_blank"
              className="bg-[#43534B] text-white px-8 py-2 rounded-full font-bold"
            >
              VIEW ON GOOGLE MAPS
            </a>
          </div>
        </section>

        <section className="mb-16 border-2 border-gray-300 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-center mb-6">
            NEARBY HOTSPOT
          </h2>
          <div className="h-[400px] rounded-xl overflow-hidden border mb-6">
            <RoutingMap
              start={lokasi.main}
              end={selectedNearby.coords}
              label={selectedNearby.label}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">

            <button
              onClick={() =>
                setSelectedNearby({
                  coords: lokasi.indo.coords,
                  label: "Indomaret",
                  tipe: lokasi.indo.tipe,
                })
              }
              className={`p-4 border rounded-xl flex items-center gap-4 transition-all ${
                selectedNearby.label === "Indomaret"
                  ? "border-red-500 bg-red-50"
                  : "bg-white"
              }`}
            >
              <div className="w-10 h-10 relative overflow-hidden rounded-full border">
                <img
                  src={getIconByTipe(lokasi.indo.tipe)}
                  alt="icon"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="text-left">
                <p className="font-bold uppercase text-xs">Indomaret</p>
                <p className="text-xs text-gray-500">1 Mins / 400 M</p>
              </div>
            </button>

            <button
              onClick={() =>
                setSelectedNearby({
                  coords: lokasi.alfa.coords,
                  label: "Alfamart",
                  tipe: lokasi.alfa.tipe,
                })
              }
              className={`p-4 border rounded-xl flex items-center gap-4 transition-all ${
                selectedNearby.label === "Alfamart"
                  ? "border-red-500 bg-red-50"
                  : "bg-white"
              }`}
            >
              <div className="w-10 h-10 relative overflow-hidden rounded-full border">
                <img
                  src={getIconByTipe(lokasi.alfa.tipe)}
                  alt="icon"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="text-left">
                <p className="font-bold uppercase text-xs">Alfamart</p>
                <p className="text-xs text-gray-500">2 Mins / 500 KM</p>
              </div>
            </button>

            <button
              onClick={() =>
                setSelectedNearby({
                  coords: lokasi.kamisan.coords,
                  label: "Kamisan",
                  tipe: lokasi.kamisan.tipe,
                })
              }
              className={`p-4 border rounded-xl flex items-center gap-4 transition-all ${
                selectedNearby.label === "Kamisan"
                  ? "border-red-500 bg-red-50"
                  : "bg-white"
              }`}
            >
              <div className="w-10 h-10 relative overflow-hidden rounded-full border">
                <img
                  src={getIconByTipe(lokasi.kamisan.tipe)}
                  alt="icon"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="text-left">
                <p className="font-bold uppercase text-xs">Pasar Kamisan</p>
                <p className="text-xs text-gray-500">4 Mins / 1.7 KM</p>
              </div>
            </button>


            <button
              onClick={() =>
                setSelectedNearby({ 
                  coords: lokasi.piqali.coords, 
                  label: "Piqali",
                  tipe: lokasi.piqali.tipe,
                })
              }
              className={`p-4 border rounded-xl flex items-center gap-4 ${
                selectedNearby.label === "Piqali"
                  ? "border-red-500 bg-red-50"
                  : ""
              }`}
            >
              <div className="w-10 h-10 relative overflow-hidden rounded-full border">
                <img
                  src={getIconByTipe(lokasi.piqali.tipe)}
                  alt="icon"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="text-left">
                <p className="font-bold uppercase text-xs">Cafe Piqali</p>
                <p className="text-xs text-gray-500">2 Mins / 550 M</p>
              </div>
            </button>

            <button
              onClick={() =>
                setSelectedNearby({
                  coords: lokasi.rockBurger.coords,
                  label: "The Rock Burger",
                  tipe: lokasi.rockBurger.tipe,
                })
              }
              className={`p-4 border rounded-xl flex items-center gap-4 transition-all ${
                selectedNearby.label === "The Rock Burger"
                  ? "border-red-500 bg-red-50"
                  : "bg-white"
              }`}
            >
              <div className="w-10 h-10 relative overflow-hidden rounded-full border">
                <img
                  src={getIconByTipe(lokasi.rockBurger.tipe)}
                  alt="icon"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="text-left">
                <p className="font-bold uppercase text-xs">The Rock Burger</p>
                <p className="text-xs text-gray-500">2 Mins / 650 M</p>
              </div>
            </button>

            <button
              onClick={() =>
                setSelectedNearby({
                  coords: lokasi.banteng.coords,
                  label: "Mie Sapi Banteng",
                  tipe: lokasi.banteng.tipe,
                })
              }
              className={`p-4 border rounded-xl flex items-center gap-4 transition-all ${
                selectedNearby.label === "Mie Sapi Banteng"
                  ? "border-red-500 bg-red-50"
                  : "bg-white"
              }`}
            >
              <div className="w-10 h-10 relative overflow-hidden rounded-full border">
                <img
                  src={getIconByTipe(lokasi.banteng.tipe)}
                  alt="icon"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="text-left">
                <p className="font-bold uppercase text-xs">Mie Sapi Banteng</p>
                <p className="text-xs text-gray-500">1 Mins / 400 M</p>
              </div>
            </button>
          </div>
        </section>

        <section className="mb-16 border-2 border-gray-300 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-center mb-6">
            POPULAR HOTSPOT
          </h2>
          <div className="h-[400px] rounded-xl overflow-hidden border mb-6">
            <RoutingMap
              start={lokasi.main}
              end={selectedPopular.coords}
              label={selectedPopular.label}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
             <button
              onClick={() =>
                setSelectedPopular({
                  coords: lokasi.tugu.coords,
                  label: "Stasiun Tugu",
                  tipe: lokasi.tugu.tipe,
                })
              }
              className={`p-4 border rounded-xl flex items-center gap-4 ${
                selectedPopular.label === "Stasiun Tugu"
                  ? "border-red-500 bg-red-50"
                  : ""
              }`}
            >
              <div className="w-10 h-10 relative overflow-hidden rounded-full border">
                <img
                  src={getIconByTipe(lokasi.tugu.tipe)}
                  alt="icon"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="text-left">
                <p className="font-bold uppercase text-xs">Stasiun Tugu</p>
                <p className="text-xs text-gray-500">22 Mins / 8.4 KM</p>
              </div>
            </button>

            <button
              onClick={() =>
                setSelectedPopular({
                  coords: lokasi.terminal.coords,
                  label: "Terminal Concat",
                  tipe: lokasi.terminal.tipe,
                })
              }
              className={`p-4 border rounded-xl flex items-center gap-4 ${
                selectedPopular.label === "Terminal Concat"
                  ? "border-red-500 bg-red-50"
                  : ""
              }`}
            >
              <div className="w-10 h-10 relative overflow-hidden rounded-full border">
                <img
                  src={getIconByTipe(lokasi.terminal.tipe)}
                  alt="icon"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="text-left">
                <p className="font-bold uppercase text-xs">Terminal Concat</p>
                <p className="text-xs text-gray-500">11 Mins / 4.8 KM</p>
              </div>
            </button>

             <button
              onClick={() =>
                setSelectedPopular({
                  coords: lokasi.ugm.coords,
                  label: "UGM",
                  tipe: lokasi.ugm.tipe,
                })
              }
              className={`p-4 border rounded-xl flex items-center gap-4 ${
                selectedPopular.label === "UGM"
                  ? "border-red-500 bg-red-50"
                  : ""
              }`}
            >
              <div className="w-10 h-10 relative overflow-hidden rounded-full border">
                <img
                  src={getIconByTipe(lokasi.ugm.tipe)}
                  alt="icon"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="text-left">
                <p className="font-bold uppercase text-xs">Universitas Gadjah Mada</p>
                <p className="text-xs text-gray-500">13 Mins / 5.2 KM</p>
              </div>
            </button>

             <button
              onClick={() =>
                setSelectedPopular({
                  coords: lokasi.uii.coords,
                  label: "UII",
                  tipe: lokasi.uii.tipe,
                })
              }
              className={`p-4 border rounded-xl flex items-center gap-4 ${
                selectedPopular.label === "UII"
                  ? "border-red-500 bg-red-50"
                  : ""
              }`}
            >
              <div className="w-10 h-10 relative overflow-hidden rounded-full border">
                <img
                  src={getIconByTipe(lokasi.uii.tipe)}
                  alt="icon"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="text-left">
                <p className="font-bold uppercase text-xs">Universitas Islam Indonesia</p>
                <p className="text-xs text-gray-500">15 Mins / 6.8 KM</p>
              </div>
            </button>

             <button
              onClick={() =>
                setSelectedPopular({
                  coords: lokasi.kalpark.coords,
                  label: "Kaliurang Botanical Park",
                  tipe: lokasi.kalpark.tipe,
                })
              }
              className={`p-4 border rounded-xl flex items-center gap-4 ${
                selectedPopular.label === "Kaliurang Botanical Park"
                  ? "border-red-500 bg-red-50"
                  : ""
              }`}
            >
              <div className="w-10 h-10 relative overflow-hidden rounded-full border">
                <img
                  src={getIconByTipe(lokasi.kalpark.tipe)}
                  alt="icon"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="text-left">
                <p className="font-bold uppercase text-xs">Kaliurang Botanical Park</p>
                <p className="text-xs text-gray-500">33 Mins / 17.5 KM</p>
              </div>
            </button>

             <button
              onClick={() =>
                setSelectedPopular({
                  coords: lokasi.suraloka.coords,
                  label: "Suraloka",
                  tipe: lokasi.suraloka.tipe,
                })
              }
              className={`p-4 border rounded-xl flex items-center gap-4 ${
                selectedPopular.label === "Suraloka"
                  ? "border-red-500 bg-red-50"
                  : ""
              }`}
            >
              <div className="w-10 h-10 relative overflow-hidden rounded-full border">
                <img
                  src={getIconByTipe(lokasi.suraloka.tipe)}
                  alt="icon"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="text-left">
                <p className="font-bold uppercase text-xs">Suraloka Adventure Park</p>
                <p className="text-xs text-gray-500">31 Mins / 17 KM</p>
              </div>
            </button>

          </div>
        </section>
      </div>
    </div>
  );
}
