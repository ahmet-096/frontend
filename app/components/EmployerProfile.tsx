'use client'
import React, { useState, useEffect } from "react";
import { getCurrentUser } from "../api/api"; // API fonksiyonunu kullan

const initialProfile = {
  companyName: "",
  email: "",
  phone: "",
  sector: "",
  website: "",
  address: "",
  about: "",
  logo: "",
};

const EmployerProfile: React.FC = () => {
  const [profile, setProfile] = useState(initialProfile);
  const [form, setForm] = useState(initialProfile);
  const [editing, setEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [logoPreview, setLogoPreview] = useState<string>("");
  const [showLogoInput, setShowLogoInput] = useState(false);

  // Sadece email ve telefon API'den geliyor, diğerleri doldurulabilir
  useEffect(() => {
    async function fetchProfile() {
      // Token'ı localStorage'dan veya context'ten alabilirsin
      const token = localStorage.getItem("token");
      if (!token) return;
      try {
        const res = await getCurrentUser(token);
        if (res.ok) {
          const data = await res.json();
          setProfile({
            ...initialProfile,
            email: data.email || "",
            phone: data.phone || "",
          });
          setForm({
            ...initialProfile,
            email: data.email || "",
            phone: data.phone || "",
          });
        }
      } catch (err) {
        // Hata yönetimi eklenebilir
      }
    }
    fetchProfile();
  }, []);

  const handleEdit = () => {
    setForm(profile);
    setLogoPreview(profile.logo);
    setEditing(true);
  };

  const handleSave = () => {
    setProfile(form);
    setEditing(false);
    // API'ye güncelleme gönderilebilir
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
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-900 via-blue-700 to-blue-400 flex flex-col items-center justify-center relative">
      <div className="absolute top-0 left-0 w-full h-72 bg-gradient-to-r from-blue-900 to-blue-600 z-0" />
      <div className="relative z-10 flex flex-col items-center w-full max-w-3xl mx-auto pt-32 pb-16 px-6">
        <button
          className="absolute top-8 right-8 text-red-500 hover:bg-red-100 rounded-full p-2 transition"
          onClick={handleDelete}
          title="Şirket Profilini Sil"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="flex flex-col items-center mb-8">
          <div className="w-36 h-36 rounded-full bg-white flex items-center justify-center shadow-xl border-8 border-blue-200 overflow-hidden mb-4">
            {profile.logo ? (
              <img src={profile.logo} alt="Logo" className="w-full h-full object-cover" />
            ) : (
              <span className="text-blue-700 text-6xl font-extrabold">
                {profile.companyName
                  ? profile.companyName.split(" ").map(n => n[0]).join("")
                  : "?"}
              </span>
            )}
          </div>
          <h2 className="text-4xl font-extrabold mb-2 text-white drop-shadow">{profile.companyName}</h2>
          {profile.sector && (
            <span className="inline-block bg-blue-200 text-blue-900 px-6 py-2 rounded-full text-lg font-semibold mb-4 shadow">
              {profile.sector}
            </span>
          )}
        </div>
        {!editing ? (
          <>
            <div className="bg-white bg-opacity-90 rounded-2xl py-8 px-8 mb-8 w-full shadow-lg flex flex-col gap-4 items-center">
              <div><b>Email:</b> <a href={`mailto:${profile.email}`} className="text-blue-700 underline">{profile.email}</a></div>
              <div><b>Telefon:</b> <span className="text-gray-700">{profile.phone}</span></div>
              {profile.website && (
                <div><b>Web:</b> <a href={profile.website} target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">{profile.website}</a></div>
              )}
              {profile.address && (
                <div><b>Adres:</b> <span className="text-gray-700">{profile.address}</span></div>
              )}
            </div>
            {profile.about && (
              <p className="italic text-gray-100 bg-blue-800 bg-opacity-80 rounded-xl p-6 mb-8 w-full text-lg shadow text-center">{profile.about}</p>
            )}
            <button
              className="bg-blue-700 hover:bg-blue-800 text-white font-semibold px-12 py-3 rounded-xl shadow-lg transition text-lg"
              onClick={handleEdit}
            >
              Profili Düzenle
            </button>
          </>
        ) : (
          <form className="bg-white bg-opacity-95 rounded-2xl p-10 w-full shadow-xl mt-4 mb-4" onSubmit={e => { e.preventDefault(); handleSave(); }}>
            <div className="mb-6 flex flex-col items-center">
              <label className="block font-medium mb-2">Logo / Fotoğraf</label>
              <div className="w-28 h-28 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden mb-2 border">
                {logoPreview ? (
                  <img src={logoPreview} alt="Logo Preview" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-gray-400 text-4xl font-bold">
                    {form.companyName
                      ? form.companyName.split(" ").map(n => n[0]).join("")
                      : "?"}
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
                disabled // Sadece görüntülenir, değiştirilemez
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
                disabled // Sadece görüntülenir, değiştirilemez
              />
            </div>
            <div className="mb-4">
              <label className="block font-medium mb-1">Sektör</label>
              <input
                name="sector"
                value={form.sector}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
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
              />
            </div>
            <div className="mb-4">
              <label className="block font-medium mb-1">Adres</label>
              <input
                name="address"
                value={form.address}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
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