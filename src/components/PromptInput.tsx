
import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Sparkles, X } from 'lucide-react';

interface PromptInputProps {
  onSubmit: (prompt: string) => void;
  isLoading?: boolean;
  autoFocus?: boolean;
  className?: string;
  placeholderText?: string;
}

const EXAMPLE_PROMPTS = [
  "Create a minimal portfolio site for a photographer",
  "Design a landing page for a crypto wallet app",
  "Build a blog with dark mode and newsletter signup",
  "Make a dashboard for NFT analytics"
];

const PromptInput: React.FC<PromptInputProps> = ({
  onSubmit,
  isLoading = false,
  autoFocus = false,
  className = '',
  placeholderText = 'Describe the website you want to build...'
}) => {
  const [prompt, setPrompt] = useState('');
  const [suggestionsVisible, setSuggestionsVisible] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (autoFocus && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [autoFocus]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() && !isLoading) {
      onSubmit(prompt.trim());
      // Don't clear the input here as user might want to see what they submitted
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleSubmit(e);
    }
  };

  const handleExampleClick = (example: string) => {
    setPrompt(example);
    setSuggestionsVisible(false);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  const clearInput = () => {
    setPrompt('');
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  return (
    <div className={`w-full ${className}`}>
      <motion.form 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full relative"
        onSubmit={handleSubmit}
      >
        <div className="relative">
          <textarea
            ref={textareaRef}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setSuggestionsVisible(true)}
            placeholder={placeholderText}
            className="w-full p-4 pr-24 border rounded-xl shadow-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none min-h-[120px] resize-y"
            disabled={isLoading}
          />
          
          {prompt && (
            <button
              type="button"
              onClick={clearInput}
              className="absolute right-16 top-4 text-gray-400 hover:text-gray-600"
              aria-label="Clear input"
            >
              <X size={18} />
            </button>
          )}
          
          <button
            type="submit"
            disabled={!prompt.trim() || isLoading}
            className={`absolute right-4 top-4 p-2 rounded-lg 
              ${prompt.trim() && !isLoading
                ? 'bg-primary text-white hover:bg-primary/90'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              } transition-colors`}
            aria-label="Submit prompt"
          >
            <Send size={18} />
          </button>
        </div>

        {suggestionsVisible && !isLoading && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-2 bg-white p-4 rounded-xl shadow-card border"
          >
            <div className="flex items-center gap-2 mb-3">
              <Sparkles size={16} className="text-accent" />
              <span className="text-sm font-medium">Try one of these examples:</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {EXAMPLE_PROMPTS.map((example, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleExampleClick(example)}
                  className="text-left text-sm p-2 hover:bg-gray-50 rounded-lg transition-colors text-gray-700"
                >
                  "{example}"
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setSuggestionsVisible(false)}
              className="mt-3 text-xs text-gray-500 hover:underline"
            >
              Hide suggestions
            </button>
          </motion.div>
        )}

        {isLoading && (
          <div className="mt-4 text-center text-sm text-gray-600">
            <div className="inline-block animate-pulse-light">
              <span className="inline-block w-2 h-2 bg-primary rounded-full mr-1"></span>
              <span className="inline-block w-2 h-2 bg-primary rounded-full mr-1 animate-pulse-light" style={{ animationDelay: '0.2s' }}></span>
              <span className="inline-block w-2 h-2 bg-primary rounded-full animate-pulse-light" style={{ animationDelay: '0.4s' }}></span>
            </div>
            <span className="ml-2">Processing your prompt...</span>
          </div>
        )}

        <p className="mt-2 text-xs text-gray-500">
          Press Ctrl+Enter to submit or use the button. Be specific with your description.
        </p>
      </motion.form>
    </div>
  );
};

export default PromptInput;
