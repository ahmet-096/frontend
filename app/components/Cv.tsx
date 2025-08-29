'use client'
import React, { useState, useRef, useEffect } from 'react';
import { useReactToPrint } from 'react-to-print';
import ModernCVTemplate from './ModernCVTemplate';
import { getCandidate, updateCandidate } from '../api/api';

type FormData = {
  adSoyad: string;
  unvan: string;
  telefon: string;
  email: string;
  adres: string;
  ozet: string;
  deneyimler: string;
  egitim: string;
  beceriler: string;
  diller: string;
  fotoUrl: string;
};

const Page = () => {
  const [formData, setFormData] = useState<FormData>({
    adSoyad: '',
    unvan: '',
    telefon: '',
    email: '',
    adres: '',
    ozet: '',
    deneyimler: '',
    egitim: '',
    beceriler: '',
    diller: '',
    fotoUrl: '',
  });
  const [candidateId, setCandidateId] = useState<string | null>(null);

  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

  // Kullanıcıya ait candidateId'yi çek
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    if (token && userId) {
      getCandidate(userId, token).then(async (res) => {
        if (res.ok) {
          const data = await res.json();
          setCandidateId(data.id); // Candidate tablosundaki Id
          // Eğer backend'den CV verisi geliyorsa, formu doldurabilirsin:
          // setFormData({...formData, ...data});
        }
      });
    }
  }, []);

  // CV'yi API'ye kaydet
  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token || !candidateId) {
        alert('Kullanıcı bilgisi bulunamadı!');
        return;
      }
      const response = await updateCandidate(candidateId, token, formData);
      if (response.ok) {
        alert('CV başarıyla kaydedildi!');
      } else {
        alert('Kaydetme başarısız!');
      }
    } catch (err) {
      alert('Bir hata oluştu!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="w-full max-w-7xl mx-auto px-2 py-6 flex flex-col md:flex-row gap-8">
        {/* Sol Menü */}
        <div className="w-full md:w-[500px] bg-white rounded-lg shadow-md p-4 md:p-10 mb-6 md:mb-0 flex flex-col gap-6">
          <h1 className="text-2xl text-blue-700 font-bold mb-2">CV Oluştur</h1>
          <form>
            {/* Kişisel Bilgiler */}
            <fieldset className="border border-gray-200 rounded-md p-2 md:p-4 mb-4">
              <legend className="font-semibold text-blue-700">Kişisel Bilgiler</legend>
              <input
                type="text"
                placeholder="İsim Soyisim"
                value={formData.adSoyad}
                onChange={e => setFormData({ ...formData, adSoyad: e.target.value })}
                className="w-full mb-2 p-2 rounded border border-gray-300"
                maxLength={50}
              />
              <input
                type="text"
                placeholder="Ünvan (örn: Ürün Yöneticisi)"
                value={formData.unvan}
                onChange={e => setFormData({ ...formData, unvan: e.target.value })}
                className="w-full mb-2 p-2 rounded border border-gray-300"
                maxLength={40}
              />
              <input
                type="text"
                placeholder="Telefon"
                value={formData.telefon}
                onChange={e => setFormData({ ...formData, telefon: e.target.value })}
                className="w-full mb-2 p-2 rounded border border-gray-300"
                maxLength={20}
              />
              <input
                type="email"
                placeholder="E-posta"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                className="w-full mb-2 p-2 rounded border border-gray-300"
                maxLength={40}
              />
              <input
                type="text"
                placeholder="Adres"
                value={formData.adres}
                onChange={e => setFormData({ ...formData, adres: e.target.value })}
                className="w-full mb-2 p-2 rounded border border-gray-300"
                maxLength={100}
              />
              <label htmlFor="fotoInput" className="block mb-2 cursor-pointer text-blue-700 font-medium">
                Fotoğraf Yükle
              </label>
              <input
                id="fotoInput"
                type="file"
                accept="image/*"
                onChange={e => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setFormData({ ...formData, fotoUrl: URL.createObjectURL(file) });
                  }
                }}
                className="hidden"
              />
            </fieldset>
            {/* Özgeçmiş Özeti */}
            <fieldset className="border border-gray-200 rounded-md p-2 md:p-4 mb-4">
              <legend className="font-semibold text-blue-700">Özgeçmiş Özeti</legend>
              <textarea
                placeholder="Özgeçmiş Özeti"
                value={formData.ozet}
                onChange={e => setFormData({ ...formData, ozet: e.target.value })}
                className="w-full min-h-[50px] p-2 rounded border border-gray-300 resize-y"
                maxLength={500}
              />
            </fieldset>
            {/* Deneyim/Eğitim */}
            <fieldset className="border border-gray-200 rounded-md p-2 md:p-4 mb-4">
              <legend className="font-semibold text-blue-700">Deneyim & Eğitim</legend>
              <textarea
                placeholder="İş Deneyimleri"
                value={formData.deneyimler}
                onChange={e => setFormData({ ...formData, deneyimler: e.target.value })}
                className="w-full mb-2 min-h-[80px] p-2 rounded border border-gray-300 resize-y"
                maxLength={800}
              />
              <textarea
                placeholder="Eğitim Bilgileri"
                value={formData.egitim}
                onChange={e => setFormData({ ...formData, egitim: e.target.value })}
                className="w-full mb-2 min-h-[40px] p-2 rounded border border-gray-300 resize-y"
                maxLength={400}
              />
            </fieldset>
            {/* Beceriler & Diller */}
            <fieldset className="border border-gray-200 rounded-md p-2 md:p-4 mb-4">
              <legend className="font-semibold text-blue-700">Beceriler & Diller</legend>
              <textarea
                placeholder="Beceriler"
                value={formData.beceriler}
                onChange={e => setFormData({ ...formData, beceriler: e.target.value })}
                className="w-full mb-2 min-h-[40px] p-2 rounded border border-gray-300 resize-y"
                maxLength={400}
              />
              <textarea
                placeholder="Diller"
                value={formData.diller}
                onChange={e => setFormData({ ...formData, diller: e.target.value })}
                className="w-full min-h-[30px] p-2 rounded border border-gray-300 resize-y"
                maxLength={200}
              />
            </fieldset>
          </form>
          <button
            type="button"
            onClick={handleSave}
            className="mt-2 px-6 py-2 bg-blue-700 text-white rounded font-semibold shadow hover:bg-blue-800 transition cursor-pointer w-full"
          >
            Kaydet
          </button>
          <button
            type="button"
            onClick={reactToPrintFn}
            className="mt-2 px-6 py-2 bg-blue-700 text-white rounded font-semibold shadow hover:bg-blue-800 transition cursor-pointer w-full"
          >
            PDF İndir
          </button>
        </div>
        {/* Sağda CV Şablonu */}
        <div className="flex-1 bg-gray-50 flex items-center justify-center p-2">
          <ModernCVTemplate ref={contentRef} formData={formData} />
        </div>
      </div>
    </div>
  );
}
export default Page;
