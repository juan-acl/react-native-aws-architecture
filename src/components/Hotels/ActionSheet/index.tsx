import {Actionsheet, Box, Text, Center} from "native-base";

interface ActionSheetHotelProps {
    isOpen: boolean;
    onClose: () => void;

}

export const ActionSheetHotel = ({isOpen, onClose}: ActionSheetHotelProps) => {
    return (
        <Center flex={1} px="3">
            <Actionsheet isOpen={isOpen} onClose={onClose} size="full">
                <Actionsheet.Content>
                    <Box w="100%" h={60} px={4} justifyContent="center">
                        <Text fontSize="16" color="gray.500" _dark={{
                            color: "gray.300"
                        }}>
                            Albums
                        </Text>
                    </Box>
                    <Actionsheet.Item>Delete</Actionsheet.Item>
                    <Actionsheet.Item>Share</Actionsheet.Item>
                    <Actionsheet.Item>Play</Actionsheet.Item>
                    <Actionsheet.Item>Favourite</Actionsheet.Item>
                    <Actionsheet.Item>Cancel</Actionsheet.Item>
                </Actionsheet.Content>
            </Actionsheet>
        </Center>
    )
}