import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-6 px-4 w-full">
      <div className="flex flex-col items-center justify-center w-full">
        <nav className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 text-blue-700 font-medium mb-4">
          <Link href="/" className="hover:text-blue-900 transition py-2 px-4 text-center rounded-md">
            Anasayfa
          </Link>
          <Link href="/isilanlari" className="hover:text-blue-900 transition py-2 px-4 text-center rounded-md">
            İş İlanları
          </Link>
          <Link href="/giris" className="hover:text-blue-900 transition py-2 px-4 text-center rounded-md">
            CV Oluştur
          </Link>
          <Link href="/iletisim" className="hover:text-blue-900 transition py-2 px-4 text-center rounded-md">
            İletişim
          </Link>
        </nav>
        <div className="text-xs text-blue-500 text-center leading-tight">
          &copy; {new Date().getFullYear()} Beylikdüzü Belediyesi<br />
          Tüm hakları saklıdır.
        </div>
      </div>
    </footer>
  );
}
export default Footer;