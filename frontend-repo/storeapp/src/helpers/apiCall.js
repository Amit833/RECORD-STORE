import axios from "axios";
axios.defaults.baseURL =
  `http://localhost:8080` || process.env.REACT_APP_API_URI; // set our API server url const serverUrl = `http://localhost:8080`;so I don't need to write  const logIndata = await axios.post(`${serverUrl}/login`, data);
axios.defaults.withCredentials = true;

console.log(axios.defaults.baseURL);

const extractApiError = (errAxios) => {
  return errAxios.response
    ? errAxios.response.data
    : { error: { message: "API not reachable" } };
};

export const logoutUser = async () => {
  try {
    const response = await axios.get("/logout");
    console.log("Result: ", response.data);
    return response.data;
  } catch (err) {
    return extractApiError(err);
  }
};

export const addLoginData = async (data) => {
  try {
    const logIndata = await axios.post(`/login`, data);
    return logIndata;
  } catch (err) {
    return err.response.data;
  }
};

export const addSignupData = async (data) => {
  try {
    const signupdata = await axios.post(`/users`, data);
    return signupdata;
  } catch (err) {
    return err.response.data;
  }
};

export const getRecordData = async () => {
  try {
    const recordData = await axios.get(`/records`);
    console.log("recorddata:", recordData);

    return recordData.data;
  } catch (err) {
    console.log(err);
  }
};

export const updateUserProfile = async (data, id) => {
  try {
    const updatedUser = await axios.put(`/users/${id}`, data);
    console.log("updatedUser:", updatedUser);
    return updatedUser.data;
  } catch (err) {
    console.log(err);
  }
};

export const authenticateUser = async () => {
  try {
    const response = await axios.post(`/me`);
    return response.data;
  } catch (err) {
    return extractApiError(err);
  }
};

// I think I don't need this function
export const addOrders = async (orderData) => {
  try {
    const response = await axios.post("/orders", orderData);
    return response;
  } catch (error) {
    return extractApiError(error);
  }
};

export const sendOrder = async (data, id) => {
  const res = await axios.post(`/users/${id}/orders`, data);
  return res.data;
};

// to payment router
export const sendPaymentInfo = async (paymentData) => {
  try {
    const res = await axios.post("/payment", paymentData);
    return res.data;
  } catch (error) {
    return extractApiError(error);
  }
};

export const sendPaymentInfoToMail = async (paymentData) => {
  try {
    const res = await axios.post("/sendmail", paymentData);
    return res.data;
  } catch (error) {
    return extractApiError(error);
  }
};

// export const sendPaymentInfo = async (paymentData) => {
//   const res = await axios.post(`/payment`, paymentData);
//   return res.data;
// };
