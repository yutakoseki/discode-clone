import React from 'react'
import './ChatMessage.scss';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function ChatMessage() {
  return (
    <div className='message'>
        <AccountCircleIcon />
        <div className="messageInfo">
            <h4>
                Shin Code
                <span className='messageTimestamp'>2023/06/13</span>
            </h4>

            <p>メッセージ本文</p>
        </div>
    </div>
  )
}

export default ChatMessage