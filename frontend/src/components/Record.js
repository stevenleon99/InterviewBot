import { useState, useEffect, useRef } from "react";
import React from "react";
import "../css/styles.css";
import axios from 'axios';

const Record = () => {
    const [isRecord, setIsRecord] = useState(false);
    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);


    const handleButtonDown = async () => {
        console.log("button is pressed");
        try{
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorderRef.current = new MediaRecorder(stream);
            mediaRecorderRef.current.ondataavailable = event => {
                audioChunksRef.current.push(event.data);
            };
            mediaRecorderRef.current.start();
            setIsRecord(true);
        } catch (error) {
            console.error("Error accessing media devices:", error);
        }
        
        
    }    
    const handleButtonUp = () => {
        console.log("button is released");
        setIsRecord(false);
        if (mediaRecorderRef.current){
            mediaRecorderRef.current.stop();
            mediaRecorderRef.current.onstop = async () => {
                const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
                const formData = new FormData();
                formData.append('file', audioBlob);
                // Send the audio file to the backend server
                await axios.post('/api/uploadvoice', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                audioChunksRef.current = [];
            };
        }
    }

    return (
        <button 
            onMouseDown={handleButtonDown}
            onMouseUp={handleButtonUp}
            id="myButton"
            className="button is-danger is-hover" 
            style={{width:"100px"}}>{isRecord ? 'RECORDING' : "RECORD"}</button>
        )
}

export default Record;