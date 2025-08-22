'use client'
import React, { useState } from "react";

const initialProfile = {
  name: "Ahmet Yılmaz",
  email: "ahmet.yilmaz@example.com",
  phone: "+90 555 123 45 67",
  profession: "Yazılım Geliştirici",
  bio: "5 yıldır web geliştirme alanında çalışıyorum. React ve Node.js konusunda uzmanım.",
  photo: "",
};

const CandidateProfile: React.FC = () => {
  const [profile, setProfile] = useState(initialProfile);
  const [form, setForm] = useState(initialProfile);
  const [editing, setEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string>("");
  const [showPhotoInput, setShowPhotoInput] = useState(false);

  const handleEdit = () => {
    setForm(profile);
    setPhotoPreview(profile.photo);
    setEditing(true);
  };

  const handleSave = () => {
    setProfile(form);
    setEditing(false);
    setShowPhotoInput(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
        setForm((prev) => ({ ...prev, photo: reader.result as string }));
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
    <div className="max-w-md mx-auto mt-16 p-8 bg-gradient-to-br from-gray-50 to-blue-50 rounded-3xl shadow-xl text-center relative">
      <button
        className="absolute top-6 right-6 text-red-500 hover:bg-red-100 rounded-full p-2 transition"
        onClick={handleDelete}
        title="Hesabı Sil"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <div className="flex justify-center mb-4">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center text-white text-4xl font-bold shadow-lg overflow-hidden border-4 border-white">
          {profile.photo ? (
            <img src={profile.photo} alt="Profil Fotoğrafı" className="w-full h-full object-cover" />
          ) : (
            <span>
              {profile.name.split(" ").map(n => n[0]).join("")}
            </span>
          )}
        </div>
      </div>
      {!editing ? (
        <>
          <h2 className="text-2xl font-bold mb-1">{profile.name}</h2>
          <span className="inline-block bg-purple-100 text-purple-700 px-4 py-1 rounded-lg text-base font-medium mb-4">
            {profile.profession}
          </span>
          <div className="bg-gray-100 rounded-lg py-3 mb-4 text-base shadow">
            <div className="mb-1"><b>Email:</b> {profile.email}</div>
            <div><b>Telefon:</b> {profile.phone}</div>
          </div>
          <p className="italic text-gray-600 bg-gray-50 rounded-lg p-3 mb-4">{profile.bio}</p>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-2 rounded-lg shadow transition"
            onClick={handleEdit}
          >
            Düzenle
          </button>
        </>
      ) : (
        <form className="text-left mt-2" onSubmit={e => { e.preventDefault(); handleSave(); }}>
          <div className="mb-6 flex flex-col items-center">
            <label className="block font-medium mb-2">Fotoğraf</label>
            <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden mb-2 border">
              {photoPreview ? (
                <img src={photoPreview} alt="Fotoğraf Önizleme" className="w-full h-full object-cover" />
              ) : (
                <span className="text-gray-400 text-3xl font-bold">
                  {form.name.split(" ").map(n => n[0]).join("")}
                </span>
              )}
            </div>
            {!showPhotoInput && (
              <button
                type="button"
                className="bg-blue-100 hover:bg-blue-200 text-blue-700 font-semibold px-4 py-1 rounded-lg shadow transition text-sm"
                onClick={() => setShowPhotoInput(true)}
              >
                Fotoğraf Değiştir
              </button>
            )}
            {showPhotoInput && (
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
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
            <label className="block font-medium mb-1">Ad Soyad</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-1">Meslek</label>
            <input
              name="profession"
              value={form.profession}
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
          <div className="mb-6">
            <label className="block font-medium mb-1">Kısa Biyografi</label>
            <textarea
              name="bio"
              value={form.bio}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
            />
          </div>
          <div className="text-center mt-6">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-2 rounded-lg shadow mr-3 transition"
            >
              Kaydet
            </button>
            <button
              type="button"
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold px-8 py-2 rounded-lg shadow transition"
              onClick={() => setEditing(false)}
            >
              İptal
            </button>
          </div>
        </form>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <div className="bg-white rounded-xl shadow-xl p-8 max-w-sm w-full text-center">
            <h3 className="text-lg font-bold mb-4">Hesabı Sil</h3>
            <p className="mb-6">Hesabınızı silmek istediğinize emin misiniz? Bu işlem geri alınamaz.</p>
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
  );
};

export default CandidateProfile;