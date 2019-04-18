import React from "react";
import { StyleSheet } from "react-native";
import { TouchableOpacity, TextInput, Text } from "react-native";

class Input extends React.Component {
  handleClick = () => {
    this.refs.input.focus();
  };

  render() {
    let { style = {}, label = null, description = null, ...props } = this.props;
    return (
      <TouchableOpacity
        style={{ ...styles.wrapper, ...style }}
        onPress={this.handleClick}
      >
        {label && <Text style={styles.label}>{label}</Text>}
        <TextInput {...props} style={styles.input} ref="input" />
        {description && <Text style={styles.description}>{description}</Text>}
      </TouchableOpacity>
    );
  }
}

export default Input;

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 0,
    borderWidth: 1,
    borderColor: "transparent",
    width: "100%",
    paddingBottom: "1%",
    paddingHorizontal: "2%",
    justifyContent: "center",
    alignItems: "flex-start",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "left",
    marginBottom: 20,
    overflow: "hidden",
    backgroundColor: "#2f3242"
    // #3a3e52
  },
  input: {
    color: "#FFF",
    fontSize: 18
  },
  label: {
    fontSize: 18,
    color: "#FFF"
  },
  description: {
    fontSize: 18,
    color: "#FFFFFF90"
  }
});
