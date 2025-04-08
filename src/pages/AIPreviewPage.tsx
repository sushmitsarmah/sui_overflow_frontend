
import React from "react";
import { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Send, Code, File, FolderTree } from "lucide-react";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const AIPreviewPage = () => {
  const [messages, setMessages] = useState<{ sender: "user" | "ai"; content: string }[]>([
    { sender: "ai", content: "Hello! I'm your AI assistant. How can I help with your website today?" }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [previewUrl, setPreviewUrl] = useState("https://example.com");
  const [isCodeView, setIsCodeView] = useState(false);
  const [activeFile, setActiveFile] = useState("index.html");
  
  // Sample files for demonstration
  const files = {
    "index.html": `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Example Website</title>
  <link rel="stylesheet" href="styles.css">
  <script src="script.js" defer></script>
</head>
<body>
  <div class="container">
    <h1>Welcome to Example Website</h1>
    <p>This is a sample website for demonstration purposes.</p>
    <button id="clickMe">Click Me!</button>
  </div>
</body>
</html>`,
    "styles.css": `body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 20px;
  line-height: 1.6;
  background-color: #f5f5f5;
}

h1 {
  color: #333;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

button {
  background: #4a8dff;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background: #3a7cee;
}`,
    "script.js": `// Main JavaScript file
document.addEventListener('DOMContentLoaded', () => {
  const button = document.getElementById('clickMe');
  
  button.addEventListener('click', () => {
    alert('Button was clicked!');
  });
  
  console.log('Script loaded successfully');
});`,
    "components/header.js": `// Header component
function createHeader() {
  const header = document.createElement('header');
  header.classList.add('site-header');
  
  const logo = document.createElement('div');
  logo.classList.add('logo');
  logo.textContent = 'Site Logo';
  
  const nav = document.createElement('nav');
  ['Home', 'About', 'Services', 'Contact'].forEach(item => {
    const link = document.createElement('a');
    link.href = '#' + item.toLowerCase();
    link.textContent = item;
    nav.appendChild(link);
  });
  
  header.appendChild(logo);
  header.appendChild(nav);
  
  return header;
}`,
  };

  const getFileLanguage = (filename: string) => {
    if (filename.endsWith('.html')) return 'html';
    if (filename.endsWith('.css')) return 'css';
    if (filename.endsWith('.js')) return 'javascript';
    if (filename.endsWith('.jsx')) return 'jsx';
    if (filename.endsWith('.ts')) return 'typescript';
    if (filename.endsWith('.tsx')) return 'tsx';
    if (filename.endsWith('.json')) return 'json';
    return 'text';
  };

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
            <div className="flex h-full">
              {/* File Explorer - VS Code style */}
              <div className="w-1/5 bg-[#252526] border-r border-[#1e1e1e] overflow-y-auto">
                <div className="p-3 text-white font-medium text-sm uppercase tracking-wider opacity-60">
                  Explorer
                </div>
                <div className="text-gray-300">
                  {/* Root folder */}
                  <div className="px-3 py-1 hover:bg-[#2a2d2e] cursor-pointer">
                    <div className="flex items-center">
                      <FolderTree size={16} className="mr-2 text-[#c5c5c5]" />
                      <span>Project Files</span>
                    </div>
                  </div>
                  
                  {/* Root level files */}
                  {Object.keys(files)
                    .filter(file => !file.includes('/'))
                    .map(file => (
                      <div 
                        key={file} 
                        className={`pl-5 py-1 cursor-pointer ${activeFile === file ? 'bg-[#37373d]' : 'hover:bg-[#2a2d2e]'}`}
                        onClick={() => setActiveFile(file)}
                      >
                        <div className="flex items-center">
                          <File size={16} className="mr-2 text-[#c5c5c5]" />
                          <span>{file}</span>
                        </div>
                      </div>
                    ))}
                  
                  {/* Components folder */}
                  {Object.keys(files).some(file => file.startsWith('components/')) && (
                    <>
                      <div className="px-3 py-1 hover:bg-[#2a2d2e] cursor-pointer">
                        <div className="flex items-center">
                          <FolderTree size={16} className="mr-2 text-[#c5c5c5]" />
                          <span>components</span>
                        </div>
                      </div>
                      
                      {/* Component files */}
                      {Object.keys(files)
                        .filter(file => file.startsWith('components/'))
                        .map(file => (
                          <div 
                            key={file} 
                            className={`pl-8 py-1 cursor-pointer ${activeFile === file ? 'bg-[#37373d]' : 'hover:bg-[#2a2d2e]'}`}
                            onClick={() => setActiveFile(file)}
                          >
                            <div className="flex items-center">
                              <File size={16} className="mr-2 text-[#c5c5c5]" />
                              <span>{file.split('/')[1]}</span>
                            </div>
                          </div>
                        ))}
                    </>
                  )}
                </div>
              </div>
              
              {/* Code Editor - VS Code style */}
              <div className="w-4/5 h-full bg-[#1e1e1e]">
                {/* Tab bar */}
                <div className="bg-[#252526] border-b border-[#1e1e1e] flex items-center">
                  <div className="px-4 py-1.5 bg-[#1e1e1e] text-white flex items-center">
                    <span className="text-sm">{activeFile}</span>
                  </div>
                </div>
                
                {/* Code content */}
                <ScrollArea className="h-[calc(100%-32px)] w-full">
                  <SyntaxHighlighter
                    language={getFileLanguage(activeFile)}
                    style={vscDarkPlus}
                    customStyle={{
                      margin: 0,
                      padding: '16px',
                      fontSize: '14px',
                      background: '#1e1e1e',
                      height: '100%',
                      minHeight: '600px'
                    }}
                    showLineNumbers={true}
                    lineNumberStyle={{ color: '#6e7681' }}
                  >
                    {files[activeFile] || '// File not found'}
                  </SyntaxHighlighter>
                </ScrollArea>
              </div>
            </div>
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
