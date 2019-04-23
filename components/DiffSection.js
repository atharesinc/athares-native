import React, { Component, Fragment } from "react";
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import Diff from "react-native-diff-component";
import Icon from "@expo/vector-icons/Feather";

class DiffSection extends Component {
  state = {
    mode: 0
  };
  toggle = index => {
    this.setState({
      mode: index
    });
  };
  renderTab = () => {
    const { oldText = "", newText = "" } = this.props;
    const { mode } = this.state;
    switch (mode) {
      case 1:
        return (
          <ScrollView containerStyle={styles.textContainerStyle}>
            <Diff
              unchagedText={styles.unchangedText}
              inputA={oldText}
              inputB={newText}
              textStyle={styles.sideBySideText}
              containerStyle={styles.sideBySide}
              type="words"
            />
          </ScrollView>
        );
      case 2:
        return (
          <ScrollView containerStyle={styles.textContainerStyle}>
            <View style={styles.sideBySideWrapper}>
              <Diff
                unchagedText={styles.unchangedText}
                inputA={oldText}
                inputB={""}
                type="words"
                textStyle={styles.sideBySideText}
                containerStyle={styles.sideBySide}
              />
              <Diff
                containerStyle={styles.sideBySide}
                textStyle={styles.sideBySideText}
                unchagedText={styles.unchangedText}
                inputA={""}
                inputB={newText}
                type="words"
              />
            </View>
          </ScrollView>
        );
      default:
        return (
          <ScrollView containerStyle={styles.textContainerStyle}>
            <Text style={styles.unchangedText}>{newText}</Text>
          </ScrollView>
        );
    }
  };
  render() {
    const { mode } = this.state;
    return (
      <Fragment>
        {this.renderTab()}
        <View style={styles.tabWrapper}>
          <TouchableOpacity
            onPress={() => {
              this.toggle(0);
            }}
            style={[styles.tab, mode === 0 ? styles.selectedTab : {}]}
          >
            <Icon
              size={20}
              color={mode === 0 ? "#FFFFFF" : "#FFFFFFb7"}
              name="check"
              style={styles.tabIcon}
            />
            <Text
              style={[styles.tabText, mode === 0 ? styles.selectedText : {}]}
            >
              Final
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.toggle(1);
            }}
            style={[styles.tab, mode === 1 ? styles.selectedTab : {}]}
          >
            <Icon
              size={20}
              color={mode === 1 ? "#FFFFFF" : "#FFFFFFb7"}
              name="code"
              style={styles.tabIcon}
            />
            <Text
              style={[styles.tabText, mode === 1 ? styles.selectedText : {}]}
            >
              Diff
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.toggle(2);
            }}
            style={[styles.tab, mode === 2 ? styles.selectedTab : {}]}
          >
            <Icon
              size={20}
              color={mode === 2 ? "#FFFFFF" : "#FFFFFFb7"}
              name="layout"
              style={styles.tabIcon}
            />
            <Text
              style={[styles.tabText, mode === 2 ? styles.selectedText : {}]}
            >
              Side-By-Side
            </Text>
          </TouchableOpacity>
        </View>
      </Fragment>
    );
  }
}

export default DiffSection;

const styles = StyleSheet.create({
  tabWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: "#282a38",
    width: "100%",
    marginVertical: 15
  },
  tab: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 15,
    width: "30%",
    backgroundColor: "#282a38",
    paddingVertical: 10,
    borderRadius: 9999,
    borderWidth: 2,
    borderColor: "#2f3242"
  },
  selectedTab: {
    backgroundColor: "#2f3242",
    borderColor: "#FFFFFF"
  },
  selectedText: {
    color: "#FFFFFF"
  },
  tabText: {
    color: "#FFFFFFb7",
    fontSize: 10
  },
  tabIcon: {
    marginRight: 10
  },
  unchangedText: {
    color: "#FFFFFF"
  },
  sideBySideWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start"
  },
  sideBySide: {
    alignItems: "flex-start",
    padding: 5
  },
  sideBySideText: {
    fontSize: 12
  },
  textContainerStyle: {
    marginBottom: 20
  }
});
