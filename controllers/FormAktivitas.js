import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  FlatList,
  Image,
  ActivityIndicator,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Notifikasi } from "../components/Notifikasi";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { GetPosByInstansi } from "../api/pos";
import { addAktivitas } from "../api/aktivitas";
import { getUser } from "../api/users";
import { useAuth } from "../context/userContext";
import ModalLoading from "../components/ModalLoading";

export default function FormAktivitas({ route }) {
  const { id, user } = useAuth();
  const queryClient = useQueryClient();
  const navigation = useNavigation();
  const { savedPhoto } = route ? route.params || {} : {};

  // State Hooks
  const [dropdownInstansi, setDropdownInstansi] = useState(false);
  const [dropdownPos, setDropdownPos] = useState(false);
  const [notifikasiVisible, setNotifikasiVisible] = useState(false);
  const [selectedInstansi, setSelectedInstansi] = useState("");
  const [selectedPos, setSelectedPos] = useState("");
  const [catatan, setCatatan] = useState("");
  const [image, setImage] = useState("");
  const [items, setItems] = useState([
    "UNAS Pejanten",
    "UNAS Ragunan",
    "UNAS Bambu Kuning",
  ]);
  const [noSelect, setNoSelect] = useState(false);
  const [successCreate, setSuccessCreate] = useState(false);
  const [errorCreate, setErrorCreate] = useState(false);

  const {
    isLoading: isLoadingUser,
    data: dataUser,
    isError: isErrorUser,
    error: errorUser,
  } = useQuery({
    queryKey: ["user", id],
    queryFn: () => getUser(id),
  });

  const { isLoading, isError, data, error, isSuccess } = useQuery({
    queryKey: ["getPos", { lokasi_pos: selectedInstansi }],
    queryFn: ({ queryKey }) => GetPosByInstansi(queryKey[1]),
    enabled: !!selectedInstansi,
  });

  const createAktivitas = useMutation({
    mutationFn: addAktivitas,
    onSuccess: async (response) => {
      setSuccessCreate(true);
      setNotifikasiVisible(true);
      await queryClient.refetchQueries(["getAktivitas", id]);
      setTimeout(() => {
        setSuccessCreate(false);
        setNotifikasiVisible(false);
        navigation.navigate("Home");
      }, 2000);
    },
    onError: (error) => {
      setErrorCreate(true);
      setNotifikasiVisible(true);
      setTimeout(() => {
        setErrorCreate(false);
        setNotifikasiVisible(false);
      }, 2000);
    },
  });

  useEffect(() => {
    if (savedPhoto && savedPhoto.uri) {
      setImage(savedPhoto.uri);
    }
  }, [savedPhoto]);

  const hideNotifikasi = () => {
    setNotifikasiVisible(false);
  };

  const toggleInstansi = () => {
    setDropdownInstansi(!dropdownInstansi);
  };

  const togglePos = () => {
    setDropdownPos(!dropdownPos);
  };

  const handleSelectInstansi = (item) => {
    setSelectedInstansi(item);
    setDropdownInstansi(false);
  };

  const handleSelectPos = (item) => {
    setSelectedPos(item.lokasi_barcode);
    setDropdownPos(false);
  };

  const handleFormSubmit = async () => {
    if (
      selectedInstansi === "" ||
      selectedPos === "" ||
      catatan === "" ||
      savedPhoto === undefined
    ) {
      setNoSelect(true);
      setNotifikasiVisible(true);
      setTimeout(() => {
        setNoSelect(false);
        setNotifikasiVisible(false);
      }, 1500);
    } else {
      createAktivitas.mutate({
        userId: id,
        username: user,
        nama_lengkap: dataUser.nama_lengkap,
        instansi_aktivitas: selectedInstansi,
        pos_aktivitas: selectedPos,
        notes_aktivitas: catatan,
        savedPhoto,
      });
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : null}
      style={styles.container}
    >
      {noSelect && notifikasiVisible && (
        <Notifikasi
          message={"Isi semua form yang tersedia"}
          hideModal={hideNotifikasi}
        />
      )}
      {successCreate && notifikasiVisible && (
        <Notifikasi
          message={"Berhasil mengirim laporan aktivitas"}
          hideModal={hideNotifikasi}
        />
      )}
      {errorCreate && notifikasiVisible && (
        <Notifikasi
          message={"Terjadi kesalahan, Ulangi!"}
          hideModal={hideNotifikasi}
        />
      )}
      {createAktivitas.isPending && <ModalLoading />}
      {isLoadingUser && <ModalLoading />}
      <View style={styles.box}>
        <Text style={styles.label}>Instansi : </Text>
        <View style={styles.formInput}>
          <TouchableOpacity onPress={toggleInstansi}>
            <Text style={styles.dropdownToggle}>
              {selectedInstansi || "Pilih Instansi"}
            </Text>
          </TouchableOpacity>

          {dropdownInstansi && (
            <View style={styles.dropdown}>
              <FlatList
                data={items}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => handleSelectInstansi(item)}>
                    <Text style={styles.dropdownItem}>{item}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          )}
        </View>
        <Text style={styles.label}>Pos Aktivitas : </Text>
        <View style={styles.formInput}>
          <TouchableOpacity onPress={togglePos}>
            <Text style={styles.dropdownToggle}>
              {selectedPos || "Lokasi Pos"}
            </Text>
          </TouchableOpacity>

          {dropdownPos && data && (
            <View style={styles.dropdown}>
              {isLoading ? (
                <ActivityIndicator size="large" color="#0000ff" />
              ) : (
                <FlatList
                  data={data}
                  renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handleSelectPos(item)}>
                      <Text style={styles.dropdownItem}>
                        {item.lokasi_barcode}
                      </Text>
                    </TouchableOpacity>
                  )}
                />
              )}
            </View>
          )}
        </View>
        <Text style={styles.label}>Catatan Aktivitas : </Text>
        <TextInput
          placeholder="Masukkan Catatan"
          style={styles.formCatatan}
          maxLength={200}
          multiline={true}
          onChangeText={(text) => setCatatan(text)}
        />
        <Text style={styles.label}>Dokumentasi : </Text>
        <View
          style={[
            styles.formDokumentasi,
            { flexDirection: "row", marginTop: 10 },
          ]}
        >
          <Ionicons
            name="camera-outline"
            size={45}
            onPress={() => navigation.navigate("ActivityCamera")}
          />
        </View>
        {savedPhoto && (
          <Image
            source={{ uri: savedPhoto.uri }}
            style={{
              width: 80,
              height: 80,
              borderRadius: 10,
              marginLeft: 5,
            }}
          />
        )}
        <TouchableOpacity style={styles.button} onPress={handleFormSubmit}>
          <Text style={styles.buttonText}>Kirim</Text>
          <Ionicons name="chevron-forward-outline" color={"#FFF"} size={20} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  formInput: {
    marginTop: 10,
    marginBottom: 10,
  },
  box: {
    padding: 20,
    height: "65%",
    borderRadius: 10,
  },

  label: {
    fontSize: 18,
  },

  dropdownToggle: {
    backgroundColor: "#EEF5FF",
    borderRadius: 10,
    height: 70,
    paddingVertical: 22,
    paddingHorizontal: 10,
    fontSize: 18,
  },
  formCatatan: {
    width: "100%",
    height: 120,
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "#EEF5FF",
    fontSize: 18,
  },
  dropdown: {
    position: "absolute",
    top: 50, // Adjust the top position as needed
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ccc",
    width: "100%",
    maxHeight: 220,
    zIndex: 3,
  },
  dropdownItem: {
    fontSize: 20,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  formDokumentasi: {
    width: "100%",
    height: 70,
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "#EEF5FF",
  },
  button: {
    flexDirection: "row",
    textAlign: "right",
    width: "100%",
    height: 60,
    backgroundColor: "#088395",
    borderRadius: 10,
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 15,
    paddingLeft: 10,
    paddingRight: 10,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
  },
});