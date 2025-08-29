"use client";
import React, { useState, useEffect, useRef } from "react";
import beylikduzuMahalleleri, { bilgisayarProgramlari, populerPozisyonlar, yabanciDiller } from "./Words";
import { getJobPosts } from "../api/api";

// İlan tipi
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
  jobType?: string;
}

const formatDate = (dateStr?: string) => {
  if (!dateStr) return "-";
  const date = new Date(dateStr);
  return isNaN(date.getTime())
    ? dateStr
    : date.toLocaleDateString("tr-TR", { year: "numeric", month: "long", day: "numeric" });
};

const jobTypeToText = (type: string | number | undefined) => {
  const numType = typeof type === "string" ? Number(type) : type;
  switch (numType) {
    case 0: return "Tam Zamanlı";
    case 1: return "Yarı Zamanlı";
    case 2: return "Dönemsel";
    default: return "Belirtilmedi";
  }
};

export default function IsIlanlari() {
  const [ilanlar, setIlanlar] = useState<Ilan[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtre, setFiltre] = useState({
    pozisyon: "",
    firma: "",
    mahalle: "",
    yabanci_dil: "",
    bilgisayar_programı: ""
  });
  const [show, setShow] = useState({
    pozisyon: false,
    mahalle: false,
    yabanci_dil: false,
    bilgisayar_programı: false
  });
  const pozisyonInputRef = useRef<HTMLInputElement>(null) as React.RefObject<HTMLInputElement>;
  const mahalleInputRef = useRef<HTMLInputElement>(null) as React.RefObject<HTMLInputElement>;
  const yabanciDilInputRef = useRef<HTMLInputElement>(null) as React.RefObject<HTMLInputElement>;
  const bilgisayarProgramiInputRef = useRef<HTMLInputElement>(null) as React.RefObject<HTMLInputElement>;
  const [perPage, setPerPage] = useState(5);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getJobPosts()
      .then(res => res.json())
      .then(data => {
        setIlanlar(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFiltre({ ...filtre, [e.target.name]: e.target.value });

  const handleShow = (key: keyof typeof show, value: boolean) =>
    setShow({ ...show, [key]: value });

  const handleSec = (key: keyof typeof filtre, value: string, ref?: React.RefObject<HTMLInputElement>) => {
    setFiltre({ ...filtre, [key]: value });
    setShow({ ...show, [key]: false });
    ref?.current?.focus();
  };

  const filtreliIlanlar = ilanlar.filter(ilan =>
    (!filtre.pozisyon || ilan.title?.toLowerCase().includes(filtre.pozisyon.toLowerCase())) &&
    (!filtre.firma || (ilan.companyName || "").toLowerCase().includes(filtre.firma.toLowerCase())) &&
    (!filtre.mahalle || (ilan.location || "").toLowerCase().includes(filtre.mahalle.toLowerCase())) &&
    (!filtre.yabanci_dil || (ilan.language || "").toLowerCase().includes(filtre.yabanci_dil.toLowerCase())) &&
    (!filtre.bilgisayar_programı || (ilan.software || "").toLowerCase().includes(filtre.bilgisayar_programı.toLowerCase()))
  );

  const totalPages = Math.ceil(filtreliIlanlar.length / perPage);
  const ilanlarToShow = filtreliIlanlar.slice((page - 1) * perPage, page * perPage);

  const handlePerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPerPage(Number(e.target.value));
    setPage(1);
  };

  const handlePageChange = (newPage: number) => setPage(newPage);

  const gotoIlanDetay = (ilan?: Ilan) => {
    window.location.href = ilan ? `/ilandetay/${ilan.id}` : "/isilanlari";
  };

  const handleBasvur = (ilan: Ilan) => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/giris";
      return;
    }
    alert("Başvuru işlemi başlatıldı!");
  };

  return (
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
              onFocus={() => handleShow("pozisyon", true)}
              onBlur={() => setTimeout(() => handleShow("pozisyon", false), 100)}
              className="p-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-200 w-full"
              autoComplete="off"
            />
            {show.pozisyon && (
              <ul className="absolute left-0 top-full mt-1 w-full bg-white border border-gray-200 rounded-lg shadow z-10 max-h-60 overflow-auto">
                {populerPozisyonlar.map(pozisyon => (
                  <li
                    key={pozisyon}
                    className="px-4 py-2 cursor-pointer hover:bg-red-50"
                    onMouseDown={() => handleSec("pozisyon", pozisyon, pozisyonInputRef)}
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
              onFocus={() => handleShow("mahalle", true)}
              onBlur={() => setTimeout(() => handleShow("mahalle", false), 100)}
              className="p-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-200 w-full"
              autoComplete="off"
            />
            {show.mahalle && (
              <ul className="absolute left-0 top-full mt-1 w-full bg-white border border-gray-200 rounded-lg shadow z-10 max-h-60 overflow-auto">
                {beylikduzuMahalleleri.map(mahalle => (
                  <li
                    key={mahalle}
                    className="px-4 py-2 cursor-pointer hover:bg-red-50"
                    onMouseDown={() => handleSec("mahalle", mahalle, mahalleInputRef)}
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
              onFocus={() => handleShow("yabanci_dil", true)}
              onBlur={() => setTimeout(() => handleShow("yabanci_dil", false), 100)}
              className="p-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-200 w-full"
              autoComplete="off"
            />
            {show.yabanci_dil && (
              <ul className="absolute left-0 top-full mt-1 w-full bg-white border border-gray-200 rounded-lg shadow z-10 max-h-60 overflow-auto">
                {yabanciDiller.map(dil => (
                  <li
                    key={dil}
                    className="px-4 py-2 cursor-pointer hover:bg-red-50"
                    onMouseDown={() => handleSec("yabanci_dil", dil, yabanciDilInputRef)}
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
              onFocus={() => handleShow("bilgisayar_programı", true)}
              onBlur={() => setTimeout(() => handleShow("bilgisayar_programı", false), 100)}
              className="p-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-200 w-full"
              autoComplete="off"
            />
            {show.bilgisayar_programı && (
              <ul className="absolute left-0 top-full mt-1 w-full bg-white border border-gray-200 rounded-lg shadow z-10 max-h-60 overflow-auto">
                {bilgisayarProgramlari.map(program => (
                  <li
                    key={program}
                    className="px-4 py-2 cursor-pointer hover:bg-red-50"
                    onMouseDown={() => handleSec("bilgisayar_programı", program, bilgisayarProgramiInputRef)}
                  >
                    {program}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <button className="bg-blue-700 text-white rounded-lg py-2 font-bold mt-2 hover:bg-blue-800 transition cursor-pointer">
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
              {[5, 10, 20, 50].map(n => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </div>
        </div>
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
                  <div className="text-gray-600 mt-2 flex items-center gap-2">
                    <span className="font-bold text-blue-700 mr-2">{ilan.companyName}</span>
                    <span>
                      {ilan.city} {ilan.location && `/ ${ilan.location}`}
                    </span>
                  </div>
                  <div className="text-gray-400 mt-2 text-sm">
                    İlan Tarihi: {formatDate(ilan.createdAt)}
                  </div>
                  <div className="text-gray-400 mt-2 text-sm">
                    Çalışma Şekli: {jobTypeToText(ilan.jobType)}
                  </div>
                </div>
                <div className="flex gap-2 mt-4 md:mt-0">
                  <button
                    className="bg-gray-200 text-blue-700 cursor-pointer rounded-lg py-2 px-6 font-bold hover:bg-blue-50 transition"
                    onClick={() => gotoIlanDetay(ilan)}
                  >
                    Detay
                  </button>
                  <button
                    className="bg-blue-700 text-white cursor-pointer rounded-lg py-2 px-6 font-bold hover:bg-blue-800 transition"
                    onClick={() => handleBasvur(ilan)}
                  >
                    İşe Başvur
                  </button>
                </div>
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
  );
}