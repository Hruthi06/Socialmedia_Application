import { useState } from "react";
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal } from "lucide-react";
import { motion } from "motion/react";

interface PostCardProps {
  id: string;
  username: string;
  avatar: string;
  image?: string;
  caption: string;
  likes: number;
  comments: number;
  timestamp: string;
  isLiked?: boolean;
  isSaved?: boolean;
}

export function PostCard({
  id,
  username,
  avatar,
  image,
  caption,
  likes,
  comments,
  timestamp,
  isLiked = false,
  isSaved = false,
}: PostCardProps) {
  const [liked, setLiked] = useState(isLiked);
  const [saved, setSaved] = useState(isSaved);
  const [likeCount, setLikeCount] = useState(likes);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };

  return (
    <article className="bg-white border-b border-border">
      {/* Header */}
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center gap-3">
          <img
            src={avatar}
            alt={username}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="flex flex-col">
            <span className="font-semibold text-sm">{username}</span>
            <span className="text-xs text-muted-foreground">{timestamp}</span>
          </div>
        </div>
        <button className="text-muted-foreground hover:text-foreground">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      {/* Image */}
      {image && (
        <div className="w-full aspect-square bg-muted relative">
          <img
            src={image}
            alt="Post"
            className="w-full h-full object-cover"
            onDoubleClick={handleLike}
          />
        </div>
      )}

      {/* Actions */}
      <div className="p-3">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-4">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleLike}
              className="hover:text-muted-foreground transition-colors"
            >
              <Heart
                className={`w-6 h-6 ${liked ? "fill-red-500 text-red-500" : ""}`}
              />
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="hover:text-muted-foreground transition-colors"
            >
              <MessageCircle className="w-6 h-6" />
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="hover:text-muted-foreground transition-colors"
            >
              <Send className="w-6 h-6" />
            </motion.button>
          </div>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setSaved(!saved)}
            className="hover:text-muted-foreground transition-colors"
          >
            <Bookmark className={`w-6 h-6 ${saved ? "fill-current" : ""}`} />
          </motion.button>
        </div>

        {/* Likes */}
        <div className="mb-2">
          <span className="font-semibold text-sm">{likeCount.toLocaleString()} likes</span>
        </div>

        {/* Caption */}
        <div className="text-sm">
          <span className="font-semibold mr-2">{username}</span>
          <span>{caption}</span>
        </div>

        {/* View comments */}
        {comments > 0 && (
          <button className="text-sm text-muted-foreground mt-2 hover:text-foreground">
            View all {comments} comments
          </button>
        )}
      </div>
    </article>
  );
}
