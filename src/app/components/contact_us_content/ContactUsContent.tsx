'use client'
import formClasses from '@/globalFormStyles.module.css'
import {FormDataType} from '@/sharedFormTypes'
import {WEB3_FORMS_URL} from '@/utils/constants'
import {validateField} from '@/utils/fieldValidation'
import Link from 'next/link'
import {SubmitEvent, useState} from 'react'
import {sendContactUsMessage} from '../lib/SendContactUsMessage'
import classes from './ContactUsContent.module.css'

export default function ContactUsContent() {
    const [formInputs, setFormInputs] = useState<FormDataType>({
        name: {value: '', validationMessage: '', edited: false},
        email: {value: '', validationMessage: '', edited: false},
        message: {value: '', validationMessage: '', edited: false},
    })
    const [formErrorMessage, setFormErrorMessage] = useState('')
    const [showSubmittionMessage, setShowSubmittionMessage] = useState(false)

    const clearFields = () => {
        setFormInputs({
            name: {value: '', validationMessage: '', edited: false},
            email: {value: '', validationMessage: '', edited: false},
            message: {value: '', validationMessage: '', edited: false},
        })
    }

    const formSubmittionErrorMessage = (): string => {
        for (const [field, input] of Object.entries(formInputs)) {
            if (input.validationMessage)
                return 'Please correct fields before submitting'
            else if (input.value.length < 1) {
                setFormInputs({
                    ...formInputs,
                    [field]: {
                        ...formInputs[field],
                        edited: true,
                        validationMessage: 'Field Required',
                    },
                })
                return 'Please correct fields before submitting'
            }
        }
        return ''
    }

    const handleFormSubmittion = async (e: SubmitEvent<HTMLFormElement>) => {
        setShowSubmittionMessage(false)

        const errorMessage = formSubmittionErrorMessage()
        setFormErrorMessage(errorMessage)
        if (errorMessage) return

        let displayErrorMessage = ''
        try {
            const response = await sendContactUsMessage({
                name: formInputs.name.value,
                email: formInputs.email.value,
                message: formInputs.message.value,
            })

            console.log('response.json() ---- BACK ON CONTACT US CONTENT')
            console.log(response)

            const data = await response
            displayErrorMessage = data.displayMessage
            if (data.message.length > 0) {
                throw new Error('Error during type convertion: ' + data.message)
            }
            clearFields()
            setShowSubmittionMessage(true)
        } catch (e) {
            console.error(
                e instanceof Error
                    ? e.message
                    : 'Unknown Error While Excecuting at: ' + WEB3_FORMS_URL,
            )
            setFormErrorMessage(displayErrorMessage)
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

    const fieldValidator = (field: string, value: string) => {
        const validationMessage = validateField(field, value)

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
                                fieldValidator('name', e.target.value)
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
                                validateField('email', e.target.value)
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
                            validateField('message', e.target.value)
                        }}
                        value={formInputs.message.value}
                    ></textarea>
                    <p className={formClasses.formFieldErrorMessage}>
                        {formInputs.message.validationMessage}
                    </p>
                </div>
                <div
                    className={`${formClasses.formFieldSubmitButton} ${classes.contactUsSubmitButton}`}
                >
                    <button type='submit' className={formClasses.submitButton}>
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
