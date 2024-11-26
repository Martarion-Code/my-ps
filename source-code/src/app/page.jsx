import React from 'react'
import Hero from '@/components/dashboard/hero'
import Isiblog from '@/components/dashboard/isiblog'
import Rating from '@/components/dashboard/rating'
import Footer from '@/components/footer'
import NavBar from '@/components/navbar'
export default function dashboard() {
  return (
    <>
    <NavBar/>
    <Hero/>
    <Isiblog/>
    <Rating/>
    <Footer/>
    </>
  )
}
