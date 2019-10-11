import React from 'reactn';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  CameraRoll
} from "react-native";
import AsyncImageAnimated from "react-native-async-image-animated";
import Lightbox from "react-native-lightbox";
import Icon from "@expo/vector-icons/Feather";
import { FileSystem } from "expo";

const ImageMessage = ({ file, fileName }) => {
  const requestDownload = () => {
    Alert.alert(
      "Save Image",
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
        FileSystem.documentDirectory + "photos/" + fileName
      );
      let res = await CameraRoll.saveToCameraRoll(local.uri, "photo");
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <View style={styles.wrapper}>
      <Lightbox
        underlayColor="#3a3e52"
        renderHeader={close => (
          <TouchableOpacity onPress={close}>
            <Icon color={"#FFFFFF"} style={styles.close} size={25} name={"x"} />
          </TouchableOpacity>
        )}
        renderContent={() => (
          <Image
            style={{ flex: 1 }}
            resizeMode="contain"
            source={{ uri: file }}
          />
        )}
      >
        <AsyncImageAnimated
          source={{ uri: file }}
          style={styles.image}
          placeholderColor={"#3a3e52"}
        />
      </Lightbox>
      <TouchableOpacity onPress={requestDownload}>
        <View style={styles.labelTextWrapper}>
          <Text style={styles.labelText} ellipsizeMode={"middle"}>
            {fileName}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ImageMessage;

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 5,
    marginBottom: 5
  },
  close: {
    padding: 15
  },
  image: {
    height: 120,
    width: 120,
    resizeMode: "cover",
    marginBottom: 10,
    backgroundColor: "#3a3e52"
  },
  labelTextWrapper: {
    backgroundColor: "#3a3e52",
    borderRadius: 9999
  },
  labelText: {
    color: "#FFFFFF",
    fontSize: 12,
    padding: 5,
    paddingHorizontal: 10
  }
});
