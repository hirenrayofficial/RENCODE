import React, { useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { checkEditor } from "../editor/component/api/apiEditor";
// import jwt from 'jsonwebtoken'
export default  function EProtuctedRoute({ children }) {
    const [searchprams] = useSearchParams()
    const token =  searchprams.get("token")
    const id = searchprams.get("id")
    const hasrun = useRef(false)
    useEffect(()=>{
        if(hasrun.current) return
        hasrun.current = true
       
        const checkUser = async()=>{
            const res = await checkEditor(token,id) 
            if(res.status === 200){
                return
            }else{
                return window.location.replace("/login")
            }
        }
        // checkUser()
    })

    return children;
}
