'use client'
import React, { useState } from "react";

const initialProfile = {
  companyName: "Beykam Teknoloji A.Ş.",
  email: "info@beykam.com",
  phone: "+90 212 555 00 00",
  sector: "Yazılım & Teknoloji",
  website: "https://www.beykam.com",
  address: "Levent Mah. Büyükdere Cad. No:100, İstanbul",
  about: "Beykam Teknoloji, yenilikçi yazılım çözümleriyle işletmelerin dijital dönüşümünü hızlandırır. 10+ yıllık tecrübe, güçlü ekip.",
  logo: "",
};

const EmployerProfile: React.FC = () => {
  const [profile, setProfile] = useState(initialProfile);
  const [form, setForm] = useState(initialProfile);
  const [editing, setEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [logoPreview, setLogoPreview] = useState<string>("");
  const [showLogoInput, setShowLogoInput] = useState(false);

  const handleEdit = () => {
    setForm(profile);
    setLogoPreview(profile.logo);
    setEditing(true);
  };

  const handleSave = () => {
    setProfile(form);
    setEditing(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
        setForm((prev) => ({ ...prev, logo: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDelete = () => {
    setShowModal(true);
  };

  const confirmDelete = () => {
    setShowModal(false);
    // Burada yönlendirme veya başka bir işlem ekleyebilirsiniz.
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-100 flex items-center justify-center py-16">
      <div className="max-w-xl w-full mx-auto p-10 bg-white rounded-3xl shadow-2xl border border-gray-100 text-center relative mt-8 mb-8">
        <button
          className="absolute top-8 right-8 text-red-500 hover:bg-red-100 rounded-full p-2 transition"
          onClick={handleDelete}
          title="Şirket Profilini Sil"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="flex justify-center mb-6">
          <div className="w-28 h-28 rounded-full bg-gradient-to-br from-blue-700 to-blue-400 flex items-center justify-center shadow-lg border-4 border-white overflow-hidden">
            {profile.logo ? (
              <img src={profile.logo} alt="Logo" className="w-full h-full object-cover" />
            ) : (
              <span className="text-white text-5xl font-extrabold">
                {profile.companyName.split(" ").map(n => n[0]).join("")}
              </span>
            )}
          </div>
        </div>
        {!editing ? (
          <>
            <h2 className="text-3xl font-extrabold mb-2 text-blue-900">{profile.companyName}</h2>
            <span className="inline-block bg-blue-100 text-blue-700 px-5 py-1 rounded-lg text-base font-medium mb-4">
              {profile.sector}
            </span>
            <div className="bg-gray-50 rounded-lg py-4 mb-4 text-base shadow flex flex-col gap-2 items-center">
              <div><b>Email:</b> <a href={`mailto:${profile.email}`} className="text-blue-700 underline">{profile.email}</a></div>
              <div><b>Telefon:</b> <span className="text-gray-700">{profile.phone}</span></div>
              <div><b>Web:</b> <a href={profile.website} target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">{profile.website}</a></div>
              <div><b>Adres:</b> <span className="text-gray-700">{profile.address}</span></div>
            </div>
            <p className="italic text-gray-700 bg-gray-100 rounded-lg p-4 mb-4">{profile.about}</p>
            <button
              className="bg-blue-700 hover:bg-blue-800 text-white font-semibold px-10 py-2 rounded-lg shadow transition"
              onClick={handleEdit}
            >
              Profili Düzenle
            </button>
          </>
        ) : (
          <form className="text-left mt-10 mb-10" onSubmit={e => { e.preventDefault(); handleSave(); }}>
            <div className="mb-6 flex flex-col items-center">
              <label className="block font-medium mb-2">Logo / Fotoğraf</label>
              <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden mb-2 border">
                {logoPreview ? (
                  <img src={logoPreview} alt="Logo Preview" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-gray-400 text-4xl font-bold">
                    {form.companyName.split(" ").map(n => n[0]).join("")}
                  </span>
                )}
              </div>
              {!showLogoInput && (
                <button
                  type="button"
                  className="bg-blue-100 hover:bg-blue-200 text-blue-700 font-semibold px-4 py-1 rounded-lg shadow transition text-sm"
                  onClick={() => setShowLogoInput(true)}
                >
                  Logo Değiştir
                </button>
              )}
              {showLogoInput && (
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoChange}
                  className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-blue-700
                    hover:file:bg-blue-100 mt-2"
                />
              )}
            </div>
            <div className="mb-4">
              <label className="block font-medium mb-1">Şirket Adı</label>
              <input
                name="companyName"
                value={form.companyName}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block font-medium mb-1">Sektör</label>
              <input
                name="sector"
                value={form.sector}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block font-medium mb-1">Email</label>
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                type="email"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block font-medium mb-1">Telefon</label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block font-medium mb-1">Web Sitesi</label>
              <input
                name="website"
                value={form.website}
                onChange={handleChange}
                type="url"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block font-medium mb-1">Adres</label>
              <input
                name="address"
                value={form.address}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block font-medium mb-1">Şirket Hakkında</label>
              <textarea
                name="about"
                value={form.about}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                required
              />
            </div>
            <div className="text-center mt-6">
              <button
                type="submit"
                className="bg-blue-700 hover:bg-blue-800 text-white font-semibold px-10 py-2 rounded-lg shadow mr-3 transition"
              >
                Kaydet
              </button>
              <button
                type="button"
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold px-10 py-2 rounded-lg shadow transition"
                onClick={() => setEditing(false)}
              >
                İptal
              </button>
            </div>
          </form>
        )}

        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30 px-4">
            <div className="bg-white rounded-xl shadow-xl p-8 max-w-sm w-full text-center mt-16 mb-16">
              <h3 className="text-lg font-bold mb-4">Şirket Profilini Sil</h3>
              <p className="mb-6">Profilinizi silmek istediğinize emin misiniz? Bu işlem geri alınamaz.</p>
              <button
                className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded-lg shadow mr-3 transition"
                onClick={confirmDelete}
              >
                Evet, Sil
              </button>
              <button
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold px-6 py-2 rounded-lg shadow transition"
                onClick={() => setShowModal(false)}
              >
                Vazgeç
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployerProfile;