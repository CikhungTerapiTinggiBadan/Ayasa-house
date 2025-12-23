import './globals.css';
import { Poppins } from 'next/font/google'; 
import Navbar from './components/navbar'; 
import Footer from './components/footer'; 

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'], 
  variable: '--font-poppins', 
});

const MAIN_BG = "bg-gray-300"; 

export const metadata = {
  title: "Ayasa House",
  description: "Website Ayasa House",
};


export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${poppins.variable}`}>
      <body className={`min-h-screen ${MAIN_BG} font-[var(--font-poppins)]`}>
        <Navbar />
        
        <div className="pt-16">
          {children}
        </div>
        
        <Footer />
      </body>
    </html>
  );
}