import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as Location from "expo-location";
import { useNavigation } from "@react-navigation/native";
import { Notifikasi } from "../components/Notifikasi";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import SelectDropdown from "react-native-select-dropdown";
import { useAuth } from "../context/userContext";
import { addAbsen } from "../api/absensi";
import { getUser } from "../api/users";
import ModalLoading from "../components/ModalLoading";
import { useQuery } from "@tanstack/react-query";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  calculateDistance,
  cosineDistanceBetweenPoints,
} from "../services/DistanceCalculate";
import { officeLocation } from "../constant/officeLocation";

export default function FormAbsen({ route }) {
  const { id, user } = useAuth();
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const { savedPhoto } = route.params;
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [lokasiAbsen, setLokasiAbsen] = useState(null);
  const [loading, setLoading] = useState(null);
  const [isSuccess, setIsSuccess] = useState(null);
  const [errorStatus, setErrorStatus] = useState(null);
  const [noSelect, setNoSelect] = useState(false);
  const [distance, setDistance] = useState(null);

  const [notifikasiVisible, setNotifikasiVisible] = useState(false);
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorStatus(true);
        setNotifikasiVisible(true);
        setErrorMsg("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setLatitude(location.coords.latitude);
      setLongitude(location.coords.longitude);
      if (location) {
        const distance = calculateDistance(
          officeLocation.latitude,
          officeLocation.longitude,
          location.coords.latitude,
          location.coords.longitude
        );
        setDistance(distance.toFixed(2));
      }
    })();
  }, []);

  const navigation = useNavigation();

  const { isLoading, data, isError, error } = useQuery({
    queryKey: ["user", id],
    queryFn: () => getUser(id),
  });

  if (isLoading) {
    return <ModalLoading />;
  }

  const hideNotifikasi = () => {
    setNotifikasiVisible(false);
  };

  const data_lokasi = [
    { title: "UNAS Pejanten" },
    { title: "UNAS Ragunan" },
    { title: "UNAS Bambu Kuning" },
  ];

  const handleLocationSelect = (selectedItem) => {
    setLokasiAbsen(selectedItem.title);
  };

  const handleOnSubmit = async () => {
    if (lokasiAbsen === null) {
      setNoSelect(true);
      setNotifikasiVisible(true);
      setTimeout(() => {
        setNoSelect(false);
        setNotifikasiVisible(false);
      }, 1500);
    } else {
      try {
        setLoading(true);
        const response = await addAbsen({
          userId: id,
          nama_lengkap: data.nama_lengkap,
          username: user,
          latitude,
          longitude,
          lokasi_absen: lokasiAbsen,
          savedPhoto,
        });
        if (response.status === 201) {
          await AsyncStorage.setItem("status_absen", response.data.status);
          setLoading(false);
          setIsSuccess(true);
          setNotifikasiVisible(true);
          setTimeout(() => {
            setNotifikasiVisible(false);
            navigation.navigate("Riwayat Absensi");
          }, 5000);
        }
      } catch (error) {
        setLoading(false);
        setNotifikasiVisible(true);
        setErrorStatus(true);
        setErrorMsg("Terjadi Kesalahan dalam mengirim Absen, Ulangi!");
        setTimeout(() => {
          setErrorStatus(false);
          setErrorMsg(null);
          setNotifikasiVisible(false);
        }, 2000);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        {isSuccess && notifikasiVisible && (
          <Notifikasi
            message={"Berhasil membuat presensi"}
            hideModal={hideNotifikasi}
          />
        )}
        {noSelect && notifikasiVisible && (
          <Notifikasi
            message={"Pilih lokasi absen terlebih dahulu"}
            hideModal={hideNotifikasi}
          />
        )}
        {errorStatus && notifikasiVisible && (
          <Notifikasi message={errorMsg} hideModal={hideNotifikasi} />
        )}
        {loading && <ModalLoading />}
      </View>
      <View style={styles.bottomContent}>
        <View style={styles.distanceContainer}>
          <Text style={styles.distanceText}>
            Jarak dari koordinat posisi ke kantor {distance} km
          </Text>
        </View>
        <View style={styles.formSection}>
          <Text style={styles.label}>Swafoto : </Text>
          <View style={[styles.form, styles.flexRow]}>
            <Text style={styles.textForm}>Ambil Swafoto</Text>
            {savedPhoto && (
              <AntDesign name="checkcircleo" size={28} color={"#088395"} />
            )}
          </View>
          {location ? (
            <View>
              <Text style={styles.label}>koordinat Anda Saat ini :</Text>
              <View style={styles.form}>
                {location && (
                  <Text style={styles.textForm}>
                    {location.coords.latitude}(lat),{location.coords.longitude}
                    (lng)
                  </Text>
                )}
              </View>
            </View>
          ) : (
            <Text>Loading data...</Text>
          )}
          <Text style={styles.label}>Lokasi Absen :</Text>
          <View style={styles.form}>
            <SelectDropdown
              data={data_lokasi}
              onSelect={handleLocationSelect}
              renderButton={(selectedItem) => {
                return (
                  <View style={styles.dropdownButtonStyle}>
                    <Text style={styles.dropdownButtonTxtStyle}>
                      {(selectedItem && selectedItem.title) ||
                        "Pilih Lokasi Absen"}
                    </Text>
                  </View>
                );
              }}
              renderItem={(item, isSelected) => {
                return (
                  <View
                    style={{
                      ...styles.dropdownItemStyle,
                      ...(isSelected && { backgroundColor: "#D2D9DF" }),
                    }}
                  >
                    <Text style={styles.textForm}>{item.title}</Text>
                  </View>
                );
              }}
              showsVerticalScrollIndicator={false}
              dropdownStyle={styles.dropdownMenuStyle}
            />
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleOnSubmit}>
          <Text style={styles.buttonText}>Kirim Laporan Absensi</Text>
          <Ionicons
            name="chevron-forward-outline"
            color={"#FFF"}
            size={20}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  alertSuccess: {
    position: "absolute",
    backgroundColor: "#088395",
    zIndex: 1,
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  alertError: {
    position: "absolute",
    backgroundColor: "red",
    zIndex: 1,
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  alertText: {
    fontSize: 19,
    color: "#FFF",
  },
  bottomContent: {
    width: "100%",
    flex: 1,
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
  },
  distanceContainer: {
    backgroundColor: "#E2A51A",
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  distanceText: {
    color: "#FFF",
    fontSize: 18,
  },

  icon: {
    width: 25,
    height: 25,
    margin: 5,
  },
  formSection: {
    width: "100%",
  },
  imageSection: {
    marginBottom: 10,
  },
  label: {
    fontWeight: "bold",
    fontSize: 20,
  },
  flexRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  form: {
    height: 50,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
    color: "#D0E7D2",
    fontSize: 20,
    borderWidth: 1,
    borderColor: "#088395",
    padding: 5,
    justifyContent: "center",
  },
  button: {
    flexDirection: "row",
    backgroundColor: "#088395",
    height: 60,
    alignItems: "center",
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 8,
    padding: 10,
  },
  buttonText: {
    width: "85%",
    color: "#FFF",
    fontSize: 18,
    marginHorizontal: 10,
  },

  dropdownButtonStyle: {
    width: "100%",
    height: 50,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "500",
    color: "#151E26",
  },
  dropdownButtonArrowStyle: {
    fontSize: 28,
  },
  dropdownButtonIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
  dropdownMenuStyle: {
    backgroundColor: "#E9ECEF",
    borderRadius: 8,
  },
  dropdownItemStyle: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
  },
  textForm: {
    fontSize: 18,
    fontWeight: "500",
    color: "#151E26",
  },
});
