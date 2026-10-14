import {WEB3_FORMS_URL} from '@/utils/constants'

export async function POST(request: Request): Promise<Response> {
    const formData = await request.json()
    console.log('BACKEND SS ROUTE IN------')
    console.log(formData)

    try {
        const payload = {
            ...formData,
            access_key: process.env.W3FORMS_ACCESS_KEY!,
            subject: 'Website Contact Us Form Submittion',
        }
        console.log('access_key')
        console.log(process.env.W3FORMS_ACCESS_KEY!)

        const response = await fetch(WEB3_FORMS_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify(payload),
        })
        const responseText = await response.text()
        console.log('Web3Forms status:', response.status)
        console.log(
            'Web3Forms content type:',
            response.headers.get('content-type'),
        )
        console.log('Web3Forms response:', responseText.slice(0, 1000))
        const data = await response.json()
        if (!response.ok) {
            return Response.json({
                displayMessage: 'Error submitting message',
                message: `Server Return ${response.status}: ${data?.message ?? 'OpenWeather API error'}`,
            })
        }

        return Response.json({
            displayMessage: '',
            message: '',
        })
    } catch (e) {
        let message = ''
        let displayMessage = ''
        if (e instanceof Error) {
            message = e.message
        } else {
            displayMessage = 'Error retrieving coordinates for zipcode'
            message = 'Unknown Error While Excecuting at: ' + WEB3_FORMS_URL
        }
        console.error('this is ERROR BACKEND message=======')
        console.error(message)

        return Response.json({
            message,
            displayMessage,
        })
    }
}
