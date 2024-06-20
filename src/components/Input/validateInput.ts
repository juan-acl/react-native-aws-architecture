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
    const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const formatValue = value.trim();
    switch (name) {
        case NameParams.email:
            if (!formatValue) {
                hasError = true;
                errorMessage = "El correo es requrerido";
            } else if (!regexEmail.test(formatValue)) {
                hasError = true;
                errorMessage = "Formato de correo incorrecto";
            } else {
                hasError = false;
                errorMessage = "";
            }
            break;
        default:
            break;
    }
    return { errorMessage, hasError }
}