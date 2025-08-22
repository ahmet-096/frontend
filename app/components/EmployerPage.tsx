"use client";
import React, { useState, useEffect, useRef } from "react";
import { getEmployerJobs, addEmployerJob, deleteEmployerJob } from "../api/api";
import beylikduzuMahalleleri from "./Words";

type Ilan = {
    _id?: string;
    Title: string;
    Description: string;
    JobType: string;
    Location: string;
};

const jobTypes = ["FullTime", "PartTime", "Internship", "Remote"];

function EmployerPage() {
    const [ilanlar, setIlanlar] = useState<Ilan[]>([]);
    const [form, setForm] = useState<Ilan>({ Title: "", Description: "", JobType: "FullTime", Location: "" });
    const [showMahalle, setShowMahalle] = useState(false);
    const mahalleRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            window.location.href = "/giris";
            return;
        }
        getEmployerJobs(token)
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
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleMahalleSec = (Location: string) => {
        setForm(prev => ({ ...prev, Location }));
        setShowMahalle(false);
        mahalleRef.current?.focus();
    };

    const ilanEkle = async (e: React.FormEvent) => {
        e.preventDefault();
        const { Title, Description, JobType, Location } = form;
        if (!Title || !Description || !JobType || !Location) return;
        const token = localStorage.getItem("token");
        if (!token) return (window.location.href = "/isverensayfa");
        const jobTypeMap = { FullTime: 0, PartTime: 1, Internship: 2, Remote: 3 };
        const res = await addEmployerJob(token, {
            title: Title,
            description: Description,
            jobType: jobTypeMap[JobType as keyof typeof jobTypeMap],
            location: Location
        });
        if (!res.ok) {
            const errorText = await res.text();
            console.error("API Error:", errorText);
            alert("İlan eklenemedi: " + errorText);
            return;
        }
        // Başarıyla eklenirse ilanları güncelle
        setForm({ Title: "", Description: "", JobType: "FullTime", Location: "" });
        getEmployerJobs(token)
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) setIlanlar(data);
            });
    };

    const ilanSil = async (id?: string) => {
        if (!id) return;
        const token = localStorage.getItem("token");
        if (!token) return;
        const res = await deleteEmployerJob(token, id);
        if (res.ok) setIlanlar(prev => prev.filter(ilan => ilan._id !== id));
    };

    return (
        <div className="min-h-screen bg-white flex flex-col">
            <main className="flex flex-1 gap-12 px-12 py-8 justify-center items-start bg-white">
                <section className="w-[400px] flex flex-col items-center">
                    <div className="w-full bg-white rounded-xl p-8 shadow-lg border border-blue-100">
                        <h2 className="text-xl font-bold mb-4 text-center text-blue-700">Yeni İlan Ekle</h2>
                        <form onSubmit={ilanEkle} className="flex flex-col gap-4">
                            <input
                                type="text"
                                name="Title"
                                placeholder="Başlık *"
                                value={form.Title}
                                onChange={handleChange}
                                className="bg-blue-50 rounded px-4 py-2 font-semibold border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
                                required
                                autoComplete="off"
                            />
                            <textarea
                                name="Description"
                                placeholder="Açıklama *"
                                value={form.Description}
                                onChange={handleChange}
                                className="bg-blue-50 rounded px-4 py-2 font-semibold border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none"
                                required
                                rows={3}
                            />
                            <select
                                name="JobType"
                                value={form.JobType}
                                onChange={handleChange}
                                className="bg-blue-50 rounded px-4 py-2 font-semibold border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
                                required
                            >
                                {jobTypes.map(type => <option key={type} value={type}>{type}</option>)}
                            </select>
                            <div className="relative">
                                <input
                                    type="text"
                                    name="Location"
                                    placeholder="Mahalle *"
                                    value={form.Location}
                                    onChange={handleChange}
                                    className="bg-blue-50 rounded px-4 py-2 font-semibold border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
                                    required
                                    autoComplete="off"
                                    ref={mahalleRef}
                                    onFocus={() => setShowMahalle(true)}
                                    onBlur={() => setTimeout(() => setShowMahalle(false), 100)}
                                />
                                {showMahalle && (
                                    <ul className="absolute left-0 top-full mt-1 w-full bg-white border border-gray-200 rounded shadow z-10 max-h-60 overflow-auto">
                                        {beylikduzuMahalleleri
                                            .filter(m => m.toLowerCase().includes(form.Location.toLowerCase()))
                                            .map(m => (
                                                <li key={m} className="px-4 py-2 cursor-pointer hover:bg-blue-50" onMouseDown={() => handleMahalleSec(m)}>
                                                    {m}
                                                </li>
                                            ))}
                                    </ul>
                                )}
                            </div>
                            <button type="submit" className="bg-blue-600 text-white rounded px-4 py-2 font-semibold mt-2 hover:bg-blue-700 transition">
                                İlanı Ekle
                            </button>
                        </form>
                    </div>
                </section>
                <section className="flex-1">
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-blue-700">İlanlarım</h2>
                        <p className="text-gray-500">Yalnızca sizin eklediğiniz ilanlar burada listelenir.</p>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-blue-100 rounded-lg shadow">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2 text-left text-blue-700 font-bold">Başlık</th>
                                    <th className="px-4 py-2 text-left text-blue-700 font-bold">Açıklama</th>
                                    <th className="px-4 py-2 text-left text-blue-700 font-bold">Tür</th>
                                    <th className="px-4 py-2 text-left text-blue-700 font-bold">Mahalle</th>
                                    <th className="px-4 py-2"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {ilanlar.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="text-gray-400 text-center py-8">Henüz ilanınız yok.</td>
                                    </tr>
                                ) : ilanlar.map(ilan => (
                                    <tr key={ilan._id} className="border-t">
                                        <td className="px-4 py-2">{ilan.Title}</td>
                                        <td className="px-4 py-2">{ilan.Description}</td>
                                        <td className="px-4 py-2">{ilan.JobType}</td>
                                        <td className="px-4 py-2">{ilan.Location}</td>
                                        <td className="px-4 py-2">
                                            <button className="bg-red-600 text-white px-4 py-2 rounded font-bold" onClick={() => ilanSil(ilan._id)}>Sil</button>
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
export default EmployerPage;