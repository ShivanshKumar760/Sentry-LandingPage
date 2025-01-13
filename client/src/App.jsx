/* eslint-disable */
import { useState } from 'react'
import Hero from './components/Hero'
import About from './components/About'
import NavBar from './components/Navbar'
import Features from './components/Features'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <main className='relative min-h-screen w-screen'>
        <NavBar/>
        <Hero/>
        {/* <section className='z-0 min-h-screen bg-blue-500'/> */}
        <About/>
        <Features/>
      </main>
    </>
  )
}

export default App
