import {LOGO_IMAGE} from '@/app/utils/constants'
import Image from 'next/image'
import FooterSocialMedia from './FooterSocialMedia'

export default function Footer() {
  return (
    <footer>
      <Image src={LOGO_IMAGE} width={300} height={200} alt='Logo' />
      <FooterSocialMedia />
    </footer>
  )
}
