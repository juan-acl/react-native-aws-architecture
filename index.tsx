import React from "react";
import { NativeBaseProvider } from "native-base";
import { Provider } from "react-redux";
import { store } from "./src/redux/configureStore";
import { RootNavigation } from "./src/navigator";
import "./global.css";

const Content: React.FC = () => {
    return (
        <Provider store={store}>
            <NativeBaseProvider>
                <RootNavigation />
            </NativeBaseProvider>
        </Provider>
    )
}

export default Content;