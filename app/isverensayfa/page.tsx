"use client";
import React, { useState, useEffect, useRef } from "react";
import { Header } from "../components/header";
import { Footer } from "../components/footer";

// Basit bir ilan tipi
type Ilan = {
  _id?: string;
  baslik: string;
  firma: string;
  mahalle: string;
  yabanciDiller: string;
  bilgisayarProgramlari: string;
  maas: string;
};

// Örnek autocomplete verileri
const beylikduzuMahalleleri = [
  "Adnan Kahveci", "Barış", "Büyükşehir", "Cumhuriyet", "Dereağzı", "Gürpınar", "Kavaklı", "Marmara", "Sahil", "Yakuplu"
];
const yabanciDiller = ["İngilizce", "Almanca", "Fransızca", "Rusça", "Arapça"];
const bilgisayarProgramlari = ["Excel", "Word", "Photoshop", "AutoCAD", "Logo", "Nebim"];
const populerPozisyonlar = [
  "Sekreter", "Çağrı Merkezi Temsilcisi", "Şoför", "Teknik Servis", "Muhasebe Uzmanı", "Satış Danışmanı"
];

export default function IsverenPanel() {
  const [ilanlar, setIlanlar] = useState<Ilan[]>([]);
  const [yeniIlan, setYeniIlan] = useState<Ilan>({
    baslik: "",
    firma: "",
    mahalle: "",
    yabanciDiller: "",
    bilgisayarProgramlari: "",
    maas: "",
  });
  const [showPozisyonlar, setShowPozisyonlar] = useState(false);
  const [showMahalleler, setShowMahalleler] = useState(false);
  const [showYabanciDiller, setShowYabanciDiller] = useState(false);
  const [showBilgisayarProgramlari, setShowBilgisayarProgramlari] = useState(false);

  const pozisyonInputRef = useRef<HTMLInputElement>(null);
  const mahalleInputRef = useRef<HTMLInputElement>(null);
  const yabanciDilInputRef = useRef<HTMLInputElement>(null);
  const bilgisayarProgramiInputRef = useRef<HTMLInputElement>(null);

  // Sadece kendi ilanlarını backend'den çek
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/giris";
      return;
    }
    fetch("/api/employer/jobs", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => {
        if (res.status === 401 || res.status === 403) {
          window.location.href = "/giris";
          return [];
        }
        return res.json();
      })
      .then((data) => setIlanlar(data));
  }, []);

  // İlan ekle, backend'e gönder, sonra ilanları tekrar çek
  const ilanEkle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      yeniIlan.baslik &&
      yeniIlan.firma &&
      yeniIlan.maas &&
      yeniIlan.mahalle &&
      yeniIlan.yabanciDiller &&
      yeniIlan.bilgisayarProgramlari
    ) {
      const token = localStorage.getItem("token");
      if (!token) {
        window.location.href = "/isverensayfa";
        return;
      } 
      const res = await fetch("/api/employer/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(yeniIlan),
      });
      if (res.ok) {
        setYeniIlan({
          baslik: "",
          firma: "",
          mahalle: "",
          yabanciDiller: "",
          bilgisayarProgramlari: "",
          maas: "",
        });
        fetch("/api/employer/jobs", {
          headers: { Authorization: `Bearer ${token}` }
        })
          .then((res) => res.json())
          .then((data) => setIlanlar(data));
      }
    }
  };

  // İlan sil
  const ilanSil = async (id?: string) => {
    if (!id) return;
    const token = localStorage.getItem("token");
    if (!token) return;
    const res = await fetch(`/api/employer/jobs/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    });
    if (res.ok) {
      setIlanlar(prev => prev.filter(ilan => ilan._id !== id));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setYeniIlan({ ...yeniIlan, [e.target.name]: e.target.value });
  };

  // Autocomplete seçme fonksiyonları
  const handlePozisyonSec = (baslik: string) => {
    setYeniIlan(prev => ({ ...prev, baslik }));
    setShowPozisyonlar(false);
    pozisyonInputRef.current?.focus();
  };
  const handleMahalleSec = (mahalle: string) => {
    setYeniIlan(prev => ({ ...prev, mahalle }));
    setShowMahalleler(false);
    mahalleInputRef.current?.focus();
  };
  const handleYabanciDilSec = (yabanciDiller: string) => {
    setYeniIlan(prev => ({ ...prev, yabanciDiller }));
    setShowYabanciDiller(false);
    yabanciDilInputRef.current?.focus();
  };
  const handleBilgisayarProgramiSec = (bilgisayarProgramlari: string) => {
    setYeniIlan(prev => ({ ...prev, bilgisayarProgramlari }));
    setShowBilgisayarProgramlari(false);
    bilgisayarProgramiInputRef.current?.focus();
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
        <Header />

      {/* Main */}
      <main className="flex flex-1 gap-12 px-12 py-8 justify-center items-start bg-white">
        {/* Sol: İlan ekleme formu */}
        <section className="w-[400px] flex flex-col items-center">
          <div className="w-full bg-white rounded-xl p-8 shadow-lg border border-blue-100">
            <h2 className="text-xl font-bold mb-4 text-center text-blue-700">Yeni İlan Ekle</h2>
            <form onSubmit={ilanEkle} className="flex flex-col gap-4">
              {/* Pozisyon autocomplete */}
              <div className="relative">
                <input
                  type="text"
                  name="baslik"
                  placeholder="Başlık *"
                  value={yeniIlan.baslik}
                  onChange={handleChange}
                  className="bg-blue-50 rounded px-4 py-2 font-semibold border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  required
                  autoComplete="off"
                  ref={pozisyonInputRef}
                  onFocus={() => setShowPozisyonlar(true)}
                  onBlur={() => setTimeout(() => setShowPozisyonlar(false), 100)}
                />
                {showPozisyonlar && (
                  <ul className="absolute left-0 top-full mt-1 w-full bg-white border border-gray-200 rounded shadow z-10 max-h-60 overflow-auto">
                    {populerPozisyonlar
                      .filter(pozisyon =>
                        pozisyon.toLowerCase().includes((yeniIlan.baslik || "").toLowerCase())
                      )
                      .map(pozisyon => (
                        <li
                          key={pozisyon}
                          className="px-4 py-2 cursor-pointer hover:bg-blue-50"
                          onMouseDown={() => handlePozisyonSec(pozisyon)}
                        >
                          {pozisyon}
                        </li>
                      ))}
                  </ul>
                )}
              </div>
              {/* Firma adı */}
              <input
                type="text"
                name="firma"
                placeholder="Firma Adı *"
                value={yeniIlan.firma}
                onChange={handleChange}
                className="bg-blue-50 rounded px-4 py-2 font-semibold border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
                required
              />
              {/* Mahalle autocomplete */}
              <div className="relative">
                <input
                  type="text"
                  name="mahalle"
                  placeholder="Mahalle *"
                  value={yeniIlan.mahalle}
                  onChange={handleChange}
                  className="bg-blue-50 rounded px-4 py-2 font-semibold border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  required
                  autoComplete="off"
                  ref={mahalleInputRef}
                  onFocus={() => setShowMahalleler(true)}
                  onBlur={() => setTimeout(() => setShowMahalleler(false), 100)}
                />
                {showMahalleler && (
                  <ul className="absolute left-0 top-full mt-1 w-full bg-white border border-gray-200 rounded shadow z-10 max-h-60 overflow-auto">
                    {beylikduzuMahalleleri
                      .filter(mahalle =>
                        mahalle.toLowerCase().includes((yeniIlan.mahalle || "").toLowerCase())
                      )
                      .map(mahalle => (
                        <li
                          key={mahalle}
                          className="px-4 py-2 cursor-pointer hover:bg-blue-50"
                          onMouseDown={() => handleMahalleSec(mahalle)}
                        >
                          {mahalle}
                        </li>
                      ))}
                  </ul>
                )}
              </div>
              {/* Yabancı Dil autocomplete */}
              <div className="relative">
                <input
                  type="text"
                  name="yabanciDiller"
                  placeholder="Yabancı Dil *"
                  value={yeniIlan.yabanciDiller}
                  onChange={handleChange}
                  className="bg-blue-50 rounded px-4 py-2 font-semibold border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  required
                  autoComplete="off"
                  ref={yabanciDilInputRef}
                  onFocus={() => setShowYabanciDiller(true)}
                  onBlur={() => setTimeout(() => setShowYabanciDiller(false), 100)}
                />
                {showYabanciDiller && (
                  <ul className="absolute left-0 top-full mt-1 w-full bg-white border border-gray-200 rounded shadow z-10 max-h-60 overflow-auto">
                    {yabanciDiller
                      .filter(dil =>
                        dil.toLowerCase().includes((yeniIlan.yabanciDiller || "").toLowerCase())
                      )
                      .map(dil => (
                        <li
                          key={dil}
                          className="px-4 py-2 cursor-pointer hover:bg-blue-50"
                          onMouseDown={() => handleYabanciDilSec(dil)}
                        >
                          {dil}
                        </li>
                      ))}
                  </ul>
                )}
              </div>
              {/* Bilgisayar Programı autocomplete */}
              <div className="relative">
                <input
                  type="text"
                  name="bilgisayarProgramlari"
                  placeholder="Bilgisayar Programı *"
                  value={yeniIlan.bilgisayarProgramlari}
                  onChange={handleChange}
                  className="bg-blue-50 rounded px-4 py-2 font-semibold border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  required
                  autoComplete="off"
                  ref={bilgisayarProgramiInputRef}
                  onFocus={() => setShowBilgisayarProgramlari(true)}
                  onBlur={() => setTimeout(() => setShowBilgisayarProgramlari(false), 100)}
                />
                {showBilgisayarProgramlari && (
                  <ul className="absolute left-0 top-full mt-1 w-full bg-white border border-gray-200 rounded shadow z-10 max-h-60 overflow-auto">
                    {bilgisayarProgramlari
                      .filter(program =>
                        program.toLowerCase().includes((yeniIlan.bilgisayarProgramlari || "").toLowerCase())
                      )
                      .map(program => (
                        <li
                          key={program}
                          className="px-4 py-2 cursor-pointer hover:bg-blue-50"
                          onMouseDown={() => handleBilgisayarProgramiSec(program)}
                        >
                          {program}
                        </li>
                      ))}
                  </ul>
                )}
              </div>
              {/* Maaş */}
              <input
                type="text"
                name="maas"
                placeholder="Maaş *"
                value={yeniIlan.maas}
                onChange={handleChange}
                className="bg-blue-50 rounded px-4 py-2 font-semibold border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
                required
              />
              <button
                type="submit"
                className="bg-blue-600 text-white rounded px-4 py-2 font-semibold mt-2 hover:bg-blue-700 transition"
              >
                İlanı Ekle
              </button>
            </form>
          </div>
        </section>
        {/* Sağ: Sadece kendi ilanları */}
        <section className="flex-1">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-blue-700">İlanlarım</h2>
            <p className="text-gray-500">Yalnızca sizin eklediğiniz ilanlar burada listelenir.</p>
          </div>
          <div className="flex flex-col gap-4">
            {ilanlar.length === 0 && (
              <div className="text-gray-400 text-center py-8">Henüz ilanınız yok.</div>
            )}
            {ilanlar.map((ilan) => (
              <div key={ilan._id} className="bg-white border rounded-lg shadow flex items-center justify-between px-6 py-4">
                <div>
                  <div className="font-bold text-lg text-blue-700">{ilan.baslik}</div>
                  <div className="text-gray-500">{ilan.firma} / {ilan.mahalle}</div>
                  <div className="text-gray-500">Yabancı Dil: {ilan.yabanciDiller} | Program: {ilan.bilgisayarProgramlari}</div>
                  <div className="font-semibold text-blue-600 mt-1">Maaş: {ilan.maas || "-"}</div>
                </div>
                <button
                  className="bg-red-600 text-white px-4 py-2 rounded font-bold"
                  onClick={() => ilanSil(ilan._id)}
                >
                  Sil
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}