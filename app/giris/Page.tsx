'use client'
import React from 'react'
import { Header } from '../components/header'
import { Footer } from '../components/footer'
import LoginForm from '../components/LoginForm'

export const giris = () => {
  return (
    <>
      <Header />
      <main className="flex min-h-screen items-center justify-center bg-gray-100">
        <LoginForm />
      </main>
      <Footer />
    </>
  )
}
export default giris;