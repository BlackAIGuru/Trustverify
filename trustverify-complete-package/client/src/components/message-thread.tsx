import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { AlertTriangle, Flag, MoreHorizontal, Shield } from "lucide-react";

interface Message {
  id: number;
  transactionId: number;
  senderId: number;
  content: string;
  isSystemMessage: boolean;
  flaggedAsScam: boolean;
  createdAt: string;
}

interface MessageThreadProps {
  messages: Message[];
  currentUserId: number;
  onFlagMessage: (messageId: number) => void;
}

export function MessageThread({ messages, currentUserId, onFlagMessage }: MessageThreadProps) {
  const [flaggedMessages, setFlaggedMessages] = useState<Set<number>>(new Set());

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();
    
    if (isToday) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    
    const isYesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000).toDateString() === date.toDateString();
    if (isYesterday) {
      return `Yesterday ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    }
    
    return date.toLocaleDateString([], { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const handleFlagMessage = (messageId: number) => {
    onFlagMessage(messageId);
    setFlaggedMessages(prev => new Set(prev).add(messageId));
  };

  if (messages.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-center">
        <div>
          <Shield className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="font-semibold text-gray-900 mb-2">Secure Messaging</h3>
          <p className="text-gray-600 text-sm">
            Start a conversation with your transaction partner. All messages are monitored for security.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {messages.map((message) => {
        const isOwnMessage = message.senderId === currentUserId;
        const isScamFlagged = message.flaggedAsScam || flaggedMessages.has(message.id);
        
        return (
          <div
            key={message.id}
            className={`flex ${isOwnMessage ? "justify-end" : "justify-start"}`}
          >
            <div className="max-w-xs lg:max-w-md">
              {message.isSystemMessage ? (
                <div className="text-center">
                  <Badge variant="outline" className="bg-blue-50 text-blue-800 border-blue-200">
                    <Shield className="h-3 w-3 mr-1" />
                    {message.content}
                  </Badge>
                </div>
              ) : (
                <div
                  className={`relative group rounded-lg px-4 py-2 ${
                    isOwnMessage
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-900"
                  } ${isScamFlagged ? "border-2 border-red-500" : ""}`}
                >
                  {/* Scam Warning */}
                  {isScamFlagged && (
                    <div className="absolute -top-6 left-0 right-0">
                      <Badge variant="destructive" className="text-xs">
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        Flagged as suspicious
                      </Badge>
                    </div>
                  )}
                  
                  <div className="flex items-start justify-between">
                    <p className="text-sm">{message.content}</p>
                    
                    {!isOwnMessage && !message.isSystemMessage && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className={`opacity-0 group-hover:opacity-100 transition-opacity ml-2 h-6 w-6 p-0 ${
                              isOwnMessage ? "hover:bg-blue-700" : "hover:bg-gray-200"
                            }`}
                          >
                            <MoreHorizontal className="h-3 w-3" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => handleFlagMessage(message.id)}
                            className="text-red-600"
                            disabled={isScamFlagged}
                          >
                            <Flag className="mr-2 h-4 w-4" />
                            {isScamFlagged ? "Already Flagged" : "Flag as Scam"}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </div>
                  
                  <div className="flex justify-between items-center mt-1">
                    <span
                      className={`text-xs ${
                        isOwnMessage ? "text-blue-100" : "text-gray-500"
                      }`}
                    >
                      {formatTime(message.createdAt)}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
