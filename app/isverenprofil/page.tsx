import React from 'react'
import Header from '../components/header'
import Footer from '../components/footer'
import EmployerProfile from '../components/EmployerProfile'

export const isverenprofil = () => {
    return (
        <>
            <Header />
            <main className='mb-16'>
                <EmployerProfile />
            </main>
            <Footer />
        </>
    )
}
export default isverenprofil