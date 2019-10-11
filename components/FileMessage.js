import React from 'reactn';
import Icon from "@expo/vector-icons/Feather";
import { StyleSheet, Alert, Text, TouchableOpacity } from "react-native";
import { FileSystem } from "expo";

const FileMessage = ({ file, fileName }) => {
  const requestDownload = () => {
    Alert.alert(
      "Save File",
      "Do you want to save this file?",
      [
        {
          text: "Save",
          onPress: () => download()
        },
        { text: "Cancel", onPress: () => {}, style: "cancel" }
      ],
      { cancelable: true }
    );
  };
  const download = async () => {
    try {
      let local = await FileSystem.downloadAsync(
        file,
        FileSystem.documentDirectory + "downloads/" + fileName
      );
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <TouchableOpacity style={styles.wrapper} onPress={requestDownload}>
      <Icon name={"file-text"} color="#FFFFFF" size={20} />
      <Text style={styles.labelText}>{fileName}</Text>
    </TouchableOpacity>
  );
};

export default FileMessage;

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: "#3a3e52",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 9999
  },
  labelText: {
    color: "#FFFFFF",
    fontSize: 12,
    marginLeft: 10
  }
});
