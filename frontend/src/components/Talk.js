import React, {useEffect, useState} from "react";

const Talk = () => {
    const [isTalk, setIsTalk] = useState(false);
    const clickTalk = async () => {
        console.log("talk button is clicked");
        setIsTalk(true);
        const requestOptions = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        };
        
        await fetch("/api/talk", requestOptions)
        .then((response) => {response.json();})
        .then((data) => {
            console.log(data);
        })
        .catch((error) => {
            console.error("Error", error);
        })
        setIsTalk(false);
    }

    return (
        <button onClick={clickTalk} className="button is-link is-hover " style={{width:"100px"}}>
            {isTalk? 'TALKING' : 'TALK'}
        </button>
    )
}

export default Talk;