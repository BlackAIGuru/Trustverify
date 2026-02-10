import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Navigation } from "@/components/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { MessageThread } from "@/components/message-thread";
import { 
  Search, 
  Send, 
  MessageSquare, 
  Filter,
  AlertTriangle,
  CheckCircle,
  Clock,
  User,
  Shield,
  DollarSign
} from "lucide-react";

export default function MessagesPage() {
  const { user } = useAuth();
  const [selectedConversation, setSelectedConversation] = useState<number | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Mock conversations data with real-world examples
  const conversations = [
    {
      id: 1,
      transactionId: 1,
      participantName: "Jane Developer",
      participantEmail: "jane@developer.com",
      lastMessage: "I'll have the website mockups ready by tomorrow",
      lastMessageTime: "2024-01-15T14:30:00Z",
      unreadCount: 2,
      transactionTitle: "Website Development",
      transactionAmount: "$2,500.00",
      transactionStatus: "active"
    },
    {
      id: 2,
      transactionId: 2,
      participantName: "Mike Startup",
      participantEmail: "mike@startup.com",
      lastMessage: "Perfect! The logo looks great",
      lastMessageTime: "2024-01-14T16:45:00Z",
      unreadCount: 0,
      transactionTitle: "Logo Design Package",
      transactionAmount: "$750.00",
      transactionStatus: "completed"
    },
    {
      id: 3,
      transactionId: 3,
      participantName: "Alex Business",
      participantEmail: "alex@business.com",
      lastMessage: "When can we start the content creation?",
      lastMessageTime: "2024-01-12T09:15:00Z",
      unreadCount: 1,
      transactionTitle: "Content Writing Services",
      transactionAmount: "$1,200.00",
      transactionStatus: "pending"
    }
  ];

  // Mock messages for selected conversation
  const mockMessages = [
    {
      id: 1,
      transactionId: selectedConversation || 1,
      senderId: 2,
      content: "Hi! I'm excited to work on your website project.",
      isSystemMessage: false,
      flaggedAsScam: false,
      createdAt: "2024-01-15T10:00:00Z"
    },
    {
      id: 2,
      transactionId: selectedConversation || 1,
      senderId: user?.id || 1,
      content: "Great! When can we start discussing the requirements?",
      isSystemMessage: false,
      flaggedAsScam: false,
      createdAt: "2024-01-15T10:15:00Z"
    },
    {
      id: 3,
      transactionId: selectedConversation || 1,
      senderId: 2,
      content: "I can start right away. Let me prepare some initial mockups first.",
      isSystemMessage: false,
      flaggedAsScam: false,
      createdAt: "2024-01-15T10:30:00Z"
    },
    {
      id: 4,
      transactionId: selectedConversation || 1,
      senderId: 0,
      content: "Escrow payment has been secured for this transaction.",
      isSystemMessage: true,
      flaggedAsScam: false,
      createdAt: "2024-01-15T11:00:00Z"
    },
    {
      id: 5,
      transactionId: selectedConversation || 1,
      senderId: 2,
      content: "I'll have the website mockups ready by tomorrow",
      isSystemMessage: false,
      flaggedAsScam: false,
      createdAt: "2024-01-15T14:30:00Z"
    }
  ];

  const filteredConversations = conversations.filter(conversation =>
    conversation.participantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conversation.transactionTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedConversationData = conversations.find(c => c.id === selectedConversation);

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedConversation) {
      // Here you would typically send the message to your API
      console.log("Sending message:", newMessage);
      setNewMessage("");
    }
  };

  const handleFlagMessage = (messageId: number) => {
    console.log("Flagging message:", messageId);
    // Here you would flag the message as potentially scam
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-[#00B386] bg-[#00B386]/10";
      case "active":
        return "text-[#1F4DD8] bg-[#1F4DD8]/10";
      case "pending":
        return "text-amber-600 bg-amber-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#F4F6FA]">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#2B2E3A] mb-2">Messages</h1>
          <p className="text-gray-600">Communicate securely with transaction participants</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="trustverify-card border-0">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-3 bg-[#1F4DD8] rounded-xl">
                  <MessageSquare className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Conversations</p>
                  <p className="text-2xl font-bold text-[#2B2E3A]">{conversations.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="trustverify-card border-0">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-3 bg-[#00B386] rounded-xl">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Secure Messages</p>
                  <p className="text-2xl font-bold text-[#2B2E3A]">15</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="trustverify-card border-0">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-3 bg-amber-500 rounded-xl">
                  <AlertTriangle className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Unread Messages</p>
                  <p className="text-2xl font-bold text-[#2B2E3A]">
                    {conversations.reduce((sum, conv) => sum + conv.unreadCount, 0)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-300px)]">
          {/* Conversations List */}
          <div className="lg:col-span-1">
            <Card className="trustverify-card border-0 h-full flex flex-col">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg text-[#2B2E3A]">Conversations</CardTitle>
                  <Badge className="bg-[#1F4DD8]/10 text-[#1F4DD8] border-0">
                    {conversations.length}
                  </Badge>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search conversations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 rounded-xl border-gray-200 focus:border-[#1F4DD8]"
                  />
                </div>
              </CardHeader>
              <CardContent className="flex-1 overflow-y-auto p-0">
                <div className="space-y-1">
                  {filteredConversations.map((conversation) => (
                    <div
                      key={conversation.id}
                      onClick={() => setSelectedConversation(conversation.id)}
                      className={`p-4 border-b cursor-pointer hover:bg-[#F4F6FA] transition-colors ${
                        selectedConversation === conversation.id ? 'bg-[#1F4DD8]/5 border-l-4 border-l-[#1F4DD8]' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-[#1F4DD8]/10 rounded-xl flex items-center justify-center">
                            <User className="h-5 w-5 text-[#1F4DD8]" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-[#2B2E3A]">{conversation.participantName}</h3>
                            <p className="text-sm text-gray-600">{conversation.transactionTitle}</p>
                          </div>
                        </div>
                        {conversation.unreadCount > 0 && (
                          <Badge className="bg-[#D72638] text-white text-xs border-0">
                            {conversation.unreadCount}
                          </Badge>
                        )}
                      </div>
                      
                      <p className="text-sm text-gray-600 truncate mb-3">
                        {conversation.lastMessage}
                      </p>
                      
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-500">
                          {new Date(conversation.lastMessageTime).toLocaleDateString()}
                        </span>
                        <Badge className={`text-xs border-0 ${getStatusColor(conversation.transactionStatus)}`}>
                          {conversation.transactionStatus}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Message Thread */}
          <div className="lg:col-span-2">
            {selectedConversation ? (
              <Card className="trustverify-card border-0 h-full flex flex-col">
                <CardHeader className="border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-[#1F4DD8]/10 rounded-xl flex items-center justify-center">
                        <User className="h-6 w-6 text-[#1F4DD8]" />
                      </div>
                      <div>
                        <CardTitle className="text-lg text-[#2B2E3A]">{selectedConversationData?.participantName}</CardTitle>
                        <CardDescription className="text-gray-600">
                          {selectedConversationData?.transactionTitle} • {selectedConversationData?.transactionAmount}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge className={`border-0 ${getStatusColor(selectedConversationData?.transactionStatus || "")}`}>
                        {selectedConversationData?.transactionStatus}
                      </Badge>
                      <Button size="sm" variant="outline" className="border-[#00B386] text-[#00B386] hover:bg-[#00B386] hover:text-white">
                        <DollarSign className="h-4 w-4 mr-1" />
                        View Transaction
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="flex-1 overflow-y-auto p-4">
                  <MessageThread 
                    messages={mockMessages}
                    currentUserId={user.id}
                    onFlagMessage={handleFlagMessage}
                  />
                </CardContent>

                <div className="border-t border-gray-200 p-4">
                  <div className="flex space-x-3">
                    <Textarea
                      placeholder="Type your secure message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="flex-1 min-h-[50px] max-h-[120px] rounded-xl border-gray-200 focus:border-[#1F4DD8] resize-none"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                    />
                    <Button 
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim()}
                      className="trustverify-button-primary self-end px-6"
                    >
                      <Send className="h-4 w-4 mr-2" />
                      Send
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2 flex items-center">
                    <Shield className="h-3 w-3 mr-1" />
                    Messages are encrypted and monitored for fraud protection
                  </p>
                </div>
              </Card>
            ) : (
              <Card className="trustverify-card border-0 h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#1F4DD8]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <MessageSquare className="h-8 w-8 text-[#1F4DD8]" />
                  </div>
                  <h3 className="text-lg font-semibold text-[#2B2E3A] mb-2">Select a conversation</h3>
                  <p className="text-gray-600">Choose a conversation from the list to start secure messaging</p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}