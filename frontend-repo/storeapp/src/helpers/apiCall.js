import axios from "axios";
axios.defaults.baseURL =
  process.env.NODE_ENV == "development"
    ? `http://localhost:8080`
    : process.env.REACT_APP_API_URI; // set our API server url const serverUrl = `http://localhost:8080`;so I don't need to write  const logIndata = await axios.post(`${serverUrl}/login`, data);
axios.defaults.withCredentials = true;

console.log(process.env);

console.log(axios.defaults.baseURL);

const extractApiError = (errAxios) => {
  return errAxios.response
    ? errAxios.response.data
    : { error: { message: "API not reachable" } };
};

export const logoutUser = async () => {
  try {
    const response = await axios.get("/logout");
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
    return err;
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

    return recordData.data;
  } catch (err) {
    console.log(err);
  }
};

export const updateUserProfile = async (data, id) => {
  try {
    const updatedUser = await axios.put(`/users/${id}`, data);
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

// send order
export const sendOrder = async (data, id) => {
  const res = await axios.post(`/users/${id}/orders`, data);
  return res.data;
};

// get order
export const getOrderData = async (id) => {
  try {
    const orderData = await axios.get(`users/${id}/orders`);

    return orderData.data;
  } catch (err) {
    console.log(err);
  }
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
