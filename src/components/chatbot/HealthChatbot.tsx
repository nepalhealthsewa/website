import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  MessageSquare,
  X,
  Send,
  PhoneCall,
  Sparkles,
  RotateCcw,
  Volume2,
  VolumeX,
  ExternalLink,
  ChevronRight,
  ShieldAlert,
  FastForward,
  Minimize2,
  Maximize2,
} from 'lucide-react';
import {
  queryKnowledgeBase,
  BotActionLink,
} from '../../data/chatbotKnowledge';

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  isTyping?: boolean;
  actionLinks?: BotActionLink[];
  suggestedFollowUps?: string[];
  timestamp: string;
}

// Gentle Web Audio API synthesizer for optional soft typing tap
const playSoftTap = () => {
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, ctx.currentTime);
    gain.gain.setValueAtTime(0.015, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.04);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.04);
  } catch {
    // Ignore audio context errors in quiet/restricted browsers
  }
};

/**
 * Custom renderer for structured chatbot text (bold, bullet points, headers)
 */
const FormattedMessage: React.FC<{ text: string }> = ({ text }) => {
  const lines = text.split('\n');

  return (
    <div className="space-y-1.5 leading-relaxed text-slate-800 text-sm">
      {lines.map((line, idx) => {
        const trimmed = line.trim();
        if (!trimmed) {
          return <div key={idx} className="h-1" />;
        }

        // Bullet point
        if (trimmed.startsWith('•') || trimmed.startsWith('-') || trimmed.startsWith('* ')) {
          const bulletContent = trimmed.replace(/^[•\-*]\s*/, '');
          return (
            <div key={idx} className="flex items-start gap-2 pl-1">
              <span className="text-red-500 font-bold shrink-0 mt-0.5">•</span>
              <div>{renderInlineFormatting(bulletContent)}</div>
            </div>
          );
        }

        // Standard line
        return <div key={idx}>{renderInlineFormatting(trimmed)}</div>;
      })}
    </div>
  );
};

// Parses inline bolding (**text**) and emojis
function renderInlineFormatting(content: string) {
  const parts = content.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      const boldText = part.slice(2, -2);
      return (
        <strong key={index} className="font-semibold text-slate-900">
          {boldText}
        </strong>
      );
    }
    return <span key={index}>{part}</span>;
  });
}

