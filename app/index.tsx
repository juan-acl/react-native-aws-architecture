import ConfigAws from "@/src/aws-exports";
import {Amplify} from 'aws-amplify';
import Content from "../index";
import {GestureHandlerRootView} from 'react-native-gesture-handler';
// import 'react-native-gesture-handler';

Amplify.configure(ConfigAws);

const App = () => {
    return (
        // <GestureHandlerRootView>
            < Content/>
        // </GestureHandlerRootView>
    )
}

export default App; 