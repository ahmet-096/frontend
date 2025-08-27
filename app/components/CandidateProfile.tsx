'use client'
import React from 'react';

const profile = {
  adSoyad: 'Ahmet Yılmaz',
  unvan: 'Yazılım Geliştirici',
  telefon: '+90 555 123 45 67',
  email: 'ahmet.yilmaz@example.com',
  adres: 'İstanbul, Türkiye',
  ozet: '5 yıldır web geliştirme alanında çalışıyorum. React ve Node.js konusunda uzmanım.',
  deneyimler: 'ABC Şirketi (2020-2024)\nXYZ Ajansı (2018-2020)',
  egitim: 'Boğaziçi Üniversitesi, Bilgisayar Mühendisliği',
  beceriler: 'React, Node.js, TypeScript, SQL',
  diller: 'Türkçe (Ana dil), İngilizce (İleri)',
  fotoUrl: '',
};

const CandidateProfile: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-8 w-full max-w-2xl mx-auto">
        {/* Üst alan */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 pb-6 border-b">
          <div className="relative w-28 h-28 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border-4 border-white shadow">
            {profile.fotoUrl ? (
              <img src={profile.fotoUrl} alt="Profil Fotoğrafı" className="w-full h-full object-cover" />
            ) : (
              <span className="text-4xl text-gray-500 font-bold">
                {profile.adSoyad.split(' ').map(n => n[0]).join('')}
              </span>
            )}
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-blue-700 tracking-tight m-0">{profile.adSoyad}</h1>
            <h2 className="text-lg font-semibold text-gray-700 mt-2">{profile.unvan}</h2>
            <div className="text-gray-500 text-sm mt-2 flex flex-wrap gap-2">
              <span>{profile.email}</span>
              <span>|</span>
              <span>{profile.telefon}</span>
              <span>|</span>
              <span>{profile.adres}</span>
            </div>
          </div>
        </div>

        {/* Bilgi kutuları */}
        <div className="flex flex-col md:flex-row gap-4 pt-6">
          <div className="bg-white rounded-lg shadow p-4 flex-1 min-w-[140px]">
            <div className="text-gray-400 text-xs">Eğitim</div>
            <div className="text-blue-700 font-semibold text-sm mt-1">{profile.egitim}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 flex-1 min-w-[140px]">
            <div className="text-gray-400 text-xs">Beceriler</div>
            <div className="text-blue-700 font-semibold text-sm mt-1">{profile.beceriler}</div>
          </div>
        </div>

        {/* Açıklama ve nitelikler */}
        <div className="pt-8 pb-8">
          <h3 className="text-blue-700 font-bold text-base mb-3">Özgeçmiş Özeti</h3>
          <p className="text-gray-700 text-sm leading-relaxed mb-6">{profile.ozet}</p>
          <h3 className="text-blue-700 font-bold text-base mb-2">Deneyimler</h3>
          <ul className="list-disc pl-5 mb-6">
            {profile.deneyimler.split('\n').map((d, idx) => (
              <li key={idx} className="text-gray-700 text-sm mb-2">{d}</li>
            ))}
          </ul>
          <h3 className="text-blue-700 font-bold text-base mb-2">Diller</h3>
          <p className="text-gray-700 text-sm">{profile.diller}</p>
        </div>
      </div>
    </div>
  );
};

export default CandidateProfile;