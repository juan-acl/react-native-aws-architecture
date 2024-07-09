import React from "react";
import { Pressable, Text, View, ScrollView } from "react-native";
import { styles } from "./profile.styles";
import { HeaderBackground } from "./imageBackground";
import { Avatar } from "./imageBackground";
import { useSelector } from "react-redux";
import { RootState } from "@/src/redux/configureStore";

export const Profile: React.FC = () => {
  const userProfile = useSelector(
    (state: RootState) => state.reducer.auth.userInformation
  );
  return (
    <>
      <HeaderBackground />
      <View style={styles.headerContent}>
        <View style={{ flex: 1 }}>
          <Text style={styles.name}>¡Bienvenido!</Text>
          <Text style={styles.userInfo}>
            {userProfile?.name + " " + userProfile?.family_name}
          </Text>
          <Avatar />
        </View>
        <View>
          <Text style={styles.text}>Wanna got to office?</Text>
        </View>
      </View>
      <View style={styles.body}>
        <ScrollView contentContainerStyle={styles.body}>
          <Pressable style={styles.RectangleShapeView}>
            <Text style={styles.headtText}>Correo electronico</Text>
            <Text style={styles.SubjectText}>HYDERABAD</Text>
          </Pressable>
          <Pressable style={styles.RectangleShapeView}>
            <Text style={styles.headtText}>Direccion</Text>
            <Text style={styles.SubjectText}>HYDERABAD</Text>
          </Pressable>
          <Pressable style={styles.RectangleShapeView}>
            <Text style={styles.headtText}>Numero de telefono</Text>
            <Text style={styles.SubjectText}>30 Sept, 2022 </Text>
          </Pressable>
          <View style={styles.groupButtons}>
            <Pressable style={styles.btn}>
              <Text style={styles.text}>Actualizar perfil</Text>
            </Pressable>
            <Pressable style={styles.btn}>
              <Text style={styles.text}>Cerrar Sesion</Text>
            </Pressable>
          </View>
        </ScrollView>
      </View>
    </>
  );
};
