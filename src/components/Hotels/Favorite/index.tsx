import { View, Text } from "react-native";
import {BlurView} from 'expo-blur';

export const Favorite = () => {
    return (
        <BlurView
            tint="light"
            intensity={100}
            style={{
                flex: 1,
                padding: 10,
                margin: 10,
                overflow: 'hidden',
                width: 100,
                height: 100,
                backgroundColor: '#ccc',
            }}
        >
            <Text>Favorite</Text>
        </BlurView>
    )
}