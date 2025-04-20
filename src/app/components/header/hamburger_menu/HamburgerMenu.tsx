'use client'

import {useState} from 'react'
import classes from './HamburgerMenu.module.css'

export default function HamburgerMenu() {
  const [hamburgerMenuTrigger, setHamburgerMenuTrigger] = useState(false)

  return (
    <>
      <input
        type='checkbox'
        id='toggle-main-menu'
        role='button'
        aria-label='Toggle Menu'
      />
      <label
        className={classes.MenuOn}
        htmlFor='toggle-main-menu'
        onClick={() => {
          setHamburgerMenuTrigger(!hamburgerMenuTrigger)
        }}
      >
        <div
          className={`${classes.HamburgerIcon} ${
            hamburgerMenuTrigger ? classes.Change : ''
          }`}
        >
          <div className={classes.Bar1}></div>
          <div className={classes.Bar2}></div>
          <div className={classes.Bar3}></div>
        </div>
      </label>
      <label
        className={classes.MenuOff}
        htmlFor='toggle-main-menu'
        onClick={() => {
          setHamburgerMenuTrigger(!hamburgerMenuTrigger)
        }}
      ></label>
      <input
        type='checkbox'
        id='toggle-main-menu'
        role='button'
        aria-label='Toggle Menu'
      />
      <label
        className={classes.MenuOn}
        htmlFor='toggle-main-menu'
        onClick={() => {
          setHamburgerMenuTrigger(!hamburgerMenuTrigger)
        }}
      >
        <div
          className={`${classes.HamburgerIcon} ${
            hamburgerMenuTrigger ? classes.Change : ''
          }`}
        >
          <div className={classes.Bar1}></div>
          <div className={classes.Bar2}></div>
          <div className={classes.Bar3}></div>
        </div>
      </label>
      <label
        className={classes.MenuOff}
        htmlFor='toggle-main-menu'
        onClick={() => {
          setHamburgerMenuTrigger(!hamburgerMenuTrigger)
        }}
      ></label>
    </>
  )
}
