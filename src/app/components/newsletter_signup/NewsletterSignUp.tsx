import SharedModal from '@/components/shared_components/modal/SharedModal'
import formClasses from '@/globalFormStyles.module.css'
import {FormEvent, useState} from 'react'
import {ContactUsFormData} from '../contact_us_content/ContactUsContent'
import classes from './NewsletterSignUp.module.css'

export default function NewsletterSignUp({
    closeModal,
}: {
    closeModal: () => void
}) {
    const [showSubmittionMessage, setShowSubmittionMessage] = useState(false)
    const [formErrorMessage, setFormErrorMessage] = useState('')

    const [formInputs, setFormInputs] = useState<ContactUsFormData>({
        email: {value: '', validationMessage: '', edited: false},
    })

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

        console.log('HELLO')
        closeModal()
    }

    const handleFieldBlur = (field: string, value: string) => {
        const validationMessage =
            value.length < 1
                ? 'Field Required'
                : !value.includes('@')
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

    return (
        <SharedModal closeModal={closeModal}>
            <div className={classes.formWrapper}>
                <p className={classes.formWrapper}>Newsletter Sign-Up</p>
                <form
                    onSubmit={e => {
                        e.preventDefault()
                        handleFormSubmittion(e)
                    }}
                >
                    <div className={formClasses.formField}>
                        <input
                            autoComplete='email'
                            className={formClasses.formFieldField}
                            type='text'
                            name='email'
                            placeholder='E-mail'
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
                    <div className={formClasses.formFieldSubmitButton}>
                        <button
                            type='submit'
                            className={formClasses.inputSubmit}
                        >
                            Sign Up
                        </button>
                        <p className={formClasses.formFieldErrorMessage}>
                            {formErrorMessage}
                        </p>
                        {showSubmittionMessage && (
                            <p className={formClasses.formSuccessMessage}>
                                Thanks for signing up for our newsletter!
                            </p>
                        )}
                    </div>
                </form>
            </div>
        </SharedModal>
    )
}
