import React from 'react'
import NavBar from '../components/navbar'
import Footer from '../components/footer'
import Hero from '../pages/dashboard/hero'
import Isiblog from '../pages/dashboard/isiblog'
import Rating from '../pages/dashboard/rating'
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
