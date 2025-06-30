import React, { useContext } from "react";
import "./Main.css";
import { assets } from "../assets/Assets";
import { context } from "../context/context";

function Main() {
  const {
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
  } = useContext(context);

  return (
    <div className="Main">
      <div className="nav">
        <p className="Brand">Gemini</p>
        <img src={assets.user_icon} alt="UserIcon" />
      </div>
      <div className="main-container">
        {!showResult
         ? 
          <>
            <div className="greet">
              <p>
                <span>Hello, Ankit.</span>
              </p>
              <p>How can I help you today?</p>
            </div>
            <div className="cards">
              <div className="card">
                <p>Suggest beautifull places to see on an upcoming road trip</p>
                <img src={assets.compass_icon} alt="compass_icon" />
              </div>
              <div className="card">
                <p>Breifly summarize this concept: urban planning</p>
                <img src={assets.bulb_icon} alt="bulb_icon" />
              </div>
              <div className="card">
                <p>Brainstorm team bonding activities for our work retreat</p>
                <img src={assets.message_icon} alt="message_icon" />
              </div>
              <div className="card">
                <p>Improve the readability of the following code </p>
                <img src={assets.code_icon} alt="code_icon" />
              </div>
            </div>
          </>
         : 
          <div className="result">
            <div className="result-title">
              <img src={assets.user_icon} alt="user-icon" />
              <p>{recentPrompt}</p>
            </div>
            <div className="resultData">
              {console.log(resultData)}
              <img src={assets.gemini_icon} alt="gemini_icon" />
              {loading
              ?
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
                :
                <p dangerouslySetInnerHTML={{__html:resultData}}></p>
              }
              
            </div>

          </div>
        }
        <div className="main-botoom">
          <div className="search-box">
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder="Enter a prompt here"
            />
            <div>
              <img src={assets.gallery_icon} alt="gallery_icon" />
              <img src={assets.mic_icon} alt="mic_icon" />
              {input?
                <img
                onClick={() => onSent()}
                src={assets.send_icon}
                alt="send_icon"
                />:
                null
              }
              
            </div>
          </div>
          <p className="bottom-info">
            Gemini may display inaccurate info, so please crosscheck all
            information, especially for critical or sensitive topics, as AI
            models can hallucinate, reflect biases, or misunderstand context.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Main;
