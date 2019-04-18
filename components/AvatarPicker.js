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
    if (this.props.onImageChange) {
      this.props.onImageChange(res);
    }
  };

  render() {
    const { imageURI } = this.state;
    const { rounded = false, uri = null } = this.props;
    return (
      <TouchableOpacity
        style={[styles.previewWrapper, rounded ? styles.rounded : {}]}
        onPress={this.changeImage}
      >
        <Image
          source={{ uri: uri ? uri : imageURI }}
          style={[styles.preview, rounded ? styles.noBorder : {}]}
        />
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
  rounded: {
    borderRadius: 9999,
    borderColor: "#FFFFFF",
    borderWidth: 5
  },
  noBorder: {
    borderColor: "transparent",
    borderWidth: 0
  },
  previewWrapper: {
    backgroundColor: "transparent",
    height: 150,
    width: 150,
    padding: 0,
    marginBottom: 15,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden"
  }
});
