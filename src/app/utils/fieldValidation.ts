export const validateField = (field: string, value: string) => {
    const validationMessage =
        value.length < 1
            ? 'Field Required'
            : field === 'email' && !value.includes('@')
              ? 'Please Enter A Valid Email'
              : ''
    return validationMessage
}
