import { useReducer } from "react";
import { validateInput } from "../components/Input/validateInput";

type InputState = {
    value: string;
    hasError: boolean;
    messageError: string;
    name: string;
    isFormInvalid: boolean;
}

enum InputActions {
    CHANGE_VALUE = 'CHANGE_VALUE',
    SET_ERROR = 'SET_ERROR',
    SET_FORM_INVALID = 'SET_FORM_INVALID',
    SET_FORM_VALID = 'SET_FORM_VALID',
    SET_FORM = 'SET_FORM',
}

type FormAction = {
    type: InputActions;
    data: InputState;
}

export type FormState = {
    [key: string]: InputState;
}

interface onChangeProps {
    value: string
    name: string
}

const formReducer = (state: FormState, action: FormAction) => {
    const { data, type } = action;
    switch (type) {
        case InputActions.CHANGE_VALUE:
            return {
                ...state,
                [data.name]: {
                    ...state[data.name],
                    value: data.value,
                    hasError: data.hasError,
                    messageError: data.messageError,
                    isFormInvalid: data.isFormInvalid
                }
            }
        default:
            return state;
    }
}


export const useForm = (initialState: FormState) => {
    // el useReducer recibe como primer parametro un reducer y como segundo parametro el estado inicial
    const [state, dispatch] = useReducer(formReducer, initialState);

    const onChange = ({ value, name }: onChangeProps) => {
        const { errorMessage, hasError } = validateInput({ value, name });
        const PHONE = "phone";
        dispatch({
            type: InputActions.CHANGE_VALUE,
            data: {
                value: (name === PHONE && hasError) ? value.substring(0, 8) : value,
                name,
                hasError,
                messageError: errorMessage,
                isFormInvalid: !hasError
            }
        })
    }

    const isValidaForm = () => {
        let isValid = true;
        Object.keys(state).forEach(key => {
            if(!state[key].isFormInvalid) {
                isValid = false
            }
        })
        return isValid
    }

    return {
        state,
        onChange,
        isValidaFormState: isValidaForm()
    }
}