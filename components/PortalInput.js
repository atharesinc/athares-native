import { StyleSheet } from "react-native";
import React from "react";
import { TouchableOpacity, TextInput, View } from "react-native";
import Icon from "@expo/vector-icons/Feather";

class PortalInput extends React.Component {
  handleClick = () => {
    this.refs.input.focus();
  };

  render() {
    let { icon, iconStyles = {}, style = {}, ...props } = this.props;
    return (
      <TouchableOpacity
        style={{ ...styles.touchWrap, ...style }}
        onPress={this.handleClick}
      >
        <View style={[styles.wrapper]}>
          <Icon name={icon} size={25} color={"#FFFFFF"} styles={styles.icon} />
          <TextInput {...props} style={styles.input} ref="input" />
        </View>
      </TouchableOpacity>
    );
  }
}

export default PortalInput;

const styles = StyleSheet.create({
  touchWrap: {
    // paddingBottom: ,
    // paddingHorizontal: "2%",
    marginBottom: 20,
    width: "100%",
    borderRadius: 9999,
    borderWidth: 2,
    borderColor: "#FFFFFF",
    backgroundColor: "#3a3e5290"
  },
  wrapper: {
    marginVertical: 5,
    marginHorizontal: 15,
    width: "100%",
    justifyContent: "center",
    alignItems: "flex-start",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    overflow: "hidden"
  },
  icon: {
    marginRight: 20
  },
  input: {
    color: "#FFF",
    marginLeft: 20,
    fontSize: 18
  }
});
