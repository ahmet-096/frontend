import React from 'react';

export type FormData = {
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

const ModernCVTemplate = React.forwardRef<HTMLDivElement, { formData: FormData }>(
  function ModernCVTemplate({ formData }, ref) {
    return (
      <div
        ref={ref}
     className="relative flex flex-col md:flex-row mx-auto shadow-lg bg-white rounded-lg overflow-hidden"
  style={{
    width: '700px',
    minHeight: '1200px', // A4 için yaklaşık yükseklik
    wordBreak: 'break-word',
    minWidth: 0,
  }}
      >
        {/* Watermark */}
        <div
          className="absolute w-full h-full flex justify-center items-center pointer-events-none select-none z-0"
          style={{
            left: 0,
            top: 0,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <span
            className="font-extrabold"
            style={{
              fontSize: 120,
              color: '#1976d2',
              letterSpacing: 10,
              transform: 'rotate(-25deg)',
              whiteSpace: 'nowrap',
              textAlign: 'center',
              width: '100%',
              userSelect: 'none',
              opacity: 0.12,
            }}
          >
            beykam
          </span>
        </div>
        {/* Sol panel */}
        <div className="z-10 flex flex-col items-center bg-blue-50/85 p-8 border-r border-gray-200 min-w-[220px] w-[260px]">
          <div className="w-24 h-24 rounded-full bg-gray-300 mb-4 flex items-center justify-center overflow-hidden">
            {formData.fotoUrl
              ? (
                <img
                  src={formData.fotoUrl}
                  alt="Fotoğraf"
                  className="w-full h-full object-cover rounded-full"
                />
              )
              : <span className="text-gray-400 text-5xl">👤</span>
            }
          </div>
          <div className="font-bold text-xl mb-2 text-center min-h-[28px] break-words whitespace-pre-line">
            {formData.adSoyad}
          </div>
          <div className="font-medium text-blue-700 mb-4 text-center min-h-[22px] break-words whitespace-pre-line">
            {formData.unvan}
          </div>
          <div className="text-base mb-1 min-h-[20px] break-words whitespace-pre-line">{formData.telefon}</div>
          <div className="text-base mb-1 min-h-[20px] break-words whitespace-pre-line">{formData.email}</div>
          <div className="text-base mb-1 min-h-[20px] break-words whitespace-pre-line">{formData.adres}</div>
        </div>
        {/* Sağ panel */}
        <div className="flex-1 z-10 flex flex-col gap-6 p-8 overflow-y-auto min-w-0">
          <div>
            <h2 className="text-xl font-semibold mb-2">Özgeçmiş Özeti</h2>
            <div className="text-gray-700 min-h-[40px] break-words whitespace-pre-line overflow-hidden">
              {formData.ozet}
            </div>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-2">İş Deneyimleri</h2>
            <div
              className="min-h-[40px] break-words whitespace-pre-line overflow-hidden"
              dangerouslySetInnerHTML={{
                __html: formData.deneyimler
                  ? formData.deneyimler.replace(/\n/g, '<br/>')
                  : '',
              }}
            />
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-2">Eğitim Bilgileri</h2>
            <div className="min-h-[30px] break-words whitespace-pre-line overflow-hidden">
              {formData.egitim}
            </div>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-2">Beceriler</h2>
            <div
              className="min-h-[30px] break-words whitespace-pre-line overflow-hidden"
              dangerouslySetInnerHTML={{
                __html: formData.beceriler
                  ? formData.beceriler.replace(/\n/g, '<br/>')
                  : '',
              }}
            />
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-2">Diller</h2>
            <div className="min-h-[30px] break-words whitespace-pre-line overflow-hidden">
              {formData.diller}
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default ModernCVTemplate;