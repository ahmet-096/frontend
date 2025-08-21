import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-6 px-4">
      <div className="max-w-7xl mx-auto flex flex-col items-center">

        <nav className="flex flex-col md:flex-row items-center gap-3 md:gap-8 text-blue-700 font-medium mb-4">
          <Link href="/" className="hover:text-blue-900 transition">Anasayfa</Link>
          <Link href="/is-ilanlari" className="hover:text-blue-900 transition">İş İlanları</Link>
          <Link href="/aday-giris" className="hover:text-blue-900 transition">CV Oluştur</Link>
          <Link href="/iletisim" className="hover:text-blue-900 transition">İletişim</Link>
        </nav>
        <div className="text-xs text-blue-500 text-center leading-tight">
          &copy; {new Date().getFullYear()} Beylikdüzü Belediyesi<br />
          Tüm hakları saklıdır.
        </div>
      </div>
    </footer>
  );
}