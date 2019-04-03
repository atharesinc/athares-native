const initialState = {
  searchOpen: false,
  dmSettings: false,
  showAddMoreUsers: false,
  searchParams: "",
  isOnline: false
};

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case "OPEN_SEARCH":
      return { ...state, searchOpen: true };
    case "CLOSE_SEARCH":
      return { ...state, searchOpen: false };
    case "TOGGLE_SEARCH":
      return { ...state, searchOpen: !state.searchOpen };
    case "CLOSE_DM_SETTINGS":
      return { ...state, dmSettings: false };
    case "OPEN_DM_SETTINGS":
      return { ...state, dmSettings: true };
    case "TOGGLE_ADD_USERS":
      return { ...state, showAddMoreUsers: !state.showAddMoreUsers };
    case "UPDATE_SEARCH":
      return { ...state, searchParams: action.searchParams };
    case "UPDATE_ONLINE_STATUS":
      return { ...state, isOnline: action.isOnline };
    default:
      return { ...initialState };
  }
}

export function pull(state, value) {
  return state.uiReducers[value];
}
