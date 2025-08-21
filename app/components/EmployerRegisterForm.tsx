import React, { useState } from "react";
import Link from "next/link";
import { registerEmployer } from "../api/api"; // API fonksiyonunu içe aktar

const EmployerRegisterForm: React.FC = () => {
  const [form, setForm] = useState({
    vergiNo: "",
    unvan: "",
    vergiDairesi: "",
    email: "",
    password: "",
    passwordRepeat: "",
    phone: "",
    kvkk: false,
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
    if (!form.kvkk) {
      setError("KVKK Aydınlatma Metnini onaylamalısınız.");
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
      const res = await registerEmployer({
        Email: form.email,
        Password: form.password,
        CompanyName: form.unvan,
        Phone: form.phone,
      });
      if (!res.ok) {
        const errorData = await res.json();
        setError(errorData.errors?.[0] || "Kayıt başarısız!");
        setSuccess("");
        return;
      }
      setSuccess("Kayıt başarılı!");
      setForm({
        vergiNo: "",
        unvan: "",
        vergiDairesi: "",
        email: "",
        password: "",
        passwordRepeat: "",
        phone: "",
        kvkk: false,
      });
    } catch {
      setError("Sunucuya ulaşılamıyor!");
      setSuccess("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white rounded-xl p-12 flex flex-col gap-6 shadow-lg border border-blue-100"
      >
        <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">İşveren Kayıt Formu</h2>
        <div className="grid grid-cols-2 gap-6">
          <input
            type="text"
            name="vergiNo"
            placeholder="Vergi No *"
            value={form.vergiNo}
            onChange={handleChange}
            className="bg-blue-50 rounded px-4 py-3 font-semibold border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
            required
          />
          <input
            type="text"
            name="unvan"
            placeholder="İşveren Ünvanı *"
            value={form.unvan}
            onChange={handleChange}
            className="bg-blue-50 rounded px-4 py-3 font-semibold border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
            required
          />
          <input
            type="text"
            name="vergiDairesi"
            placeholder="Vergi Dairesi *"
            value={form.vergiDairesi}
            onChange={handleChange}
            className="bg-blue-50 rounded px-4 py-3 font-semibold border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="E-posta *"
            value={form.email}
            onChange={handleChange}
            className="bg-blue-50 rounded px-4 py-3 font-semibold border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Telefon *"
            value={form.phone}
            onChange={handleChange}
            className="bg-blue-50 rounded px-4 py-3 font-semibold border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Parola *"
            value={form.password}
            onChange={handleChange}
            className="bg-blue-50 rounded px-4 py-3 font-semibold border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
            required
          />
          <input
            type="password"
            name="passwordRepeat"
            placeholder="Parola Tekrar *"
            value={form.passwordRepeat}
            onChange={handleChange}
            className="bg-blue-50 rounded px-4 py-3 font-semibold border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
            required
          />
        </div>
        <label className="flex items-center text-blue-700 text-sm mt-2">
          <input
            type="checkbox"
            name="kvkk"
            checked={form.kvkk}
            onChange={handleChange}
            className="mr-2"
            required
          />
          KVKK Aydınlatma Metnini <a href="#" className="underline ml-1">okudum.</a>
        </label>
        {error && <span className="text-red-500">{error}</span>}
        {success && <span className="text-green-500">{success}</span>}
        <button
          type="submit"
          className="bg-blue-600 text-white rounded px-6 py-3 font-semibold mt-4 hover:bg-blue-700 transition"
        >
          Kayıt Ol
        </button>        
      <div className="flex justify-between mt-6">
          <a
            href="/giris"
            className="text-blue-600 underline font-medium hover:text-blue-800 transition"
          >
            Giriş Yap
          </a>
          <Link
            href="/"
            className="text-blue-600 underline font-medium hover:text-blue-800 transition"
          >
            Anasayfa
          </Link>
        </div>
      </form>
    </div>
  );
};

export default EmployerRegisterForm;