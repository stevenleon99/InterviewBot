import React, { useState, useEffect } from 'react';
import '../css/styles.css';

function Displaychat() {
    const [chatHistory, setChatHistory] = useState([{
        // Initialize your form fields, for example:
        role: '',
        content: '',
      }]);
    const getChatHistory = async () => {
        const requestOption = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        };
        const response = await fetch("/api/getChat", requestOption);
        const data = await response.json();

        if (!response.ok){
            console.log("response not correct when fetch /api/getChat");
        } else {
            const chatHistoryArray = JSON.parse(data.message);  /* [{'role': XXX, 'content': XXX}], [], [], ... */
            setChatHistory(chatHistoryArray);
        }
        
    };
    

    const refreshChatHistory = () => {
        console.log("refresh button clicked");
        getChatHistory();
    }

    return (
        <div className="column chatHistoryStyle">
            <div className='box'>
                <article className="message is-primary">
                    <div className="message-header">
                        <p>Chat History</p>
                    </div>
                    <div className="message-body">
                        <table className='table is-hoverable is-borderless'>
                            <thead>
                                <th style={{minWidth:"100px"}}>Role</th>
                                <th>Content</th>
                            </thead>
                            <tbody>
                                {chatHistory.map(item => (
                                    <tr>
                                        <td>{item.role}</td>
                                        <td>{item.content}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </article>
                <button className='button is-primary' onClick={refreshChatHistory}>Refresh</button>
            </div>
        </div>
    )

}

export default Displaychat;