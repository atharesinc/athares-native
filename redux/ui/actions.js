export function openSearch() {
  return async dispatch => {
    dispatch({ type: 'OPEN_SEARCH' });
  };
}
export function closeSearch() {
  return async dispatch => {
    dispatch({ type: 'CLOSE_SEARCH' });
  };
}
export function openDMSettings() {
  return async dispatch => {
    dispatch({ type: 'OPEN_DM_SETTINGS' });
  };
}
export function toggleDMSettings() {
  return async dispatch => {
    dispatch({ type: 'TOGGLE_DM_SETTINGS' });
  };
}
export function closeDMSettings() {
  return async dispatch => {
    dispatch({ type: 'CLOSE_DM_SETTINGS' });
  };
}
export function updateSearchParams(searchParams) {
  return async dispatch => {
    dispatch({ type: 'UPDATE_SEARCH', searchParams });
  };
}
export function toggleSearch() {
  return async dispatch => {
    dispatch({ type: 'TOGGLE_SEARCH' });
  };
}
export function toggleAddUsers() {
  return async dispatch => {
    dispatch({ type: 'TOGGLE_ADD_USERS' });
  };
}
export function updateOnlineStatus(isOnline) {
  return async dispatch => {
    dispatch({ type: 'UPDATE_ONLINE_STATUS', isOnline });
  };
}
