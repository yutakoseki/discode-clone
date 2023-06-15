import React, { useState, useEffect } from 'react'
import './Chat.scss';
import ChatHeader from './ChatHeader';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import GifIcon from '@mui/icons-material/Gif';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import ChatMessage from './ChatMessage';
import { useAppSelector } from '../../app/hooks';
import { db } from '../../firebase';
import { collection, CollectionReference, DocumentData, DocumentReference, addDoc, serverTimestamp, onSnapshot, Timestamp } from 'firebase/firestore';

interface Messages {
  timestamp: Timestamp;
  message: string;
  user: {
    uid: string;
    photo: string;
    email: string;
    displayName: string;
  }
}

function Chat() {
  const [ inputText, setInputText ] = useState<string>("")
  const [ messages, setMessages ] = useState<Messages[]>([]);
  const channelName = useAppSelector((state) => state.channel.channelName);
  const channelId = useAppSelector((state) => state.channel.channelId);
  const user = useAppSelector((state) => state.user.user);
  // console.log(channelName);

  useEffect(() => {
    let collectionRef = collection(db,
      "channels",
      String(channelId),
      "messages"
    );

    onSnapshot(collectionRef, (snapshot) => {
      let results: Messages[] = [];
      snapshot.docs.forEach((doc) => {
        results.push({
          timestamp: doc.data().timestamp,
          message: doc.data().message,
          user: doc.data().user,
        })
      });
      setMessages(results);
      console.log(results)
    })

  }, [channelId])
  
  
  // チャットメッセージをfirebaseに登録
  const sendMessage = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault(); //送信した時にページをリロードしない
    
    // channelsコレクションの中にあるnessagesコレクションの中にメッセージ情報を入れる
    const collectionRef: CollectionReference<DocumentData> = collection(
      db,
      "channels",
      String(channelId),
      "messages"
    );

    const docRef: DocumentReference<DocumentData> = await addDoc(collectionRef, {
      message: inputText,
      timestamp: serverTimestamp(),
      user: user,
    });
  }

  return (
    <div className='chat'>
        {/* chatHeader */}
        <ChatHeader channelName={channelName}/>
        {/* chatMessage */}
        <div className="chatMessage">
          {messages.map((message, index) => (
            <ChatMessage key={index}
              message={message.message}
              timestamp={message.timestamp}
              user={message.user}
            />
          ))}
        </div>
        {/* chatInput */}
        <div className="chatInput">
          <AddCircleOutlineIcon />
          <form>
            <input type="text" placeholder='#Udemyへメッセージを送信' onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputText(e.target.value)}/>
            <button type='submit' className='chatInputButton' onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
              sendMessage(e)
            }>
              送信
            </button>
          </form>

          <div className="chatInputIcons">
            <CardGiftcardIcon />
            <GifIcon />
            <EmojiEmotionsIcon />
          </div>
        </div>
    </div>
  )
}

export default Chat