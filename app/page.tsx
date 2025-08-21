'use client'
import { Header } from "./components/header";
import { Footer } from "./components/footer";
import AdayKayitForm from "./components/CandidateRegisterForm";

export default function Home() {
  return (
    <>
      <Header />
      <AdayKayitForm />
      <Footer />
    </>
  );
}
