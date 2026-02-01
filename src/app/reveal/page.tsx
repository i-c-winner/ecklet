'use client'
import React, {useEffect} from 'react'
import 'reveal.js/dist/reveal.css'
import 'reveal.js/dist/theme/sky.css'
import Reveal from 'reveal.js'
import {TablePage} from '../sections/table'



function Page() {
  useEffect(() => {
    const reveal = new Reveal(
      {}
    )
    reveal.initialize({
      plugins: [],
      pdfSeparateFragments: false,
      width: 1697,  // ширина экрана
      height: 1200, // высота = ширина * 1.414 (A4)
      margin: 0,
      minScale: 1,
      maxScale: 1
    })
  }, [])
  return (
    <div className="reveal">
      <div className="slides">
        <section>
        <TablePage/>
        </section>
        <section>Тут второй слайд</section>
        <section>
        <section>Тут четвертый слайд</section>
        <section>Тут пятый слайд</section>
        </section>
      </div>
    </div>
  )
}

export default Page
