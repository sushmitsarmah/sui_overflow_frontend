
import React from "react";
import { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Send, Code } from "lucide-react";

const AIPreviewPage = () => {
  const [messages, setMessages] = useState<{ sender: "user" | "ai"; content: string }[]>([
    { sender: "ai", content: "Hello! I'm your AI assistant. How can I help with your website today?" }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [previewUrl, setPreviewUrl] = useState("https://example.com");
  const [isCodeView, setIsCodeView] = useState(false);
  
  // Sample code for demonstration
  const sampleCode = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Example Website</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 20px;
      line-height: 1.6;
    }
    h1 {
      color: #333;
    }
    .container {
      max-width: 1200px;
      margin: 0 auto;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Welcome to Example Website</h1>
    <p>This is a sample website for demonstration purposes.</p>
  </div>
</body>
</html>
  `;

  const handleSendMessage = () => {
    if (inputValue.trim() === "") return;
    
    // Add user message
    setMessages(prev => [...prev, { sender: "user", content: inputValue.trim() }]);
    
    // Clear input
    setInputValue("");
    
    // Simulate AI response after a short delay
    setTimeout(() => {
      setMessages(prev => [
        ...prev, 
        { 
          sender: "ai", 
          content: "I've received your request. Let me update the website preview for you." 
        }
      ]);
    }, 1000);
  };

  return (
    <div className="flex h-[calc(100vh-150px)] w-full overflow-hidden">
      {/* AI Chat Panel - 1/4 width */}
      <div className="w-1/4 border-r border-gray-200 bg-white flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold">AI Assistant</h2>
        </div>
        
        {/* Messages Area */}
        <ScrollArea className="flex-grow p-4">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div 
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.sender === "user" 
                      ? "bg-primary text-white" 
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        
        {/* Input Area */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Type your message..."
              className="flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <Button 
              onClick={handleSendMessage}
              className="rounded-l-none"
            >
              <Send size={18} />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Website Preview or Code View - 3/4 width */}
      <div className="w-3/4 bg-gray-50">
        <div className="p-4 border-b border-gray-200 bg-white flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <h2 className="text-lg font-semibold">Website Preview</h2>
            <div className="flex items-center space-x-2">
              <Switch 
                checked={isCodeView}
                onCheckedChange={setIsCodeView}
                id="code-view-switch"
              />
              <label htmlFor="code-view-switch" className="text-sm text-gray-600 cursor-pointer flex items-center">
                {isCodeView ? "Code View" : "Preview"}
                {isCodeView && <Code size={16} className="ml-1" />}
              </label>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={previewUrl}
              onChange={(e) => setPreviewUrl(e.target.value)}
              className="p-2 text-sm border border-gray-300 rounded-md w-96 focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <Button variant="outline" size="sm">Refresh</Button>
          </div>
        </div>
        <div className="h-[calc(100%-60px)] w-full">
          {isCodeView ? (
            <ScrollArea className="h-full w-full bg-gray-900 text-white p-4">
              <pre className="font-mono text-sm">
                <code>{sampleCode}</code>
              </pre>
            </ScrollArea>
          ) : (
            <iframe 
              src={previewUrl}
              className="w-full h-full border-none"
              title="Website Preview"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AIPreviewPage;
