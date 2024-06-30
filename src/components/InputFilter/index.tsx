import {TextInput} from "react-native";
import {setFilterText} from "@/src/redux/slices/hotel.slice";
import {useDispatch} from "react-redux";
import {AppDispatch} from "@/src/redux/configureStore";

export const InputFilter = () => {
    const dispatch: AppDispatch = useDispatch();
    return (
        <TextInput
            placeholder="Buscar"
            onFocus={() => dispatch(setFilterText({ filterText: "" }))}
            onChangeText={(text) => dispatch(setFilterText({ filterText: text }))}
            style={{
                backgroundColor: "#fff",
                borderRadius: 20,
                padding: 10,
                marginTop: 10,
                width: 200,
                marginLeft: 10,
                height: "100%",
                textAlign: "center",
            }}
        />
    )
}