"use client";
import React, { useState, useEffect } from "react";

type Basvuru = {
    _id?: string;
    title: string;
    description: string;
    jobType: string;
    location: string;
    status?: string;
};

async function getCandidateApplications(token: string) {
    const response = await fetch("http://localhost:5075/api/applications/candidate", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` }
    });
    return response;
}

async function deleteCandidateApplication(token: string, id: string) {
    const response = await fetch(`http://localhost:5075/api/applications/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
    });
    return response;
}
function CandidatePage() {
    const [basvurular, setBasvurular] = useState<Basvuru[]>([]);

   useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
        window.location.href = "/giris";
        return;
    }
    getCandidateApplications(token)
        .then(res => {
            if (res.status === 401 || res.status === 403) {
                window.location.href = "/giris";
                return;
            }
            // Yanıtın boş olup olmadığını kontrol et
            return res.text().then(text => {
                if (!text) return []; // Boşsa boş dizi döndür
                try {
                    return JSON.parse(text);
                } catch {
                    return []; // JSON değilse boş dizi döndür
                }
            });
        })
        .then(data => {
            if (Array.isArray(data)) setBasvurular(data);
        });
}, []);
    const basvuruSil = async (id?: string) => {
        if (!id) return;
        const token = localStorage.getItem("token");
        if (!token) return;
        const res = await deleteCandidateApplication(token, id);
        if (res.ok) setBasvurular(prev => prev.filter(basvuru => basvuru._id !== id));
    };

    return (
        <div className="min-h-screen bg-white flex flex-col">
            <main className="flex flex-1 px-12 py-8 justify-center items-start bg-white">
                <section className="w-full">
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-blue-700">Başvurularım</h2>
                        <p className="text-gray-500">Yalnızca sizin yaptığınız başvurular burada listelenir.</p>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-blue-100 rounded-lg shadow">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2 text-left text-blue-700 font-bold">Başlık</th>
                                    <th className="px-4 py-2 text-left text-blue-700 font-bold">Açıklama</th>
                                    <th className="px-4 py-2 text-left text-blue-700 font-bold">Tür</th>
                                    <th className="px-4 py-2 text-left text-blue-700 font-bold">Mahalle</th>
                                    <th className="px-4 py-2 text-left text-blue-700 font-bold">Durum</th>
                                    <th className="px-4 py-2"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {basvurular.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="text-gray-400 text-center py-8">Henüz başvurunuz yok.</td>
                                    </tr>
                                ) : basvurular.map(basvuru => (
                                    <tr key={basvuru._id} className="border-t">
                                        <td className="px-4 py-2">{basvuru.title}</td>
                                        <td className="px-4 py-2">{basvuru.description}</td>
                                        <td className="px-4 py-2">{basvuru.jobType}</td>
                                        <td className="px-4 py-2">{basvuru.location}</td>
                                        <td className="px-4 py-2">{basvuru.status || "Beklemede"}</td>
                                        <td className="px-4 py-2">
                                            <button className="bg-red-600 text-white px-4 py-2 rounded font-bold" onClick={() => basvuruSil(basvuru._id)}>Sil</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </main>
        </div>
    );
}
export default CandidatePage;