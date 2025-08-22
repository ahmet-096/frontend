import React from 'react'
import Header from '../components/header'
import Footer from '../components/footer'
import JobPosts from '../components/JobPosts'

export const page = () => {
  return (
    <>
      <Header />
      <JobPosts />
      <Footer />
    </>
  )
}
export default page