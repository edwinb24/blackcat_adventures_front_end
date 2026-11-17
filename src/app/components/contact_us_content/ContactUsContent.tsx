'use client'
import formClasses from '@/globalFormStyles.module.css'
import sharedClasses from '@/sharedStyles.module.css'
import type {TypeContactUsFieldName, TypeContactUsFormData} from '@/SharedTypes'
import {
    CONTACT_MESSAGE_LENGTH_HINT,
    CONTACT_MESSAGE_MAX_LENGTH,
    CORRECT_FIELDS_MESSAGE,
    EMAIL_PATTERN,
    FIELD_REQUIRED_MESSAGE,
    INITIAL_CONTACT_FORM,
    INVALID_EMAIL_MESSAGE,
    SUBMIT_FAILED_MESSAGE,
    WEB3_FORMS_ACCESS_KEY,
    WEB3_FORMS_URL,
} from '@/utils/constants'
import Link from 'next/link'
import {type FormEvent, useRef, useState} from 'react'
import classes from './ContactUsContent.module.css'

const getValidationMessage = (
    field: TypeContactUsFieldName,
    value: string,
): string => {
    if (value.trim().length < 1) return FIELD_REQUIRED_MESSAGE
    if (field === 'email' && !EMAIL_PATTERN.test(value.trim())) {
        return INVALID_EMAIL_MESSAGE
    }
    return ''
}

export default function ContactUsContent() {
    const [formInputs, setFormInputs] =
        useState<TypeContactUsFormData>(INITIAL_CONTACT_FORM)
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
        for (const field of Object.keys(
            validated,
        ) as Array<TypeContactUsFieldName>) {
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
            setFormErrorMessage(CORRECT_FIELDS_MESSAGE)
            return
        }
        if (!WEB3_FORMS_ACCESS_KEY) {
            console.error('NEXT_PUBLIC_W3FORMS_ACCESS_KEY is not set.')
            setFormErrorMessage(SUBMIT_FAILED_MESSAGE)
            return
        }
        setFormErrorMessage('')

        const formData = new FormData(e.currentTarget)
        formData.append('access_key', WEB3_FORMS_ACCESS_KEY)
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
                setFormInputs(INITIAL_CONTACT_FORM)
            } else {
                setFormErrorMessage(result.message || SUBMIT_FAILED_MESSAGE)
            }
        } catch (error) {
            console.error(error)
            setFormErrorMessage(SUBMIT_FAILED_MESSAGE)
        } finally {
            submittingRef.current = false
            setIsSubmitting(false)
        }
    }

    const handleFieldChange = (
        field: TypeContactUsFieldName,
        value: string,
    ) => {
        setFormInputs(inputs => ({
            ...inputs,
            [field]: {...inputs[field], value, validationMessage: ''},
        }))
    }

    const validateField = (
        field: TypeContactUsFieldName,
        value: string,
    ) => {
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
                                aria-invalid={
                                    !!formInputs.name.validationMessage
                                }
                                onChange={e =>
                                    handleFieldChange('name', e.target.value)
                                }
                                onBlur={e =>
                                    validateField('name', e.target.value)
                                }
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
                        <p>{CONTACT_MESSAGE_LENGTH_HINT}</p>
                        <textarea
                            placeholder='Message'
                            className={formClasses.formFieldField}
                            name='message'
                            aria-label='Message'
                            aria-invalid={
                                !!formInputs.message.validationMessage
                            }
                            maxLength={CONTACT_MESSAGE_MAX_LENGTH}
                            autoComplete='off'
                            onChange={e =>
                                handleFieldChange('message', e.target.value)
                            }
                            onBlur={e =>
                                validateField('message', e.target.value)
                            }
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
