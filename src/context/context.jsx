import { createContext, useState } from "react";
import runChat from "../config/gemini";

export const context = createContext();

const ContextProvider = (props)=>{




    const [input,setInput] = useState("")
    const [recentPrompt,setRecentPrompt] = useState("")
    const [prevPrompts,setPrevPrompts] = useState([])
    const [showResult,setShowResult] = useState(false)
    const [loading,setLoding] = useState(false)
    const [resultData,setResultData] = useState("")

    const newChat = ()=>{
        setLoding(false)
        setShowResult(false)
    }

    const deplayPara = (index,newWord)=>{
        setTimeout(function () {
            setResultData(prev=>prev+newWord);
        }, index*75);
    }

    const onSent = async(prompt)=>{
        setResultData("")
        setLoding(true)
        setShowResult(true)
        let response;
        if(prompt !== undefined){
            response = await runChat(prompt);
            setRecentPrompt(prompt)
        }
        else{
            setPrevPrompts(prev=>[...prev,input]);
            setRecentPrompt(input)
            response = await runChat(input)
        }

        let newResponse = response.split("**")
        let ansResponse="";
        for(let i=0;i<newResponse.length;i++){
            if(i===0 || i%2 != 1){
                ansResponse+=newResponse[i]
            }
            else{
                ansResponse+="<b>"+newResponse[i]+"</b>"
            }
        }
         let newResponse2 = ansResponse.split("*").join("</br>")
         let finalResponse = newResponse2.split("###").join("</br></br></br>")
        let newResponseArraay = finalResponse.split(" ");
        for(let i=0; i<newResponseArraay.length;i++){
            const newWord = newResponseArraay[i];
            deplayPara(i,newWord+" ")
        }
        // let another
        setLoding(false)
        setInput("")
    }
    

   const  contextValue = {
    prevPrompts,
    setPrevPrompts,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    newChat
    }

    return (
        <context.Provider value ={contextValue}>
            {props.children}
        </context.Provider>
    )
}
export default ContextProvider;