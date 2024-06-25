import ConfigAws from "@/src/aws-exports";
import {Amplify} from 'aws-amplify';
import Content from "../index";

Amplify.configure(ConfigAws);

const App = () => {
    return (
        < Content/>
    )
}

export default App; 