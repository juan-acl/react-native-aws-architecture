import ConfigAws from "@/src/aws-exports";
import { Amplify } from 'aws-amplify';
import Content from "../index";
import { Authenticator } from '@aws-amplify/ui-react-native';
import MySignIn from "@/src/components/Home";

Amplify.configure(ConfigAws);

const App = () => {
    return (
        // <Authenticator.Provider>
        // <Authenticator
        // loginMechanisms={['email']}
        // components={{ SignIn: MySignIn }}
        // >
        < Content />
        // </Authenticator>
        // </Authenticator.Provider>
    )
}

export default App; 