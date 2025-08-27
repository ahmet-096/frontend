'use client'
import Image from "next/image";
import { useState, useEffect } from "react";
import { getJobPosts } from "../api/api";

type Job = {
    id?: string;
    logo?: string;
    title: string;
    location: string;
    jobType?: string | number;
    salary?: string;
};
const gotoIlanDetay = (ilan?: Job) => {
    if (ilan) window.location.href = `/ilandetay/${ilan.id}`;
    else window.location.href = "/isilanlari";
};
export default function Body() {
    const [jobs, setJobs] = useState<Job[]>([]);

    useEffect(() => {
        getJobPosts()
            .then(res => res.json())
            .then((data) => {
                if (Array.isArray(data)) setJobs(data);
                else setJobs([]);
            })
            .catch(() => setJobs([]));
    }, []);

    return (
        <main>
            {/* Hero Section */}
            <section className="bg-[url('/images/bg.jpg')] bg-cover bg-center py-20 text-center">
                <div className="bg-white/80 rounded-2xl max-w-2xl mx-auto px-8 py-12 shadow-lg">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 text-blue-900">
                        Senin için Beykam’da {jobs.length} ilan var
                    </h1>
                    <p className="text-lg mb-8 text-gray-700">
                        Beylikdüzündeki iş arayanlar ve iş verenler Beykamda buluşuyor!
                    </p>
                    <form className="flex flex-col sm:flex-row justify-center items-center gap-2 mb-4">
                        <input
                            type="text"
                            placeholder="Pozisyon, İşveren Adı, Sektör"
                            className="rounded-full px-6 py-3 w-full sm:w-96 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-800"
                        />
                        <button
                            type="submit"
                            className="bg-blue-600 rounded-full px-8 py-3 font-bold text-white hover:bg-blue-700 transition"
                        >
                            İŞ BUL
                        </button>
                    </form>
                </div>
            </section>

            {/* İş Arayan / İşveren */}
            <section className="bg-green-500 py-10 flex flex-col md:flex-row justify-center gap-10 text-white">
                <div className="text-center flex-1 px-4">
                    <h2 className="text-xl font-bold mb-2">İş Arıyorsan</h2>
                    <p className="mb-4">Zaman kaybetmeden iş bulmak için</p>
                    <a
                        href="/giris"
                        className="bg-blue-500 text-white font-bold rounded-full px-8 py-3 shadow   transition inline-block"
                    >
                        Özgeçmiş Oluştur
                    </a>
                </div>
                <div className="text-center flex-1 px-4">
                    <h2 className="text-xl font-bold mb-2">İşgücü Arıyorsan</h2>
                    <p className="mb-4">Zaman kaybetmeden personel bulmak için</p>
                    <a
                        href="/giris"
                        className="bg-blue-500 text-white font-bold rounded-full px-8 py-3 shadow   transition inline-block"
                    >
                        İlan Ver
                    </a>
                </div>
            </section>

            {/* İş Ortakları */}
            <section className="py-10">
                <h3 className="text-2xl font-bold text-center mb-8 text-blue-600">İş Ortaklarımız</h3>
                <div className="flex justify-center gap-8 flex-wrap">
                    {["logo", "logo", "logo", "logo", "logo", "logo"].map((img, i) => (
                        <Image
                            key={i}
                            src={`/images/${img}.png`}
                            alt={img}
                            width={120}
                            height={60}
                            className="object-contain"
                        />
                    ))}
                </div>
            </section>

            {/* Vitrin İş İlanları */}
            <section className="py-10 px-4">
                <h2 className="text-3xl font-bold mb-10 text-gray-800 text-center">Vitrin İş İlanları</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 justify-items-center">
                    {jobs.slice(0, 12).map((ilan, idx) => (
                        <div
                            key={ilan.id || idx}
                            onClick={() => gotoIlanDetay(ilan)}
                            className="bg-white rounded-3xl shadow-xl flex flex-col items-center p-8 hover:shadow-2xl transition w-72 h-72 justify-between cursor-pointer border-2 border-blue-100 hover:border-blue-400"
                            style={{ textDecoration: "none" }}
                        >
                            <div className="flex items-center justify-center h-24 mb-6">
                                <Image
                                    src={ilan.logo || "/images/logo.png"}
                                    alt={ilan.title + " logo"}
                                    width={140}
                                    height={72}
                                    className="object-contain h-20 max-w-[140px]"
                                />
                            </div>
                            <div className="text-center w-full">
                                <div className="font-bold text-lg text-blue-800 truncate w-56 mb-2">{ilan.title}</div>
                                <div className="text-base text-gray-600 mb-2">{ilan.location}</div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex justify-center mt-10">
                    <a
                        href="/isilanlari"
                        className="bg-blue-500 text-white font-bold rounded-full px-8 py-3 shadow   transition inline-block"
                    >
                        Tümünü Gör
                    </a>
                </div>
            </section>
        </main>
    );
}