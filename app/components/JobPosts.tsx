"use client";
import React, { useState, useEffect, useRef } from "react";

import beylikduzuMahalleleri, { bilgisayarProgramlari, populerPozisyonlar, yabanciDiller } from "./Words";
import {getJobPosts } from "../api/api";



// İlan tipi tanımı
interface Ilan {
  id?: string;
  title: string;
  companyName?: string;
  city?: string;
  location?: string;
  language?: string;
  software?: string;
  createdAt?: string;
  salary?: string;
}


export default function IsIlanlari() {
  const [ilanlar, setIlanlar] = useState<Ilan[]>([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
        window.location.href = "/giris";
        setLoading(false);
        return;
    }
    getJobPosts()
        .then(res => res.json())
        .then(data => {
            // Gelen veri
            const mapped = Array.isArray(data)
                ? data.map((item: Ilan) => ({
                    id: item.id,
                    title: item.title,
                    companyName: item.companyName,
                    city: item.city,
                    location: item.location,
                    language: item.language,
                    software: item.software,
                    createdAt: item.createdAt,
                    salary: item.salary,
                }))
                : [];
            setIlanlar(mapped);
            setLoading(false);
        })
        .catch(() => {
            setLoading(false);
        });
}, []);


  const [filtre, setFiltre] = useState({
    pozisyon: "",
    firma: "",
    mahalle: "",
    yabanci_dil: "",
    bilgisayar_programı: ""
  });

  // Açılır liste kontrolleri
  const [showPozisyonlar, setShowPozisyonlar] = useState(false);
  const [showMahalleler, setShowMahalleler] = useState(false);
  const [showYabanciDiller, setShowYabanciDiller] = useState(false);
  const [showBilgisayarProgramlari, setShowBilgisayarProgramlari] = useState(false);

  const pozisyonInputRef = useRef<HTMLInputElement>(null);
  const mahalleInputRef = useRef<HTMLInputElement>(null);
  const yabanciDilInputRef = useRef<HTMLInputElement>(null);
  const bilgisayarProgramiInputRef = useRef<HTMLInputElement>(null);

  const [perPage, setPerPage] = useState(5);
  const [page, setPage] = useState(1);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFiltre({ ...filtre, [e.target.name]: e.target.value });
  };

  // Pozisyon açılır liste
  const handlePozisyonFocus = () => setShowPozisyonlar(true);
  const handlePozisyonBlur = () => setTimeout(() => setShowPozisyonlar(false), 100);
  const handlePozisyonSec = (pozisyon: string) => {
    setFiltre({ ...filtre, pozisyon });
    setShowPozisyonlar(false);
    pozisyonInputRef.current?.focus();
  };

  // Mahalle açılır liste
  const handleMahalleFocus = () => setShowMahalleler(true);
  const handleMahalleBlur = () => setTimeout(() => setShowMahalleler(false), 100);
  const handleMahalleSec = (mahalle: string) => {
    setFiltre({ ...filtre, mahalle });
    setShowMahalleler(false);
    mahalleInputRef.current?.focus();
  };

  // Yabancı dil açılır liste
  const handleYabanciDilFocus = () => setShowYabanciDiller(true);
  const handleYabanciDilBlur = () => setTimeout(() => setShowYabanciDiller(false), 100);
  const handleYabanciDilSec = (yabanci_dil: string) => {
    setFiltre({ ...filtre, yabanci_dil });
    setShowYabanciDiller(false);
    yabanciDilInputRef.current?.focus();
  };

  // Bilgisayar programı açılır liste
  const handleBilgisayarProgramiFocus = () => setShowBilgisayarProgramlari(true);
  const handleBilgisayarProgramiBlur = () => setTimeout(() => setShowBilgisayarProgramlari(false), 100);
  const handleBilgisayarProgramiSec = (bilgisayar_programı: string) => {
    setFiltre({ ...filtre, bilgisayar_programı });
    setShowBilgisayarProgramlari(false);
    bilgisayarProgramiInputRef.current?.focus();
  };

  // Filtreleme
  const filtreliIlanlar = ilanlar.filter((ilan) => {
    return (
     (filtre.pozisyon === "" ||
        ilan.title?.toLowerCase().includes(filtre.pozisyon.toLowerCase())) &&
      (filtre.firma === "" ||
        (ilan.companyName || "").toLowerCase().includes(filtre.firma.toLowerCase())) &&
      (filtre.mahalle === "" ||
        (ilan.location || "").toLowerCase().includes(filtre.mahalle.toLowerCase())) &&
      (filtre.yabanci_dil === "" ||
        (ilan.language || "").toLowerCase().includes(filtre.yabanci_dil.toLowerCase())) &&
      (filtre.bilgisayar_programı === "" ||
        (ilan.software || "").toLowerCase().includes(filtre.bilgisayar_programı.toLowerCase()))
    );
  });

  const totalPages = Math.ceil(filtreliIlanlar.length / perPage);
  const ilanlarToShow = filtreliIlanlar.slice((page - 1) * perPage, page * perPage);

  const handlePerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPerPage(Number(e.target.value));
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    
    <>
      <div className="flex flex-col md:flex-row gap-8 p-8 bg-white">
        {/* Filtre Alanı */}
        <aside className="bg-white rounded-xl shadow-lg p-6 min-w-[260px] h-fit">
          <h3 className="mb-4 text-red-600 font-semibold text-lg">Filtrele</h3>
          <div className="flex flex-col gap-4 relative">
            {/* Pozisyon */}
            <div className="relative">
              <input
                ref={pozisyonInputRef}
                name="pozisyon"
                placeholder="Pozisyon"
                value={filtre.pozisyon}
                onChange={handleChange}
                onFocus={handlePozisyonFocus}
                onBlur={handlePozisyonBlur}
                className="p-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-200 w-full"
                autoComplete="off"
              />
              {showPozisyonlar && (
                <ul className="absolute left-0 top-full mt-1 w-full bg-white border border-gray-200 rounded-lg shadow z-10 max-h-60 overflow-auto">
                  {populerPozisyonlar.map((pozisyon) => (
                    <li
                      key={pozisyon}
                      className="px-4 py-2 cursor-pointer hover:bg-red-50"
                      onMouseDown={() => handlePozisyonSec(pozisyon)}
                    >
                      {pozisyon}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {/* Firma */}
            <input
              name="firma"
              placeholder="Firma Adı"
              value={filtre.firma}
              onChange={handleChange}
              className="p-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-200"
            />
            {/* Mahalle */}
            <div className="relative">
              <input
                ref={mahalleInputRef}
                name="mahalle"
                placeholder="Mahalle"
                value={filtre.mahalle}
                onChange={handleChange}
                onFocus={handleMahalleFocus}
                onBlur={handleMahalleBlur}
                className="p-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-200 w-full"
                autoComplete="off"
              />
              {showMahalleler && (
                <ul className="absolute left-0 top-full mt-1 w-full bg-white border border-gray-200 rounded-lg shadow z-10 max-h-60 overflow-auto">
                  {beylikduzuMahalleleri.map((mahalle) => (
                    <li
                      key={mahalle}
                      className="px-4 py-2 cursor-pointer hover:bg-red-50"
                      onMouseDown={() => handleMahalleSec(mahalle)}
                    >
                      {mahalle}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {/* Yabancı Dil */}
            <div className="relative">
              <input
                ref={yabanciDilInputRef}
                name="yabanci_dil"
                placeholder="Yabancı Dil"
                value={filtre.yabanci_dil}
                onChange={handleChange}
                onFocus={handleYabanciDilFocus}
                onBlur={handleYabanciDilBlur}
                className="p-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-200 w-full"
                autoComplete="off"
              />
              {showYabanciDiller && (
                <ul className="absolute left-0 top-full mt-1 w-full bg-white border border-gray-200 rounded-lg shadow z-10 max-h-60 overflow-auto">
                  {yabanciDiller.map((dil) => (
                    <li
                      key={dil}
                      className="px-4 py-2 cursor-pointer hover:bg-red-50"
                      onMouseDown={() => handleYabanciDilSec(dil)}
                    >
                      {dil}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {/* Bilgisayar Programı */}
            <div className="relative">
              <input
                ref={bilgisayarProgramiInputRef}
                name="bilgisayar_programı"
                placeholder="Bilgisayar Programı"
                value={filtre.bilgisayar_programı}
                onChange={handleChange}
                onFocus={handleBilgisayarProgramiFocus}
                onBlur={handleBilgisayarProgramiBlur}
                className="p-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-200 w-full"
                autoComplete="off"
              />
              {showBilgisayarProgramlari && (
                <ul className="absolute left-0 top-full mt-1 w-full bg-white border border-gray-200 rounded-lg shadow z-10 max-h-60 overflow-auto">
                  {bilgisayarProgramlari.map((program) => (
                    <li
                      key={program}
                      className="px-4 py-2 cursor-pointer hover:bg-red-50"
                      onMouseDown={() => handleBilgisayarProgramiSec(program)}
                    >
                      {program}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <button
              className="bg-blue-700 text-white rounded-lg py-2 font-bold mt-2 hover:bg-blue-800 transition cursor-pointer"
            >
              İş Ara
            </button>
          </div>
        </aside>
        {/* İlan Listesi */}
        <main className="flex-1">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-red-600 font-bold text-2xl">
              {filtreliIlanlar.length} İş İlanı Listelendi
            </h1>
            <div className="flex items-center gap-2">
              <label htmlFor="perPage" className="text-sm text-gray-700">Sayfa başı:</label>
              <select
                id="perPage"
                value={perPage}
                onChange={handlePerPageChange}
                className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-red-200"
              >
                {[5, 10, 20, 50].map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </div>
          </div>
          {/* İlanları doğrudan burada gösteriyoruz */}
          <div className="flex flex-col gap-6">
            {loading ? (
              <div>Yükleniyor...</div>
            ) : (
             ilanlarToShow.map((ilan, i) => (
    <div
      key={ilan.id || i}
      className="bg-white rounded-xl shadow border border-gray-100 p-6 flex flex-col md:flex-row md:items-center justify-between"
    >
      <div>
        <h2 className="text-lg font-semibold text-gray-800">{ilan.title}</h2>
        <div className="text-gray-600 mt-2">
          <span className="mr-4 font-medium">{ilan.companyName}</span>
          <span>
            {ilan.city} {ilan.location && `/ ${ilan.location}`}
          </span>
        </div>
        <div className="text-gray-400 mt-2 text-sm">
          İlan Tarihi: {ilan.createdAt}
        </div>
        {ilan.salary && (
          <div className="text-gray-400 mt-2 text-sm">
            Maaş: {ilan.salary}
          </div>
        )}
      </div>
      <button
        className="bg-blue-700 text-white cursor-pointer rounded-lg py-2 px-6 font-bold mt-4 md:mt-0 hover:bg-blue-800 transition"
      >
        İşe Başvur
      </button>
    </div>
))
            )}
          </div>
          {/* Sayfalama */}
          <div className="flex justify-center items-center gap-2 mt-8">
            <button
              disabled={page === 1}
              onClick={() => handlePageChange(page - 1)}
              className={`px-3 py-1 rounded border ${page === 1 ? "bg-gray-200 text-gray-400" : "bg-white text-blue-700 hover:bg-blue-50"}`}
            >
              &lt;
            </button>
            {Array.from({ length: totalPages }, (_, idx) => (
              <button
                key={idx + 1}
                onClick={() => handlePageChange(idx + 1)}
                className={`px-3 py-1 rounded border ${page === idx + 1 ? "bg-blue-700 text-white font-bold" : "bg-white text-blue-700 hover:bg-blue-50"}`}
              >
                {idx + 1}
              </button>
            ))}
            <button
              disabled={page === totalPages || totalPages === 0}
              onClick={() => handlePageChange(page + 1)}
              className={`px-3 py-1 rounded border ${page === totalPages || totalPages === 0 ? "bg-gray-200 text-gray-400" : "bg-white text-blue-700 hover:bg-blue-50"}`}
            >
              &gt;
            </button>
          </div>
        </main>
      </div>
    </>
  );
}