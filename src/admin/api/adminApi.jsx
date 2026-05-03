import axios from "axios";

const api = "http://localhost:3000/api";

export const saveBlog = async (storedata) => {
  // Send the data object directly as the body
  const apiCall = await axios.post(api + `/admin/blog/save`, {
    headers: { "Content-Type": "application/json" },
    storedata
  });
  return apiCall;
};
export const getBlog = async () => {
  const apiCall = await axios.get(api + `/user/getblog`);
  return apiCall.data;
};


export const getBlogBySlug = async (slug) => {
  const apiCall = await axios.get(api + `/user/getblog?slug=${slug}`);
  return apiCall;
};

export const updateBlog = async (id, storedata) => {
  const apiCall = await axios.put(api + `/admin/blog/update/${id}`, storedata);
  return apiCall;
};
export const deleteBlog = async (id) => {
  const apiCall = await axios.delete(api + `/user/getblog?id=${id}`);
  return apiCall.data;
};

