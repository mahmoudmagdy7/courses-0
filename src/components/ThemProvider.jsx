import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'

export default function ThemProvider({ children }) {

  useEffect(function () {
    if (localStorage.getItem('theme') === 'light-theme' || localStorage.getItem('theme') === null) {
      document.body.classList.add('light-theme')
    } else {
      document.body.classList.add('dark-theme')
    }

  }, [])
  return <>
    {children}

  </>
}
