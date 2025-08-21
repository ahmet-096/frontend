'use client'
import React from 'react'
import CandidateRegisterFrom from '../components/CandidateRegisterForm'
import { Header } from '../components/header'
import { Footer } from '../components/footer'

export const AdayKayit = () => {
  return (
    <>      
      <Header />
      <main className="flex min-h-screen items-center justify-center bg-gray-100">
       <CandidateRegisterFrom />
      </main>
      <Footer />
    </>
  );
}
export default AdayKayit;
