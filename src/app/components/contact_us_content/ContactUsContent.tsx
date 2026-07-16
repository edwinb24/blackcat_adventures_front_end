'use client'
import formClasses from '@/globalFormStyles.module.css'
import {WEB3_FORMS_URL} from '@/utils/constants'
import {W3FORMS_ACCESS_KEY} from '@/utils/privateConstants.env'
import Link from 'next/link'
import {FormEvent, useState} from 'react'
import classes from './ContactUsContent.module.css'

export type ContactUsFormInput = {
    value: string
    validationMessage: string
    edited: boolean
}

export type ContactUsFormData = Record<string, ContactUsFormInput>

export default function ContactUsContent() {
    const [formInputs, setFormInputs] = useState<ContactUsFormData>({
        name: {value: '', validationMessage: '', edited: false},
        email: {value: '', validationMessage: '', edited: false},
        message: {value: '', validationMessage: '', edited: false},
    })
    const [formErrorMessage, setFormErrorMessage] = useState('')
    const [showSubmittionMessage, setShowSubmittionMessage] = useState(false)

    const handleFormSubmittion = async (e: FormEvent<HTMLFormElement>) => {
        setShowSubmittionMessage(false)

        const formSubmittionErrorMessage = (() => {
            for (const [_key, input] of Object.entries(formInputs))
                if (input.validationMessage)
                    return 'Please correct fields before submitting'
            return ''
        })()

        setFormErrorMessage(formSubmittionErrorMessage)
        if (formSubmittionErrorMessage) return

        const formData = new FormData(e.target as HTMLFormElement)

        formData.append('access_key', W3FORMS_ACCESS_KEY)
        formData.append('subject', 'Website Contact Us Form Submittion')

        const json = JSON.stringify(Object.fromEntries(formData))

        try {
            const response = await fetch(WEB3_FORMS_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: json,
            })
            const result = await response.json()
            if (result.success) {
                setShowSubmittionMessage(true)
            }
        } catch (e) {
            if (typeof e === 'string') {
                setFormErrorMessage(e)
            } else if (e instanceof Error) {
                setFormErrorMessage(e.message)
            }
            console.error(e)
        }
    }

    const handleFieldChange = (field: string, value: string) => {
        setFormInputs({
            ...formInputs,
            [field]: {
                ...formInputs[field],
                value,
                validationMessage: '',
            },
        })
    }

    const handleFieldBlur = (field: string, value: string) => {
        const validationMessage =
            value.length < 1
                ? 'Field Required'
                : field === 'email' && !value.includes('@')
                  ? 'Please Enter A Valid Email'
                  : ''

        setFormInputs({
            ...formInputs,
            [field]: {
                ...formInputs[field],
                edited: true,
                validationMessage,
            },
        })
    }

    return (
        <main className={classes.pageMainWrapper}>
            <Link href='/'>Return to Home</Link>
            <h1 className={formClasses.formTitle}>Contact Us</h1>
            <p className={formClasses.formDescription}>
                {
                    "Want to reach out to us, write your name, email and message below and we'll get back to you about your inquire as soon as possible."
                }
            </p>
            <form
                className={formClasses.form}
                onSubmit={e => {
                    e.preventDefault()
                    handleFormSubmittion(e)
                }}
            >
                <div className={formClasses.formFieldGroup}>
                    <div className={formClasses.formField}>
                        <input
                            autoComplete='name'
                            className={formClasses.formFieldField}
                            type='text'
                            name='name'
                            placeholder='Name'
                            onChange={e =>
                                handleFieldChange('name', e.target.value)
                            }
                            onBlur={e => {
                                handleFieldBlur('name', e.target.value)
                            }}
                            value={formInputs.name.value}
                        ></input>
                        <p className={formClasses.formFieldErrorMessage}>
                            {formInputs.name.validationMessage}
                        </p>
                    </div>
                    <div className={formClasses.formField}>
                        <input
                            autoComplete='email'
                            className={formClasses.formFieldField}
                            type='text'
                            placeholder='Email'
                            name='email'
                            onChange={e =>
                                handleFieldChange('email', e.target.value)
                            }
                            onBlur={e => {
                                handleFieldBlur('email', e.target.value)
                            }}
                            value={formInputs.email.value}
                        ></input>
                        <p className={formClasses.formFieldErrorMessage}>
                            {formInputs.email.validationMessage}
                        </p>
                    </div>
                </div>
                <div className={formClasses.textFieldWrapper}>
                    <p>Maximum 500 characters.</p>
                    <textarea
                        placeholder='Message'
                        className={formClasses.formFieldField}
                        name='message'
                        autoComplete='message'
                        onChange={e =>
                            handleFieldChange('message', e.target.value)
                        }
                        onBlur={e => {
                            handleFieldBlur('message', e.target.value)
                        }}
                        value={formInputs.message.value}
                    ></textarea>
                    <p className={formClasses.formFieldErrorMessage}>
                        {formInputs.message.validationMessage}
                    </p>
                </div>
                <div className={formClasses.formFieldSubmitButton}>
                    <button type='submit' className={formClasses.inputSubmit}>
                        Send
                    </button>
                    <p className={formClasses.formFieldErrorMessage}>
                        {formErrorMessage}
                    </p>
                    {showSubmittionMessage && (
                        <p className={formClasses.formSuccessMessage}>
                            Form Successfully Submitted!
                        </p>
                    )}
                </div>
            </form>
        </main>
    )
}
