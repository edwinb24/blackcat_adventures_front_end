import {ContactUsApiResponse, contactUsFormType} from '@/sharedTypes'
import {CONTACT_US_SS_API} from '@/utils/constants'

export const sendContactUsMessage = async ({
    name,
    email,
    message,
}: contactUsFormType): Promise<ContactUsApiResponse> => {
    const response = await fetch(CONTACT_US_SS_API, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify({name, email, message}),
    })

    return response.json()
}
