'use client'
import React from 'react'
import Header from '../components/header'
import Footer from '../components/footer'
import AddJobForm from '../components/AddJobForm'

export const ilanekle = () => {
  return (
    <>
      <Header />
      <AddJobForm onJobAdded={() => { /* handle job added */ }} />
      <Footer />
    </>
  )
}
export default ilanekle
