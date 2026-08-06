import React, { useEffect, useState } from 'react'
import Nav from '../components/Nav.jsx'
import Hero from '../components/Hero.jsx'
import Background from '../components/Background.jsx'
import Product from './Product.jsx'
import OurPolicy from '../components/OurPolicy.jsx'
import NewLaterBox from '../components/NewLaterBox.jsx'
import Footer from '../components/Footer.jsx'


function Home() {
  let heroData=[
    {text1:"30% OFF limited offer",text2:"style that"},
    {text1:"Discover the Best Blod of Fashion",text2:"Limited Time Only!"},
    {text1:"Explore Over Best Collection",text2:"Shop Now!"},
    {text1:"Choose Your Perfect Fashion Fit",text2:"Now on Sale!"}
  ]
  let [heroCount,setHeroCount]=useState(0)
useEffect(() => {
  const interval = setInterval(() => {
    setHeroCount(prevCount => (prevCount === 3 ? 0 : prevCount + 1));
  }, 3000);

  return () => clearInterval(interval);
}, []);
  return (
  <div className='overflow-x-hidden relative top-[70px] '>
<div className="relative lg:w-[100vw] lg:h-[100vh] md:h-[50vh] sm:h-[30vh]   overflow-hidden ">
  <Background heroCount={heroCount} />
  <Hero
    heroCount={heroCount}
    setHeroCount={setHeroCount}
    heroData={heroData[heroCount]}
  />
</div>
<Product/>
<OurPolicy/>
<NewLaterBox/>
<Footer/>
</div>
  )
}

export default Home
