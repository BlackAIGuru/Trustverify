import { useState } from 'react';
import { LiveChat } from './LiveChat';
import { MessageCircle } from 'lucide-react';

export default function ZendeskChat() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  const handleChatToggle = () => {
    if (isMinimized) {
      setIsMinimized(false);
      setIsChatOpen(true);
    } else {
      setIsChatOpen(!isChatOpen);
    }
  };

  const handleMinimize = () => {
    setIsMinimized(true);
    setIsChatOpen(false);
  };

  const handleClose = () => {
    setIsChatOpen(false);
    setIsMinimized(false);
  };

  return (
    <>
      {/* Custom styling for the chat widget */}
      <style>
        {`
          /* Chat button styles */
          .live-chat-button {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 60px;
            height: 60px;
            background: #003366;
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(0, 51, 102, 0.3);
            transition: all 0.3s ease;
            z-index: 9998;
            border: none;
          }
          
          .live-chat-button:hover {
            background: #004080;
            transform: scale(1.1);
            box-shadow: 0 6px 16px rgba(0, 51, 102, 0.4);
          }

          .live-chat-button.minimized {
            background: #FFB400;
            animation: pulse 2s infinite;
          }

          .live-chat-button.minimized:hover {
            background: #E6A200;
          }

          @keyframes pulse {
            0% {
              box-shadow: 0 0 0 0 rgba(255, 180, 0, 0.7);
            }
            70% {
              box-shadow: 0 0 0 10px rgba(255, 180, 0, 0);
            }
            100% {
              box-shadow: 0 0 0 0 rgba(255, 180, 0, 0);
            }
          }
          
          @media (max-width: 768px) {
            .live-chat-button {
              bottom: 15px;
              right: 15px;
              width: 50px;
              height: 50px;
            }
          }
        `}
      </style>

      {/* Live Chat Button */}
      <button 
        className={`live-chat-button ${isMinimized ? 'minimized' : ''}`}
        onClick={handleChatToggle}
        title={isChatOpen ? "Close Chat" : isMinimized ? "Unread Messages - Click to Open" : "Start Live Chat"}
      >
        <MessageCircle className="h-6 w-6" />
      </button>

      {/* Live Chat Widget */}
      <LiveChat 
        isOpen={isChatOpen}
        onClose={handleClose}
        onMinimize={handleMinimize}
      />
    </>
  );
}