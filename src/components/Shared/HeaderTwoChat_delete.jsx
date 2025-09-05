"use client"
import React, { useEffect, useState } from 'react'
import { IconGift, IconMessageDots, IconMenu2, IconX, IconUserCircle, IconMoodHappy, IconFileTypePdf, IconAt, IconPhotoPlus, IconSend } from "@tabler/icons-react";
import Image from 'next/image';
import Pusher from 'pusher-js';
import axios from 'axios';
import {api_path, pusher_appId, pusher_key, pusher_secret, pusher_cluster} from '@/lib/api_path';

export default function HeaderTwoChat({session}) {
    const [isCardExpanded, setIsCardExpanded] = useState(false);

    const toggleCard = () => {
      setIsCardExpanded(!isCardExpanded);
    };
  
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (isCardExpanded && !event.target.closest(".cmns_msgarea")) {
          setIsCardExpanded(false);
        }
      };
      document.body.addEventListener("click", handleClickOutside);
      return () => {
        document.body.removeEventListener("click", handleClickOutside);
      };
    }, [isCardExpanded]);



    const senderid = session.user.user_id;

    const user_id  = 'A11487';

    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState('');
    const [receiverInfo, setReceiverInfo] = useState({});


    useEffect(() => {
       
        console.log('aasdfasdfsdf', pusher_key);

        const pusher = new Pusher(pusher_key, {
            cluster: pusher_cluster,
        });
        const channel = pusher.subscribe('public');
        channel.bind('chat', async function (data) {
          try {

             const response = await axios.post(`${api_path}/chat/broadcast`, {
                message: data.message,  senderid: data.senderid, receiverid: data.receiverid,posttype: 'receive',
              }, {
                headers: {
                  'Access-Control-Allow-Origin': '*', // Replace with your frontend origin in production
                },
              });

           
              const sentMessage = response.data.data; // Extract sent message data
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
                senderid: senderid, receiverid: user_id, posttype: 'chats',
              }, {
                headers: {
                  'Access-Control-Allow-Origin': '*', // Replace with your frontend origin in production
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


    const handleSubmit = async (e) => {
        e.preventDefault();
        const pusher = new Pusher(pusher_key, {
            cluster: pusher_cluster,
        });
        try {
            const response = await axios.post(
                `${api_path}/chat/broadcast`,
                {
                    message: messageInput, senderid: senderid, receiverid: user_id, posttype: 'broadcast',
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
            } else {
                 setMessageInput('');
            }
    
        } catch (error) {
            console.error('Error:', error);
        }
    };

    
    const formatTimestamp = (timestamp) => {
        let date;
        if (timestamp !== undefined && timestamp !== null) {
            date = new Date(timestamp);
        } else {
            date = new Date(); // Set to current time if timestamp is undefined or null
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
            return `${formattedTime} Yesterday`;
        } else {
            const diffInDays = Math.floor((today - date) / (1000 * 60 * 60 * 24));
            if (diffInDays === 1) {
                return `${formattedTime} Yesterday`;
            } else if (diffInDays <= 7) {
                return `${formattedTime} ${diffInDays} days ago`;
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
    
    useEffect(() => {
        const chatContainer = document.getElementById('yourChatContainerId');
        if (chatContainer) {
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }
    }, [messages]);

    return (
        <>
            <div className="cmn-head">
                <button onClick={toggleCard} type="button" aria-label="Shopping Button"
                    className="common_toggles2 py-1 px-2 n11-bg rounded-5 position-relative">
                    <IconMessageDots height={24} width={24} className="slide-toggle2 ti ti-message-dots fs-four" />
                    <span className="fs-eight g1-bg px-1 rounded-5 position-absolute end-0 top-0">2</span>
                </button>
                <div className={`cmns_msgarea msg_area common_area2 p2-bg rounded-2 ${isCardExpanded ? "" : "massagearashow"}`}>
                    <div className="cmns_msgarea__head d-flex align-items-center justify-content-between gap-5 n11-bg px-6 py-2">
                        <div className="d-flex align-items-center gap-2">
                            <button type="button"><IconMenu2 height={24} width={24} className="ti ti-menu-2 fs-four n5-color" /></button>
                            <h5 className="fs-five">Chat</h5>
                        </div>
                        <div onClick={toggleCard} className="common_toggles3">
                            <IconX className="ti ti-x fs-four cpoint n5-color" />
                        </div>
                    </div>

                        <div className="cmns_msgarea__body p-5 p-md-6" id="yourChatContainerId" >

                            {messages.map((message, index) => (
                                    <div key={index} className={`message ${message.senderid === senderid ? 'right' : 'left'}`}>
                                        {message.senderid === senderid ? (
                                            <div className="d-flex align-items-start justify-content-end gap-4 mb-4">
                                                <div className="cmns_msgarea__head-conent">
                                                    <div className="d-flex align-items-center gap-2 justify-content-end">
                                                        <span className="n3-color seven" style={{ fontSize:'10px' }}>{formatTimestamp(message.createdAt)}</span>
                                                        <h6 style={{fontSize:'10px'}}>You</h6>
                                                    </div>
                                                    <p style={{ textAlign: 'justify', fontSize:'15px' }}>{message.message}</p>
                                                </div>
                                                <div className="cmns_msgarea__head-thumb">
                                                    <Image className="rounded-5" src="/images/user_icon.png" height={30} width={30} alt="Icon" />
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="d-flex align-items-start gap-4 mb-4">
                                                <div className="cmns_msgarea__head-thumb">
                                                    <Image className="rounded-5" src="/images/receiver_user.png" height={30} width={30} alt="Icon" />
                                                </div>
                                                <div className="cmns_msgarea__head-conent">
                                                    <div className="d-flex align-items-center gap-2">
                                                        <h6 style={{fontSize:'10px'}}>{message.senderid}</h6>
                                                        <span className="n3-color seven" style={{ fontSize:'10px' }}>{formatTimestamp(message.createdAt)}</span>
                                                    </div>
                                                    <p style={{ textAlign: 'justify', fontSize:'15px' }}>{message.message}</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                              <div style={{paddingTop:'50px'}}></div>
                    </div>


                    <div className="cmns_msgarea__footer py-4 py-md-5 px-5 px-md-6 position-absolute bottom-0 n11-bg w-100">
                        <form onSubmit={handleSubmit} className="d-flex align-items-center justify-content-end flex-wrap flex-sm-nowrap gap-2 gap-sm-5 w-100">
                            <div className="cmns_msgarea__footer-fileup d-flex align-items-center py-1 pe-3 gap-sm-1 w-100">
                                <input value={messageInput}  onChange={(e) => setMessageInput(e.target.value)} id="message" name="message"  type="text" placeholder="Send message" />                              
                                <button type="submit" className="py-3 px-5 g1-bg rounded-8"><IconSend width={24} height={24} className="ti ti-send fs-four" /></button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
