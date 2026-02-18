import { useState } from "react";
import { Heart, MessageCircle, UserPlus, AtSign } from "lucide-react";
import { BottomNav } from "../components/BottomNav";
import { CreatePostModal } from "../components/CreatePostModal";
import { currentUser } from "../data/mockData";

interface Notification {
  id: string;
  type: "like" | "comment" | "follow" | "mention";
  user: {
    username: string;
    avatar: string;
  };
  content: string;
  timestamp: string;
  postImage?: string;
  isRead: boolean;
}

const notifications: Notification[] = [
  {
    id: "notif-1",
    type: "like",
    user: {
      username: "sarah_m",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
    },
    content: "liked your post",
    timestamp: "5 min ago",
    postImage: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=200",
    isRead: false,
  },
  {
    id: "notif-2",
    type: "comment",
    user: {
      username: "mike_photo",
      avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=400",
    },
    content: "commented: \"Amazing shot! 📸\"",
    timestamp: "15 min ago",
    postImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200",
    isRead: false,
  },
  {
    id: "notif-3",
    type: "follow",
    user: {
      username: "emma.wilson",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
    },
    content: "started following you",
    timestamp: "1 hour ago",
    isRead: false,
  },
  {
    id: "notif-4",
    type: "mention",
    user: {
      username: "alex_traveler",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
    },
    content: "mentioned you in a comment",
    timestamp: "2 hours ago",
    postImage: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=200",
    isRead: true,
  },
  {
    id: "notif-5",
    type: "like",
    user: {
      username: "lisa_art",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400",
    },
    content: "and 24 others liked your post",
    timestamp: "3 hours ago",
    postImage: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=200",
    isRead: true,
  },
  {
    id: "notif-6",
    type: "comment",
    user: {
      username: "david_fitness",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400",
    },
    content: "commented: \"Great work! 💪\"",
    timestamp: "5 hours ago",
    postImage: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=200",
    isRead: true,
  },
];

const getNotificationIcon = (type: Notification["type"]) => {
  switch (type) {
    case "like":
      return <Heart className="w-5 h-5 text-red-500" fill="currentColor" />;
    case "comment":
      return <MessageCircle className="w-5 h-5 text-blue-500" />;
    case "follow":
      return <UserPlus className="w-5 h-5 text-green-500" />;
    case "mention":
      return <AtSign className="w-5 h-5 text-purple-500" />;
  }
};

export default function NotificationsPage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-border">
        <div className="max-w-screen-xl mx-auto px-4 h-14 flex items-center justify-between">
          <h1 className="text-xl font-semibold">Notifications</h1>
          <button className="text-primary text-sm font-medium hover:text-primary/80">
            Mark all as read
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-screen-xl mx-auto">
        {/* Notifications List */}
        <section className="bg-white">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`flex items-center gap-3 p-4 border-b border-border hover:bg-muted/30 transition-colors ${
                !notification.isRead ? "bg-blue-50/30" : ""
              }`}
            >
              {/* Avatar with icon badge */}
              <div className="relative flex-shrink-0">
                <img
                  src={notification.user.avatar}
                  alt={notification.user.username}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5">
                  {getNotificationIcon(notification.type)}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className="text-sm">
                  <span className="font-semibold">
                    {notification.user.username}
                  </span>{" "}
                  <span className="text-foreground/80">
                    {notification.content}
                  </span>
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {notification.timestamp}
                </p>
              </div>

              {/* Post thumbnail or Follow button */}
              {notification.postImage ? (
                <img
                  src={notification.postImage}
                  alt="Post"
                  className="w-12 h-12 rounded object-cover flex-shrink-0"
                />
              ) : notification.type === "follow" ? (
                <button className="px-4 py-1.5 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors flex-shrink-0">
                  Follow
                </button>
              ) : null}
            </div>
          ))}
        </section>

        {/* End message */}
        <div className="py-8 text-center text-muted-foreground">
          <p className="text-sm">You're all caught up! ✨</p>
        </div>
      </main>

      {/* Bottom Navigation */}
      <BottomNav onCreateClick={() => setIsCreateModalOpen(true)} />

      {/* Create Post Modal */}
      <CreatePostModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        userAvatar={currentUser.avatar}
        username={currentUser.username}
      />
    </div>
  );
}
