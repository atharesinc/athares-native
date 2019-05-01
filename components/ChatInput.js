import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Keyboard
} from "react-native";
import { UIActivityIndicator } from "react-native-indicators";

import Icon from "@expo/vector-icons/Feather";
import CustomActions from "./CustomActions";
import { AutoGrowTextInput } from "react-native-auto-grow-textinput";

export default class ChatInput extends Component {
  constructor() {
    super();

    this.state = {
      input: "",
      showFilePreview: false,
      file: null,
      fileIsImage: false,
      loadingImage: false,
      showEmoji: false,
      rotate: 0,
      extension: null
    };
  }
  updateText = input => {
    this.setState({ input });
  };
  submit = () => {
    // send the message to parent
    this.props.onSend(this.state.input, this.state.file);
    this.setState({
      input: "",
      showFilePreview: false,
      file: null,
      fileIsImage: false,
      loadingImage: false
    });
  };
  updateFile = async file => {
    if (!file || !file.uri) {
      return false;
    }
    file.name =
      file.name ||
      file.uri.substring(file.uri.lastIndexOf("/") + 1, file.uri.length);
    const imgs = ["gif", "png", "jpg", "jpeg", "bmp"];
    let extension = file.uri.match(/\.(.{1,4})$/i);
    if (!extension) {
      await this.setState({
        showFilePreview: true,
        file,
        fileIsImage: false
      });
      return;
    }
    if (imgs.indexOf(extension[1].toLowerCase()) !== -1) {
      await this.setState({
        showFilePreview: true,
        file,
        fileIsImage: true
      });
      return;
    }
    await this.setState({
      showFilePreview: true,
      file,
      fileIsImage: false
    });
  };
  deleteImage = () => {
    this.setState({
      showFilePreview: false,
      file: null,
      fileIsImage: false
    });
  };
  shouldRenderImage = () => {
    if (this.state.fileIsImage) {
      if (this.state.loadingImage) {
        return (
          <UIActivityIndicator
            color={"#FFFFFF"}
            size={20}
            style={{ flex: 0 }}
          />
        );
      }
      return (
        <Image
          style={styles.previewImage}
          source={{ uri: this.state.file.uri }}
        />
      );
    } else {
      return <Icon name="file-text" color={"#FFFFFFb7"} size={20} />;
    }
  };

  render() {
    const { ...props } = this.props;
    const { file, input } = this.state;

    return (
      <View>
        {/* message is sending */}
        {this.props.uploadInProgress && (
          <View style={styles.uploadingWrapper}>
            <UIActivityIndicator
              color={"#FFFFFF"}
              size={20}
              style={{ flex: 0, marginRight: 15 }}
            />
            <Text style={styles.sendingText}>Sending</Text>
          </View>
        )}
        {/* file preview */}
        {file && (
          <View style={styles.filePreviewWrapper}>
            {this.state.showFilePreview ? this.shouldRenderImage() : null}
            <Text style={styles.sendingText}>{file.name}</Text>

            <TouchableOpacity onPress={this.deleteImage}>
              <Icon name="x" color={"#FFFFFFb7"} size={20} />
            </TouchableOpacity>
          </View>
        )}
        <View style={styles.composerContainer}>
          <CustomActions updateFile={this.updateFile} />
          <AutoGrowTextInput
            {...props}
            value={input}
            style={styles.composerInput}
            onChangeText={this.updateText}
            placeholder={"Enter Message"}
            multiline={true}
            onSubmitEditing={Keyboard.dismiss}
          />
          {(input !== "" || file !== null) && (
            <TouchableOpacity
              onPress={this.submit}
              style={styles.sendContainer}
            >
              <Icon name="send" size={20} color={"#FFFFFF"} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  filePreviewWrapper: {
    backgroundColor: "#3a3e52",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15
  },
  previewImage: {
    height: 50,
    width: 80,
    resizeMode: "cover"
  },
  uploadingWrapper: {
    backgroundColor: "#3a3e52",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 15
  },
  sendingText: {
    fontSize: 12,
    color: "#FFFFFFb7"
  },
  composerInput: {
    paddingTop: 10,
    color: "#FFFFFF",
    flex: 1
  },
  composerContainer: {
    backgroundColor: "#3a3e52",
    minHeight: 50,
    flexDirection: "row",
    alignItems: "flex-start"
    // justifyContent: "space-between"
  },
  sendContainer: {
    marginTop: 10,
    width: 40,
    height: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
    backgroundColor: "#3a3e52"
  }
});
