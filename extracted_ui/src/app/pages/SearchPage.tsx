import { useState } from "react";
import { Search, TrendingUp } from "lucide-react";
import { BottomNav } from "../components/BottomNav";
import { CreatePostModal } from "../components/CreatePostModal";
import { currentUser } from "../data/mockData";

const trendingTopics = [
  { tag: "technology", posts: "1.2M" },
  { tag: "photography", posts: "890K" },
  { tag: "travel", posts: "2.1M" },
  { tag: "fitness", posts: "756K" },
  { tag: "food", posts: "1.5M" },
  { tag: "art", posts: "623K" },
];

const suggestedUsers = [
  {
    username: "tech_guru",
    name: "Tech Guru",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
    followers: "45.2K",
  },
  {
    username: "wanderlust_jen",
    name: "Jennifer Smith",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400",
    followers: "28.5K",
  },
  {
    username: "chef_marco",
    name: "Marco Rodriguez",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    followers: "67.8K",
  },
];

export default function SearchPage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-border">
        <div className="max-w-screen-xl mx-auto px-4 py-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search users, posts, tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-input-background rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-screen-xl mx-auto">
        {/* Trending Topics */}
        <section className="bg-white border-b border-border p-4">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5" />
            <h2 className="font-semibold">Trending Topics</h2>
          </div>
          <div className="space-y-3">
            {trendingTopics.map((topic, index) => (
              <button
                key={index}
                className="w-full flex items-center justify-between p-3 hover:bg-muted rounded-lg transition-colors text-left"
              >
                <div>
                  <div className="font-semibold">#{topic.tag}</div>
                  <div className="text-sm text-muted-foreground">
                    {topic.posts} posts
                  </div>
                </div>
                <TrendingUp className="w-4 h-4 text-muted-foreground" />
              </button>
            ))}
          </div>
        </section>

        {/* Suggested Users */}
        <section className="bg-white p-4">
          <h2 className="font-semibold mb-4">Suggested for you</h2>
          <div className="space-y-3">
            {suggestedUsers.map((user, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 hover:bg-muted rounded-lg transition-colors"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={user.avatar}
                    alt={user.username}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold">{user.username}</div>
                    <div className="text-sm text-muted-foreground">
                      {user.name} • {user.followers} followers
                    </div>
                  </div>
                </div>
                <button className="px-4 py-1.5 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
                  Follow
                </button>
              </div>
            ))}
          </div>
        </section>
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
