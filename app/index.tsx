import { View, Text } from "react-native";
import ConfigAws from "@/src/aws-exports";
import { Amplify } from 'aws-amplify';
import HomePage from "@/src/components/Home";
Amplify.configure(ConfigAws);

const App = () => {
    return (
        <View>
            <HomePage />
        </View>
    )
}

export default App; 