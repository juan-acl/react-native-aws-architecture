interface onValidateProps {
    value: string;
    name: string;
}

interface ValidateInput {
    errorMessage: string;
    hasError: boolean;
}

enum NameParams {
    email = "email",
    password = "password",
    name = "name",
    lastName = "lastName",
    phone = "phone",
    address = "address"
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
                errorMessage = "El correo es requerido";
            } else if (!regexEmail.test(formatValue)) {
                hasError = true;
                errorMessage = "Formato de correo incorrecto";
            } else {
                hasError = false;
                errorMessage = "";
            }
            break;
        case NameParams.password:
            if (!formatValue) {
                hasError = true;
                errorMessage = "La contraseña es requerida";
            } else if (formatValue.length < 8) {
                hasError = true;
                errorMessage = "La contraseña debe tener al menos 8 caracteres";
            } else {
                hasError = false;
                errorMessage = "";
            }
            break;
        case NameParams.name:
            if (!formatValue) {
                hasError = true;
                errorMessage = "El nombre es requerido";
            } else {
                hasError = false;
                errorMessage = "";
            }
            break;
        case NameParams.lastName:
            if (!formatValue) {
                hasError = true;
                errorMessage = "El apellido es requerido";
            } else {
                hasError = false;
                errorMessage = "";
            }
            break;
        case NameParams.phone:
            if (!formatValue) {
                hasError = true;
                errorMessage = "El teléfono es requerido";
            } else if (formatValue.length > 8) {
                hasError = true;
                errorMessage = "El teléfono no puede tener más de 8 caracteres";
            } else {
                hasError = false;
                errorMessage = "";
            }
            break;
        case NameParams.address:
            if (!formatValue) {
                hasError = true;
                errorMessage = "La dirección es requerida";
            } else {
                hasError = false;
                errorMessage = "";
            }
            break;
        default:
            break;
    }
    return { errorMessage, hasError };
};
