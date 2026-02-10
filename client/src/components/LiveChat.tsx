import { useState, useEffect, useRef } from 'react';
import { X, Send, MessageCircle, Minimize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/use-auth';
import { apiRequest } from '@/lib/queryClient';

interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'support';
  timestamp: Date;
  status?: 'sending' | 'sent' | 'error';
}

interface LiveChatProps {
  isOpen: boolean;
  onClose: () => void;
  onMinimize: () => void;
}

export function LiveChat({ isOpen, onClose, onMinimize }: LiveChatProps) {
  const { user } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Initialize chat session
  useEffect(() => {
    if (isOpen && !isConnected) {
      initializeChat();
    }
  }, [isOpen, isConnected]);

  const initializeChat = async () => {
    try {
      setIsConnected(true);
      
      // Add welcome message
      const welcomeMessage: ChatMessage = {
        id: Date.now().toString(),
        text: `Hello${user?.username ? ` ${user.username}` : ''}! I'm here to help with any TrustVerify platform questions or issues. How can I assist you today?`,
        sender: 'support',
        timestamp: new Date()
      };
      
      setMessages([welcomeMessage]);
      
      // Simulate quick follow-up with common options
      setTimeout(() => {
        const optionsMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          text: "I can help you with:\n• Account setup and verification\n• Transaction questions\n• Platform features\n• Technical issues\n• Billing inquiries\n\nWhat would you like assistance with?",
          sender: 'support',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, optionsMessage]);
      }, 1500);
      
    } catch (error) {
      console.error('Failed to initialize chat:', error);
      setIsConnected(false);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !isConnected) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: newMessage.trim(),
      sender: 'user',
      timestamp: new Date(),
      status: 'sending'
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    setIsTyping(true);

    try {
      // Send message to support system
      const response = await apiRequest('POST', '/api/support/chat', {
        message: userMessage.text,
        userId: user?.id,
        timestamp: userMessage.timestamp
      });

      // Update message status
      setMessages(prev => 
        prev.map(msg => 
          msg.id === userMessage.id 
            ? { ...msg, status: 'sent' }
            : msg
        )
      );

      // Simulate support response (replace with real integration)
      setTimeout(() => {
        const supportResponse = generateSupportResponse(userMessage.text);
        const responseMessage: ChatMessage = {
          id: (Date.now() + 2).toString(),
          text: supportResponse,
          sender: 'support',
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, responseMessage]);
        setIsTyping(false);
      }, 2000);

    } catch (error) {
      console.error('Failed to send message:', error);
      
      // Update message status to error
      setMessages(prev => 
        prev.map(msg => 
          msg.id === userMessage.id 
            ? { ...msg, status: 'error' }
            : msg
        )
      );
      setIsTyping(false);
    }
  };

  const generateSupportResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('transaction') || message.includes('payment')) {
      return "I can help you with transaction-related questions. For specific transaction details, please provide your transaction ID or I can guide you to your transaction history in your dashboard. Would you like me to help you locate a specific transaction?";
    }
    
    if (message.includes('account') || message.includes('verify') || message.includes('kyc')) {
      return "For account verification, you can upload your documents in the Identity Verification section of your dashboard. The verification process typically takes 24-48 hours. Would you like me to guide you through the verification steps?";
    }
    
    if (message.includes('api') || message.includes('developer') || message.includes('integration')) {
      return "For developer support, please visit our Developer Portal where you'll find API documentation, integration guides, and can generate your API keys. Would you like me to direct you to specific API documentation?";
    }
    
    if (message.includes('billing') || message.includes('price') || message.includes('cost')) {
      return "For billing questions, you can view your current plan and usage in the Billing section of your dashboard. If you need to upgrade or have billing disputes, I can connect you with our billing team. What specific billing question do you have?";
    }
    
    if (message.includes('hello') || message.includes('hi') || message.includes('help')) {
      return "I'm here to help! You can ask me about account issues, transactions, platform features, or any technical problems you're experiencing. What specific area would you like assistance with?";
    }
    
    return "I understand you need assistance with that. Let me connect you with a specialist who can provide detailed help with your specific question. In the meantime, you might find helpful information in our User Guide or by creating a support ticket for detailed assistance.";
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <Card className="fixed bottom-20 right-4 w-96 h-[500px] shadow-2xl z-[10000] flex flex-col">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <MessageCircle className="h-5 w-5" />
            <CardTitle className="text-lg">TrustVerify Support</CardTitle>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onMinimize}
              className="text-white hover:bg-blue-500 p-1"
            >
              <Minimize2 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-white hover:bg-blue-500 p-1"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="flex items-center space-x-2 text-sm">
          <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-400' : 'bg-red-400'}`} />
          <span>{isConnected ? 'Connected' : 'Connecting...'}</span>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-0">
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.sender === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white border shadow-sm'
                }`}
              >
                <div className="whitespace-pre-wrap text-sm">{message.text}</div>
                <div className={`text-xs mt-1 ${
                  message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                }`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  {message.sender === 'user' && message.status && (
                    <span className="ml-1">
                      {message.status === 'sending' && '⏳'}
                      {message.status === 'sent' && '✓'}
                      {message.status === 'error' && '❌'}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white border shadow-sm p-3 rounded-lg">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="border-t p-4 bg-white">
          <div className="flex space-x-2">
            <Input
              ref={inputRef}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              disabled={!isConnected}
              className="flex-1"
            />
            <Button
              onClick={sendMessage}
              disabled={!newMessage.trim() || !isConnected}
              size="sm"
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}