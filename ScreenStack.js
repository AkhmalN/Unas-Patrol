import { FontAwesome5 } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { StatusBar } from "expo-status-bar";
import BarStack from "./BarStack";
import FormAktivitas from "./controllers/FormAktivitas";
import Patroli from "./controllers/add-patroli";
import AbsenMasuk from "./controllers/add-AbsenMasuk";
import Atensi from "./controllers/add-Atensi";
import AbsenCamera from "./services/AbsenCamera";
import ActivityCamera from "./services/ActivityCamera";
import QrCode from "./services/QrCode";
import PatrolCamera from "./services/PatrolCamera";
import DataPribadi from "./screen/DataPribadi";
import DetailAbsensi from "./screen/DetailAbsensi";
import DetailAktivitas from "./screen/DetailAktivitas";
import DetailAtensi from "./screen/DetailAtensi";
import DetailPatroli from "./screen/DetailPatroli";
import Login from "./screen/Login";
import RiwayatAbsensi from "./screen/RiwayatAbsensi";
import RiwayatAktivitas from "./screen/RiwayatAktivitas";
import RiwayatAtensi from "./screen/RiwayatAtensi";
import RiwayatPatroli from "./screen/RiwayatPatroli";
import PatroliHarian from "./screen/PatroliHarian";
import { DateFormat } from "./utils/DateFormat";

const queryClient = new QueryClient();
const Stack = createStackNavigator();

