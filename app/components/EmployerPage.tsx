"use client";
import React, { useState, useEffect } from "react";
import { deleteEmployerJob, getJobPostsByEmployer } from "../api/api";
import { Token } from "@mui/icons-material";

type Ilan = {
    id?: string;
    title: string;
    description: string;
    jobType: string;
    location: string;
    createdAt?: string;
    applicationCount?: number;
};

function formatDate(dateStr?: string) {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return "";
    return date.toLocaleDateString("tr-TR");
}

function EmployerPage() {
    const [ilanlar, setIlanlar] = useState<Ilan[]>([]);

    const refreshJobs = () => {
        const token = localStorage.getItem("token");
        if (!token) {
            window.location.href = "/giris";
            return;
        }
        const employerId = localStorage.getItem("employerId");
        if (!employerId || employerId === "null" || employerId === "undefined") {
            window.location.href = "/giris";
            return;
        }
        getJobPostsByEmployer(employerId, token)
            .then(res => {
                if (res.status === 401 || res.status === 403) {
                    window.location.href = "/giris";
                    return;
                }
                return res.json();
            })
            .then(data => {
                if (Array.isArray(data)) setIlanlar(data);
            });
    };

    useEffect(() => {
        refreshJobs();
    }, []);

    const ilanSil = async (id?: string) => {
        if (!id) return;
        const token = localStorage.getItem("token");
        if (!token) return;
        const res = await deleteEmployerJob(token, id);
        if (res.ok) setIlanlar(prev => prev.filter(ilan => ilan.id !== id));
    };

    const jobTypeToText = (type: string | number) => {
        switch (type) {
            case 0:
            case "0":
                return "Tam Zamanlı";
            case 1:
            case "1":
                return "Yarı Zamanlı";
            case 2:
            case "2":
                return "Dönemsel";
            default:
                return "Belirtilmedi";
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center px-4 sm:px-8 lg:px-12 py-6 sm:py-8 bg-white shadow">
                <div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-blue-700">İlanlarım</h2>
                    <p className="text-gray-500 text-sm sm:text-base">Yalnızca sizin eklediğiniz ilanlar burada listelenir.</p>
                </div>
                <button
                    className="mt-4 sm:mt-0 bg-blue-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-bold shadow hover:bg-blue-700 transition w-full sm:w-auto cursor-pointer"
                    onClick={() => window.location.href = "/ilanekle"}
                >
                    + Yeni İlan Ekle
                </button>
            </header>

            <main className="flex flex-1 px-2 sm:px-4 lg:px-12 py-4 sm:py-8 justify-center items-start bg-gray-50">
                <section className="flex-1">
                    {ilanlar.length === 0 ? (
                        <div className="text-gray-400 text-center py-8 sm:py-16 text-base sm:text-lg font-semibold">
                            Henüz ilanınız yok.
                        </div>
                    ) : (
                        <>
                            {/* Masaüstü için tablo */}
                            <table className="hidden sm:table w-full bg-white rounded-xl shadow border border-blue-100">
                                <thead>
                                    <tr className="bg-blue-100 text-blue-700">
                                        <th className="p-2 text-left">Başlık</th>
                                        <th className="p-2 text-left">Tür</th>
                                        <th className="p-2 text-left">Mahalle</th>
                                        <th className="p-2 text-left">Başvuru</th>
                                        <th className="p-2 text-left">Tarih</th>
                                        <th className="p-2 text-left">İşlem</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {ilanlar.map(ilan => (
                                        <tr key={ilan.id} className="border-t">
                                            <td className="p-2 font-semibold text-blue-700">{ilan.title}</td>
                                            <td className="p-2">{jobTypeToText(ilan.jobType)}</td>
                                            <td className="p-2">{ilan.location}</td>
                                            <td className="p-2">{ilan.applicationCount ?? 0}</td>
                                            <td className="p-2">{formatDate(ilan.createdAt)}</td>
                                            <td className="p-2 flex gap-2">
                                                <button
                                                    className="bg-blue-500 text-white px-2 py-1 rounded text-xs font-bold hover:bg-blue-600 transition cursor-pointer"
                                                    onClick={() => window.location.href = `/ilandetay/${ilan.id}`}
                                                >
                                                    Detay
                                                </button>
                                                <button
                                                    className="bg-green-500 text-white px-2 py-1 rounded text-xs font-bold hover:bg-yellow-600 transition cursor-pointer"
                                                    onClick={() => alert("Güncelleme yeni sayfada yapılacak!")}
                                                >
                                                    Güncelle
                                                </button>
                                                <button
                                                    className="bg-red-600 text-white px-2 py-1 rounded text-xs font-bold hover:bg-red-700 transition cursor-pointer"
                                                    onClick={() => ilanSil(ilan.id)}
                                                >
                                                    Sil
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {/* Mobil için kartlar */}
                            <div className="sm:hidden flex flex-col gap-4">
                                {ilanlar.map(ilan => (
                                    <div key={ilan.id} className="bg-white rounded-xl shadow border border-blue-100 p-4 flex flex-col gap-2">
                                        <div className="font-bold text-blue-700 text-lg">{ilan.title}</div>
                                        <div className="text-sm text-gray-600"><span className="font-semibold">Tür:</span> {jobTypeToText(ilan.jobType)}</div>
                                        <div className="text-sm text-gray-600"><span className="font-semibold">Mahalle:</span> {ilan.location}</div>
                                        <div className="text-sm text-gray-600"><span className="font-semibold">Başvuru:</span> {ilan.applicationCount ?? 0}</div>
                                        <div className="text-sm text-gray-600"><span className="font-semibold">Tarih:</span> {formatDate(ilan.createdAt)}</div>
                                        <div className="flex gap-2 mt-2">
                                            <button
                                                className="bg-blue-500 text-white px-2 py-1 rounded text-xs font-bold hover:bg-blue-600 transition cursor-pointer flex-1"
                                                onClick={() => window.location.href = `/ilandetay/${ilan.id}`}
                                            >
                                                Detay
                                            </button>
                                            <button
                                                className="bg-green-500 text-white px-2 py-1 rounded text-xs font-bold hover:bg-yellow-600 transition cursor-pointer flex-1"
                                                onClick={() => alert("Güncelleme yeni sayfada yapılacak!")}
                                            >
                                                Güncelle
                                            </button>
                                            <button
                                                className="bg-red-600 text-white px-2 py-1 rounded text-xs font-bold hover:bg-red-700 transition cursor-pointer flex-1"
                                                onClick={() => ilanSil(ilan.id)}
                                            >
                                                Sil
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </section>
            </main>
        </div>
    );
}
export default EmployerPage;