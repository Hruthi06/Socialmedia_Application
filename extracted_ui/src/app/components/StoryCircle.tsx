import { motion } from "motion/react";

interface StoryCircleProps {
  username: string;
  avatar: string;
  hasStory?: boolean;
  isViewed?: boolean;
  onClick?: () => void;
}

export function StoryCircle({
  username,
  avatar,
  hasStory = true,
  isViewed = false,
  onClick,
}: StoryCircleProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="flex flex-col items-center gap-1 min-w-[80px]"
    >
      <div
        className={`relative p-0.5 rounded-full ${
          hasStory && !isViewed
            ? "bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-500"
            : isViewed
            ? "bg-muted"
            : "bg-muted"
        }`}
      >
        <div className="bg-white p-0.5 rounded-full">
          <img
            src={avatar}
            alt={username}
            className="w-16 h-16 rounded-full object-cover"
          />
        </div>
      </div>
      <span className="text-xs text-foreground truncate w-full text-center">
        {username.length > 10 ? username.slice(0, 10) + "..." : username}
      </span>
    </motion.button>
  );
}