export const HealthChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [hasUnreadNotification, setHasUnreadNotification] = useState(true);

  // Initial welcome message
  const initialBotMessage: ChatMessage = {
    id: 'msg-welcome',
    sender: 'bot',
    text: `**Namaste! 🙏 I am your Nepal Health Sewa Assistant.**

I am here to help you navigate voluntary blood donors, 24/7 emergency hotlines, hospital contacts, clinical calculators, and health guidelines across Nepal.

How can I help you today?`,
    actionLinks: [
      { label: '🩸 Search Blood Donors', path: '/blood-bank' },
      { label: '🚨 24/7 Emergency Desk', path: '/emergency' },
      { label: '🧮 Health Calculators', path: '/health-tools' },
      { label: '📞 Contact Hotlines', path: '/contact' },
    ],
    suggestedFollowUps: [
      'How to find a blood donor?',
      'What are your emergency hotlines?',
      'Who can donate blood?',
      'Where is your office located?',
    ],
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  };

  const [messages, setMessages] = useState<ChatMessage[]>([initialBotMessage]);
  const [activeTypingMessageId, setActiveTypingMessageId] = useState<string | null>(null);
  const [displayedText, setDisplayedText] = useState<string>('');
  const [isTypingPhase, setIsTypingPhase] = useState<boolean>(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const typingTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-scroll to bottom
  const scrollToBottom = (behavior: ScrollBehavior = 'smooth') => {
    messagesEndRef.current?.scrollIntoView({ behavior });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, displayedText, isTypingPhase]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && !isMinimized) {
      setHasUnreadNotification(false);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 250);
    }
  }, [isOpen, isMinimized]);

  // Handle Typing Effect when a new bot message needs typing
  const triggerTypingEffect = (botMsg: ChatMessage, fullResponse: string) => {
    setActiveTypingMessageId(botMsg.id);
    setIsTypingPhase(true);
    setDisplayedText('');

    // Pre-typing thinking pause (~350ms)
    setTimeout(() => {
      let charIndex = 0;
      const step = 2; // characters per tick for smooth natural velocity

      if (typingTimerRef.current) clearInterval(typingTimerRef.current);

      typingTimerRef.current = setInterval(() => {
        charIndex += step;
        if (charIndex >= fullResponse.length) {
          // Finished typing
          if (typingTimerRef.current) clearInterval(typingTimerRef.current);
          setDisplayedText(fullResponse);
          setIsTypingPhase(false);
          setActiveTypingMessageId(null);
        } else {
          setDisplayedText(fullResponse.slice(0, charIndex));
          if (soundEnabled && charIndex % 8 === 0) {
            playSoftTap();
          }
        }
      }, 14); // ~14ms per tick produces a silky typewriter effect
    }, 350);
  };

  // Skip typing immediately on user click
  const handleSkipTyping = (fullText: string) => {
    if (typingTimerRef.current) clearInterval(typingTimerRef.current);
    setDisplayedText(fullText);
    setIsTypingPhase(false);
    setActiveTypingMessageId(null);
  };

  const handleSendMessage = (textToSend?: string) => {
    const query = (textToSend || inputValue).trim();
    if (!query) return;

    // Add user message
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');

    // Find response from knowledge base
    const matched = queryKnowledgeBase(query);

    const botMsgId = `bot-${Date.now()}`;
    const botMsg: ChatMessage = {
      id: botMsgId,
      sender: 'bot',
      text: matched.response,
      actionLinks: matched.actionLinks,
      suggestedFollowUps: matched.suggestedFollowUps,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    // Add bot message placeholder
    setMessages((prev) => [...prev, botMsg]);

    // Start typewriter animation
    triggerTypingEffect(botMsg, matched.response);
  };

  const handleResetChat = () => {
    if (typingTimerRef.current) clearInterval(typingTimerRef.current);
    setActiveTypingMessageId(null);
    setIsTypingPhase(false);
    setDisplayedText('');
    setMessages([initialBotMessage]);
  };

  return (
    <>
      {/* Floating Launcher Button */}
      {!isOpen && (
        <div className="fixed bottom-20 md:bottom-6 right-4 sm:right-6 z-40 flex flex-col items-end">
          {hasUnreadNotification && (
            <div className="mb-2 bg-slate-900 text-white text-xs px-3 py-2 rounded-xl shadow-lg border border-slate-700 flex items-center gap-2 animate-bounce max-w-[220px]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping shrink-0" />
              <span>Need blood or emergency info? Chat with us!</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setHasUnreadNotification(false);
                }}
                className="text-slate-400 hover:text-white ml-auto"
                aria-label="Dismiss notification"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          <button
            onClick={() => {
              setIsOpen(true);
              setIsMinimized(false);
            }}
            className="group relative flex items-center gap-2.5 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white px-4 py-3 sm:px-5 sm:py-3.5 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 border-2 border-white/20"
            aria-label="Open Nepal Health Sewa Assistant"
          >
            <div className="relative">
              <img
                src="/img/logo.af0d533f.png"
                alt="Nepal Health Sewa"
                className="w-7 h-7 object-contain drop-shadow-sm group-hover:rotate-6 transition-transform"
              />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 border-2 border-red-600 rounded-full" />
            </div>
            <div className="text-left hidden sm:block">
              <div className="text-xs font-semibold uppercase tracking-wider text-red-100 flex items-center gap-1">
                <span>Health Assistant</span>
                <Sparkles className="w-3 h-3 text-amber-300" />
              </div>
              <div className="text-xs font-bold text-white leading-tight">
                24/7 Helpline & Guide
              </div>
            </div>
          </button>
        </div>
      )}

      {/* Floating Chatbot Window */}
      {isOpen && (
        <div
          className={`fixed z-50 transition-all duration-300 ${
            isMinimized
              ? 'bottom-20 md:bottom-6 right-4 sm:right-6 w-80 h-14 rounded-2xl shadow-xl overflow-hidden'
              : 'bottom-4 sm:bottom-6 right-2 sm:right-6 w-[calc(100vw-1rem)] sm:w-[420px] max-w-[420px] h-[85vh] sm:h-[620px] max-h-[680px] rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-200/90 bg-slate-50'
          }`}
          role="dialog"
          aria-label="Nepal Health Sewa Virtual Assistant"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white p-3.5 sm:p-4 flex items-center justify-between shadow-md shrink-0 select-none">
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9 rounded-xl bg-white/10 p-1 backdrop-blur-xs flex items-center justify-center border border-white/20">
                <img
                  src="/img/logo.af0d533f.png"
                  alt="Nepal Health Sewa Logo"
                  className="w-full h-full object-contain"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border-2 border-red-600 rounded-full" />
              </div>
              <div>
                <h3 className="font-bold text-sm sm:text-base leading-tight flex items-center gap-1.5">
                  <span>Health Sewa Assistant</span>
                  <span className="bg-white/20 text-[10px] px-1.5 py-0.5 rounded-full font-medium">
                    Offline / Instant
                  </span>
                </h3>
                <p className="text-[11px] text-red-100 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                  <span>Always active · Blood, Oxygen & Emergency Guide</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 text-white/80">
              <button
                onClick={() => setSoundEnabled((v) => !v)}
                title={soundEnabled ? 'Mute typing sounds' : 'Enable typing sound'}
                className="p-1.5 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                aria-label={soundEnabled ? 'Mute typing sounds' : 'Enable typing sound'}
              >
                {soundEnabled ? <Volume2 className="w-4 h-4 text-amber-300" /> : <VolumeX className="w-4 h-4" />}
              </button>

              <button
                onClick={handleResetChat}
                title="Restart conversation"
                className="p-1.5 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                aria-label="Restart conversation"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsMinimized((v) => !v)}
                title={isMinimized ? 'Expand' : 'Minimize'}
                className="p-1.5 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                aria-label={isMinimized ? 'Expand' : 'Minimize'}
              >
                {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
              </button>

              <button
                onClick={() => setIsOpen(false)}
                title="Close chat"
                className="p-1.5 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                aria-label="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Emergency Banner */}
              <div className="bg-amber-50 border-b border-amber-200/80 px-3.5 py-1.5 text-xs text-amber-900 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-1.5 font-medium truncate">
                  <ShieldAlert className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span className="truncate">Need urgent blood? Call 24/7 hotline:</span>
                </div>
                <a
                  href="tel:+9779845012345"
                  className="font-bold text-red-600 hover:text-red-700 flex items-center gap-1 shrink-0 ml-2"
                >
                  <PhoneCall className="w-3 h-3" />
                  <span>9845012345</span>
                </a>
              </div>

              {/* Message List */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth">
                {messages.map((msg) => {
                  const isUser = msg.sender === 'user';
                  const isCurrentlyTyping = activeTypingMessageId === msg.id;
                  const textToDisplay = isCurrentlyTyping ? displayedText : msg.text;

                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} space-y-1`}
                    >
                      <div className="flex items-end gap-2 max-w-[88%]">
                        {!isUser && (
                          <div className="w-7 h-7 rounded-full bg-red-100 border border-red-200 flex items-center justify-center p-1 shrink-0 mb-1">
                            <img
                              src="/img/logo.af0d533f.png"
                              alt="Bot"
                              className="w-full h-full object-contain"
                            />
                          </div>
                        )}

                        <div
                          onClick={() => {
                            if (isCurrentlyTyping) {
                              handleSkipTyping(msg.text);
                            }
                          }}
                          className={`relative p-3.5 rounded-2xl shadow-xs text-sm ${
                            isUser
                              ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-br-xs'
                              : 'bg-white border border-slate-200/80 text-slate-800 rounded-bl-xs'
                          }`}
                        >
                          {isUser ? (
                            <p className="whitespace-pre-wrap">{msg.text}</p>
                          ) : (
                            <div>
                              <FormattedMessage text={textToDisplay} />

                              {/* Animated Typing Indicator Cursor */}
                              {isCurrentlyTyping && (
                                <span className="inline-flex items-center gap-1.5 ml-1 text-red-600 font-bold">
                                  <span className="inline-block w-1.5 h-4 bg-red-600 animate-pulse" />
                                </span>
                              )}
                            </div>
                          )}

                          {/* Skip typing helper button */}
                          {isCurrentlyTyping && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleSkipTyping(msg.text);
                              }}
                              className="mt-2 text-[11px] text-red-600 hover:text-red-700 font-semibold flex items-center gap-1 bg-red-50 hover:bg-red-100 px-2 py-0.5 rounded-md transition-colors"
                            >
                              <FastForward className="w-3 h-3" />
                              <span>Show full response</span>
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Bot Action Links (rendered when finished typing) */}
                      {!isUser && (!isCurrentlyTyping || !isTypingPhase) && msg.actionLinks && (
                        <div className="pl-9 pt-1 flex flex-wrap gap-1.5 max-w-[88%]">
                          {msg.actionLinks.map((action, aIdx) => (
                            action.isExternal ? (
                              <a
                                key={aIdx}
                                href={action.path}
                                className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-lg bg-red-50 text-red-700 hover:bg-red-100 border border-red-200/80 transition-colors"
                              >
                                <span>{action.label}</span>
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            ) : (
                              <Link
                                key={aIdx}
                                to={action.path}
                                onClick={() => {
                                  // Close on mobile navigation
                                  if (window.innerWidth < 640) setIsOpen(false);
                                }}
                                className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-lg bg-red-50 text-red-700 hover:bg-red-100 border border-red-200/80 transition-colors"
                              >
                                <span>{action.label}</span>
                                <ChevronRight className="w-3 h-3" />
                              </Link>
                            )
                          ))}
                        </div>
                      )}

                      {/* Follow-up suggestions */}
                      {!isUser && (!isCurrentlyTyping || !isTypingPhase) && msg.suggestedFollowUps && (
                        <div className="pl-9 pt-1.5 flex flex-wrap gap-1.5 max-w-[90%]">
                          {msg.suggestedFollowUps.map((prompt, pIdx) => (
                            <button
                              key={pIdx}
                              onClick={() => handleSendMessage(prompt)}
                              className="text-[11px] bg-white hover:bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200 px-2.5 py-1 rounded-full shadow-2xs transition-colors text-left"
                            >
                              {prompt}
                            </button>
                          ))}
                        </div>
                      )}

                      <span className="text-[10px] text-slate-400 px-1">
                        {msg.timestamp}
                      </span>
                    </div>
                  );
                })}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick Input Suggestions Bar */}
              <div className="bg-slate-100/80 border-t border-slate-200 px-3 py-2 overflow-x-auto whitespace-nowrap scrollbar-none flex items-center gap-1.5">
                <span className="text-[10px] font-semibold uppercase text-slate-500 tracking-wider shrink-0 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-red-500" />
                  <span>Ask:</span>
                </span>
                <button
                  onClick={() => handleSendMessage('How to find blood donor?')}
                  className="text-xs bg-white text-slate-700 hover:text-red-600 hover:bg-red-50 border border-slate-200 px-2.5 py-1 rounded-lg transition-colors shrink-0"
                >
                  🩸 Find Blood
                </button>
                <button
                  onClick={() => handleSendMessage('Emergency hotlines')}
                  className="text-xs bg-white text-slate-700 hover:text-red-600 hover:bg-red-50 border border-slate-200 px-2.5 py-1 rounded-lg transition-colors shrink-0"
                >
                  🚨 Hotlines
                </button>
                <button
                  onClick={() => handleSendMessage('BMI Calculator')}
                  className="text-xs bg-white text-slate-700 hover:text-red-600 hover:bg-red-50 border border-slate-200 px-2.5 py-1 rounded-lg transition-colors shrink-0"
                >
                  🧮 BMI Tool
                </button>
                <button
                  onClick={() => handleSendMessage('Who can donate blood?')}
                  className="text-xs bg-white text-slate-700 hover:text-red-600 hover:bg-red-50 border border-slate-200 px-2.5 py-1 rounded-lg transition-colors shrink-0"
                >
                  📋 Eligibility
                </button>
                <button
                  onClick={() => handleSendMessage('COVID-19 guidelines')}
                  className="text-xs bg-white text-slate-700 hover:text-red-600 hover:bg-red-50 border border-slate-200 px-2.5 py-1 rounded-lg transition-colors shrink-0"
                >
                  🦠 COVID
                </button>
                <button
                  onClick={() => handleSendMessage('Dengue fever care')}
                  className="text-xs bg-white text-slate-700 hover:text-red-600 hover:bg-red-50 border border-slate-200 px-2.5 py-1 rounded-lg transition-colors shrink-0"
                >
                  🦟 Dengue
                </button>
              </div>

              {/* Chat Input Field */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="p-3 bg-white border-t border-slate-200 flex items-center gap-2"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask about blood donors, hotlines, BMI, COVID..."
                  className="flex-1 bg-slate-100 border border-slate-200 text-slate-900 placeholder:text-slate-400 text-xs sm:text-sm rounded-xl px-3.5 py-2.5 focus:outline-hidden focus:ring-2 focus:ring-red-500 focus:bg-white transition-all"
                  disabled={isTypingPhase}
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim() || isTypingPhase}
                  className="p-2.5 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-xl shadow-xs transition-all shrink-0 active:scale-95"
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>

              {/* Disclaimer */}
              <div className="bg-slate-50 px-3 py-1.5 border-t border-slate-100 text-[10px] text-slate-400 text-center select-none">
                Nepal Health Sewa Community Assistant · Dial 102 for life-threatening emergencies.
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};
