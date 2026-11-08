'use client'
import formClasses from '@/globalFormStyles.module.css'
import sharedClasses from '@/sharedStyles.module.css'
import {WEB3_FORMS_URL} from '@/utils/constants'
import Link from 'next/link'
import {type FormEvent, useRef, useState} from 'react'
import classes from './ContactUsContent.module.css'

const W3FORMS_ACCESS_KEY = process.env.NEXT_PUBLIC_W3FORMS_ACCESS_KEY || ''

const MESSAGE_MAX_LENGTH = 500
const FIELD_REQUIRED = 'Field Required'
const INVALID_EMAIL = 'Please Enter A Valid Email'
const CORRECT_FIELDS = 'Please correct fields before submitting'
const SUBMIT_FAILED = 'The form could not be sent. Please try again later.'
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export type ContactUsFormInput = {
    value: string
    validationMessage: string
    edited: boolean
}

type FieldName = 'name' | 'email' | 'message'
export type ContactUsFormData = Record<FieldName, ContactUsFormInput>

const EMPTY_INPUT: ContactUsFormInput = {
    value: '',
    validationMessage: '',
    edited: false,
}
const INITIAL_FORM: ContactUsFormData = {
    name: EMPTY_INPUT,
    email: EMPTY_INPUT,
    message: EMPTY_INPUT,
}

const getValidationMessage = (field: FieldName, value: string): string => {
    if (value.trim().length < 1) return FIELD_REQUIRED
    if (field === 'email' && !EMAIL_PATTERN.test(value.trim()))
        return INVALID_EMAIL
    return ''
}

export default function ContactUsContent() {
    const [formInputs, setFormInputs] = useState<ContactUsFormData>(INITIAL_FORM)
    const [formErrorMessage, setFormErrorMessage] = useState('')
    const [showSubmissionMessage, setShowSubmissionMessage] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const submittingRef = useRef(false)

    const handleFormSubmission = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (submittingRef.current) return
        setShowSubmissionMessage(false)

        const validated = {...formInputs}
        let hasErrors = false
        for (const field of Object.keys(validated) as Array<FieldName>) {
            const validationMessage = getValidationMessage(
                field,
                validated[field].value,
            )
            if (validationMessage) hasErrors = true
            validated[field] = {
                ...validated[field],
                edited: true,
                validationMessage,
            }
        }
        setFormInputs(validated)

        if (hasErrors) {
            setFormErrorMessage(CORRECT_FIELDS)
            return
        }
        if (!W3FORMS_ACCESS_KEY) {
            console.error('NEXT_PUBLIC_W3FORMS_ACCESS_KEY is not set.')
            setFormErrorMessage(SUBMIT_FAILED)
            return
        }
        setFormErrorMessage('')

        const formData = new FormData(e.currentTarget)
        formData.append('access_key', W3FORMS_ACCESS_KEY)
        formData.append('subject', 'Website Contact Us Form Submission')

        submittingRef.current = true
        setIsSubmitting(true)
        try {
            const response = await fetch(WEB3_FORMS_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify(Object.fromEntries(formData)),
            })
            const result = await response.json()
            if (result.success) {
                setShowSubmissionMessage(true)
                setFormInputs(INITIAL_FORM)
            } else {
                setFormErrorMessage(result.message || SUBMIT_FAILED)
            }
        } catch (error) {
            console.error(error)
            setFormErrorMessage(SUBMIT_FAILED)
        } finally {
            submittingRef.current = false
            setIsSubmitting(false)
        }
    }

    const handleFieldChange = (field: FieldName, value: string) => {
        setFormInputs(inputs => ({
            ...inputs,
            [field]: {...inputs[field], value, validationMessage: ''},
        }))
    }

    const validateField = (field: FieldName, value: string) => {
        setFormInputs(inputs => ({
            ...inputs,
            [field]: {
                ...inputs[field],
                edited: true,
                validationMessage: getValidationMessage(field, value),
            },
        }))
    }

    return (
        <main>
            <div className={sharedClasses.pageNarrowWrapper}>
                <Link href='/'>{'Return to Home >'}</Link>
                <h1 className={formClasses.formTitle}>Contact Us</h1>
                <p className={formClasses.formDescription}>
                    {
                        "Want to reach out to us? Write your name, email and message below and we'll get back to you about your inquiry as soon as possible."
                    }
                </p>
                <form
                    className={formClasses.form}
                    onSubmit={handleFormSubmission}
                    noValidate
                >
                    <div className={formClasses.formFieldGroup}>
                        <div className={formClasses.formField}>
                            <input
                                autoComplete='name'
                                className={formClasses.formFieldField}
                                type='text'
                                name='name'
                                placeholder='Name'
                                aria-label='Name'
                                aria-invalid={!!formInputs.name.validationMessage}
                                onChange={e =>
                                    handleFieldChange('name', e.target.value)
                                }
                                onBlur={e => validateField('name', e.target.value)}
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
                                type='email'
                                placeholder='Email'
                                name='email'
                                aria-label='Email'
                                aria-invalid={
                                    !!formInputs.email.validationMessage
                                }
                                onChange={e =>
                                    handleFieldChange('email', e.target.value)
                                }
                                onBlur={e =>
                                    validateField('email', e.target.value)
                                }
                                value={formInputs.email.value}
                            ></input>
                            <p className={formClasses.formFieldErrorMessage}>
                                {formInputs.email.validationMessage}
                            </p>
                        </div>
                    </div>
                    <div className={formClasses.textFieldWrapper}>
                        <p>{`Maximum ${MESSAGE_MAX_LENGTH} characters.`}</p>
                        <textarea
                            placeholder='Message'
                            className={formClasses.formFieldField}
                            name='message'
                            aria-label='Message'
                            aria-invalid={!!formInputs.message.validationMessage}
                            maxLength={MESSAGE_MAX_LENGTH}
                            autoComplete='off'
                            onChange={e =>
                                handleFieldChange('message', e.target.value)
                            }
                            onBlur={e => validateField('message', e.target.value)}
                            value={formInputs.message.value}
                        ></textarea>
                        <p className={formClasses.formFieldErrorMessage}>
                            {formInputs.message.validationMessage}
                        </p>
                    </div>
                    <div
                        className={`${formClasses.formFieldSubmitButton} ${classes.contactUsSubmitButton}`}
                    >
                        <button
                            type='submit'
                            className={formClasses.submitButton}
                            disabled={isSubmitting}
                            aria-busy={isSubmitting}
                        >
                            Send
                        </button>
                        <p
                            className={formClasses.formFieldErrorMessage}
                            role='alert'
                        >
                            {formErrorMessage}
                        </p>
                        {showSubmissionMessage && (
                            <p
                                className={formClasses.formSuccessMessage}
                                role='status'
                            >
                                Form Successfully Submitted!
                            </p>
                        )}
                    </div>
                </form>
            </div>
        </main>
    )
}
