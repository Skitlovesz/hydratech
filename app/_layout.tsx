import { Stack, Tabs } from "expo-router";
import Toast from "react-native-toast-message";


export default function Layout(){
    return(
        <>
      <Stack>
            <Stack.Screen name="index" options={{ headerTitle: "Login" }} />
            <Stack.Screen name="register" options={{ headerTitle: "Voltar" }} />
            <Stack.Screen name="home" options={{ headerTitle: "Sair" }} />
            <Stack.Screen name="produtos" options={{ headerTitle: "Sair" }} />
        </Stack>
      <Toast />
    </>

    )
}

