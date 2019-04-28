import React from "react";
import { TouchableOpacity, Image, View, Text, StyleSheet } from "react-native";
import defaultCircleImage from "./defaultCircleImage";

const UserLink = ({ user }) => {
  return (
    <TouchableOpacity style={styles.userLink} {...props}>
      <Image style={styles.image} source={{ uri: user.icon }} />
      <View>
        <Text style={styles.header}>
          {user.firstName + " " + user.lastName}
        </Text>
        <Text style={styles.disclaimer}>View Profile</Text>
      </View>
    </TouchableOpacity>
  );
};

export default UserLink;

const styles = StyleSheet.create({
  userLink: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 10
  },
  image: {
    height: 60,
    width: 60,
    borderRadius: 9999,
    marginRight: 15
  },
  header: {
    fontSize: 18,
    color: "#FFFFFF"
  },
  disclaimer: {
    fontSize: 14,
    color: "#FFFFFFb7"
  }
});
