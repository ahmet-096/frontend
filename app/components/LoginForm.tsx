import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { login } from "../api/api";

const LoginForm: React.FC = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    if (!form.email || !form.password) {
      setError("E-posta ve parola gereklidir!");
      setLoading(false);
      return;
    }

    try {
      const res = await login({
        Email: form.email,
        Password: form.password,
      });

      if (!res.ok) {
        setError("Giriş başarısız! Bilgilerinizi kontrol edin.");
        setLoading(false);
        return;
      }

      const data = await res.json();
      console.log("API yanıtı:", data);
      setSuccess("Giriş başarılı!");
      localStorage.setItem("token", data.access_token); // <-- DÜZELTİLDİ
      localStorage.setItem("role", data.role === "Employer" ? "isveren" : data.role === "Candidate" ? "aday" : data.role);

      // Rol bilgisine göre yönlendirme
      if (data.role === "Candidate") {
        router.push("/adaysayfa");
      } else if (data.role === "Employer") {
        router.push("/isverensayfa");
      } else if (data.role === "Admin") {
        router.push("/yoneticipanel");
      } else {
        router.push("/");
      }
    } catch {
      setError("Sunucuya ulaşılamıyor!");
    }
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md bg-white rounded-xl p-8 flex flex-col gap-4 shadow-lg border border-blue-100"
    >
      <h2 className="text-2xl font-bold text-blue-700 mb-2 text-center">Giriş Formu</h2>
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
        type="password"
        name="password"
        placeholder="Parola *"
        value={form.password}
        onChange={handleChange}
        className="bg-blue-50 rounded px-4 py-2 font-semibold border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
        required
      />
      {error && <span className="text-red-500">{error}</span>}
      {success && <span className="text-green-500">{success}</span>}
      <button
        type="submit"
        className="bg-blue-600 text-white rounded px-4 py-2 font-semibold mt-4 hover:bg-blue-700 transition"
        disabled={loading}
      >
        {loading ? "Giriş Yapılıyor..." : "Giriş Yap"}
      </button>
      <div className="flex justify-between mt-6">
        <Link
          href="/adaykayit"
          className="text-blue-600 underline font-medium hover:text-blue-800 transition"
        >
          Aday Kayıt
        </Link>
        <Link
          href="/isverenkayit"
          className="text-blue-600 underline font-medium hover:text-blue-800 transition"
        >
          İşveren Kayıt
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

export default LoginForm;