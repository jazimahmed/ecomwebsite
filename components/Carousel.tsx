'use client'
import React, { useEffect, useState } from 'react'

const images = [
  'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80',
  'https://plus.unsplash.com/premium_photo-1683887064106-531532ecdf20?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cHJvZHVjdHN8ZW58MHx8MHx8fDA%3D',
  'https://images.unsplash.com/photo-1627384113972-f4c0392fe5aa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTR8fHByb2R1Y3RzfGVufDB8fDB8fHww'
]

const Carousel = () => {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % images.length)
  }

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <div className='w-full h-[360px] bg-gray-100 pt-10 '>
    <div className="relative w-[1000px]  mx-auto overflow-hidden shadow-xl bg-gray-600">
      <div className="flex transition-transform duration-700 ease-in-out  " style={{ transform: `translateX(-${current * 100}%)` }}>
        {images.map((src, idx) => (
          <img key={idx} src={src} alt={`slide-${idx}`} className="w-full flex-shrink-0 h-72 object-cover" />
        ))}
      </div>

      {/* Buttons */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-3 -translate-y-1/2 bg-white/80 hover:bg-white text-black px-3 py-1 rounded-full shadow"
      >
        ◀
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-3 -translate-y-1/2 bg-white/80 hover:bg-white text-black px-3 py-1 rounded-full shadow"
      >
        ▶
      </button>

      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-3 h-3 rounded-full ${idx === current ? 'bg-black' : 'bg-gray-300'}`}
          />
        ))}
      </div>
    </div>
    </div>
  )
}

export default Carousel
