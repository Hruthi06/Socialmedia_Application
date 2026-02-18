import { useState } from "react";
import { X, Image as ImageIcon, Smile } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "./Button";

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  userAvatar: string;
  username: string;
}

export function CreatePostModal({
  isOpen,
  onClose,
  userAvatar,
  username,
}: CreatePostModalProps) {
  const [caption, setCaption] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isPosting, setIsPosting] = useState(false);

  const handleImageSelect = () => {
    // In a real app, this would open a file picker
    // For demo, we'll use a placeholder
    const placeholderImages = [
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800",
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800",
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800",
    ];
    setSelectedImage(
      placeholderImages[Math.floor(Math.random() * placeholderImages.length)]
    );
  };

  const handlePost = async () => {
    setIsPosting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsPosting(false);
    setCaption("");
    setSelectedImage(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h3 className="font-semibold">Create New Post</h3>
            <button
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Content */}
          <div className="p-4 max-h-[60vh] overflow-y-auto">
            <div className="flex gap-3 mb-4">
              <img
                src={userAvatar}
                alt={username}
                className="w-10 h-10 rounded-full object-cover flex-shrink-0"
              />
              <div className="flex-1">
                <p className="font-semibold text-sm mb-2">{username}</p>
                <textarea
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="What's on your mind?"
                  className="w-full min-h-[100px] resize-none focus:outline-none text-sm"
                  autoFocus
                />
              </div>
            </div>

            {/* Image preview */}
            {selectedImage && (
              <div className="relative rounded-xl overflow-hidden mb-4">
                <img
                  src={selectedImage}
                  alt="Selected"
                  className="w-full h-64 object-cover"
                />
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-2 right-2 bg-black/50 text-white rounded-full p-2 hover:bg-black/70 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Add to post */}
            <div className="flex items-center justify-between p-4 border border-border rounded-xl">
              <span className="text-sm font-medium">Add to your post</span>
              <div className="flex gap-2">
                <button
                  onClick={handleImageSelect}
                  className="p-2 hover:bg-muted rounded-lg transition-colors"
                  title="Add photo"
                >
                  <ImageIcon className="w-6 h-6 text-green-500" />
                </button>
                <button
                  className="p-2 hover:bg-muted rounded-lg transition-colors"
                  title="Add emoji"
                >
                  <Smile className="w-6 h-6 text-yellow-500" />
                </button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-border">
            <Button
              variant="primary"
              className="w-full"
              onClick={handlePost}
              disabled={!caption.trim() && !selectedImage}
              isLoading={isPosting}
            >
              {isPosting ? "Posting..." : "Post"}
            </Button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
