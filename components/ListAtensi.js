import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getAtensi } from "../api/atensi";
import { DateFormat } from "../utils/DateFormat";
import ModalLoading from "./ModalLoading";
import { TEXT_COLOR } from "../constant/color";

const ListAtensi = () => {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["atensi"],
    queryFn: getAtensi,
  });

  return (
    <View style={styles.container}>
      {isLoading && <ModalLoading />}

      {data && data.length === 0 && (
        <View style={styles.noDataContainer}>
          <Text style={styles.noDataText}>
            Tidak ada atensi yang ditampilkan!
          </Text>
        </View>
      )}
      {data &&
        data.map((data, id) => {
          return (
            <View style={styles.atensiContainer} key={id}>
              <View style={styles.headerContainer}>
                <Text style={styles.headerText}>{data.judul_atensi}</Text>
              </View>
              <View style={styles.dateContainer}>
                <View style={styles.dateView}>
                  <Text style={styles.dateText}>
                    {DateFormat(data.tanggal_mulai)} {""}
                  </Text>
                  <Text style={styles.dateText}>
                    - {DateFormat(data.tanggal_selesai)}
                  </Text>
                </View>
              </View>
              <View style={styles.noteContainer}>
                <Text style={styles.noteText}>{data.catatan}</Text>
              </View>
            </View>
          );
        })}
    </View>
  );
};

const styles = StyleSheet.create({
  atensiContainer: {
    backgroundColor: "#F8D082",
    marginBottom: 10,
    borderRadius: 20,
    paddingVertical: 15,
    paddingHorizontal: 12,
    height: "auto",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  noDataContainer: {
    backgroundColor: "grey",
    width: "70%",
    height: 40,
    marginBottom: 20,
    borderRadius: 7,
    justifyContent: "center",
    marginHorizontal: "15%",
  },
  noDataText: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
    textAlign: "center",
    color: "#FEC100",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#DD761C",
    color: TEXT_COLOR.light,
    maxWidth: "80%",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  dateContainer: {
    marginVertical: 5,
  },
  dateView: {
    flexDirection: "row",
  },
  dateText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  noteContainer: {},
  noteText: {
    fontSize: 18,
  },
});

export default ListAtensi;
