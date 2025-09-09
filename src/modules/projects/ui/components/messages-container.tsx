import { useTRPC } from '@/trpc/client';
import { useSuspenseQuery } from '@tanstack/react-query';
import React, { useEffect, useRef } from 'react'
import MessageCard from './message-card';
import { MessageForm } from './message-form';

interface Props {
    projectId: string;
}

const MessagesContainer = ({ projectId }: Props) => {
    const bottomRef = useRef<HTMLDivElement>(null);
    const trpc = useTRPC();
    const { data: messages }  =useSuspenseQuery(trpc.messages.getMany.queryOptions({
        projectId: projectId
    }))

    useEffect(() => {
        const lastAssistantMessage = messages.findLast(
            (message) => message.role === "ASSISTANT"
        );

        if (lastAssistantMessage) {
            
        }
    }, [messages]);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages.length])
  return (
    <div className='flex flex-col flex-1 min-h-0'>
        <div className='flex-1 min-h-0 overflow-y-auto'>
            <div className='pt-2 pr-1' >
                {messages.map((messages) => (
                    <MessageCard 
                        key={messages.id}
                        content={messages.content}
                        role={messages.role}
                        fragment={messages.fragment}
                        createdAt={messages.createdAt}
                        isActiveFragment={false}
                        onFragmentClick={()=>{}}
                        type={messages.type}
                    />
                ))}
                <div ref={bottomRef} />
            </div>
        </div>
        <div className='relative p-3 pt-2'>
            <div className='absolute -top-6 left-0 right-0 h-6 bg-gradient-to-b from-transparent to-background/70 pointer-events-none'/>
            <MessageForm projectId={projectId}/>
        </div>
    </div>
  )
}

export default MessagesContainer