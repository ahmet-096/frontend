'use client'
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export function Header({ panelTipi: propPanelTipi }: { panelTipi?: "isveren" | "aday" }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);
    const [panelTipi, setPanelTipi] = useState<"isveren" | "aday" | undefined>(propPanelTipi);

    useEffect(() => {
        if (!propPanelTipi) {
            const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
            const role = typeof window !== "undefined" ? localStorage.getItem("role") : null;
            if (token && role === "isveren") setPanelTipi("isveren");
            else if (token && role === "aday") setPanelTipi("aday");
            else setPanelTipi(undefined);
        }
    }, [propPanelTipi]);

    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [mobileMenuOpen]);

    // İşveren paneli için masaüstü menü
    const isverenDesktopMenu = (
        <>
            <Link href="/" className="hover:text-blue-900 transition">Anasayfa</Link>
            <Link href="/is-ilanlari" className="hover:text-blue-900 transition">İş İlanları</Link>
            <Link href="/is-veren-panel" className="hover:text-blue-900 transition">Panel</Link>
            <Link href="/is-veren-profil" className="hover:text-blue-900 transition">Profil</Link>
            <button
                onClick={() => {
                    localStorage.removeItem("token");
                    localStorage.removeItem("role");
                    window.location.href = "/";
                }}
                className="bg-red-600 text-white rounded-full px-4 py-1 border border-red-500 hover:bg-red-700 transition"
            >
                Çıkış Yap
            </button>
        </>
    );

    // İşveren paneli için mobil menü
    const isverenMobileMenu = (
        <>
            <Link href="/" className="hover:text-blue-900 transition w-full py-2" onClick={() => setMobileMenuOpen(false)}>Anasayfa</Link>
            <Link href="/is-ilanlari" className="hover:text-blue-900 transition w-full py-2" onClick={() => setMobileMenuOpen(false)}>İş İlanları</Link>
            <Link href="/is-veren-panel" className="hover:text-blue-900 transition w-full py-2" onClick={() => setMobileMenuOpen(false)}>Panel</Link>
            <Link href="/is-veren-profil" className="hover:text-blue-900 transition w-full py-2" onClick={() => setMobileMenuOpen(false)}>Profil</Link>
            <button
                onClick={() => {
                    localStorage.removeItem("token");
                    localStorage.removeItem("role");
                    window.location.href = "/";
                }}
                className="bg-red-600 text-white rounded px-4 py-2 border border-red-500 hover:bg-red-700 transition w-full"
            >
                Çıkış Yap
            </button>
        </>
    );

    // Aday paneli için masaüstü menü
    const adayDesktopMenu = (
        <>
            <Link href="/" className="hover:text-blue-900 transition">Anasayfa</Link>
            <Link href="/is-ilanlari" className="hover:text-blue-900 transition">İş İlanları</Link>
            <Link href="/cv-olustur" className="rounded-full px-4 py-1 border border-blue-200 hover:bg-blue-50 hover:text-blue-900 transition">CV Oluştur</Link>
            <Link href="/profil" className="hover:text-blue-900 transition">Profil</Link>
            <button
                onClick={() => {
                    localStorage.removeItem("token");
                    localStorage.removeItem("role");
                    window.location.href = "/";
                }}
                className="bg-red-600 text-white rounded-full px-4 py-1 border border-red-500 hover:bg-red-700 transition"
            >
                Çıkış Yap
            </button>
        </>
    );

    // Aday paneli için mobil menü
    const adayMobileMenu = (
        <>
            <Link href="/" className="hover:text-blue-900 transition w-full py-2" onClick={() => setMobileMenuOpen(false)}>Anasayfa</Link>
            <Link href="/is-ilanlari" className="hover:text-blue-900 transition w-full py-2" onClick={() => setMobileMenuOpen(false)}>İş İlanları</Link>
            <Link href="/cv-olustur" className="rounded px-4 py-2 border border-blue-200 hover:bg-blue-50 hover:text-blue-900 transition w-full" onClick={() => setMobileMenuOpen(false)}>CV Oluştur</Link>
            <Link href="/profil" className="hover:text-blue-900 transition w-full py-2" onClick={() => setMobileMenuOpen(false)}>Profil</Link>
            <button
                onClick={() => {
                    localStorage.removeItem("token");
                    localStorage.removeItem("role");
                    window.location.href = "/";
                }}
                className="bg-red-600 text-white rounded px-4 py-2 border border-red-500 hover:bg-red-700 transition w-full"
            >
                Çıkış Yap
            </button>
        </>
    );

    // Varsayılan masaüstü menü (giriş yapmamışlar )
    const desktopMenuItems = (
        <>
            <Link href="/" className="hover:text-blue-900 transition">Anasayfa</Link>
            <Link href="/is-ilanlari" className="hover:text-blue-900 transition">İş İlanları</Link>
            <Link href="/aday-giris" className="rounded-full px-4 py-1 border border-blue-200 hover:bg-blue-50 hover:text-blue-900 transition">CV Oluştur</Link>
            <Link href="/aday-giris" className="hover:text-blue-900 transition">Aday Girişi</Link>
            <Link href="/isveren-giris" className="hover:text-blue-900 transition">İşveren Girişi</Link>
        </>
    );

    // Varsayılan mobil menü
    const mobileMenuItems = (
        <>
            <Link href="/" className="hover:text-blue-900 transition w-full py-2" onClick={() => setMobileMenuOpen(false)}>Anasayfa</Link>
            <Link href="/is-ilanlari" className="hover:text-blue-900 transition w-full py-2" onClick={() => setMobileMenuOpen(false)}>İş İlanları</Link>
            <Link href="/aday-giris" className="rounded px-4 py-2 border border-blue-200 hover:bg-blue-50 hover:text-blue-900 transition w-full" onClick={() => setMobileMenuOpen(false)}>CV Oluştur</Link>
            <Link href="/aday-giris" className="hover:text-blue-900 transition w-full py-2" onClick={() => setMobileMenuOpen(false)}>Aday Girişi</Link>
            <Link href="/isveren-giris" className="hover:text-blue-900 transition w-full py-2" onClick={() => setMobileMenuOpen(false)}>İşveren Girişi</Link>
        </>
    );

    return (
        <header className="bg-background shadow-sm py-4 px-4 md:px-8 flex items-center justify-between relative">
            <div className="">
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
                    setMobileDropdown(null);
                }}
                aria-label="Menüyü Aç/Kapat"
            >
                <svg width="32" height="32" fill="currentColor" viewBox="0 0 32 32">
                    <rect y="7" width="32" height="4" rx="2"/>
                    <rect y="15" width="32" height="4" rx="2"/>
                    <rect y="23" width="32" height="4" rx="2"/>
                </svg>
            </button>
            <nav className="hidden md:flex items-center gap-4 text-blue-700 relative font-medium">
                {panelTipi === "isveren"
                    ? isverenDesktopMenu
                    : panelTipi === "aday"
                        ? adayDesktopMenu
                        : desktopMenuItems}
            </nav>
            {mobileMenuOpen && (
                <nav className="absolute top-full left-0 w-full bg-white shadow-lg flex flex-col items-start gap-2 px-4 py-2 z-20 md:hidden">
                    {panelTipi === "isveren"
                        ? isverenMobileMenu
                        : panelTipi === "aday"
                            ? adayMobileMenu
                            : mobileMenuItems}
                </nav>
            )}
        </header>
    );
}