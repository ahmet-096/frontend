'use client'
import React from 'react'
import EmployerRegisterForm from '../components/EmployerRegisterForm'
import { Header } from '../components/header'
import { Footer } from '../components/footer'

const IsVerenKayit = () => {
  return (
    <>
      <Header />
      <main className="flex min-h-screen items-center justify-center bg-gray-100">
        <EmployerRegisterForm />
      </main>
      <Footer />
    </>
  )
}
export default IsVerenKayit;