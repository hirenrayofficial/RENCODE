import axios from "axios";
const api = process.env.REACT_APP_BACK_URL;

export const checkEditor = async (token, id) => {
  const res = await axios.post(
    api + "/edit/check",
    {
      token,
      id,
    },
    { withCredentials: true },
  );
  return res;
};
export const saveBlog = async (storedata) => {
  // Send the data object directly as the body
  const apiCall = await axios.post(api + `/edit/blog/save`, {
    headers: { "Content-Type": "application/json" },
    storedata,
  });
  return apiCall;
};
export const logOut = async () => {
  const removels = localStorage.clear()
  return removels
};
