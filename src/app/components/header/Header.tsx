import {LOGO_IMAGE} from '@/app/utils/constants'
import Image from 'next/image'
import MainMenu from './MainMenu'

export default function Header() {
  return (
    <header>
      <Image src={LOGO_IMAGE} width={300} height={200} alt='Logo' />
      <MainMenu />
    </header>
  )
}
