'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { Client } from 'tmi.js'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { ScrollArea, ScrollBar } from './ui/scroll-area'

export type Message = {
  id: string,
  type: string,
  message: string,
  username?: string,
  color?: string,
}

const TwitchChat = () => {
  const [channel, setChannel] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [isConnected, setIsConnected] = useState(false)
  const [client, setClient] = useState<Client | null>(null)

  const [scrolling, setScrolling] = useState(false)
  const secondColumnChat = useRef<HTMLDivElement | null>(null)
  const mainChat = useRef<HTMLDivElement | null>(null)

  const connectToChannel = () => {
    if (!channel || isConnected) return

    const tmiClient = new Client({
      channels: [channel]
    })

    tmiClient.connect().catch(console.error)

    tmiClient.on('connected', () => {
      setIsConnected(true)
      setMessages(prev => [...prev, {
        id: crypto.randomUUID(),
        type: 'system',
        message: `Connected to ${channel}'s chat`
      }])
    })

    tmiClient.on('message', (channel, tags, message, self) => {
      setMessages(prev => {

        const updatedMessages = [...prev, {
          id: crypto.randomUUID(),
          type: 'chat',
          username: tags['display-name'],
          message,
          color: tags.color || '#FF69B4'
        }]

        if (updatedMessages.length > 200) {
          updatedMessages.shift();
        }

        return updatedMessages;
      })
    })

    setClient(tmiClient)
  }

  const disconnectFromChannel = () => {
    if (client) {
      client.disconnect()
      setClient(null)
      setIsConnected(false)
      setMessages(prev => [...prev, {
        id: crypto.randomUUID(),
        type: 'system',
        message: 'Disconnected from chat'
      }])
    }
  }

  useEffect(() => {
    return () => {
      if (client) {
        client.disconnect()
      }
    }
  }, [client])

  const setScroll = useCallback(() => {
    if (messages && secondColumnChat.current && mainChat.current) {
      secondColumnChat.current.scrollTop = mainChat.current.scrollHeight - secondColumnChat.current.clientHeight * 2

    }
    if (messages && mainChat.current) {
      mainChat.current.scrollTop = mainChat.current.scrollHeight
    }
  }, [])

  useEffect(() => {
    setScroll()
  }, [messages])

  return (
    <div className='flex flex-col max-h-screen h-screen'>
      <div className='flex'>
        <Input
          type='text'
          placeholder='Enter channel name'
          value={channel}
          onChange={(e) => setChannel(e.target.value)}
          disabled={isConnected}
          className='flex-shrink'
        />
        <Button
          className='mr-auto'
          onClick={isConnected ? disconnectFromChannel : connectToChannel}
          variant={isConnected ? "destructive" : "default"}
        >
          {isConnected ? 'Disconnect' : 'Connect'}
        </Button>
      </div>
      <div className='flex flex-grow h-[calc(100%_-_40px)]'>
        <ScrollArea viewportRef={secondColumnChat} className='relative rounded-md border p-4 flex-1'>
          {
            messages.map(({ id, type, username, message, color }) => (
              <div key={id} className='py-1'>{
                type === 'system' ? (
                  <p className='text-sm text-gray-500 italic'>{message}</p>
                ) : (
                  <p className='text-sm'>
                    <span style={{ color }} className='font-bold'>{username}: </span>
                    {message}
                  </p>
                )
              }</div>
            ))
          }
        </ScrollArea>
        <ScrollArea className="rounded-md border p-4 flex-1" viewportRef={mainChat}>
          {
            messages.map(({ id, type, username, message, color }) => (
              <div key={id} className='py-1'>{
                type === 'system' ? (
                  <p className='text-sm text-gray-500 italic'>{message}</p>
                ) : (
                  <p className='text-sm'>
                    <span style={{ color }} className='font-bold'>{username}: </span>
                    {message}
                  </p>
                )
              }</div>
            ))
          }
        </ScrollArea>
      </div>
    </div>
  )
}

export default TwitchChat