import Home from "@/src/components/Home";
import { HomeProps } from "@/src/navigator/types/navigationStack";

export const HomeScreen = (props: HomeProps) => {
    return (
        <Home {...props} />
    )
}