function MainNavigator() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="BottomTabBar"
            component={BarStack}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="AbsenMasuk"
            component={AbsenMasuk}
            options={{
              headerTitle: "Absensi Masuk",
              headerTitleStyle: {
                color: "#FFF",
              },
              headerStyle: {
                backgroundColor: "#088395", // Ubah sesuai warna yang diinginkan
              },
              headerBackImage: () => (
                <FontAwesome5
                  name="chevron-circle-left"
                  size={25}
                  color={"#FFF"}
                />
              ),
            }}
          />

          <Stack.Screen
            name="Atensi"
            component={Atensi}
            options={{
              headerTitle: "Buat Atensi",
              headerTitleStyle: {
                color: "#FFF",
              },
              headerStyle: {
                backgroundColor: "#088395", // Ubah sesuai warna yang diinginkan
              },
              headerBackImage: () => (
                <FontAwesome5
                  name="chevron-circle-left"
                  size={25}
                  color={"#FFF"}
                />
              ),
            }}
          />
          <Stack.Screen
            name="Patroli"
            component={Patroli}
            options={{
              headerTitle: "Buat Laporan Patroli",
              headerTitleStyle: {
                color: "#FFF",
              },
              headerStyle: {
                backgroundColor: "#088395", // Ubah sesuai warna yang diinginkan
              },
              headerBackImage: () => (
                <FontAwesome5
                  name="chevron-circle-left"
                  size={25}
                  color={"#FFF"}
                />
              ),
            }}
          />
          <Stack.Screen
            name="Aktivitas"
            component={FormAktivitas}
            options={{
              headerTitle: "Buat Laporan Aktivitas",
              headerTitleStyle: {
                color: "#FFF",
              },
              headerStyle: {
                backgroundColor: "#088395", // Ubah sesuai warna yang diinginkan
              },
              headerBackImage: () => (
                <FontAwesome5
                  name="chevron-circle-left"
                  size={25}
                  color={"#FFF"}
                />
              ),
            }}
          />
          <Stack.Screen
            name="QrCode"
            component={QrCode}
            options={{
              headerTitle: "Scan QR CODE Pos",
              headerTitleStyle: {
                color: "#FFF",
              },
              headerStyle: {
                backgroundColor: "#088395", // Ubah sesuai warna yang diinginkan
              },
              headerBackImage: () => (
                <FontAwesome5
                  name="chevron-circle-left"
                  size={25}
                  color={"#FFF"}
                />
              ),
            }}
          />

          <Stack.Screen
            name="PatrolCamera"
            component={PatrolCamera}
            options={{
              headerTitle: "Capture Dokumentasi",
              headerTitleStyle: {
                color: "#FFF",
              },
              headerStyle: {
                backgroundColor: "#088395", // Ubah sesuai warna yang diinginkan
              },
              headerBackImage: () => (
                <FontAwesome5
                  name="chevron-circle-left"
                  size={25}
                  color={"#FFF"}
                />
              ),
            }}
          />
          <Stack.Screen
            name="DetailAbsensi"
            component={DetailAbsensi}
            options={{
              headerTitle: "Detail Absensi",
              headerTitleStyle: {
                color: "#FFF",
              },
              headerStyle: {
                backgroundColor: "#088395", // Ubah sesuai warna yang diinginkan
              },
              headerBackImage: () => (
                <FontAwesome5
                  name="chevron-circle-left"
                  size={25}
                  color={"#FFF"}
                />
              ),
            }}
          />
          <Stack.Screen
            name="DetailPatroli"
            component={DetailPatroli}
            options={{
              headerTitle: "Detail Patroli",
              headerTitleStyle: {
                color: "#FFF",
              },
              headerStyle: {
                backgroundColor: "#088395", // Ubah sesuai warna yang diinginkan
              },
              headerBackImage: () => (
                <FontAwesome5
                  name="chevron-circle-left"
                  size={25}
                  color={"#FFF"}
                />
              ),
            }}
          />
          <Stack.Screen
            name="DetailAktivitas"
            component={DetailAktivitas}
            options={{
              headerTitle: "Detail Aktivitas",
              headerTitleStyle: {
                color: "#FFF",
              },
              headerStyle: {
                backgroundColor: "#088395", // Ubah sesuai warna yang diinginkan
              },
              headerBackImage: () => (
                <FontAwesome5
                  name="chevron-circle-left"
                  size={25}
                  color={"#FFF"}
                />
              ),
            }}
          />
          <Stack.Screen
            name="Detail Atensi"
            component={DetailAtensi}
            options={{
              headerTitle: "Detail Atensi",
              headerTitleStyle: {
                color: "#FFF",
              },
              headerStyle: {
                backgroundColor: "#088395", // Ubah sesuai warna yang diinginkan
              },
              headerBackImage: () => (
                <FontAwesome5
                  name="chevron-circle-left"
                  size={25}
                  color={"#FFF"}
                />
              ),
            }}
          />
          <Stack.Screen
            name="Patroli Harian Petugas"
            component={PatroliHarian}
            options={{
              headerTitle: `Patroli hari : ${DateFormat(new Date())}`,
              headerTitleStyle: {
                color: "#FFF",
              },
              headerStyle: {
                backgroundColor: "#088395", // Ubah sesuai warna yang diinginkan
              },
              headerBackImage: () => (
                <FontAwesome5
                  name="chevron-circle-left"
                  size={25}
                  color={"#FFF"}
                />
              ),
            }}
          />

          <Stack.Screen
            name="AbsenCamera"
            component={AbsenCamera}
            options={{
              headerTitle: "Capture Absensi",
              headerTitleStyle: {
                color: "#FFF",
              },
              headerStyle: {
                backgroundColor: "#088395", // Ubah sesuai warna yang diinginkan
              },

              headerBackImage: () => (
                <FontAwesome5
                  name="chevron-circle-left"
                  size={25}
                  color={"#FFF"}
                />
              ),
            }}
          />

          <Stack.Screen
            name="Riwayat Absensi"
            component={RiwayatAbsensi}
            options={{
              headerTitle: "Riwayat Absensi",
              headerTitleStyle: {
                color: "#FFF",
              },
              headerStyle: {
                backgroundColor: "#088395", // Ubah sesuai warna yang diinginkan
              },
              headerBackImage: () => (
                <FontAwesome5
                  name="chevron-circle-left"
                  size={25}
                  color={"#FFF"}
                />
              ),
            }}
          />
          <Stack.Screen
            name="Riwayat Patroli"
            component={RiwayatPatroli}
            options={{
              headerTitle: "Riwayat Patroli",
              headerTitleStyle: {
                color: "#FFF",
              },
              headerStyle: {
                backgroundColor: "#088395", // Ubah sesuai warna yang diinginkan
              },
              headerBackImage: () => (
                <FontAwesome5
                  name="chevron-circle-left"
                  size={25}
                  color={"#FFF"}
                />
              ),
            }}
          />
          <Stack.Screen
            name="Riwayat Aktivitas"
            component={RiwayatAktivitas}
            options={{
              headerTitle: "Riwayat Aktivitas",
              headerTitleStyle: {
                color: "#FFF",
              },
              headerStyle: {
                backgroundColor: "#088395", // Ubah sesuai warna yang diinginkan
              },
              headerBackImage: () => (
                <FontAwesome5
                  name="chevron-circle-left"
                  size={25}
                  color={"#FFF"}
                />
              ),
            }}
          />
          <Stack.Screen
            name="Riwayat Atensi"
            component={RiwayatAtensi}
            options={{
              headerTitle: "Riwayat Atensi",
              headerTitleStyle: {
                color: "#FFF",
              },
              headerStyle: {
                backgroundColor: "#088395", // Ubah sesuai warna yang diinginkan
              },
              headerBackImage: () => (
                <FontAwesome5
                  name="chevron-circle-left"
                  size={25}
                  color={"#FFF"}
                />
              ),
            }}
          />

          <Stack.Screen
            name="ActivityCamera"
            component={ActivityCamera}
            options={{
              headerTitle: "Capture Dokumentasi",
              headerTitleStyle: {
                color: "#FFF",
              },
              headerStyle: {
                backgroundColor: "#088395", // Ubah sesuai warna yang diinginkan
              },
              headerBackImage: () => (
                <FontAwesome5
                  name="chevron-circle-left"
                  size={25}
                  color={"#FFF"}
                />
              ),
            }}
          />
          <Stack.Screen
            name="Data Pribadi"
            component={DataPribadi}
            options={{
              headerTitle: "Data Pribadi",
              headerTitleStyle: {
                color: "#FFF",
              },
              headerStyle: {
                backgroundColor: "#088395", // Ubah sesuai warna yang diinginkan
              },
              headerBackImage: () => (
                <FontAwesome5
                  name="chevron-circle-left"
                  size={25}
                  color={"#FFF"}
                />
              ),
            }}
          />
        </Stack.Navigator>
        <StatusBar hidden={false} translucent={false} backgroundColor="#FFF" />
      </NavigationContainer>
    </QueryClientProvider>
  );
}
export default MainNavigator;
