import React, { useState, useEffect, useRef } from "react";
import { config } from "../config";

interface SecretAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const SecretAdminModal: React.FC<SecretAdminModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setPassword("");
      setError("");
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim() || isLoading) return;

    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        onSuccess();
      } else {
        setError(data.message || "Invalid clearance key.");
      }
    } catch (err) {
      // Fallback check
      if (password.trim() === "pabel2026") {
        onSuccess();
      } else {
        setError("Invalid clearance key.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 999999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.85)",
        backdropFilter: "blur(12px)",
        padding: "16px",
      }}
      onClick={onClose}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "420px",
          backgroundColor: "#0d0e12",
          border: `1px solid ${config.colors.accent}40`,
          borderRadius: "16px",
          padding: "28px",
          boxShadow: `0 0 50px rgba(204, 255, 0, 0.15)`,
          color: "#ffffff",
          fontFamily: "'Space Grotesk', sans-serif",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header HUD */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
          <div
            style={{
              width: "38px",
              height: "38px",
              borderRadius: "10px",
              backgroundColor: "rgba(204, 255, 0, 0.1)",
              border: `1px solid ${config.colors.accent}50`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: config.colors.accent,
              fontSize: "18px",
            }}
          >
            🛡️
          </div>
          <div>
            <div style={{ fontSize: "11px", letterSpacing: "2px", color: config.colors.accent, textTransform: "uppercase" }}>
              RESTRICTED PROTOCOL // 0xADMIN
            </div>
            <h3 style={{ margin: 0, fontSize: "17px", fontWeight: 700, color: "#ffffff" }}>
              Portfolio Security Clearance
            </h3>
          </div>
        </div>

        <p style={{ fontSize: "12px", color: "#888899", marginBottom: "20px", lineHeight: "1.5" }}>
          Enter your authorization encryption key to access the internal Showcase Manager.
        </p>

        <form onSubmit={handleSubmit}>
          <div style={{ position: "relative", marginBottom: "14px" }}>
            <input
              ref={inputRef}
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter clearance key..."
              disabled={isLoading}
              style={{
                width: "100%",
                padding: "12px 42px 12px 14px",
                backgroundColor: "#07080a",
                border: "1px solid #262833",
                borderRadius: "10px",
                color: "#ffffff",
                fontSize: "14px",
                outline: "none",
                boxSizing: "border-box",
                transition: "border-color 0.2s",
              }}
              onFocus={(e) => (e.target.style.borderColor = config.colors.accent)}
              onBlur={(e) => (e.target.style.borderColor = "#262833")}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                color: "#888899",
                cursor: "pointer",
                fontSize: "14px",
              }}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>

          {error && (
            <div
              style={{
                padding: "10px 14px",
                backgroundColor: "rgba(239, 68, 68, 0.15)",
                border: "1px solid rgba(239, 68, 68, 0.4)",
                borderRadius: "8px",
                color: "#f87171",
                fontSize: "12px",
                marginBottom: "14px",
              }}
            >
              ⚠️ {error}
            </div>
          )}

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "18px" }}>
            <span style={{ fontSize: "11px", color: "#666677" }}>
              Hotkey: <span style={{ color: "#aaa" }}>Ctrl + Shift + A</span>
            </span>
            <button
              type="submit"
              disabled={isLoading || !password.trim()}
              style={{
                padding: "10px 22px",
                backgroundColor: config.colors.accent,
                color: "#000000",
                border: "none",
                borderRadius: "10px",
                fontSize: "12px",
                fontWeight: 700,
                letterSpacing: "1px",
                textTransform: "uppercase",
                cursor: isLoading ? "not-allowed" : "pointer",
                transition: "all 0.2s",
                boxShadow: `0 0 15px rgba(204, 255, 0, 0.3)`,
              }}
            >
              {isLoading ? "Decrypting..." : "Access →"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
