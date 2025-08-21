

import Image from "next/image";

export default function ContactPage() {
  return (
    <>
      
      <section className="max-w-4xl mx-auto py-12 px-4">
        <div className="flex flex-col items-center mb-10">
          <Image
            src="/images/logo.png"
            alt="Beylikdüzü Kariyer Merkezi"
            width={80}
            height={80}
            className="mb-4"
          />
          <h1 className="text-3xl font-bold text-blue-700 mb-2">İletişim</h1>
          <p className="text-gray-600 text-center">
            Sorularınız, önerileriniz veya başvurularınız için bizimle iletişime geçebilirsiniz.
          </p>
        </div>
         {/* İletişim Formu */}
        <div className="bg-white rounded-lg shadow p-6 mb-10">
          <form className="grid gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ad Soyad</label>
              <input type="text" className="w-full border border-blue-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-100" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">E-posta</label>
              <input type="email" className="w-full border border-blue-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-100" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mesajınız</label>
              <textarea className="w-full border border-blue-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-100" rows={4} required />
            </div>
            <button
              type="submit"
              className="bg-blue-700 text-white rounded px-6 py-2 font-semibold shadow hover:bg-blue-800 transition"
            >
              Gönder
            </button>
          </form>
        </div>
        {/* Harita */}
        <div className="mb-10 rounded-lg overflow-hidden shadow">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3010.628353273903!2d28.64651307585875!3d41.01150697135022!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14b55f0ad02270cf%3A0xc150d2dfb06b3109!2sBeylicium%20Avm!5e0!3m2!1str!2str!4v1755177843642!5m2!1str!2str"
            width="100%"
            height="320"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        {/* Ofis Bilgileri */}
        <div className="bg-blue-50 rounded-lg p-6 mb-10">
          <h2 className="text-lg font-bold text-blue-700 mb-2">Ofis Bilgilerimiz</h2>
          <div className="mb-2">
            <span className="font-semibold text-blue-700">Merkez</span>
            <p className="text-gray-700 text-sm mt-1">
              Büyükşehir Mah. E-5 Karayolu<br />
              Beylikdüzü Cad. No:9 Beylicium AVM<br />
              34520, Beylikdüzü/İstanbul, Türkiye
            </p>
          </div>
          <div className="mb-2">
            <span className="font-semibold text-blue-700">Telefon:</span>{" "}
            <a href="tel:4440939" className="text-blue-700 underline">444 09 39</a>
          </div>
          <div>
            <span className="font-semibold text-blue-700">E-posta:</span>{" "}
            <a href="mailto:beykam@beylikduzu.istanbul" className="text-blue-700 underline">beykam@beylikduzu.istanbul</a>
          </div>
        </div>
       
        {/* SSS */}
        <div className="mb-10">
          <h2 className="text-xl font-bold text-blue-700 mb-4">Sıkça Sorulan Sorular</h2>
          <div className="space-y-4">
            <details className="bg-blue-50 rounded p-4">
              <summary className="cursor-pointer font-semibold text-blue-700">Başvuru nasıl yapılır?</summary>
              <p className="mt-2 text-gray-700">Sitemizdeki &quot;İş İlanları&quot; bölümünden uygun pozisyonu seçip başvuru formunu doldurarak başvurunuzu gerçekleştirebilirsiniz.</p>
            </details>
            <details className="bg-blue-50 rounded p-4">
              <summary className="cursor-pointer font-semibold text-blue-700">CV oluşturmak zorunlu mu?</summary>
              <p className="mt-2 text-gray-700">Başvurularınızda daha iyi değerlendirme için CV oluşturmanız önerilir. Sitemizde kolayca CV oluşturabilirsiniz.</p>
            </details>
            <details className="bg-blue-50 rounded p-4">
              <summary className="cursor-pointer font-semibold text-blue-700">Başvuru sonucunu nasıl öğrenebilirim?</summary>
              <p className="mt-2 text-gray-700">Başvurunuzun durumu e-posta ile veya sistem üzerinden size bildirilecektir.</p>
            </details>
            <details className="bg-blue-50 rounded p-4">
              <summary className="cursor-pointer font-semibold text-blue-700">İletişim bilgileri nedir?</summary>
              <p className="mt-2 text-gray-700">Bize bu sayfadaki formdan veya <a href="mailto:beykam@beylikduzu.istanbul" className="text-blue-700 underline">beykam@beylikduzu.istanbul</a> adresinden ulaşabilirsiniz.</p>
            </details>
          </div>
        </div>
      </section>
     
    </>
  );
}