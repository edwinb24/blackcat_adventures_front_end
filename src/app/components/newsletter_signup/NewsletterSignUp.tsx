import SharedModal from '@/components/shared_components/modal/SharedModal'
import formClasses from '@/globalFormStyles.module.css'
import {useState} from 'react'
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

    const clearFields = () => {
        setFormInputs({
            email: {value: '', validationMessage: '', edited: false},
        })
    }

    const formSubmittionErrorMessage = () => {
        for (const [field, input] of Object.entries(formInputs)) {
            if (input.validationMessage)
                return 'Please correct fields before submitting'
            if (input.value.length < 1) {
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

    const handleFormSubmittion = async () => {
        const errorValidation = formSubmittionErrorMessage()
        if (errorValidation.length > 0) {
            setFormErrorMessage(errorValidation)
            return
        }
        console.log('here')
        console.log(`${process.env.DB_HOST}`)
        // try {
        //     const resp = await fetch(`${process.env.NEWSLETTER_BASE_URL}`, {})

        //     console.log('resp======')
        //     console.log(resp)
        // } catch (e: unknown) {
        //     throw new Error(
        //         `Unexpected Throw: ${e instanceof Error ? e.message : typeof e}`,
        //     )
        // }
        //Submit Form Here

        clearFields()
        setShowSubmittionMessage(true)
    }

    const handleFieldBlur = (field: string, value: string) => {
        console.log('On blur triggered')
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
        setFormErrorMessage('')
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
            {showSubmittionMessage ? (
                <p className={formClasses.formSuccessMessage}>
                    Thanks for signing up for our newsletter!
                </p>
            ) : (
                <div className={classes.formWrapper}>
                    <p>Newsletter Sign-Up</p>
                    <form
                        className={classes.newsletterForm}
                        onSubmit={e => {
                            e.preventDefault()
                            handleFormSubmittion()
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
                        <div
                            className={`${formClasses.formFieldSubmitButton} ${classes.newsletterSubmitButton}`}
                        >
                            <button
                                type='submit'
                                className={formClasses.submitButton}
                            >
                                Sign Up
                            </button>
                            <p className={formClasses.formFieldErrorMessage}>
                                {formErrorMessage}
                            </p>
                        </div>
                    </form>
                </div>
            )}
        </SharedModal>
    )
}
