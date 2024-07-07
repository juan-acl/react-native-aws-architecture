import React from "react";
import { NativeBaseProvider } from "native-base";
import { Provider } from "react-redux";
import { store } from "./src/redux/configureStore";
import { RootNavigation } from "./src/navigator";
import { Authenticator } from '@aws-amplify/ui-react-native';
import { AlertNotificationRoot } from "react-native-alert-notification";
import { PersistGate } from 'redux-persist/integration/react'
import { persistor } from "./src/redux/configureStore";
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PortalProvider } from "@gorhom/portal";
import "./global.css";

const Content: React.FC = () => {
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <Authenticator.Provider>
                    <NativeBaseProvider>
                        <AlertNotificationRoot>
                            <GestureHandlerRootView>
                                <PortalProvider>
                                    <RootNavigation />
                                </PortalProvider>
                            </GestureHandlerRootView>
                        </AlertNotificationRoot>
                    </NativeBaseProvider>
                </Authenticator.Provider>
            </PersistGate>
        </Provider>
    )
}

export default Content;