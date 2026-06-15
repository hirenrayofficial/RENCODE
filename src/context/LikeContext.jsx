import React, {
  createContext,
  useContext,
} from "react";
import { likeAPi } from "../component/api/ApiProvider";

const Likecontext = createContext();

export const LikeContext = ({ children }) => {

    const lsDtls = JSON.parse(localStorage.getItem("t-usdtls"))
    const id = lsDtls?.uuid
    // const [likes,setLikes] = useState()

    const handelLike = async ({blogid})=>{
      const res = await likeAPi(blogid,id)
      console.log(res)
      // alert(blogid,id)

    }
    
  return (
    <Likecontext.Provider value={{handelLike }}>
      {children}
    </Likecontext.Provider>
  );
};

export const useLike = () => useContext(Likecontext);
