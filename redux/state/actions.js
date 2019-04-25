import { AsyncStorage } from "react-native";

export function updateUser(user) {
  return async dispatch => {
    dispatch({ type: "UPDATE_USER", user });
  };
}
export function updateActiveUser(user) {
  return async dispatch => {
    dispatch({ type: "UPDATE_ACTIVE_USER", user });
  };
}
export function updatePub(pub) {
  return async dispatch => {
    dispatch({ type: "UPDATE_PUB", pub });
  };
}

export function updateCircle(circle) {
  return async dispatch => {
    dispatch({ type: "UPDATE_CIRCLE", circle });
  };
}

export function updateChannel(channel) {
  return async dispatch => {
    dispatch({ type: "UPDATE_CHANNEL", channel });
  };
}
export function updateRevision(revision) {
  return async dispatch => {
    dispatch({ type: "UPDATE_REVISION", revision });
  };
}
export function logout() {
  return async dispatch => {
    dispatch({ type: "LOGOUT" });
    Promise.all([
      AsyncStorage.removeItem("ATHARES_ALIAS"),
      AsyncStorage.removeItem("ATHARES_TOKEN"),
      AsyncStorage.removeItem("ATHARES_HASH")
    ]);
  };
}

export function updateDMs(dms) {
  return async dispatch => {
    dispatch({ type: "UPDATE_DMS", dms });
  };
}
export function addUnreadDM(dm) {
  return async (dispatch, getState) => {
    let { unreadDMs } = getState().stateReducers;
    if (!unreadDMs.includes(dm)) {
      unreadDMs = [...unreadDMs, dm];
      dispatch({
        type: "ADD_UNREAD_DM",
        dms: unreadDMs
      });
    }
  };
}
export function removeUnreadDM(dm) {
  return async (dispatch, getState) => {
    let { unreadDMs } = getState().stateReducers;
    if (unreadDMs.includes(dm)) {
      let index = unreadDMs.findIndex(d => d === dm);
      unreadDMs.splice(index, 1);
      unreadDMs = [...unreadDMs];
      dispatch({
        type: "REMOVE_UNREAD_DM",
        dms: unreadDMs
      });
    }
  };
}

export function updateChannels(channels) {
  return async dispatch => {
    dispatch({ type: "UPDATE_CHANNELS_LIST", channels });
  };
}

export function addUnreadChannel(chan) {
  return async (dispatch, getState) => {
    let { unreadChannels } = getState().stateReducers;
    if (!unreadChannels.includes(chan)) {
      unreadChannels = [...unreadChannels, chan];
      dispatch({
        type: "UPDATE_UNREAD_CHANNEL_MSGS",
        channels: unreadChannels
      });
    }
  };
}
export function removeUnreadChannel(chan) {
  return async (dispatch, getState) => {
    let { unreadChannels } = getState().stateReducers;
    if (unreadChannels.includes(chan)) {
      let index = unreadChannels.findIndex(d => d === chan);
      unreadChannels.splice(index, 1);
      unreadChannels = [...unreadChannels];
      dispatch({
        type: "UPDATE_UNREAD_CHANNEL_MSGS",
        channels: unreadChannels
      });
    }
  };
}
