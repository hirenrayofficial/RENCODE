import axios from "axios";
const api = "http://localhost:3000/api";

export const getBlog = async (slug) => {
  if (slug) {
    const res = await axios.get(api + `/user/getblog?slug=${slug}`);
    return res.data;
  } else {
    const res = await axios.get(api + `/user/getblog`);
    return res.data;
  }

  // console.log(res.data.getallblog)
};
