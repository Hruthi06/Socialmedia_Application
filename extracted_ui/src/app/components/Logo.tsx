import { Share2 } from "lucide-react";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

export function Logo({ size = "md", showText = true }: LogoProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-16 h-16",
    lg: "w-24 h-24",
  };

  const iconSizes = {
    sm: 20,
    md: 40,
    lg: 60,
  };

  const textSizes = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-4xl",
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <div
        className={`${sizeClasses[size]} rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg`}
      >
        <Share2 className="text-white" size={iconSizes[size]} />
      </div>
      {showText && (
        <span
          className={`${textSizes[size]} font-semibold text-foreground tracking-tight`}
        >
          SocialHub
        </span>
      )}
    </div>
  );
}
