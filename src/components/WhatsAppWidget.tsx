import { useState, useEffect, useRef, FormEvent, KeyboardEvent } from "react";
import { config } from "../config";
import "./styles/WhatsAppWidget.css";

interface ChatMessage {
  id: string;
  sender: "agent" | "user";
  text: string;
  time: string;
}

const getCurrentTimeStr = () => {
  const now = new Date();
  return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

const WhatsAppWidget = () => {
  const waConfig = config.whatsapp;
  if (!waConfig || !waConfig.enabled) return null;

  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isOpeningWhatsApp, setIsOpeningWhatsApp] = useState(false);

  const chatBodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize welcome message
  useEffect(() => {
    setMessages([
      {
        id: "msg-welcome",
        sender: "agent",
        text: waConfig.welcomeMessage,
        time: getCurrentTimeStr(),
      },
    ]);

    // Show friendly prompt badge after 3 seconds
    const tooltipTimer = setTimeout(() => {
      setShowTooltip(true);
    }, 3000);

    return () => clearTimeout(tooltipTimer);
  }, [waConfig.welcomeMessage]);

  // Auto-scroll chat body on new message
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  // Focus input on widget open
  useEffect(() => {
    if (isOpen) {
      setHasUnread(false);
      setShowTooltip(false);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
    }
  }, [isOpen]);

  const handleOpenToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSendMessage = (textToSend?: string) => {
    const rawText = (textToSend !== undefined ? textToSend : inputText).trim();
    if (!rawText) return;

    // Add user message to the live widget view
    const newUserMsg: ChatMessage = {
      id: "msg-" + Date.now(),
      sender: "user",
      text: rawText,
      time: getCurrentTimeStr(),
    };

    setMessages((prev) => [...prev, newUserMsg]);
    setInputText("");
    setIsOpeningWhatsApp(true);

    // Format phone number (strip spaces, +, dashes)
    const cleanNumber = waConfig.phoneNumber.replace(/[^0-9]/g, "");
    const waUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(rawText)}`;

    // Open WhatsApp in a new tab/window
    setTimeout(() => {
      window.open(waUrl, "_blank", "noopener,noreferrer");
      setIsOpeningWhatsApp(false);
    }, 400);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleSendMessage();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="wa-widget-container" aria-label="WhatsApp Support">
      {/* ── Tooltip Bubble (Delayed preview popup) ── */}
      {showTooltip && !isOpen && (
        <div className="wa-tooltip-bubble" onClick={handleOpenToggle}>
          <span>👋 Have questions? Chat with me on WhatsApp!</span>
          <button
            type="button"
            className="wa-tooltip-close"
            onClick={(e) => {
              e.stopPropagation();
              setShowTooltip(false);
            }}
            aria-label="Dismiss tooltip"
          >
            ✕
          </button>
        </div>
      )}

      {/* ── Chat Window ── */}
      {isOpen && (
        <div className="wa-chat-window" role="dialog" aria-modal="true">
          {/* Header */}
          <div className="wa-chat-header">
            <div className="wa-header-left">
              <div className="wa-avatar-wrap">
                {waConfig.agentAvatar ? (
                  <img
                    src={waConfig.agentAvatar}
                    alt={waConfig.agentName}
                    className="wa-avatar-img"
                    onError={(e) => {
                      // Fallback if image fails
                      (e.target as HTMLElement).style.display = "none";
                    }}
                  />
                ) : (
                  <div className="wa-avatar-fallback">
                    {waConfig.agentName.charAt(0)}
                  </div>
                )}
                <span className="wa-online-dot" title="Online" />
              </div>

              <div className="wa-header-info">
                <span className="wa-header-name">
                  {waConfig.agentName}
                  <span className="wa-verified-badge" title="Verified">
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                    </svg>
                  </span>
                </span>
                <span className="wa-header-status">{waConfig.agentRole}</span>
              </div>
            </div>

            <div className="wa-header-actions">
              <button
                type="button"
                className="wa-header-btn"
                onClick={handleOpenToggle}
                aria-label="Close Chat"
                title="Close Chat"
              >
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Chat Body */}
          <div className="wa-chat-body" ref={chatBodyRef}>
            <div className="wa-date-divider">Today</div>

            {messages.map((msg) =>
              msg.sender === "agent" ? (
                <div key={msg.id} className="wa-bubble-incoming">
                  <p style={{ margin: 0 }}>{msg.text}</p>
                  <div className="wa-bubble-time">
                    <span>{msg.time}</span>
                  </div>
                </div>
              ) : (
                <div key={msg.id} className="wa-bubble-outgoing">
                  <p style={{ margin: 0 }}>{msg.text}</p>
                  <div className="wa-bubble-time">
                    <span>{msg.time}</span>
                    <span className="wa-double-check" title="Sent">
                      ✓✓
                    </span>
                  </div>
                </div>
              )
            )}

            {/* Quick Prompts list */}
            {waConfig.quickPrompts && waConfig.quickPrompts.length > 0 && (
              <div className="wa-quick-prompts">
                <span className="wa-quick-prompt-label">Frequent Topics:</span>
                {waConfig.quickPrompts.map((promptText, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className="wa-prompt-pill"
                    onClick={() => {
                      setInputText(promptText);
                      inputRef.current?.focus();
                    }}
                  >
                    {promptText}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Chat Footer / Input */}
          <form className="wa-chat-footer" onSubmit={handleSubmit}>
            <div className="wa-input-row">
              <input
                ref={inputRef}
                type="text"
                className="wa-text-input"
                placeholder={isOpeningWhatsApp ? "Opening WhatsApp..." : "Type a message..."}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isOpeningWhatsApp}
              />
              <button
                type="submit"
                className="wa-send-btn"
                disabled={!inputText.trim() || isOpeningWhatsApp}
                title="Send via WhatsApp"
                aria-label="Send message"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                </svg>
              </button>
            </div>
            <div className="wa-footer-microcopy">
              <span>🔒 Direct WhatsApp end-to-end conversation</span>
            </div>
          </form>
        </div>
      )}

      {/* ── Floating Launcher Trigger Button ── */}
      <button
        type="button"
        className="wa-trigger-btn"
        onClick={handleOpenToggle}
        aria-label="Toggle WhatsApp Chat Widget"
        title="Chat on WhatsApp"
      >
        <span className="wa-pulse-ring" />
        
        {hasUnread && !isOpen && (
          <span className="wa-unread-badge">1</span>
        )}

        {isOpen ? (
          <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
          </svg>
        )}
      </button>
    </div>
  );
};

export default WhatsAppWidget;
