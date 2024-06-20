interface onValidateProps {
    value: string
    name: string
}

interface ValidateInput {
    errorMessage: string
    hasError: boolean
}

enum NameParams {
    email = "email"
}

export const validateInput = ({ value, name }: onValidateProps): ValidateInput => {
    let hasError = false;
    let errorMessage = "";
    const formatValue = value.trim();
    switch (name) {
        case NameParams.email:
            if (!formatValue) {
                hasError = true;
                errorMessage = "Email is required";
            }
            const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
            if (!regexEmail.test(formatValue)) {
                hasError = true;
                errorMessage = "Invalid email format";
            }
            break;
        default:
            break;
    }
    return { errorMessage, hasError }
}