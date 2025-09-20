import { useState, useCallback, memo } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { PulseLoader } from "./PulseLoader";
import { 
  MessageCircle, 
  X, 
  Send, 
  Bot,
  User
} from "lucide-react";

const ChatbotWidget = memo(function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm your health assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");

  const quickSuggestions = [
    "Book an appointment",
    "Order medicines", 
    "Find nearby hospitals",
    "Check test reports"
  ];

  const handleSendMessage = useCallback(() => {
    if (!inputValue.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: "user" as const,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate bot typing and response
    setTimeout(() => {
      setIsTyping(false);
      const responses = [
        "I understand you're looking for help with that. Let me connect you with the right service.",
        "That's a great question! Let me find the best solution for you.",
        "I'm here to help! Let me gather some information for you.",
        "Perfect! I can definitely assist you with that request."
      ];
      
      const botResponse = {
        id: messages.length + 2,
        text: responses[Math.floor(Math.random() * responses.length)],
        sender: "bot" as const,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 2000);
  }, [inputValue, messages.length]);

  const handleSuggestionClick = useCallback((suggestion: string) => {
    setInputValue(suggestion);
  }, []);

  const handleToggle = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  }, [handleSendMessage]);

  if (!isOpen) {
    return (
      <button
        onClick={handleToggle}
        className="fixed bottom-24 right-6 w-14 h-14 bg-gradient-to-r from-teal-600 to-blue-600 rounded-full shadow-lg flex items-center justify-center z-50 hover:scale-110 transition-transform duration-200"
      >
        <MessageCircle className="w-6 h-6 text-white" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-24 right-6 w-80 h-96 z-50">
      <Card className="h-full flex flex-col shadow-2xl border-0 bg-white overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-600 to-blue-600 p-4 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-medium">Health Assistant</h4>
                <p className="text-xs text-teal-100 flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2" />
                  Online now
                </p>
              </div>
            </div>
            <button
              onClick={handleToggle}
              className="p-1 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className={`flex items-start space-x-2 max-w-[80%] ${
                message.sender === "user" ? "flex-row-reverse space-x-reverse" : ""
              }`}>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.sender === "user" 
                    ? "bg-teal-600" 
                    : "bg-gray-200"
                }`}>
                  {message.sender === "user" ? (
                    <User className="w-4 h-4 text-white" />
                  ) : (
                    <Bot className="w-4 h-4 text-gray-600" />
                  )}
                </div>
                <div className={`p-3 rounded-2xl ${
                  message.sender === "user"
                    ? "bg-teal-600 text-white"
                    : "bg-gray-100 text-gray-900"
                }`}>
                  <p className="text-sm">{message.text}</p>
                </div>
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-start space-x-2 max-w-[80%]">
                <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 bg-gray-200">
                  <Bot className="w-4 h-4 text-gray-600" />
                </div>
                <div className="p-3 rounded-2xl bg-gray-100">
                  <PulseLoader size="sm" color="bg-gray-400" />
                </div>
              </div>
            </div>
          )}

          {/* Quick Suggestions */}
          {messages.length === 1 && !isTyping && (
            <div className="space-y-2">
              <p className="text-xs text-gray-500 text-center">Quick suggestions:</p>
              <div className="grid grid-cols-1 gap-2">
                {quickSuggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="p-2 text-sm bg-gray-50 hover:bg-gray-100 rounded-xl text-left transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex space-x-2">
            <Input
              type="text"
              placeholder="Type your message..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              className="h-10 rounded-2xl border-gray-200 bg-gray-50 focus:bg-white"
              disabled={isTyping}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isTyping}
              className="w-10 h-10 p-0 rounded-2xl bg-teal-600 hover:bg-teal-700 disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
});

export { ChatbotWidget };