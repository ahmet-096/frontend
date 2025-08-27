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

const ProfilePhoto: React.FC<{
  photo: string;
  name: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  editing?: boolean;
}> = ({ photo, name, onChange, editing }) => (
  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center text-white text-4xl font-bold shadow-lg overflow-hidden border-4 border-white mb-4">
    {photo ? (
      <img src={photo} alt="Profil Fotoğrafı" className="w-full h-full object-cover" />
    ) : (
      <span>{name.split(" ").map(n => n[0]).join("")}</span>
    )}
    {editing && (
      <input
        type="file"
        accept="image/*"
        onChange={onChange}
        className="absolute opacity-0 w-24 h-24 cursor-pointer"
        style={{ left: 0, top: 0 }}
      />
    )}
  </div>
);

const Modal: React.FC<{ show: boolean; onConfirm: () => void; onCancel: () => void }> = ({ show, onConfirm, onCancel }) =>
  show ? (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white rounded-xl shadow-xl p-8 max-w-sm w-full text-center">
        <h3 className="text-lg font-bold mb-4">Hesabı Sil</h3>
        <p className="mb-6">Hesabınızı silmek istediğinize emin misiniz? Bu işlem geri alınamaz.</p>
        <button className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded-lg shadow mr-3 transition" onClick={onConfirm}>Evet, Sil</button>
        <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold px-6 py-2 rounded-lg shadow transition" onClick={onCancel}>Vazgeç</button>
      </div>
    </div>
  ) : null;

const fields = [
  { name: "name", label: "Ad Soyad", type: "text" },
  { name: "profession", label: "Meslek", type: "text" },
  { name: "email", label: "Email", type: "email" },
  { name: "phone", label: "Telefon", type: "text" },
  { name: "bio", label: "Kısa Biyografi", type: "textarea" },
];

const CandidateProfile: React.FC = () => {
  const [profile, setProfile] = useState(initialProfile);
  const [form, setForm] = useState(initialProfile);
  const [editing, setEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleEdit = () => { setForm(profile); setEditing(true); };
  const handleSave = () => { setProfile(form); setEditing(false); };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setForm(prev => ({ ...prev, photo: reader.result as string }));
      reader.readAsDataURL(file);
    }
  };
  const handleDelete = () => setShowModal(true);
  const confirmDelete = () => setShowModal(false);

  return (
    <div className="max-w-md mx-auto mt-16 p-8 bg-gradient-to-br from-gray-50 to-blue-50 rounded-3xl shadow-xl text-center relative">
      <button className="absolute top-6 right-6 text-red-500 hover:bg-red-100 rounded-full p-2 transition" onClick={handleDelete} title="Hesabı Sil">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <ProfilePhoto photo={editing ? form.photo : profile.photo} name={editing ? form.name : profile.name} onChange={handlePhotoChange} editing={editing} />
      {!editing ? (
        <>
          <h2 className="text-2xl font-bold mb-1">{profile.name}</h2>
          <span className="inline-block bg-purple-100 text-purple-700 px-4 py-1 rounded-lg text-base font-medium mb-4">{profile.profession}</span>
          <div className="bg-gray-100 rounded-lg py-3 mb-4 text-base shadow">
            <div className="mb-1"><b>Email:</b> {profile.email}</div>
            <div><b>Telefon:</b> {profile.phone}</div>
          </div>
          <p className="italic text-gray-600 bg-gray-50 rounded-lg p-3 mb-4">{profile.bio}</p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-2 rounded-lg shadow transition" onClick={handleEdit}>Düzenle</button>
        </>
      ) : (
        <form className="text-left mt-2" onSubmit={e => { e.preventDefault(); handleSave(); }}>
          {fields.map(f =>
            f.type === "textarea" ? (
              <div className="mb-4" key={f.name}>
                <label className="block font-medium mb-1">{f.label}</label>
                <textarea name={f.name} value={form[f.name as keyof typeof form]} onChange={handleChange} rows={3}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300" required />
              </div>
            ) : (
              <div className="mb-4" key={f.name}>
                <label className="block font-medium mb-1">{f.label}</label>
                <input name={f.name} value={form[f.name as keyof typeof form]} onChange={handleChange} type={f.type}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300" required />
              </div>
            )
          )}
          <div className="text-center mt-6">
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-2 rounded-lg shadow mr-3 transition">Kaydet</button>
            <button type="button" className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold px-8 py-2 rounded-lg shadow transition" onClick={() => setEditing(false)}>İptal</button>
          </div>
        </form>
      )}
      <Modal show={showModal} onConfirm={confirmDelete} onCancel={() => setShowModal(false)} />
    </div>
  );
};

export default CandidateProfile;