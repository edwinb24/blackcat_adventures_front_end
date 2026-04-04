'use client'
import Link from 'next/link'
import {useState} from 'react'
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

    const handleFormSubmittion = () => {
        const formSubmittionErrorMessage = (() => {
            console.log('Object.entries(formInputs)')
            console.log(Object.entries(formInputs))
            for (const [_key, input] of Object.entries(formInputs))
                if (input.validationMessage)
                    return 'Please correct fields before submitting'
            return ''
        })()
        setFormErrorMessage(formSubmittionErrorMessage)
        if (!formSubmittionErrorMessage) {
            console.log('submitting message')
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
            <h1 className={classes.formTitle}>Contact Us</h1>
            <p className={classes.formDescription}>
                {
                    "Want to reach out to us, write your name, email and message below and we'll get back to you about your inquire as soon as possible."
                }
            </p>
            <form
                className={classes.form}
                onSubmit={e => {
                    e.preventDefault()
                    handleFormSubmittion()
                }}
            >
                <div className={classes.formFieldGroup}>
                    <div>
                        <input
                            className={classes.formField}
                            type='text'
                            placeholder='Name'
                            onChange={e =>
                                handleFieldChange('name', e.target.value)
                            }
                            onBlur={e => {
                                handleFieldBlur('name', e.target.value)
                            }}
                            value={formInputs.name.value}
                        ></input>
                        <p className={classes.formFieldErrorMessage}>
                            {formInputs.name.validationMessage}
                        </p>
                    </div>
                    <div>
                        <input
                            className={classes.formField}
                            type='text'
                            placeholder='Email'
                            onChange={e =>
                                handleFieldChange('email', e.target.value)
                            }
                            onBlur={e => {
                                handleFieldBlur('email', e.target.value)
                            }}
                            value={formInputs.email.value}
                        ></input>
                        <p className={classes.formFieldErrorMessage}>
                            {formInputs.email.validationMessage}
                        </p>
                    </div>
                </div>
                <div className={classes.textFieldWrapper}>
                    <p>Maximum 500 characters.</p>
                    <textarea
                        className={classes.formField}
                        placeholder='Message'
                        onChange={e =>
                            handleFieldChange('message', e.target.value)
                        }
                        onBlur={e => {
                            handleFieldBlur('message', e.target.value)
                        }}
                        value={formInputs.message.value}
                    ></textarea>
                    <p className={classes.formFieldErrorMessage}>
                        {formInputs.message.validationMessage}
                    </p>
                </div>
                <div>
                    <button type='submit' className={classes.inputSubmit}>
                        Send
                    </button>
                    <p>{formErrorMessage}</p>
                </div>
            </form>
        </main>
    )
}
