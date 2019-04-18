import React from "react";
import { Image, TouchableOpacity, StyleSheet } from "react-native";
import { pickImageURIAsync } from "../utils/mediaUtils";
import defaultCircleImage from "./defaultCircleImage";

export default class AvatarPicker extends React.Component {
  state = {
    imageURI: defaultCircleImage
  };
  changeImage = async () => {
    let res = await pickImageURIAsync();
    this.setState({
      imageURI: res
    });
    this.props.onImageChange(res);
  };

  render() {
    const { imageURI } = this.state;
    return (
      <TouchableOpacity
        style={styles.previewWrapper}
        onPress={this.changeImage}
      >
        <Image source={{ uri: imageURI }} style={styles.preview} />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  preview: {
    height: 150,
    width: 150,
    resizeMode: "stretch",
    padding: 0,
    margin: 0,
    borderWidth: 2,
    borderColor: "#FFFFFF"
  },
  previewWrapper: {
    backgroundColor: "transparent",
    height: 150,
    width: 150,
    padding: 0,
    marginBottom: 15
  }
});
