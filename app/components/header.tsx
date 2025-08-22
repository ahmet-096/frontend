'use client'
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [panelTipi, setPanelTipi] = useState<"isveren" | "aday" | undefined>(undefined);
    const [showKaydolAltMenu, setShowKaydolAltMenu] = useState(false);

    // localStorage değiştiğinde menüyü güncelle
    useEffect(() => {
        const checkRole = () => {
            const token = typeof window !== "undefined" ? localStorage.getItem("token") || localStorage.getItem("access_token") : null;
            const role = typeof window !== "undefined" ? localStorage.getItem("role") : null;
            if (token && role === "isveren") setPanelTipi("isveren");
            else if (token && role === "aday") setPanelTipi("aday");
            else setPanelTipi(undefined);
        };
        checkRole();
        window.addEventListener("storage", checkRole);
        return () => window.removeEventListener("storage", checkRole);
    }, []);

    useEffect(() => {
        document.body.style.overflow = mobileMenuOpen ? "hidden" : "unset";
    }, [mobileMenuOpen]);

    // Menü içerikleri
    const isverenDesktopMenu = (
        <>
            <Link href="/" className="hover:text-blue-900 transition">Anasayfa</Link>
            <Link href="/isilanlari" className="hover:text-blue-900 transition">İş İlanları</Link>
            <Link href="/isverensayfa" className="hover:text-blue-900 transition">Panel</Link>
            <Link href="/is-veren-profil" className="hover:text-blue-900 transition">Profil</Link>
            <Link href="/iletisim" className="hover:text-blue-900 transition">İletişim</Link>
            <button
                onClick={() => {
                    localStorage.removeItem("token");
                    localStorage.removeItem("access_token");
                    localStorage.removeItem("role");
                    setPanelTipi(undefined);
                    window.location.href = "/";
                }}
                className="bg-red-600 text-white rounded-full px-4 py-1 border border-red-500 hover:bg-red-700 transition"
            >
                Çıkış Yap
            </button>
        </>
    );

    const adayDesktopMenu = (
        <>
            <Link href="/" className="hover:text-blue-900 transition">Anasayfa</Link>
            <Link href="/isilanlari" className="hover:text-blue-900 transition">İş İlanları</Link>
            <Link href="/cvolustur" className="rounded-full px-4 py-1 border border-blue-200 hover:bg-blue-50 hover:text-blue-900 transition">CV Oluştur</Link>
            <Link href="/iletisim" className="hover:text-blue-900 transition">İletişim</Link>
            <Link href="/adayprofil" className="hover:text-blue-900 transition">Profil</Link>
            <button
                onClick={() => {
                    localStorage.removeItem("token");
                    localStorage.removeItem("access_token");
                    localStorage.removeItem("role");
                    setPanelTipi(undefined);
                    window.location.href = "/";
                }}
                className="bg-red-600 text-white rounded-full px-4 py-1 border border-red-500 hover:bg-red-700 transition"
            >
                Çıkış Yap
            </button>
        </>
    );

    const desktopMenuItems = (
        <div className="relative flex items-center gap-4">
            <Link href="/" className="hover:text-blue-900 transition">Anasayfa</Link>
            <Link href="/isilanlari" className="hover:text-blue-900 transition">İş İlanları</Link>
            <Link href="/giris" className="rounded-full px-4 py-1 border border-blue-200 hover:bg-blue-50 hover:text-blue-900 transition">CV Oluştur</Link>
            <Link href="/iletisim" className="hover:text-blue-900 transition">İletişim</Link>
            <div className="relative">
                <button
                    className="rounded-full px-4 py-1 border border-blue-200 bg-blue-600 text-white hover:bg-blue-700 transition"
                    onClick={() => setShowKaydolAltMenu((v) => !v)}
                >
                    Kaydol
                </button>
                {showKaydolAltMenu && (
                    <div className="absolute left-0 mt-2 bg-white border rounded shadow-lg flex flex-col min-w-[120px] z-30">
                        <Link
                            href="/adaykayit"
                            className="px-4 py-2 hover:bg-blue-50 hover:text-blue-900 transition"
                            onClick={() => setShowKaydolAltMenu(false)}
                        >
                            Aday
                        </Link>
                        <Link
                            href="/isverenkayit"
                            className="px-4 py-2 hover:bg-green-50 hover:text-green-900 transition"
                            onClick={() => setShowKaydolAltMenu(false)}
                        >
                            İşveren
                        </Link>
                    </div>
                )}
            </div>
            <button
                className="rounded-full px-4 py-1 border border-green-200 bg-green-600 text-white hover:bg-green-700 transition"
                onClick={() => window.location.href = "/giris"}
            >
                Giriş Yap
            </button>
        </div>
    );

    // Mobil menüler
    const isverenMobileMenu = (
        <>
            <Link href="/" className="hover:text-blue-900 transition w-full py-2" onClick={() => setMobileMenuOpen(false)}>Anasayfa</Link>
            <Link href="/isilanlari" className="hover:text-blue-900 transition w-full py-2" onClick={() => setMobileMenuOpen(false)}>İş İlanları</Link>
            <Link href="/isverensayfa" className="hover:text-blue-900 transition w-full py-2" onClick={() => setMobileMenuOpen(false)}>Panel</Link>
            <Link href="/isverenprofil" className="hover:text-blue-900 transition w-full py-2" onClick={() => setMobileMenuOpen(false)}>Profil</Link>
           <Link href="/iletisim" className="hover:text-blue-900 transition w-full py-2" onClick={() => setMobileMenuOpen(false)}>İletişim</Link>

            <button
                onClick={() => {
                    localStorage.removeItem("token");
                    localStorage.removeItem("access_token");
                    localStorage.removeItem("role");
                    setPanelTipi(undefined);
                    window.location.href = "/";
                }}
                className="bg-red-600 text-white rounded px-4 py-2 border border-red-500 hover:bg-red-700 transition w-full"
            >
                Çıkış Yap
            </button>
        </>
    );

    const adayMobileMenu = (
        <>
            <Link href="/" className="hover:text-blue-900 transition w-full py-2" onClick={() => setMobileMenuOpen(false)}>Anasayfa</Link>
            <Link href="/isilanlari" className="hover:text-blue-900 transition w-full py-2" onClick={() => setMobileMenuOpen(false)}>İş İlanları</Link>
            <Link href="/cvolustur" className="rounded px-4 py-2 border border-blue-200 hover:bg-blue-50 hover:text-blue-900 transition w-full" onClick={() => setMobileMenuOpen(false)}>CV Oluştur</Link>
            <Link href="/iletisim" className="hover:text-blue-900 transition w-full py-2" onClick={() => setMobileMenuOpen(false)}>İletişim</Link>
            <Link href="/adayprofil" className="hover:text-blue-900 transition w-full py-2" onClick={() => setMobileMenuOpen(false)}>Profil</Link>
            <button
                onClick={() => {
                    localStorage.removeItem("token");
                    localStorage.removeItem("access_token");
                    localStorage.removeItem("role");
                    setPanelTipi(undefined);
                    window.location.href = "/";
                }}
                className="bg-red-600 text-white rounded px-4 py-2 border border-red-500 hover:bg-red-700 transition w-full"
            >
                Çıkış Yap
            </button>
        </>
    );

    const mobileMenuItems = (
        <div className="flex flex-col w-full">
            <Link href="/" className="hover:text-blue-900 transition w-full py-2" onClick={() => setMobileMenuOpen(false)}>Anasayfa</Link>
            <Link href="/isilanlari" className="hover:text-blue-900 transition w-full py-2" onClick={() => setMobileMenuOpen(false)}>İş İlanları</Link>
            <Link href="/giris" className="rounded px-4 py-2 border border-blue-200 hover:bg-blue-50 hover:text-blue-900 transition w-full" onClick={() => setMobileMenuOpen(false)}>CV Oluştur</Link>
            <Link href="/iletisim" className="hover:text-blue-900 transition w-full py-2" onClick={() => setMobileMenuOpen(false)}>İletişim</Link>
            <div className="relative w-full">
                <button
                    className="rounded px-4 py-2 border border-blue-200 bg-blue-600 text-white hover:bg-blue-700 transition w-full"
                    onClick={() => setShowKaydolAltMenu((v) => !v)}
                >
                    Kaydol
                </button>
                {showKaydolAltMenu && (
                    <div className="absolute left-0 mt-2 bg-white border rounded shadow-lg flex flex-col min-w-[120px] z-30 w-full">
                        <Link
                            href="/adaykayit"
                            className="px-4 py-2 hover:bg-blue-50 hover:text-blue-900 transition"
                            onClick={() => { setShowKaydolAltMenu(false); setMobileMenuOpen(false); }}
                        >
                            Aday
                        </Link>
                        <Link
                            href="/isverenkayit"
                            className="px-4 py-2 hover:bg-green-50 hover:text-green-900 transition"
                            onClick={() => { setShowKaydolAltMenu(false); setMobileMenuOpen(false); }}
                        >
                            İşveren
                        </Link>
                    </div>
                )}
            </div>
            <button
                className="rounded px-4 py-2 border border-green-200 bg-green-600 text-white hover:bg-green-700 transition w-full"
                onClick={() => { window.location.href = "/giris"; setMobileMenuOpen(false); }}
            >
                Giriş Yap
            </button>
        </div>
    );

    // Alt menü açıkken tıklama ile kapatma
    useEffect(() => {
        if (!showKaydolAltMenu) return;
        const handleClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (!target.closest('.kaydol-alt-menu')) {
                setShowKaydolAltMenu(false);
            }
        };
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, [showKaydolAltMenu]);

    return (
        <header className="bg-background shadow-sm py-4 px-4 md:px-8 flex items-center justify-between relative">
            <div>
                <Link href="/">
                    <Image
                        src="/images/logo.png"
                        alt="Belediye Logo"
                        width={200}
                        height={200}
                    />
                </Link>
            </div>
            <button
                className="md:hidden block text-blue-700"
                onClick={() => {
                    setMobileMenuOpen(!mobileMenuOpen);
                }}
                aria-label="Menüyü Aç/Kapat"
            >
                <svg width="32" height="32" fill="currentColor" viewBox="0 0 32 32">
                    <rect y="7" width="32" height="4" rx="2" />
                    <rect y="15" width="32" height="4" rx="2" />
                    <rect y="23" width="32" height="4" rx="2" />
                </svg>
            </button>
            <nav className="hidden md:flex items-center gap-4 text-blue-700 relative font-medium">
                {panelTipi === "isveren"
                    ? isverenDesktopMenu
                    : panelTipi === "aday"
                        ? adayDesktopMenu
                        : <div className="kaydol-alt-menu">{desktopMenuItems}</div>}
            </nav>
            {mobileMenuOpen && (
                <nav className="absolute top-full left-0 w-full bg-white shadow-lg flex flex-col items-start gap-2 px-4 py-2 z-20 md:hidden">
                    {panelTipi === "isveren"
                        ? isverenMobileMenu
                        : panelTipi === "aday"
                            ? adayMobileMenu
                            : <div className="kaydol-alt-menu w-full">{mobileMenuItems}</div>}
                </nav>
            )}
        </header>
    );
}
export default Header;