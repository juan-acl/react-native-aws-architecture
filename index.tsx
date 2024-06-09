import React from "react";
import Home from "@/src/components/Home";
import { NativeBaseProvider } from "native-base";
import { Provider } from "react-redux";
import { store } from "./src/redux/configureStore";
import "./global.css";
import { SafeAreaView } from "react-native";

const Content: React.FC = () => {
    return (
        <Provider store={store}>
            <NativeBaseProvider>
                <Home />
            </NativeBaseProvider>
        </Provider>
    )
}

export default Content;