import React, { useEffect, useRef, useState } from "react";
import {
  Moon,
  Sun,
  Send,
  Loader2,
  Plus,
  MessageSquare,
  Trash2,
  Menu,
  X,
  Search,
  Compass,
  Zap,
  Copy,
  RefreshCw,
  ThumbsUp,
  ThumbsDown,
  Share2,
  Home,
  BookOpen,
  Settings,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useChat } from "../hooks/useChat";
import { useSelector } from "react-redux";

export default function Dashboard() {
  const [dark, setDark] = useState(true);
  const [input, setInput] = useState("");
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  const { user } = useSelector((state) => state.auth);

  const {
    handleSendMessage,
    handleGetChats,
    handleDeleteChat,
    handleOpenChat,
    handleNewChat,
  } = useChat();
  const { chats, currentChatId, isLoading } = useSelector(
    (state) => state.chat,
  );

  const chatList = Object.values(chats).sort(
    (a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated),
  );
  const currentChat = currentChatId ? chats[currentChatId] : null;
  const messages = currentChat?.messages || [];

  useEffect(() => {
    handleGetChats();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        Math.min(textareaRef.current.scrollHeight, 200) + "px";
    }
  }, [input]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const text = input;
    setInput("");

    await handleSendMessage({ message: text, chatId: currentChatId });
  };

  const createNewChat = () => {
    setInput("");
    handleNewChat();
    setShowMobileSidebar(false);
  };

  const selectChat = (chatId) => {
    handleOpenChat(chatId, chats);
    setShowMobileSidebar(false);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  // Theme classes
  const bgMain = dark ? "bg-[#0a0a0a]" : "bg-white";
  const bgSecondary = dark ? "bg-[#0f0f0f]" : "bg-gray-50";
  const textPrimary = dark ? "text-white" : "text-gray-900";
  const textSecondary = dark ? "text-gray-400" : "text-gray-600";
  const textMuted = dark ? "text-gray-500" : "text-gray-400";
  const borderColor = dark ? "border-zinc-800" : "border-gray-200";
  const borderHover = dark ? "hover:border-zinc-700" : "hover:border-gray-300";
  const inputBg = dark ? "bg-[#1a1a1a]" : "bg-gray-100";
  const hoverBg = dark ? "hover:bg-[#1a1a1a]" : "hover:bg-gray-100";

  return (
    <main
      className={`${bgMain} ${textPrimary} min-h-screen flex flex-col transition-colors duration-200`}
    >
      {/* Mobile Header */}
      <header
        className={`md:hidden flex items-center justify-between px-4 py-3 border-b ${borderColor} sticky top-0 z-20 ${bgSecondary}`}
      >
        <button
          onClick={() => setShowMobileSidebar(true)}
          className={`p-2 rounded-lg ${hoverBg}`}
        >
          <Menu size={20} />
        </button>
        <h1 className="font-semibold">Perplexity</h1>
        <div className="w-9" />
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Desktop Sidebar - Hidden on mobile */}
        <aside
          className={`hidden md:flex flex-col w-64 border-r ${borderColor} ${bgSecondary} shrink-0`}
        >
          {/* Logo */}
          <div className="p-4 border-b border-zinc-800">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <Zap size={18} className="text-white" />
              </div>
              <span className="font-semibold text-lg">Perplexity</span>
            </div>
          </div>

          {/* New Chat Button */}
          <div className="p-3">
            <button
              onClick={createNewChat}
              className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border ${borderColor} ${borderHover} transition-all hover:shadow-lg`}
            >
              <Plus size={18} />
              <span className="font-medium">New Chat</span>
            </button>
          </div>

          {/* Navigation */}
          <nav className="px-3 space-y-1">
            <button
              onClick={() => setDark(!dark)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg ${hoverBg} text-sm`}
            >
              {dark ? <Sun size={18} /> : <Moon size={18} />}
              {dark ? "Light Mode" : "Dark Mode"}
            </button>
            <button
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg ${hoverBg} text-sm`}
            >
              <Home size={18} />
              Home
            </button>
            <button
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg ${hoverBg} text-sm`}
            >
              <Compass size={18} />
              Discover
            </button>
            <button
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg ${hoverBg} text-sm`}
            >
              <BookOpen size={18} />
              Library
            </button>
          </nav>

          {/* Chat History */}
          <div className="flex-1 overflow-auto px-3 py-2 mt-2">
            <p
              className={`text-xs font-medium uppercase px-3 py-2 ${textMuted}`}
            >
              Recent
            </p>
            {chatList.length === 0 ? (
              <p className={`text-sm ${textMuted} text-center py-4`}>
                No chats yet
              </p>
            ) : (
              <div className="space-y-1">
                {chatList.map((chat) => (
                  <motion.button
                    key={chat.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onClick={() => selectChat(chat.id)}
                    className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm group transition-colors ${
                      currentChatId === chat.id
                        ? dark
                          ? "bg-zinc-800"
                          : "bg-gray-200"
                        : hoverBg
                    }`}
                  >
                    <MessageSquare
                      size={16}
                      className={`${textMuted} shrink-0`}
                    />
                    <span className="truncate flex-1 text-left">
                      {chat.title || "New Chat"}
                    </span>
                  </motion.button>
                ))}
              </div>
            )}
          </div>

          {/* User Section */}
          <div className={`p-3 border-t ${borderColor}`}>
            <div className="flex items-center gap-3">
              <div
                className={`w-9 h-9 rounded-full bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold`}
              >
                {user?.username ? user.username.charAt(0).toUpperCase() : "U"}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm truncate">
                  {user?.username || "User"}
                </p>
                <p className={`text-xs truncate ${textMuted}`}>
                  {user?.email || "user@example.com"}
                </p>
              </div>
            </div>
          </div>
        </aside>

        {/* Mobile Sidebar Overlay */}
        <AnimatePresence>
          {showMobileSidebar && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/60 z-40 md:hidden"
                onClick={() => setShowMobileSidebar(false)}
              />
              <motion.aside
                initial={{ x: -280 }}
                animate={{ x: 0 }}
                exit={{ x: -280 }}
                transition={{ type: "tween", duration: 0.2 }}
                className={`fixed top-0 left-0 bottom-0 w-72 z-50 ${bgSecondary} border-r ${borderColor} flex flex-col md:hidden`}
              >
                <div className="p-4 border-b border-zinc-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                      <Zap size={18} className="text-white" />
                    </div>
                    <span className="font-semibold text-lg">Perplexity</span>
                  </div>
                  <button
                    onClick={() => setShowMobileSidebar(false)}
                    className={`p-2 rounded-lg ${hoverBg}`}
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="p-3">
                  <button
                    onClick={createNewChat}
                    className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border ${borderColor} ${borderHover} transition-all`}
                  >
                    <Plus size={18} />
                    <span className="font-medium">New Chat</span>
                  </button>
                </div>

                <div className="flex-1 overflow-auto px-3 py-2">
                  {chatList.length === 0 ? (
                    <p className={`text-sm ${textMuted} text-center py-4`}>
                      No chats yet
                    </p>
                  ) : (
                    <div className="space-y-1">
                      {chatList.map((chat) => (
                        <button
                          key={chat.id}
                          onClick={() => selectChat(chat.id)}
                          className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm group transition-colors ${
                            currentChatId === chat.id
                              ? dark
                                ? "bg-zinc-800"
                                : "bg-gray-200"
                              : hoverBg
                          }`}
                        >
                          <MessageSquare
                            size={16}
                            className={`${textMuted} shrink-0`}
                          />
                          <span className="truncate flex-1 text-left">
                            {chat.title || "New Chat"}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteChat(chat.id);
                            }}
                            className={`p-1.5 rounded-md opacity-0 group-hover:opacity-100 hover:bg-red-500/20 hover:text-red-400 transition-all`}
                          >
                            <Trash2 size={14} />
                          </button>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className={`p-3 border-t ${borderColor} space-y-2`}>
                  <button
                    onClick={() => setDark(!dark)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg ${hoverBg} text-sm`}
                  >
                    {dark ? <Sun size={18} /> : <Moon size={18} />}
                    {dark ? "Light Mode" : "Dark Mode"}
                  </button>

                  <div className={`p-3 border-t ${borderColor}`}>
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                        {user?.username
                          ? user.username.charAt(0).toUpperCase()
                          : "U"}
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm truncate">
                          {user?.username || "User"}
                        </p>

                        <p className={`text-xs truncate ${textMuted}`}>
                          {user?.email || "user@example.com"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className="flex-1 flex flex-col overflow-hidden">
          {/* Chat Area */}
          <div
            className={`flex-1 overflow-auto ${dark ? "bg-linear-to-b from-[#0a0a0a] to-[#0f0f0f]" : "bg-linear-to-b from-white to-gray-50"}`}
          >
            <div className="max-w-3xl mx-auto px-4 py-6 md:py-12">
              {/* Empty State - Home View */}
              {messages.length === 0 && !currentChatId && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-12 md:py-20"
                >
                  <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/25">
                      <Zap size={32} className="text-white" />
                    </div>
                  </div>
                  <h1 className="text-3xl md:text-4xl font-bold mb-4">
                    How can I help you today?
                  </h1>
                  <p
                    className={`text-lg ${textSecondary} max-w-lg mx-auto mb-8`}
                  >
                    I can search the web, answer questions, and help you with
                    your projects. Just ask!
                  </p>

                  {/* Quick Actions */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-xl mx-auto">
                    {[
                      "Write a poem about coding",
                      "Explain quantum computing",
                      "Help with React hooks",
                      "What's the latest in AI?",
                    ].map((prompt, i) => (
                      <button
                        key={i}
                        onClick={() => setInput(prompt)}
                        className={`p-4 rounded-xl border ${borderColor} ${borderHover} text-left transition-all hover:shadow-md`}
                      >
                        <Search size={16} className={`${textMuted} mb-2`} />
                        <span className="text-sm">{prompt}</span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Chat Messages */}
              {messages.length > 0 && (
                <div className="space-y-6">
                  {messages.map((m, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`${m.role === "user" ? "ml-auto" : ""} max-w-2xl w-full`}
                    >
                      <div
                        className={`flex items-center gap-2 mb-2 ${m.role === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <span
                          className={`text-xs font-medium ${m.role === "user" ? "text-blue-400" : textMuted}`}
                        >
                          {m.role === "user" ? "You" : "Perplexity"}
                        </span>
                      </div>

                      <div
                        className={`rounded-2xl px-4 py-3 ${
                          m.role === "user"
                            ? "bg-blue-600 text-white"
                            : dark
                              ? "bg-[#1a1a1a] border border-zinc-800"
                              : "bg-white border border-gray-200 shadow-sm"
                        }`}
                      >
                        {m.role === "ai" ? (
                          <div className="space-y-4">
                            <div className="whitespace-pre-wrap">
                              <Typewriter text={m.content} />
                            </div>

                            {/* AI Message Actions */}
                            <div
                              className={`flex items-center gap-1 pt-2 border-t ${dark ? "border-zinc-800" : "border-gray-100"}`}
                            >
                              <button
                                onClick={() => copyToClipboard(m.content)}
                                className={`p-2 rounded-lg ${hoverBg} transition-colors`}
                                title="Copy"
                              >
                                <Copy size={14} />
                              </button>
                              <button
                                className={`p-2 rounded-lg ${hoverBg} transition-colors`}
                                title="Regenerate"
                              >
                                <RefreshCw size={14} />
                              </button>
                              <button
                                className={`p-2 rounded-lg ${hoverBg} transition-colors`}
                                title="Good response"
                              >
                                <ThumbsUp size={14} />
                              </button>
                              <button
                                className={`p-2 rounded-lg ${hoverBg} transition-colors`}
                                title="Bad response"
                              >
                                <ThumbsDown size={14} />
                              </button>
                              <button
                                className={`p-2 rounded-lg ${hoverBg} transition-colors`}
                                title="Share"
                              >
                                <Share2 size={14} />
                              </button>
                            </div>
                          </div>
                        ) : (
                          m.content
                        )}
                      </div>
                    </motion.div>
                  ))}

                  {/* Loading Indicator */}
                  <AnimatePresence>
                    {isLoading && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-3 py-4"
                      >
                        <div className="w-8 h-8 rounded-xl bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                          <Zap size={16} className="text-white" />
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex gap-1">
                            {[0, 0.2, 0.4].map((delay, i) => (
                              <motion.div
                                key={i}
                                animate={{ y: [0, -5, 0] }}
                                transition={{
                                  duration: 0.6,
                                  repeat: Infinity,
                                  delay,
                                }}
                                className={`w-2 h-2 rounded-full ${dark ? "bg-zinc-600" : "bg-gray-400"}`}
                              />
                            ))}
                          </div>
                          <span className={`text-sm ${textMuted}`}>
                            Thinking...
                          </span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>
          </div>

          {/* Input Area */}
          <div
            className={`p-3 md:p-4 border-t ${borderColor} ${dark ? "bg-[#0a0a0a]" : "bg-white"}`}
          >
            <div className="max-w-3xl mx-auto">
              <form
                onSubmit={sendMessage}
                className={`relative rounded-2xl border ${borderColor} ${inputBg} focus-within:ring-2 focus-within:ring-blue-500/30 focus-within:border-blue-500/50 transition-all`}
              >
                <textarea
                  ref={textareaRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage(e);
                    }
                  }}
                  placeholder="Ask anything..."
                  rows={1}
                  className="w-full bg-transparent px-4 py-3 pr-14 outline-none resize-none"
                  style={{ minHeight: "52px", maxHeight: "200px" }}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className={`absolute right-2 bottom-2 p-2.5 rounded-xl transition-all ${
                    input.trim() && !isLoading
                      ? "bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-600/25"
                      : dark
                        ? "bg-zinc-800 text-zinc-500"
                        : "bg-gray-200 text-gray-400"
                  }`}
                >
                  {isLoading ? (
                    <Loader2 className="animate-spin" size={18} />
                  ) : (
                    <Send size={18} />
                  )}
                </button>
              </form>
              <p
                className={`text-xs text-center mt-2 ${dark ? "text-zinc-600" : "text-gray-400"}`}
              >
                AI can make mistakes. Please verify important information.
              </p>
            </div>
          </div>
        </main>
      </div>
    </main>
  );
}

function Typewriter({ text }) {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    setDisplayedText("");
    setIsComplete(false);

    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayedText(text.slice(0, i + 1));
        i++;
      } else {
        setIsComplete(true);
        clearInterval(interval);
      }
    }, 10);

    return () => clearInterval(interval);
  }, [text]);

  return (
    <span>
      {displayedText}
      {!isComplete && (
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          className="inline-block w-0.5 h-4 bg-blue-500 ml-0.5 align-middle"
        />
      )}
    </span>
  );
}
