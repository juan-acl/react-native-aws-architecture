import { createAsyncThunk } from "@reduxjs/toolkit";
import { Dialog, ALERT_TYPE } from "react-native-alert-notification";

interface DialogAlertState {
  typeAlert: ALERT_TYPE;
  title: string;
  message: string;
  textButton?: string;
  afterClose?: () => void;
}

enum AsyncThunkTypes {
  DIALOG_ALERT = "dialogAlert/dialogAlert",
}

export const DialogAlert = createAsyncThunk(
  AsyncThunkTypes.DIALOG_ALERT,
  async ({
    typeAlert,
    title,
    message,
    textButton,
    afterClose,
  }: DialogAlertState) => {
    Dialog.show({
      type: typeAlert,
      title,
      textBody: message,
      button: textButton,
      onPressButton: () => {
        afterClose && afterClose();
        Dialog.hide();
      },
    });
  }
);
