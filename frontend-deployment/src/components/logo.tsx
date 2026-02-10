
import logoImage from "@assets/LOGO-01_1759354396256.jpg";

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

export function Logo({ size = "md", className = "" }: LogoProps) {
  const sizeClasses = {
    sm: "h-8",
    md: "h-10",
    lg: "h-14",
    xl: "h-20"
  };

  return (
    <div className={`flex items-center ${className}`}>
      <img 
        src={logoImage} 
        alt="TrustVerify" 
        className={`${sizeClasses[size]} w-auto object-contain transition-all duration-300 hover:scale-105`}
        style={{ 
          imageRendering: 'crisp-edges',
          WebkitFontSmoothing: 'antialiased',
          backfaceVisibility: 'hidden',
          transform: 'translateZ(0)'
        }}
      />
    </div>
  );
}

export function AnimatedLogo({ size = "md", className = "" }: LogoProps) {
  return (
    <div className={`group ${className}`}>
      <div className="transform transition-all duration-500 group-hover:scale-105">
        <Logo size={size} className={className} />
      </div>
    </div>
  );
}

export function CompactLogo({ size = "sm", className = "" }: LogoProps) {
  return (
    <Logo size={size} className={className} />
  );
}
