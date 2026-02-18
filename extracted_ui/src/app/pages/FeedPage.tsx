import { useState } from "react";
import { Sparkles } from "lucide-react";
import { StoryCircle } from "../components/StoryCircle";
import { PostCard } from "../components/PostCard";
import { BottomNav } from "../components/BottomNav";
import { CreatePostModal } from "../components/CreatePostModal";
import { stories, posts, currentUser } from "../data/mockData";

export default function FeedPage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-border">
        <div className="max-w-screen-xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold">SocialSphere</h1>
          </div>
          {/* Notifications badge placeholder */}
          <div className="w-6 h-6"></div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-screen-xl mx-auto">
        {/* Stories Section */}
        <section className="border-b border-border bg-white">
          <div className="px-4 py-4 overflow-x-auto scrollbar-hide">
            <div className="flex gap-4">
              {stories.map((story) => (
                <StoryCircle
                  key={story.id}
                  username={story.username}
                  avatar={story.avatar}
                  hasStory={true}
                  isViewed={story.isViewed}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Posts Feed */}
        <section>
          {posts.map((post) => (
            <PostCard key={post.id} {...post} />
          ))}
        </section>

        {/* End of feed message */}
        <div className="py-8 text-center text-muted-foreground">
          <p className="text-sm">You're all caught up! 🎉</p>
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
