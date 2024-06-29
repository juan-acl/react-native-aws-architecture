import React from "react";
import {NativeBaseProvider} from "native-base";
import {Provider} from "react-redux";
import {store} from "./src/redux/configureStore";
import {RootNavigation} from "./src/navigator";
import {Authenticator} from '@aws-amplify/ui-react-native';
import "./global.css";

const Content: React.FC = () => {
    return (
        <Provider store={store}>
            <Authenticator.Provider>
                {/*<Authenticator>*/}
                    <NativeBaseProvider>
                        <RootNavigation/>
                    </NativeBaseProvider>
                {/*</Authenticator>*/}
            </Authenticator.Provider>
        </Provider>
    )
}

export default Content;