import PropTypes from "prop-types";
import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewPropTypes,
  Keyboard
} from "react-native";

import {
  pickFileAsync,
  pickImageAsync,
  takePictureAsync
} from "../utils/mediaUtils";
import Icon from "@expo/vector-icons/Feather";

export default class CustomActions extends React.Component {
  getImage = async () => {
    Keyboard.dismiss();
    let file = await pickImageAsync();
    this.props.updateFile(file);
  };
  getPhoto = async () => {
    Keyboard.dismiss();
    let file = await takePictureAsync();
    this.props.updateFile(file);
  };
  getFile = async () => {
    Keyboard.dismiss();
    let file = await pickFileAsync();
    this.props.updateFile(file);
  };
  render() {
    return (
      <View style={[styles.container]}>
        <TouchableOpacity style={[styles.wrapper]} onPress={this.getImage}>
          <Icon name="image" size={20} color={"#FFFFFF"} />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.wrapper]} onPress={this.getPhoto}>
          <Icon name="camera" size={20} color={"#FFFFFF"} />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.wrapper]} onPress={this.getFile}>
          <Icon name="paperclip" size={20} color={"#FFFFFF"} />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    backgroundColor: "#3a3e52",
    marginLeft: 15
  },
  wrapper: {
    width: 26,
    height: 26,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15
  }
});

CustomActions.contextTypes = {
  actionSheet: PropTypes.func
};

CustomActions.defaultProps = {
  onSend: () => {},
  options: {},
  renderIcon: null,
  containerStyle: {},
  wrapperStyle: {},
  iconTextStyle: {}
};

CustomActions.propTypes = {
  onSend: PropTypes.func,
  options: PropTypes.object,
  renderIcon: PropTypes.func,
  containerStyle: ViewPropTypes.style,
  wrapperStyle: ViewPropTypes.style,
  iconTextStyle: Text.propTypes.style
};
