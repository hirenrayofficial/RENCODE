import axios from "axios";
const api = process.env.REACT_APP_BACK_URL;

export const checkEditor = async (token, id) => {
  const res = await axios.get(api + "/edit/check?id=" + id, {
    headers: { "Content-Type": "application/json" },
  });
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
  const removels = localStorage.clear();
  return removels;
};

export const getuserByBlog = async (id) => {
  const callApi = await axios.get(api + "/edit/blog/get?id=" + id);
  return callApi;
};

export const aprovedBlog = async (id,blogid)=>{
  const res = await axios.post(api + "/edit/blog/approved?id="+id+"&blogID="+blogid)
  return res
}
export const deleteBlog = async (id,blogid)=>{
  const res = await axios.post(api + "/edit/blog/delete?id="+id+"&blogID="+blogid)
  return res
}