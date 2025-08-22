'use client'
import React, { useState, useRef } from 'react'
import { useReactToPrint } from 'react-to-print'


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

const ModernCVTemplate = ({ formData }: { formData: FormData }) => (
  <div
    className="a4-cv"
    style={{
      width: '210mm',
      minHeight: '297mm',
      height: '297mm',
      background: '#fff',
      boxSizing: 'border-box',
      display: 'flex',
      margin: '0 auto',
      boxShadow: '0 0 8px #ccc',
      overflow: 'hidden'
    }}
  >
    {/* Sol panel */}
    <div style={{
      width: 240,
      background: '#f3f6fa',
      padding: 32,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <div style={{
        width: 100,
        height: 100,
        borderRadius: '50%',
        background: '#e0e0e0',
        marginBottom: 16,
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {formData.fotoUrl
          ? <img src={formData.fotoUrl} alt="Fotoğraf" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          : <span style={{ color: '#aaa', fontSize: 48 }}>👤</span>
        }
      </div>
      <div style={{ fontWeight: 700, fontSize: 20, marginBottom: 8 }}>{formData.adSoyad}</div>
      <div style={{ fontWeight: 500, color: '#1976d2', marginBottom: 16 }}>{formData.unvan}</div>
      <div style={{ fontSize: 15, marginBottom: 4 }}>{formData.telefon}</div>
      <div style={{ fontSize: 15, marginBottom: 4 }}>{formData.email}</div>
      <div style={{ fontSize: 15, marginBottom: 4 }}>{formData.adres}</div>
    </div>
    {/* Sağ panel */}
    <div style={{ flex: 1, padding: '32px 40px' }}>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 20, marginBottom: 8 }}>Özgeçmiş Özeti</h2>
        <div style={{ color: '#444' }}>{formData.ozet}</div>
      </div>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 18, marginBottom: 8 }}>İş Deneyimleri</h2>
        <div dangerouslySetInnerHTML={{ __html: formData.deneyimler }} />
      </div>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 18, marginBottom: 8 }}>Eğitim Bilgileri</h2>
        <div>{formData.egitim}</div>
      </div>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 18, marginBottom: 8 }}>Beceriler</h2>
        <div dangerouslySetInnerHTML={{ __html: formData.beceriler }} />
      </div>
      <div>
        <h2 style={{ fontSize: 18, marginBottom: 8 }}>Diller</h2>
        <div>{formData.diller}</div>
      </div>
    </div>
  </div>
);

const Page = () => {
  const [formData, setFormData] = useState<FormData>({
    adSoyad: '',
    unvan: '',
    telefon: '',
    email: '',
    adres: '',
    ozet: '',
    deneyimler: ``,
    egitim: '',
    beceriler: ``,
    diller: '',
    fotoUrl: ''
  });

  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

  return (
    <>
      <div style={{ display: 'flex', gap: 32, padding: 32 }}>
        {/* Sol Menü */}
        <div style={{ flex: 1, maxWidth: 350 }}>
          <h1>CV Oluştur</h1>
          <form>
            {/* Kişisel Bilgiler */}
            <fieldset style={{ border: '1px solid #e0e0e0', borderRadius: 8, padding: 16, marginBottom: 16 }}>
              <legend style={{ fontWeight: 600, color: '#1976d2' }}>Kişisel Bilgiler</legend>
              <input
                type="text"
                placeholder="İsim Soyisim"
                value={formData.adSoyad}
                onChange={e => setFormData({ ...formData, adSoyad: e.target.value })}
                style={{ width: '100%', marginBottom: 8 }}
              />
              <input
                type="text"
                placeholder="Ünvan (örn: Ürün Yöneticisi)"
                value={formData.unvan}
                onChange={e => setFormData({ ...formData, unvan: e.target.value })}
                style={{ width: '100%', marginBottom: 8 }}
              />
              <input
                type="text"
                placeholder="Telefon"
                value={formData.telefon}
                onChange={e => setFormData({ ...formData, telefon: e.target.value })}
                style={{ width: '100%', marginBottom: 8 }}
              />
              <input
                type="email"
                placeholder="E-posta"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                style={{ width: '100%', marginBottom: 8 }}
              />
              <input
                type="text"
                placeholder="Adres"
                value={formData.adres}
                onChange={e => setFormData({ ...formData, adres: e.target.value })}
                style={{ width: '100%', marginBottom: 8 }}
              />
              <label htmlFor="fotoInput" style={{ display: 'block', marginBottom: 8, cursor: 'pointer', color: '#1976d2', fontWeight: 500 }}>
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
                style={{ display: 'none' }}
              />
            </fieldset>
            {/* Özgeçmiş Özeti */}
            <fieldset style={{ border: '1px solid #e0e0e0', borderRadius: 8, padding: 16, marginBottom: 16 }}>
              <legend style={{ fontWeight: 600, color: '#1976d2' }}>Özgeçmiş Özeti</legend>
              <textarea
                placeholder="Özgeçmiş Özeti"
                value={formData.ozet}
                onChange={e => setFormData({ ...formData, ozet: e.target.value })}
                style={{ width: '100%', minHeight: 50 }}
              />
            </fieldset>
            {/* Deneyim/Eğitim/Beceri/Dil */}
            <fieldset style={{ border: '1px solid #e0e0e0', borderRadius: 8, padding: 16, marginBottom: 16 }}>
              <legend style={{ fontWeight: 600, color: '#1976d2' }}>Deneyim & Eğitim</legend>
              <textarea
                placeholder={``}
                value={formData.deneyimler}
                onChange={e => setFormData({ ...formData, deneyimler: e.target.value })}
                style={{ width: '100%', marginBottom: 8, minHeight: 80 }}
              />
              <textarea
                placeholder="Eğitim Bilgileri"
                value={formData.egitim}
                onChange={e => setFormData({ ...formData, egitim: e.target.value })}
                style={{ width: '100%', marginBottom: 8, minHeight: 40 }}
              />
            </fieldset>
            <fieldset style={{ border: '1px solid #e0e0e0', borderRadius: 8, padding: 16, marginBottom: 16 }}>
              <legend style={{ fontWeight: 600, color: '#1976d2' }}>Beceriler & Diller</legend>
              <textarea
                placeholder={``}
                value={formData.beceriler}
                onChange={e => setFormData({ ...formData, beceriler: e.target.value })}
                style={{ width: '100%', marginBottom: 8, minHeight: 40 }}
              />
              <textarea
                placeholder={``}
                value={formData.diller}
                onChange={e => setFormData({ ...formData, diller: e.target.value })}
                style={{ width: '100%', minHeight: 30 }}
              />
            </fieldset>
          </form>
          <button onClick={reactToPrintFn} style={{ marginTop: 16 }}>PDF İndir</button>
        </div>
        {/* Sağda CV Şablonu */}
        <div style={{ flex: 2, background: '#f3f3f3', padding: 24 }}>
          <div ref={contentRef}>
            <ModernCVTemplate formData={formData} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;