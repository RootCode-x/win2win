"use client"
import React, { useEffect, useState } from 'react'
import { IconGift, IconMessageDots, IconMenu2, IconX, IconUserCircle, IconMoodHappy, IconFileTypePdf, IconAt, IconPhotoPlus, IconSend } from "@tabler/icons-react";
import Image from 'next/image';
import Pusher from 'pusher-js';
import axios from 'axios';
import {api_path, pusher_appId, pusher_key, pusher_secret, pusher_cluster} from '@/lib/api_path';
import { usePathname, useSearchParams } from 'next/navigation';
import styles from './chat_css.module.css';

export default function ChatWith({session}) {
  const searchParams = useSearchParams();
  const userId = searchParams.get('userId'); 
 
  const senderid = session.user.user_id;
  const user_id = userId;
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [receiverInfo, setReceiverInfo] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    const pusher = new Pusher(pusher_key, {
      cluster: pusher_cluster,
    });

    const channel = pusher.subscribe('public');
    channel.bind('chat', async function (data) {
      try {
        const response = await axios.post(`${api_path}/chat/broadcast`, {
          message: data.message,
          senderid: data.senderid,
          receiverid: data.receiverid,
          posttype: 'receive',
          messageType: data.messageType,
          imageUrl: data.imageUrl
        }, {
          headers: {
            'Access-Control-Allow-Origin': '*',
          },
        });

        const sentMessage = response.data.data;
        if (sentMessage.receiverid === senderid) {     
          if (data.senderid === user_id) {     
            setMessages(prevMessages => [...prevMessages, sentMessage]);
            setMessageInput('');
          }
        }
      } catch (error) {
        console.error('Error:', error);
      }
    });

    const fetchChatMessages = async () => {
      try {
        const response = await axios.post(`${api_path}/chat/broadcast`, {
          senderid: senderid,
          receiverid: user_id,
          posttype: 'chats',
        }, {
          headers: {
            'Access-Control-Allow-Origin': '*',
          },
        });

        setMessages(response.data.chatMessages);
        setReceiverInfo(response.data.receiverInfo);        
      } catch (error) {
        console.error('Error fetching chat messages:', error);
      }
    };
    
    fetchChatMessages();
    return () => {
      channel.unbind('chat');
      pusher.unsubscribe('public');
    };
  }, [user_id]);

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const pusher = new Pusher(pusher_key, {
      cluster: pusher_cluster,
    });

    try {
      setIsUploading(true);
      let imageUrl = null;

      if (selectedImage) {
        const formData = new FormData();
        formData.append('image', selectedImage);
        
        // Upload image first
        const uploadResponse = await axios.post(`${api_path}/upload/image`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        imageUrl = uploadResponse.data.imageUrl;
      }

      // Send message with or without image
      const response = await axios.post(
        `${api_path}/chat/broadcast`,
        {
          message: messageInput,
          senderid: senderid,
          receiverid: user_id,
          posttype: 'broadcast',
          messageType: selectedImage ? 'image' : 'text',
          imageUrl: imageUrl
        },
        {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'X-Socket-Id': pusher.connection.socket_id,
          },
        }
      );

      const sentMessage = response.data.data;      
      if (sentMessage.senderid === senderid) {
        setMessages(prevMessages => [...prevMessages, sentMessage]);
        setMessageInput('');
        setSelectedImage(null);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsUploading(false);
    }
  };


      
  const formatTimestamp = (timestamp) => {
    let date;
    if (timestamp !== undefined && timestamp !== null) {
        date = new Date(timestamp);
    } else {
        date = new Date(); 
    }

    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const formattedTime = date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit'
    }).toLowerCase();

    if (date.toDateString() === today.toDateString()) {
        return formattedTime;
    } else if (date.toDateString() === yesterday.toDateString()) {
        return `Yesterday`;
    } else {
        const diffInDays = Math.floor((today - date) / (1000 * 60 * 60 * 24));
        if (diffInDays === 1) {
            return `Yesterday`;
        } else if (diffInDays <= 7) {
           // return `${formattedTime} ${diffInDays} days ago`;
            return `${diffInDays} days ago`;
        } else {
            const formattedDate = date.toLocaleDateString('en-US', {
                month: '2-digit',
                day: '2-digit',
                year: '2-digit'
            }).replace(/\//g, '.');
            return `${formattedTime} ${formattedDate}`;
        }
    }
};


  const MessageContent = ({ message }) => {
    if (message.messageType === 'image') {
      return (
        <div className={styles.imageMessage}>
          <Image 
            src={message.imageUrl} 
            alt="Shared image" 
            width={200} 
            height={200}
            className={styles.sharedImage}
          />
          {message.message && <p className={styles.imageCaption}>{message.message}</p>}
        </div>
      );
    }
    return <p>{message.message}</p>;
  };

  // ... (keep the formatTimestamp function and useEffect for scroll the same)

  return (
    <section className="top_matches pt-20">
      {/* ... (keep the existing outer structure the same) */}

    <div
    style={{
    borderRadius: "10px 10px 0 0",
    background: "linear-gradient(#fb551c, #f7b633)",
    padding: "10px 0",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    color: "#fff",
    }}
    >
    <h2> Support Team  <span style={{ fontSize: "12px", fontWeight: "bold" }}>Online 🟢</span> </h2>
    </div>


      <div className="card-body">
        <div className={styles.chatContainer} >
          <main className={styles.chatHistory} id="yourChatContainerId">
            {messages.map((message, index) => (
              <div key={index}>
                {message.senderid === senderid ? (
                  <div className={`${styles.message} ${styles.right}`}>
                    <MessageContent message={message} />
                    <Image className={styles.senderAvatar} src="/images/user_icon.png" height={10} width={10} alt="Icon" />
                    <div className={styles.senderInfo}>
                      <span className={styles.username}>You</span>
                      <span className={styles.timestamp}>{formatTimestamp(message.createdAt)}</span>
                    </div>
                  </div>
                ) : (
                  <div className={`${styles.message} ${styles.left}`}>
                    <Image className={styles.senderAvatar} src="/images/agent_icon.png" height={10} width={10} alt="Icon" />
                    <div className={styles.senderInfo}>
                      <span className={styles.username}>{message.senderid}</span>
                      <span className={styles.timestamp}>{formatTimestamp(message.createdAt)}</span>
                    </div>
                    <MessageContent message={message} />
                  </div>
                )}
              </div>
            ))}
          </main>
          <form onSubmit={handleSubmit}>
            <footer className={styles.chatInput}  style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
              <div className={styles.inputWrapper} style={{ width: '100%' }}>
                <input 
                  type="text" 
                  value={messageInput} 
                  onChange={(e) => setMessageInput(e.target.value)} 
                  placeholder="Enter message..." 
                  autoComplete="off"
                />
                {/* <label className={styles.imageInputLabel}>
                  <IconPhotoPlus className={styles.imageIcon} />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageSelect}
                    className={styles.imageInput}
                  />
                </label> */}
              </div>
              <button type="submit" disabled={isUploading}>
                {isUploading ? 'Sending...' : 'Send'}
              </button>
            </footer>
          </form>
        </div>
      </div>
      {/* ... (keep the rest of the existing structure the same) */}
    </section>
  )
}