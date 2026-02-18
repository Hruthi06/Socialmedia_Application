export interface Story {
  id: string;
  username: string;
  avatar: string;
  isViewed: boolean;
}

export interface Post {
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

export interface User {
  id: string;
  username: string;
  fullName: string;
  avatar: string;
  bio: string;
  posts: number;
  followers: number;
  following: number;
}

// Current logged-in user
export const currentUser: User = {
  id: "user-1",
  username: "johndoe",
  fullName: "John Doe",
  avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400",
  bio: "Photography enthusiast 📸 | Travel lover ✈️ | Coffee addict ☕",
  posts: 127,
  followers: 2543,
  following: 892,
};

// Stories data
export const stories: Story[] = [
  {
    id: "story-1",
    username: "Your Story",
    avatar: currentUser.avatar,
    isViewed: false,
  },
  {
    id: "story-2",
    username: "sarah_m",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
    isViewed: false,
  },
  {
    id: "story-3",
    username: "mike_photo",
    avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=400",
    isViewed: true,
  },
  {
    id: "story-4",
    username: "emma.wilson",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
    isViewed: false,
  },
  {
    id: "story-5",
    username: "alex_traveler",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
    isViewed: false,
  },
  {
    id: "story-6",
    username: "lisa_art",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400",
    isViewed: true,
  },
  {
    id: "story-7",
    username: "david_fitness",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400",
    isViewed: false,
  },
  {
    id: "story-8",
    username: "maria_cook",
    avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400",
    isViewed: false,
  },
];

// Posts data
export const posts: Post[] = [
  {
    id: "post-1",
    username: "sarah_m",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
    caption: "Mountain views never get old 🏔️ #nature #hiking #adventure",
    likes: 1234,
    comments: 89,
    timestamp: "2 hours ago",
    isLiked: false,
  },
  {
    id: "post-2",
    username: "mike_photo",
    avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=400",
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800",
    caption: "Golden hour at the beach 🌅 Perfect end to a perfect day!",
    likes: 2891,
    comments: 156,
    timestamp: "5 hours ago",
    isLiked: true,
  },
  {
    id: "post-3",
    username: "emma.wilson",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
    caption:
      "Sometimes the best therapy is a good book and a cup of coffee ☕📚 What are you reading right now?",
    likes: 567,
    comments: 43,
    timestamp: "8 hours ago",
  },
  {
    id: "post-4",
    username: "alex_traveler",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800",
    caption: "Exploring hidden gems in Iceland 🇮🇸 This place is magical! #travel #wanderlust",
    likes: 3421,
    comments: 234,
    timestamp: "12 hours ago",
    isLiked: true,
  },
  {
    id: "post-5",
    username: "lisa_art",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400",
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800",
    caption: "New artwork finished! 🎨 What do you think? #art #painting #creative",
    likes: 892,
    comments: 67,
    timestamp: "1 day ago",
  },
  {
    id: "post-6",
    username: "david_fitness",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400",
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800",
    caption: "Morning workout done ✅ No excuses, just results! 💪 #fitness #motivation #gym",
    likes: 1567,
    comments: 98,
    timestamp: "1 day ago",
  },
  {
    id: "post-7",
    username: "maria_cook",
    avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800",
    caption: "Homemade pasta from scratch 🍝 Recipe on my blog! #cooking #foodie #italian",
    likes: 2134,
    comments: 187,
    timestamp: "2 days ago",
    isLiked: false,
  },
];

// User's own posts
export const userPosts: Post[] = [
  {
    id: "user-post-1",
    username: currentUser.username,
    avatar: currentUser.avatar,
    image: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800",
    caption: "Coffee and code, the perfect combination ☕💻 #developer #coding",
    likes: 456,
    comments: 32,
    timestamp: "3 days ago",
  },
  {
    id: "user-post-2",
    username: currentUser.username,
    avatar: currentUser.avatar,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
    caption: "Weekend vibes in the mountains 🏔️ #weekend #nature",
    likes: 789,
    comments: 54,
    timestamp: "1 week ago",
  },
  {
    id: "user-post-3",
    username: currentUser.username,
    avatar: currentUser.avatar,
    caption: "Just finished an amazing project! Feeling accomplished 🎉 #work #achievement",
    likes: 234,
    comments: 18,
    timestamp: "1 week ago",
  },
  {
    id: "user-post-4",
    username: currentUser.username,
    avatar: currentUser.avatar,
    image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800",
    caption: "Sunset chasing 🌅 Never gets old",
    likes: 1023,
    comments: 76,
    timestamp: "2 weeks ago",
  },
  {
    id: "user-post-5",
    username: currentUser.username,
    avatar: currentUser.avatar,
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800",
    caption: "Nature always finds a way to amaze me 🌲 #photography #nature",
    likes: 892,
    comments: 61,
    timestamp: "2 weeks ago",
  },
  {
    id: "user-post-6",
    username: currentUser.username,
    avatar: currentUser.avatar,
    image: "https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5?w=800",
    caption: "Life is better with a view like this 🌄",
    likes: 1456,
    comments: 94,
    timestamp: "3 weeks ago",
  },
];
