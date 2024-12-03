'use client';

import { useEffect, useRef, useState } from 'react';
import tmi, { Client } from 'tmi.js';

export type Message = {
  id: number,
  type: string,
  message: string
}

const TwitchChat = () => {
  const [channel, setChannel] = useState('');
  const [messages, setMessages] = useState<Message[]>([])
  const [isConnected, setIsConnected] = useState(false);
  const [client, setClient] = useState(null);

  const [scrolling, setScrolling] = useState(false);
  const chatRef = useRef<HTMLDivElement | null>(null);

  const connectToChannel = () => {
    if (!channel || isConnected) return;

    const tmiClient = new Client({
      channels: [channel]
    })

    tmiClient.connect().catch(console.error);

    tmiClient.on('connected', () => {
      setIsConnected(true);
      setMessages(prev => [...prev, {
        id: Date.now(),
        type: 'system',
        message: `Connected to ${channel}'s chat`
      }])
    })
  }

  useEffect(() => {

    client.connect();

    const onMessageHandler = (channel: string, userstate: tmi.ChatUserstate, message: string, self: boolean) => {
      {
        if (self) return; // ignore messages from the bot itself

        const newMessage = `${userstate['display-name']}: ${message}`;

        setMessages((prevMessages) => {
          const newMessages = [newMessage, ...prevMessages]
          newMessages.length > 300 && newMessages.pop()
          return newMessages;
        })

        if (chatRef.current) {
          chatRef.current.scrollTo({ top: chatRef.current.scrollHeight });
        }
      }
    }

    client.on('message', onMessageHandler);

    return () => {
      client.on('message', onMessageHandler); // Remove the listener
      client.disconnect();
    }
  }, [])

  return (
    <div ref={chatRef} className='flex flex-col-reverse bg-slate-100 text-sm max-h-screen h-screen overflow-scroll'>
      {
        messages.map((message, index) => (
          <div key={index}>{message}</div>
        ))
      }
    </div>
  )
}

export default TwitchChat;