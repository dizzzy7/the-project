'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Client } from 'tmi.js'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { ScrollArea, ScrollBar } from './ui/scroll-area'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu'

export type Message = {
  id: string,
  type: string,
  message: string,
  username?: string,
  color?: string,
}


const TwitchChat = () => {
  const [channel, setChannel] = useState('xqc')
  const [messages, setMessages] = useState<Message[]>([])
  const [isConnecting, setIsConnecting] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [client, setClient] = useState<Client | null>(null)

  const [isScrolling, setIsScrolling] = useState(false)
  const secondColumnChat = useRef<HTMLDivElement | null>(null)
  const mainChat = useRef<HTMLDivElement | null>(null)

  const developersChoice = useMemo(() => ['xqc', 'ludwig', 'tenz', 'avoidingthepuddle', '39daph', 'sodapoppin'], [])

  const connectToChannel = () => {
    if (!channel || isConnected) return

    const tmiClient = new Client({
      channels: [channel]
    })

    tmiClient.connect().catch(console.error)

    tmiClient.on('connected', () => {
      setIsConnected(true)
      setIsConnecting(false)
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
      setIsConnecting(false)
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
  }, [])

  //
  const scrollToBottom = useCallback(() => {
    if (messages && secondColumnChat.current && mainChat.current) {
      secondColumnChat.current.scrollTop = secondColumnChat.current.scrollHeight - secondColumnChat.current.clientHeight * 2


    }
    if (messages && mainChat.current) {
      mainChat.current.scrollTop = mainChat.current.scrollHeight
    }
  }, [])

  useEffect(() => {
    if (!isScrolling) {
      scrollToBottom()
    }
  }, [messages])

  const renderedMessages = (
    messages.map(({ id, type, username, message, color }) => (
      <div key={id} className='py-1'>{
        type === 'system' ? (
          <p className='text-sm text-gray-500 italic'>{message}</p>
        ) : (
          <p className='text-sm text-white'>
            <span style={{ color }} className='font-bold'>{username}: </span>
            {message}
          </p>
        )
      }</div>
    ))

  )

  return (
    <div className='flex flex-col max-h-screen h-screen bg-slate-800 prose-invert'>
      <div className='flex'>
        <Input
          type='text'
          placeholder='Enter channel name'
          value={channel}
          onChange={(e) => setChannel(e.target.value)}
          disabled={isConnected}
          className='flex-shrink bg-slate-800 text-white border-slate-500'
        />
        <DropdownMenu>
          <DropdownMenuTrigger disabled={isConnected} className='whitespace-nowrap rounded border px-3 text-sm font-semibold disabled:text-gray-400 border-slate-500 text-white'>Or select channel</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Developers Choice</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {developersChoice.map((item) =>
              <DropdownMenuItem key={item} onClick={() => setChannel(item)}>{item}</DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
        <Button
          className='mr-auto'
          onClick={isConnected ? disconnectFromChannel : connectToChannel}
          variant={isConnected ? "destructive" : "default"}
        >
          {isConnected ? 'Disconnect' : 'Connect'}
        </Button>
      </div>
      <div className='flex flex-grow h-[calc(100%_-_40px)] relative'>
        <ScrollArea
          hideScrollbar={true}
          viewportRef={secondColumnChat}
          className='relative rounded-md border p-4 flex-1 border-slate-500'
          onScrollCapture={(e) => {
            e.preventDefault();
            if (secondColumnChat.current) {
              const chatScrollTop = secondColumnChat.current.scrollTop;
              const chatClientHeight = secondColumnChat.current.clientHeight;
              const chatScrollHeight = secondColumnChat.current.scrollHeight;

              if ((chatScrollHeight - chatClientHeight) < chatClientHeight) {
                secondColumnChat.current.scrollTop = 0;
              } else if ((chatScrollHeight - chatClientHeight > chatClientHeight)) {

              } else if ((chatScrollTop > (chatScrollHeight - chatClientHeight * 2)) && chatScrollTop > chatClientHeight) {
                secondColumnChat.current.scrollTop = chatScrollHeight - chatClientHeight
              }
            }
          }}
        >
          <div className='w-full h-[calc(100vh_-_74px)]'></div>
          {renderedMessages}
        </ScrollArea>
        <ScrollArea
          className="rounded-md border p-4 flex-1 border-slate-500"
          viewportRef={mainChat}
          onScrollCapture={(e) => {
            if (mainChat.current) {

              const chatScrollTop = mainChat.current?.scrollTop
              const chatClientHeight = mainChat.current?.clientHeight
              const chatScrollHeight = mainChat.current?.scrollHeight

              if ((chatScrollTop + chatClientHeight !== chatScrollHeight)) {
                setIsScrolling(true)
              } else {
                setIsScrolling(false)
              }

            }

            if (mainChat.current && secondColumnChat.current) {
              secondColumnChat.current.scrollTop = mainChat.current.scrollTop
            }
          }}
        >
          {renderedMessages}
        </ScrollArea>
        {isScrolling && (<div className='absolute bottom-6 left-1/2 -translate-x-1/2 bg-slate-500 text-slate-100 px-3 py-2 rounded' onClick={() => setIsScrolling(false)}>SCROLLING</div>)}

      </div>
    </div>
  )
}

export default TwitchChat