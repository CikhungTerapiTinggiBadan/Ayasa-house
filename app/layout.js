import './globals.css';
import { Poppins } from 'next/font/google'; 
import Navbar from './components/navbar'; // Import Navbar
import Footer from './components/footer'; // Import Footer

// 1. KONFIGURASI FONT POPPINS
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'], 
  variable: '--font-poppins', 
});

const MAIN_BG = "bg-gray-300"; 

export default function RootLayout({ children }) {
  return (
    // 2. TERAPKAN FONT POPPINS
    <html lang="en" className={`${poppins.variable}`}>
      <body className={`min-h-screen ${MAIN_BG} font-[var(--font-poppins)]`}>
        {/* 3. NAVBAR di atas semua konten */}
        <Navbar />
        
        {/* 4. CONTENT (children) berada di tengah */}
        <div className="pt-16">
          {children}
        </div>
        
        {/* 5. FOOTER di bawah semua konten */}
        <Footer />
      </body>
    </html>
  );
}