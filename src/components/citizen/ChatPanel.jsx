import { useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';
import TypingIndicator from './TypingIndicator';
import AgentChain from '@/components/logic/AgentChain';
import WasteActions from './WasteActions';

export default function ChatPanel({ messages, isTyping, activeStep, completedSteps, options, onOption, isSimulating, isLocked }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping, options]);

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <AgentChain activeStep={activeStep} completedSteps={completedSteps} />

      {/* WhatsApp-style chat background */}
      <div className="flex-1 overflow-y-auto scrollbar-thin
        bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMjAwIDBMMjAwIDIwMEwwIDIwMEwwIDBNMCA0MDBMMjAwIDQwMEwyMDAgMjAwIEwwIDIwMCB6IE0yMDAgMjAwIEw0MDAgMjAwIEw0MDAgNDAwIEwyMDAgNDAwIHogTTQwMCAwIEwyMDAgMCBMMjAwIDIwMCBMNDAwIDIwMCB6IiBmaWxsPSIjZjBmMGYwIiBmaWxsLW9wYWNpdHk9IjAuNCIgZmlsbC1ydWxlPSJldmVub2RkIi8+PC9zdmc+')] bg-[length:80px_80px]">
        <div className="px-4 py-3 space-y-2">
          {messages.map((msg) => (
            <ChatMessage key={msg.id || msg.timestamp} message={msg} />
          ))}
          {isTyping && <TypingIndicator />}
          <div ref={bottomRef} />
        </div>
      </div>

      <WasteActions
        options={options}
        onOption={onOption}
        disabled={isLocked || isSimulating}
        isSimulating={isSimulating}
      />
    </div>
  );
}
