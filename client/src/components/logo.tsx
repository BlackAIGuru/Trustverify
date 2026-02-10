
import logoImage from "@assets/TrustVerify Logo Design_1760208751287.png";

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

export function Logo({ size = "md", className = "" }: LogoProps) {
  const sizeClasses = {
    sm: "h-14",
    md: "h-16",
    lg: "h-20",
    xl: "h-24"
  };

  return (
    <div className={`flex items-center ${className}`}>
      <img 
        src={logoImage} 
        alt="TrustVerify" 
        className={`${sizeClasses[size]} w-auto object-contain transition-all duration-300 hover:scale-105`}
        style={{
          filter: 'contrast(1.1) brightness(1.05)',
          fontWeight: 'bold'
        }}
      />
    </div>
  );
}

// Enhanced Logo with Animation
export function AnimatedLogo({ size = "md", className = "" }: LogoProps) {
  return (
    <div className={`group ${className}`}>
      <div className="transform transition-all duration-500 group-hover:scale-105">
        <Logo size={size} className={className} />
      </div>
    </div>
  );
}

// Compact Logo for small spaces
export function CompactLogo({ size = "sm", className = "" }: LogoProps) {
  return (
    <Logo size={size} className={className} />
  );
}
