import React, { useContext, useState } from "react";
import { assets } from "../assets/Assets";
import "./Sidebar.css";
import { context } from "../context/context";

function Sidebar() {
  let [extend, setextend] = useState(false);
  const{onSent, prevPrompts,setRecentPrompt,newChat} = useContext(context)
  const loadPrompt = async(prompt)=>{
    setRecentPrompt(prompt)
    await onSent(prompt)
  }
   
  return (
    <div>
      <div className="sidebar">
        <div className="top">
          <img onClick={()=>setextend(prev=>!prev)} src={assets.menu_icon} alt="MenuBar" className="menu_icon" />
          <div onClick={()=>newChat()} className="new-chat">
            <img src={assets.plus_icon} alt="plus_icon" className="add-icon" />
            {extend ? <p>New-Chat</p> : null}
          </div>
          {extend ? (
            <div className="recent">
              <p className="recent-title">Recent Tittle</p>
              {prevPrompts.map((items,index)=>{
                return(
                    <div  onClick={()=>loadPrompt(items)} className="recent-entry">
                      <img
                        src={assets.message_icon}
                        alt="message-icon"
                        className="message-icon"
                         />
                      <p key={index}>{items.slice(0,18)}...</p>
                    </div> 
                )

              })}
              
            </div>
          ) : null}
        </div>
        <div className="bottom">
          <div className="bottom-item recent-entry">
            <img
              src={assets.question_icon}
              alt="question_icon"
              className="question-icon"
            />
            {extend?<p>Help</p>:null} 
          </div>
          <div className="bottom-item recent-entry">
            <img
              src={assets.history_icon}
              alt="history_icon"
              className="history-icon"
            />
            {extend?<p>Activity</p>:null}
          </div>
          <div className="bottom-item recent-entry">
            <img
              src={assets.setting_icon}
              alt="setting_icon"
              className="setting-icon"
            />
            {extend?<p>Setting</p>:null} 
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
