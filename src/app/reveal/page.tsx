'use client'
import React, {useEffect} from 'react'
import 'reveal.js/dist/reveal.css'
import 'reveal.js/dist/theme/serif.css'
import Reveal from 'reveal.js'

function Page() {
useEffect(() => {
  const reveal = new Reveal(
    {

    }
  )
  reveal.initialize()
}, [])
return (
  <div className="reveal">
    <div className="slides">
      <section>Hello World</section>
      <section>Hello two World</section>
    </div>
  </div>
)
}
export default Page
