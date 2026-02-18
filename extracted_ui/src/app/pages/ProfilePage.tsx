import { useState } from "react";
import { Settings, Grid, Bookmark, UserPlus } from "lucide-react";
import { BottomNav } from "../components/BottomNav";
import { CreatePostModal } from "../components/CreatePostModal";
import { currentUser, userPosts } from "../data/mockData";
import { motion } from "motion/react";

export default function ProfilePage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"posts" | "saved">("posts");

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-border">
        <div className="max-w-screen-xl mx-auto px-4 h-14 flex items-center justify-between">
          <h1 className="text-xl font-semibold">{currentUser.username}</h1>
          <button className="text-foreground hover:text-muted-foreground transition-colors">
            <Settings className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-screen-xl mx-auto">
        {/* Profile Header */}
        <section className="bg-white border-b border-border">
          <div className="px-4 py-6">
            {/* Avatar and Stats */}
            <div className="flex items-center gap-6 mb-6">
              <div className="relative">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.username}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover ring-2 ring-offset-2 ring-gradient-to-br from-purple-500 to-blue-500"
                />
              </div>

              <div className="flex-1">
                <div className="flex gap-6 mb-4">
                  <div className="text-center">
                    <div className="font-semibold text-lg">
                      {currentUser.posts}
                    </div>
                    <div className="text-muted-foreground text-sm">Posts</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-lg">
                      {currentUser.followers.toLocaleString()}
                    </div>
                    <div className="text-muted-foreground text-sm">
                      Followers
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-lg">
                      {currentUser.following.toLocaleString()}
                    </div>
                    <div className="text-muted-foreground text-sm">
                      Following
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className="mb-4">
              <h2 className="font-semibold mb-1">{currentUser.fullName}</h2>
              <p className="text-sm text-foreground/80">{currentUser.bio}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <button className="flex-1 py-2 px-4 bg-secondary hover:bg-secondary/80 rounded-lg font-medium text-sm transition-colors">
                Edit Profile
              </button>
              <button className="flex-1 py-2 px-4 bg-secondary hover:bg-secondary/80 rounded-lg font-medium text-sm transition-colors">
                Share Profile
              </button>
              <button className="py-2 px-4 bg-secondary hover:bg-secondary/80 rounded-lg transition-colors">
                <UserPlus className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Stories Highlights */}
          <div className="px-4 pb-4">
            <div className="flex gap-4 overflow-x-auto scrollbar-hide">
              {/* New Story */}
              <div className="flex flex-col items-center gap-1 min-w-[80px]">
                <div className="w-16 h-16 rounded-full border-2 border-dashed border-muted-foreground/30 flex items-center justify-center">
                  <span className="text-2xl">+</span>
                </div>
                <span className="text-xs text-foreground">New</span>
              </div>

              {/* Sample highlights */}
              {["Travel", "Food", "Work", "Memories"].map((highlight, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center gap-1 min-w-[80px]"
                >
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-400 to-blue-400 p-0.5">
                    <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                      <span className="text-2xl">
                        {["✈️", "🍕", "💼", "📸"][index]}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs text-foreground truncate w-full text-center">
                    {highlight}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tabs */}
        <section className="bg-white border-b border-border">
          <div className="flex">
            <button
              onClick={() => setActiveTab("posts")}
              className={`flex-1 py-3 flex items-center justify-center gap-2 border-t-2 transition-colors ${
                activeTab === "posts"
                  ? "border-foreground text-foreground"
                  : "border-transparent text-muted-foreground"
              }`}
            >
              <Grid className="w-5 h-5" />
              <span className="hidden sm:inline text-sm font-medium">Posts</span>
            </button>
            <button
              onClick={() => setActiveTab("saved")}
              className={`flex-1 py-3 flex items-center justify-center gap-2 border-t-2 transition-colors ${
                activeTab === "saved"
                  ? "border-foreground text-foreground"
                  : "border-transparent text-muted-foreground"
              }`}
            >
              <Bookmark className="w-5 h-5" />
              <span className="hidden sm:inline text-sm font-medium">Saved</span>
            </button>
          </div>
        </section>

        {/* Posts Grid */}
        <section className="bg-white">
          {activeTab === "posts" ? (
            <div className="grid grid-cols-3 gap-1">
              {userPosts.map((post) => (
                <motion.div
                  key={post.id}
                  whileHover={{ opacity: 0.8 }}
                  className="aspect-square bg-muted cursor-pointer relative group"
                >
                  {post.image ? (
                    <img
                      src={post.image}
                      alt={post.caption}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center p-4 bg-gradient-to-br from-purple-100 to-blue-100">
                      <p className="text-xs text-center line-clamp-4">
                        {post.caption}
                      </p>
                    </div>
                  )}
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-6 text-white">
                    <div className="flex items-center gap-1">
                      <span className="font-semibold">
                        {post.likes.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="font-semibold">
                        {post.comments}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <Bookmark className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="font-semibold mb-2">No saved posts yet</h3>
              <p className="text-muted-foreground text-sm">
                Save posts you want to see again
              </p>
            </div>
          )}
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
