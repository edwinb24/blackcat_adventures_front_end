import ContactUsContent from '@/components/contact_us_content/ContactUsContent'
import type {Metadata} from 'next'

export const metadata: Metadata = {
    title: 'Contact Us',
}

export default function ContactUs() {
    return <ContactUsContent />
}
