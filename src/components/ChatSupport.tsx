import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, Send, Paperclip, Phone, Video, MoreVertical, Search, Users, MessageCircle, Stethoscope, HeartHandshake, User, Image as ImageIcon, FileText, Camera } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Avatar } from "./ui/avatar";
import { Card } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";

interface ChatSupportProps {
  onBack: () => void;
}

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderType: 'user' | 'doctor' | 'support' | 'system';
  content: string;
  timestamp: Date;
  attachments?: {
    type: 'image' | 'document' | 'prescription';
    url: string;
    name: string;
  }[];
  isRead: boolean;
}

interface Chat {
  id: string;
  name: string;
  type: 'doctor' | 'support' | 'community' | 'emergency';
  avatar: string;
  specialty?: string;
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
  isOnline: boolean;
  isUrgent?: boolean;
}

export function ChatSupport({ onBack }: ChatSupportProps) {
  const [activeTab, setActiveTab] = useState("chats");
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Mock data for chats
  const [chats] = useState<Chat[]>([
    {
      id: "1",
      name: "Dr. Priya Sharma",
      type: "doctor",
      specialty: "Cardiologist",
      avatar: "👩‍⚕️",
      lastMessage: "Your ECG results look normal. Continue your current medication.",
      lastMessageTime: new Date(Date.now() - 10 * 60 * 1000),
      unreadCount: 2,
      isOnline: true
    },
    {
      id: "2", 
      name: "MediFast Support",
      type: "support",
      avatar: "🏥",
      lastMessage: "Thank you for contacting us. How can we help you today?",
      lastMessageTime: new Date(Date.now() - 2 * 60 * 60 * 1000),
      unreadCount: 0,
      isOnline: true
    },
    {
      id: "3",
      name: "Emergency Services",
      type: "emergency", 
      avatar: "🚨",
      lastMessage: "Emergency services are available 24/7",
      lastMessageTime: new Date(Date.now() - 24 * 60 * 60 * 1000),
      unreadCount: 0,
      isOnline: true,
      isUrgent: true
    },
    {
      id: "4",
      name: "Dr. Rajesh Kumar",
      type: "doctor",
      specialty: "General Physician",
      avatar: "👨‍⚕️",
      lastMessage: "Please schedule your follow-up appointment",
      lastMessageTime: new Date(Date.now() - 6 * 60 * 60 * 1000),
      unreadCount: 1,
      isOnline: false
    },
    {
      id: "5",
      name: "Diabetes Support Group",
      type: "community",
      avatar: "👥",
      lastMessage: "Sarah: Thanks for sharing your experience!",
      lastMessageTime: new Date(Date.now() - 12 * 60 * 60 * 1000),
      unreadCount: 5,
      isOnline: true
    }
  ]);

  // Mock messages for selected chat
  const [messages] = useState<Message[]>([
    {
      id: "1",
      senderId: "doctor_1",
      senderName: "Dr. Priya Sharma",
      senderType: "doctor",
      content: "Hello! I've reviewed your test results. Overall, everything looks good.",
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      isRead: true
    },
    {
      id: "2",
      senderId: "user_1",
      senderName: "You",
      senderType: "user",
      content: "Thank you doctor. Should I continue with the same medication?",
      timestamp: new Date(Date.now() - 25 * 60 * 1000),
      isRead: true
    },
    {
      id: "3",
      senderId: "doctor_1",
      senderName: "Dr. Priya Sharma",
      senderType: "doctor",
      content: "Yes, continue with your current medication. Your ECG results look normal.",
      timestamp: new Date(Date.now() - 10 * 60 * 1000),
      isRead: false,
      attachments: [{
        type: "document",
        url: "#",
        name: "ECG_Report.pdf"
      }]
    },
    {
      id: "4",
      senderId: "doctor_1",
      senderName: "Dr. Priya Sharma", 
      senderType: "doctor",
      content: "I've also attached your ECG report for your records.",
      timestamp: new Date(Date.now() - 10 * 60 * 1000),
      isRead: false
    }
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [selectedChat, messages]);

  const handleSendMessage = useCallback(() => {
    if (!newMessage.trim()) return;
    
    // In a real app, this would send the message to the backend
    console.log("Sending message:", newMessage);
    setNewMessage("");
  }, [newMessage]);

  const handleChatSelect = useCallback((chat: Chat) => {
    setSelectedChat(chat);
  }, []);

  const formatMessageTime = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return date.toLocaleDateString();
  };

  const getChatIcon = (type: string) => {
    switch (type) {
      case 'doctor': return <Stethoscope className="w-4 h-4" />;
      case 'support': return <HeartHandshake className="w-4 h-4" />;
      case 'community': return <Users className="w-4 h-4" />;
      case 'emergency': return <Phone className="w-4 h-4" />;
      default: return <MessageCircle className="w-4 h-4" />;
    }
  };

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chat.specialty?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Chat list view
  if (!selectedChat) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-green-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b sticky top-0 z-10">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={onBack}
                className="p-2"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">Messages</h1>
                <p className="text-sm text-gray-600">Connect with your healthcare team</p>
              </div>
            </div>
            <Button variant="ghost" size="sm">
              <MoreVertical className="w-5 h-5" />
            </Button>
          </div>

          {/* Search */}
          <div className="px-4 pb-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-gray-50 border-0"
              />
            </div>
          </div>

          {/* Quick actions */}
          <div className="px-4 pb-4">
            <div className="flex gap-2 overflow-x-auto">
              <Button 
                variant="outline" 
                size="sm" 
                className="whitespace-nowrap bg-red-50 border-red-200 text-red-700 hover:bg-red-100"
              >
                <Phone className="w-4 h-4 mr-2" />
                Emergency
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="whitespace-nowrap bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100"
              >
                <Stethoscope className="w-4 h-4 mr-2" />
                Find Doctor
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="whitespace-nowrap bg-green-50 border-green-200 text-green-700 hover:bg-green-100"
              >
                <HeartHandshake className="w-4 h-4 mr-2" />
                Support
              </Button>
            </div>
          </div>
        </div>

        {/* Chat tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full bg-white shadow-sm rounded-none border-b">
            <TabsTrigger value="chats" className="flex-1">All Chats</TabsTrigger>
            <TabsTrigger value="doctors" className="flex-1">Doctors</TabsTrigger>
            <TabsTrigger value="support" className="flex-1">Support</TabsTrigger>
          </TabsList>

          <TabsContent value="chats" className="mt-0">
            <ScrollArea className="h-[calc(100vh-280px)]">
              <div className="p-4 space-y-2">
                {filteredChats.map((chat) => (
                  <motion.div
                    key={chat.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Card 
                      className="p-4 cursor-pointer hover:shadow-md transition-all border-0 bg-white"
                      onClick={() => handleChatSelect(chat)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-100 to-green-100 flex items-center justify-center text-xl">
                            {chat.avatar}
                          </div>
                          {chat.isOnline && (
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                          )}
                          {chat.isUrgent && (
                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white"></div>
                          )}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium text-gray-900 truncate">{chat.name}</h3>
                              {getChatIcon(chat.type)}
                            </div>
                            <div className="flex items-center gap-1">
                              <span className="text-xs text-gray-500">
                                {formatMessageTime(chat.lastMessageTime)}
                              </span>
                              {chat.unreadCount > 0 && (
                                <Badge variant="destructive" className="text-xs px-2 py-0 min-w-5 h-5">
                                  {chat.unreadCount}
                                </Badge>
                              )}
                            </div>
                          </div>
                          
                          {chat.specialty && (
                            <p className="text-xs text-gray-500 mb-1">{chat.specialty}</p>
                          )}
                          
                          <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="doctors" className="mt-0">
            <ScrollArea className="h-[calc(100vh-280px)]">
              <div className="p-4 space-y-2">
                {filteredChats.filter(chat => chat.type === 'doctor').map((chat) => (
                  <motion.div
                    key={chat.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Card 
                      className="p-4 cursor-pointer hover:shadow-md transition-all border-0 bg-white"
                      onClick={() => handleChatSelect(chat)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-100 to-green-100 flex items-center justify-center text-xl">
                            {chat.avatar}
                          </div>
                          {chat.isOnline && (
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                          )}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="font-medium text-gray-900 truncate">{chat.name}</h3>
                            <span className="text-xs text-gray-500">
                              {formatMessageTime(chat.lastMessageTime)}
                            </span>
                          </div>
                          
                          <p className="text-xs text-blue-600 mb-1">{chat.specialty}</p>
                          <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="support" className="mt-0">
            <ScrollArea className="h-[calc(100vh-280px)]">
              <div className="p-4 space-y-2">
                {filteredChats.filter(chat => chat.type === 'support' || chat.type === 'emergency').map((chat) => (
                  <motion.div
                    key={chat.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Card 
                      className="p-4 cursor-pointer hover:shadow-md transition-all border-0 bg-white"
                      onClick={() => handleChatSelect(chat)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-100 to-green-100 flex items-center justify-center text-xl">
                          {chat.avatar}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="font-medium text-gray-900 truncate">{chat.name}</h3>
                            <span className="text-xs text-gray-500">
                              {formatMessageTime(chat.lastMessageTime)}
                            </span>
                          </div>
                          
                          <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </div>
    );
  }

  // Individual chat view
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Chat header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setSelectedChat(null)}
              className="p-2"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-green-100 flex items-center justify-center">
                {selectedChat.avatar}
              </div>
              {selectedChat.isOnline && (
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
              )}
            </div>
            <div>
              <h3 className="font-medium text-gray-900">{selectedChat.name}</h3>
              <p className="text-xs text-gray-600">
                {selectedChat.specialty || (selectedChat.isOnline ? "Online now" : "Last seen recently")}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">
              <Phone className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="sm">
              <Video className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="sm">
              <MoreVertical className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4 max-w-2xl mx-auto">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${message.senderType === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-xs lg:max-w-md ${
                message.senderType === 'user' 
                  ? 'bg-primary text-primary-foreground rounded-l-2xl rounded-tr-2xl' 
                  : 'bg-white rounded-r-2xl rounded-tl-2xl shadow-sm border'
              } p-3`}>
                {message.senderType !== 'user' && (
                  <p className="text-xs font-medium text-gray-600 mb-1">{message.senderName}</p>
                )}
                <p className="text-sm">{message.content}</p>
                
                {message.attachments && (
                  <div className="mt-2 space-y-2">
                    {message.attachments.map((attachment, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                        {attachment.type === 'document' && <FileText className="w-4 h-4 text-blue-600" />}
                        {attachment.type === 'image' && <ImageIcon className="w-4 h-4 text-green-600" />}
                        {attachment.type === 'prescription' && <FileText className="w-4 h-4 text-red-600" />}
                        <span className="text-xs text-gray-600 truncate">{attachment.name}</span>
                      </div>
                    ))}
                  </div>
                )}
                
                <p className="text-xs opacity-70 mt-1">
                  {formatMessageTime(message.timestamp)}
                </p>
              </div>
            </motion.div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Message input */}
      <div className="bg-white border-t p-4">
        <div className="flex items-center gap-3 max-w-2xl mx-auto">
          <Button variant="ghost" size="sm">
            <Paperclip className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="sm">
            <Camera className="w-5 h-5" />
          </Button>
          <div className="flex-1 relative">
            <Input
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="pr-12 bg-gray-50 border-0"
            />
            <Button
              size="sm"
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 h-8"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}