const getUserIDInSession = () => {
  if (window.sessionStorage.getItem("user")) {
    const userJson = window.sessionStorage.getItem("user");
    const userId = JSON.parse(userJson).id;
    return userId;
  } else {
    return null;
  }
};

export default getUserIDInSession;
