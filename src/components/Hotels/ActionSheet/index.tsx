import React from 'react';
import { Actionsheet, Box, Text, Center } from "native-base";
import { ScrollView, Dimensions } from "react-native";

interface ActionSheetHotelProps {
    isOpen: boolean;
    onClose: () => void;
}

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export const ActionSheetHotel = ({ isOpen, onClose }: ActionSheetHotelProps) => {
    return (
        <Center flex={1} px="3">
            <Actionsheet isOpen={isOpen} onClose={onClose} style={{ width: "100%" }}>
                <Actionsheet.Content style={{ width: "100%", maxHeight: SCREEN_HEIGHT * 0.8 }}>
                    <ScrollView contentContainerStyle={{ paddingVertical: 20 }}>
                        <Box w="100%" h={60} px={4} justifyContent="center">
                            <Text fontSize="16" color="gray.500" _dark={{ color: "gray.300" }}>
                                Albums
                            </Text>
                        </Box>
                        {Array(20).fill(null).map((_, index) => (
                            <Actionsheet.Item key={index}>Item {index + 1}</Actionsheet.Item>
                        ))}
                    </ScrollView>
                </Actionsheet.Content>
            </Actionsheet>
        </Center>
    );
};
