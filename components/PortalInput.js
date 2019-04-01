import { StyleSheet } from "react-native";
import React from "react";
import { TouchableOpacity, TextInput } from "react-native";
import Icon from "@expo/vector-icons/Feather";

class PortalInput extends React.Component {
  handleClick = () => {
    this.refs.input.focus();
  };

  render() {
    let { icon, iconStyles = {}, style = {}, ...props } = this.props;
    return (
      <TouchableOpacity
        style={{ ...styles.wrapper, ...style }}
        onPress={this.handleClick}
      >
        <Icon name={icon} size={25} color={"#FFFFFF"} styles={styles.icon} />
        <TextInput {...props} style={styles.input} ref="input" />
      </TouchableOpacity>
    );
  }
}

export default PortalInput;

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 9999,
    borderWidth: 2,
    borderColor: "#FFFFFF",
    width: "100%",
    paddingBottom: "1%",
    paddingHorizontal: "2%",
    justifyContent: "center",
    alignItems: "flex-start",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 20,
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
