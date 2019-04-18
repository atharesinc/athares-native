import PropTypes from "prop-types";
import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewPropTypes
} from "react-native";

import {
  pickFileAsync,
  pickImageAsync,
  takePictureAsync
} from "../utils/mediaUtils";
import Icon from "@expo/vector-icons/Feather";

export default class CustomActions extends React.Component {
  onActionsPress = () => {
    const options = [
      "Media From Library",
      "Take Picture",
      "Upload File",
      "Cancel"
    ];
    const cancelButtonIndex = options.length - 1;
    this.context.actionSheet().showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex
      },
      async buttonIndex => {
        const { onSend } = this.props;
        switch (buttonIndex) {
          case 0:
            pickImageAsync(onSend);
            return;
          case 1:
            takePictureAsync(onSend);
            return;
          case 2:
            pickFileAsync(onSend);
          default:
        }
      }
    );
  };

  //   renderIcon = () => {
  //     // if (this.props.renderIcon) {
  //     //   return this.props.renderIcon();
  //     // }
  //     return (
  //       <View style={[styles.wrapper]}>
  //         <Text style={[styles.iconText, this.props.iconTextStyle]}>+</Text>
  //       </View>
  //     );
  //   };

  render() {
    return (
      <TouchableOpacity
        style={[styles.container]}
        onPress={this.onActionsPress}
      >
        <View style={[styles.wrapper]}>
          <Icon name="plus" size={16} color={"#FFFFFF"} />
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3a3e52"
  },
  wrapper: {
    borderRadius: 13,
    borderColor: "#FFFFFF",
    borderWidth: 2,
    width: 26,
    height: 26,
    justifyContent: "center",
    alignItems: "center"
  }
  //   iconText: {
  //     color: "#FFFFFF",
  //     fontWeight: "bold",
  //     fontSize: 16,
  //     backgroundColor: "transparent",
  //     textAlign: "center"
  //   }
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
