// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Menerapkan Poppins sebagai font default 'sans'
        sans: ['var(--font-poppins-sans)', 'sans-serif'], 
        // Menerapkan Geist Mono sebagai font 'mono' (jika masih digunakan)
        mono: ['var(--font-geist-mono)', 'monospace'], 
      },
      // Menambahkan warna kustom dari sketsa
      colors: {
        // Nama warna kustom (misalnya, 'ayasa-green')
        'ayasa-green': '#334D3D',
      }
    },
  },
  plugins: [],
}