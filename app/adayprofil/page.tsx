import React from 'react'
import Header from '../components/header'
import Footer from '../components/footer'
import CandidateProfile from '../components/CandidateProfile'

export const adayprofil = () => {
  return (
    <>
      <Header />
      <main className='mb-16'>
        <CandidateProfile />
      </main>
      
      <Footer />
    </>
  )
}
export default adayprofil