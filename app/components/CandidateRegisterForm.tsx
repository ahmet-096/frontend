import React, { useState } from "react";
import Link from "next/link";
import { registerCandidate } from "../api/api";

const AdayKayitForm: React.FC = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    passwordRepeat: "",
    ad: "",
    soyad: "",
    telefon: "",
    kvkk: false,
    acikRiza: false,
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.kvkk || !form.acikRiza) {
      setError("KVKK ve Açık Rıza onaylarını vermelisiniz.");
      setSuccess("");
      return;
    }
    if (form.password !== form.passwordRepeat) {
      setError("Parolalar eşleşmiyor!");
      setSuccess("");
      return;
    }
    setError("");
    setSuccess("");

    try {
      const response = await registerCandidate({
        Email: form.email,
        Password: form.password,
        FirstName: form.ad,
        LastName: form.soyad,
        PhoneNumber: form.telefon,
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.errors?.[0] || "Kayıt başarısız!");
        setSuccess("");
        return;
      }

      setSuccess("Kayıt başarılı!");
      setForm({
        email: "",
        password: "",
        passwordRepeat: "",
        ad: "",
        soyad: "",
        telefon: "",
        kvkk: false,
        acikRiza: false,
      });
    } catch {
      setError("Sunucuya ulaşılamıyor!");
      setSuccess("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md bg-white rounded-xl p-8 flex flex-col gap-4 shadow-lg border border-blue-100">
      <h2 className="text-2xl font-bold text-blue-700 mb-2 text-center">Aday Kayıt Formu</h2>
      <input
        type="text"
        name="ad"
        placeholder="Ad *"
        value={form.ad}
        onChange={handleChange}
        className="bg-blue-50 rounded px-4 py-2 font-semibold border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
        required
      />
      <input
        type="text"
        name="soyad"
        placeholder="Soyad *"
        value={form.soyad}
        onChange={handleChange}
        className="bg-blue-50 rounded px-4 py-2 font-semibold border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
        required
      />
      <input
        type="email"
        name="email"
        placeholder="E-posta *"
        value={form.email}
        onChange={handleChange}
        className="bg-blue-50 rounded px-4 py-2 font-semibold border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
        required
      />
      <input
        type="text"
        name="telefon"
        placeholder="Telefon *"
        value={form.telefon}
        onChange={handleChange}
        className="bg-blue-50 rounded px-4 py-2 font-semibold border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Parola *"
        value={form.password}
        onChange={handleChange}
        className="bg-blue-50 rounded px-4 py-2 font-semibold border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
        required
      />
      <input
        type="password"
        name="passwordRepeat"
        placeholder="Parola Tekrar *"
        value={form.passwordRepeat}
        onChange={handleChange}
        className="bg-blue-50 rounded px-4 py-2 font-semibold border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
        required
      />
      <label className="flex items-center text-blue-700 text-sm mt-2">
        <input
          type="checkbox"
          name="kvkk"
          checked={form.kvkk}
          onChange={handleChange}
          className="mr-2"
        />
        KVKK Aydınlatma Metnini <a href="#" className="underline ml-1">okudum.</a>
      </label>
      <label className="flex items-center text-blue-700 text-sm mt-1">
        <input
          type="checkbox"
          name="acikRiza"
          checked={form.acikRiza}
          onChange={handleChange}
          className="mr-2"
        />
        Açık Rıza Beyanını <span className="text-blue-500">onaylıyorum.</span>
      </label>
      {error && <span className="text-red-500">{error}</span>}
      {success && <span className="text-green-500">{success}</span>}
      <button
        type="submit"
        className="bg-blue-600 text-white rounded px-4 py-2 font-semibold mt-4 hover:bg-blue-700 transition"
      >
        Kayıt Ol
      </button>
      <div className="flex justify-between mt-6">
        <Link
          href="/giris"
          className="text-blue-600 underline font-medium hover:text-blue-800 transition"
        >
          Giriş Yap
        </Link>
        <Link
          href="/"
          className="text-blue-600 underline font-medium hover:text-blue-800 transition"
        >
          Anasayfa
        </Link>
      </div>
    </form>
  );
};

export default AdayKayitForm;