import React from "react";
import Home from "@/src/components/Home";
import { NativeBaseProvider } from "native-base";
import PageLoader from "@/src/components/Loader"
import { Provider } from "react-redux";
import { store } from "./redux/configureStore";

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