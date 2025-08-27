import React, { useState } from "react";
import beylikduzuMahalleleri, { yabanciDiller, bilgisayarProgramlari, populerPozisyonlar } from "./Words";
import { addEmployerJob, getCurrentUser } from "../api/api";
import AutocompleteInput from "./AutocompleteInput";

type Ilan = {
    title: string;
    description: string;
    jobType: string;
    location: string;
    language?: string;
    program?: string;
};

const jobTypes = ["FullTime", "PartTime", "Internship", "Remote"];

interface AddJobFormProps {
    onJobAdded: () => void;
    initialValues?: Ilan;
}

const AddJobForm: React.FC<AddJobFormProps> = ({ onJobAdded, initialValues }) => {
    const [form, setForm] = useState<Ilan>(
        initialValues || { title: "", description: "", jobType: "FullTime", location: "", language: "", program: "" }
    );
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const ilanEkle = async (e: React.FormEvent) => {
        e.preventDefault();
    setError(null);
    setSuccess(null);

        const { title, description, jobType, location } = form;
        if (!title || !description || !jobType || !location) {
            setError("Lütfen tüm zorunlu alanları doldurunuz.");
            return;
        }
        const token = localStorage.getItem("token");
        if (!token) {
            setError("Oturumunuz bulunamadı. Lütfen tekrar giriş yapınız.");
            window.location.href = "/isverensayfa";
            return;
        }
        setLoading(true);
        const jobTypeMap = { FullTime: 0, PartTime: 1, Internship: 2, Remote: 3 };

        const userRes = await getCurrentUser(token);
        if (!userRes.ok) {
            setLoading(false);
            setError("Kullanıcı bilgileri alınamadı.");
            return;
        }
        const user = await userRes.json();
        const employerId = user.employerId;

        const res = await addEmployerJob(token, {
            EmployerId: employerId,
            title,
            description,
            jobType: jobTypeMap[jobType as keyof typeof jobTypeMap],
            location
            // language ve program backendde yok, sonra gönderilecek
        });
        setLoading(false);
        if (!res.ok) {
            const errorText = await res.text();
            if (errorText.includes("Employer not found")) {
                setError("İlan ekleyebilmek için önce işveren olarak onaylanmanız gerekmektedir.");
            } else {
                setError("Bir hata oluştu. Lütfen tekrar deneyiniz.");
            }
            return;
        }
    setForm({ title: "", description: "", jobType: "FullTime", location: "", language: "", program: "" });
    setSuccess("İlan başarıyla eklendi!");
    onJobAdded();
    };

    return (
        <div className="w-full min-h-screen bg-blue-50 py-10 px-2">
            <h1 className="text-3xl font-bold mb-2 text-blue-800 text-center">İş İlanı Ekle</h1>
            <p className="text-gray-600 mb-6 text-center">
                Lütfen aşağıdaki formu eksiksiz ve doğru şekilde doldurunuz. Zorunlu alanlar <span className="text-red-500">*</span> ile belirtilmiştir.
            </p>
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4 text-center">
                    {error}
                </div>
            )}
            {success && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded mb-4 text-center">
                    {success}
                </div>
            )}
            <form onSubmit={ilanEkle} className="flex flex-col gap-5 max-w-3xl mx-auto">
                <div className="w-full">
                    <label htmlFor="title" className="block font-semibold mb-1 text-blue-700">
                        Başlık <span className="text-red-500">*</span>
                    </label>
                    <div className="w-full">
                        <AutocompleteInput
                            name="title"
                            placeholder="Örn: Satış Danışmanı"
                            value={form.title}
                            options={populerPozisyonlar}
                            onChange={handleChange}
                            onSelect={title => setForm(prev => ({ ...prev, title }))}
                            required
                        />
                    </div>
                </div>
                <div className="w-full">
                    <label htmlFor="description" className="block font-semibold mb-1 text-blue-700">
                        Açıklama <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        name="description"
                        id="description"
                        placeholder="Pozisyonun detaylarını ve aranan nitelikleri yazınız."
                        value={form.description}
                        onChange={handleChange}
                        className="w-full bg-blue-50 rounded-lg px-4 py-3 border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none text-lg"
                        required
                        rows={5}
                    />
                </div>
                <div className="w-full">
                    <label htmlFor="jobType" className="block font-semibold mb-1 text-blue-700">
                        Çalışma Şekli <span className="text-red-500">*</span>
                    </label>
                    <select
                        name="jobType"
                        id="jobType"
                        value={form.jobType}
                        onChange={handleChange}
                        className="w-full bg-blue-50 rounded-lg px-4 py-3 border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
                        required
                    >
                        {jobTypes.map(type => <option key={type} value={type}>{type}</option>)}
                    </select>
                </div>
                <div className="w-full">
                    <label htmlFor="location" className="block font-semibold mb-1 text-blue-700">
                        Mahalle <span className="text-red-500">*</span>
                    </label>
                    <div className="w-full">
                        <AutocompleteInput
                            name="location"
                            placeholder="Mahalle seçiniz"
                            value={form.location}
                            options={beylikduzuMahalleleri}
                            onChange={handleChange}
                            onSelect={location => setForm(prev => ({ ...prev, location }))}
                            required
                        />
                    </div>
                </div>
                <div className="w-full">
                    <label htmlFor="language" className="block font-semibold mb-1 text-blue-700">
                        Yabancı Dil
                    </label>
                    <div className="w-full">
                        <AutocompleteInput
                            name="language"
                            placeholder="Yabancı dil seçiniz (isteğe bağlı)"
                            value={form.language || ""}
                            options={yabanciDiller}
                            onChange={handleChange}
                            onSelect={language => setForm(prev => ({ ...prev, language }))}
                        />
                    </div>
                </div>
                <div className="w-full">
                    <label htmlFor="program" className="block font-semibold mb-1 text-blue-700">
                        Bilgisayar Programı
                    </label>
                    <div className="w-full">
                        <AutocompleteInput
                            name="program"
                            placeholder="Bilgisayar programı seçiniz (isteğe bağlı)"
                            value={form.program || ""}
                            options={bilgisayarProgramlari}
                            onChange={handleChange}
                            onSelect={program => setForm(prev => ({ ...prev, program }))}
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-700 text-white rounded-lg px-6 py-3 font-bold text-lg hover:bg-blue-800 transition mt-2 cursor-pointer"
                    disabled={loading}
                >
                    {loading ? "İlan Ekleniyor..." : initialValues ? "İlanı Güncelle" : "İlanı Ekle"}
                </button>
            </form>
        </div>
    );
};

export default AddJobForm;