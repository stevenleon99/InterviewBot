import React, { useState, useEffect } from 'react';
import '../css/styles.css';

function Displaychat() {
    const [fileContent, setFileContent] = useState('');
    const filePath = "D:/InterviewBot/db/test.txt"
    useEffect(() => {
        fetch(filePath)
            .then(response => response.text())
            .then(text => setFileContent(text))
            .catch(error => console.error('Error fetching text file:', error));
    }, [filePath]);

    return (
        <div className="column chatHistoryStyle">
            <div className='box'>
                <article className="message is-primary">
                    <div className="message-header">
                        <p>Chat History</p>
                    </div>
                    <div className="message-body">
                        {fileContent}
                    </div>
                </article>
            </div>
        </div>
    )

}

export default Displaychat;