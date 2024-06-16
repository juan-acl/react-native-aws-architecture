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

const formReducer = (state: FormState, action: FormAction) => {

}