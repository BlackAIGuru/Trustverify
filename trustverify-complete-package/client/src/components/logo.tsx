
import React from "react";

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
  className?: string;
  variant?: "default" | "white" | "dark";
}

export function Logo({ size = "md", showText = true, className = "", variant = "default" }: LogoProps) {
  const sizeClasses = {
    sm: { icon: "h-6 w-6", text: "text-lg" },
    md: { icon: "h-8 w-8", text: "text-xl" },
    lg: { icon: "h-12 w-12", text: "text-3xl" },
    xl: { icon: "h-16 w-16", text: "text-4xl" }
  };

  const colorSchemes = {
    default: {
      primary: "#0052CC",
      secondary: "#36B37E",
      accent: "#FFD700",
      text: "#2B2E3A"
    },
    white: {
      primary: "#FFFFFF",
      secondary: "#F0F0F0",
      accent: "#FFD700",
      text: "#FFFFFF"
    },
    dark: {
      primary: "#1a1a1a",
      secondary: "#333333",
      accent: "#FFD700",
      text: "#1a1a1a"
    }
  };

  const colors = colorSchemes[variant];

  // Custom TrustVerify Logo SVG
  const TrustVerifyIcon = () => (
    <svg
      viewBox="0 0 100 100"
      className={`${sizeClasses[size].icon} transition-all duration-300 hover:scale-110`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background Circle with Gradient */}
      <defs>
        <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={colors.primary} />
          <stop offset="100%" stopColor={colors.secondary} />
        </linearGradient>
        <linearGradient id="shieldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={colors.primary} />
          <stop offset="50%" stopColor={colors.secondary} />
          <stop offset="100%" stopColor={colors.primary} />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="2" dy="2" stdDeviation="3" floodColor="rgba(0,0,0,0.3)"/>
        </filter>
      </defs>

      {/* Outer Protection Ring */}
      <circle
        cx="50"
        cy="50"
        r="48"
        fill="none"
        stroke="url(#bgGradient)"
        strokeWidth="2"
        opacity="0.3"
      />

      {/* Main Shield Body */}
      <path
        d="M50 8 L75 22 L75 50 Q75 70 50 85 Q25 70 25 50 L25 22 Z"
        fill="url(#shieldGradient)"
        filter="url(#shadow)"
      />

      {/* Inner Shield Highlight */}
      <path
        d="M50 15 L70 26 L70 48 Q70 65 50 77 Q30 65 30 48 L30 26 Z"
        fill="rgba(255,255,255,0.15)"
      />

      {/* Central Verification Checkmark */}
      <circle
        cx="50"
        cy="45"
        r="12"
        fill={colors.accent}
        filter="url(#glow)"
      />
      
      {/* Checkmark */}
      <path
        d="M44 45 L48 49 L56 41"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Security Lock Symbol */}
      <rect
        x="46"
        y="60"
        width="8"
        height="6"
        rx="1"
        fill={colors.accent}
        opacity="0.8"
      />
      <path
        d="M48 60 L48 57 Q48 55 50 55 Q52 55 52 57 L52 60"
        stroke={colors.accent}
        strokeWidth="1.5"
        fill="none"
        opacity="0.8"
      />

      {/* Data Flow Lines */}
      <g opacity="0.6">
        <line x1="35" y1="35" x2="40" y2="40" stroke={colors.accent} strokeWidth="1" />
        <line x1="65" y1="35" x2="60" y2="40" stroke={colors.accent} strokeWidth="1" />
        <line x1="35" y1="55" x2="40" y2="50" stroke={colors.accent} strokeWidth="1" />
        <line x1="65" y1="55" x2="60" y2="50" stroke={colors.accent} strokeWidth="1" />
      </g>

      {/* Trust Dots */}
      <circle cx="20" cy="30" r="1.5" fill={colors.secondary} opacity="0.7" />
      <circle cx="80" cy="30" r="1.5" fill={colors.secondary} opacity="0.7" />
      <circle cx="20" cy="60" r="1.5" fill={colors.secondary} opacity="0.7" />
      <circle cx="80" cy="60" r="1.5" fill={colors.secondary} opacity="0.7" />
    </svg>
  );

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <div className="relative">
        <TrustVerifyIcon />
      </div>
      {showText && (
        <span 
          className={`font-bold ${sizeClasses[size].text} tracking-tight`}
          style={{ color: colors.text }}
        >
          TrustVerify
        </span>
      )}
    </div>
  );
}

// Enhanced Logo with Animation
export function AnimatedLogo({ size = "md", showText = true, className = "", variant = "default" }: LogoProps) {
  return (
    <div className={`group ${className}`}>
      <div className="transform transition-all duration-500 group-hover:scale-105">
        <Logo size={size} showText={showText} variant={variant} />
      </div>
    </div>
  );
}

// Compact Logo for small spaces
export function CompactLogo({ size = "sm", className = "" }: Omit<LogoProps, 'showText'>) {
  return (
    <Logo size={size} showText={false} className={className} />
  );
}
