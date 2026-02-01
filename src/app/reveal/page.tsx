'use client'
import React, {useEffect, useRef, useState} from 'react'
import 'reveal.js/dist/reveal.css'
import 'reveal.js/dist/theme/sky.css'
import Reveal from 'reveal.js'
import RevealMenu from 'reveal.js-menu/menu.esm'
import {useShadowDOM} from '../../functions/hooks/shadowDOM'
import {TablePage} from '../sections/table'
import {Button} from '@mui/material';
import {usePathname, useRouter} from "next/navigation";

function Page() {
  const router = useRouter()
  const pathname = usePathname()
  const {containerRef, renderInShadow} = useShadowDOM()
  useEffect(() => {
    const reveal = new Reveal(
      {}
    )
    reveal.initialize({
      plugins: [RevealMenu],
      pdfSeparateFragments: false,
      width: 1697,  // ширина экрана
      height: 1200, // высота = ширина * 1.414 (A4)
      margin: 0,
      minScale: 1,
      maxScale: 1,
    })
  }, [])

  useEffect(() => {
    // Рендерим кнопку в Shadow DOM
    renderInShadow(
      <Button
        classes={{
          root: 'controls controls__button'
        }}
        variant={'contained'}
        sx={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          zIndex: 100,
          backgroundColor: '#1976d2',
          color: 'white',
          '&:hover': {
            backgroundColor: '#115293'
          }
        }}
        className={'controls'}
        onClick={() => {
          window.open(`${pathname}/?print-pdf`, '_blank')
        }}
      >
        Поготовить печать
      </Button>
    )
  }, [renderInShadow])
  return (
    <>
      <div className="reveal">
        <div className="slides">
          <section>
            <TablePage/>
            <Button variant={'contained'}
                    sx={{
                      position: 'absolute',
                      top: '100px',
                      left: '100px',
                      zIndex: 100000
                    }}
                    className={'controls'}> Печать</Button>
          </section>
          <section>Тут второй слайд</section>
          <section>
            <section>Тут четвертый слайд</section>
            <section>Тут пятый слайд</section>
          </section>
        </div>
      </div>
      <div ref={containerRef} style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 10000,
        pointerEvents: 'none'
      }}/>
    </>
  )
}

export default Page
