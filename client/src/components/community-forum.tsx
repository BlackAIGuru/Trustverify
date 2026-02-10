import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { 
  MessageSquare, 
  Users, 
  Plus,
  Reply,
  ThumbsUp,
  ThumbsDown,
  Star,
  Clock,
  Search,
  Filter,
  Bookmark,
  Flag,
  Award,
  TrendingUp,
  MessageCircle,
  Eye,
  ArrowUp,
  ArrowDown
} from "lucide-react";
import { format } from "date-fns";

interface ForumPost {
  id: string;
  title: string;
  content: string;
  author: string;
  authorLevel: string;
  courseLevel?: string;
  category: string;
  createdAt: string;
  replies: number;
  views: number;
  upvotes: number;
  downvotes: number;
  userVote?: 'up' | 'down';
  isBookmarked?: boolean;
  tags: string[];
}

interface ForumReply {
  id: string;
  content: string;
  author: string;
  authorLevel: string;
  createdAt: string;
  upvotes: number;
  downvotes: number;
  userVote?: 'up' | 'down';
  isAccepted?: boolean;
}

export function CommunityForum() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'latest' | 'popular' | 'trending'>('latest');
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [selectedPost, setSelectedPost] = useState<string | null>(null);

  const categories = [
    { id: 'all', name: 'All Topics', count: 142 },
    { id: 'foundation', name: 'Foundation Level', count: 45 },
    { id: 'intermediate', name: 'Intermediate Level', count: 38 },
    { id: 'advanced', name: 'Advanced Level', count: 29 },
    { id: 'expert', name: 'Expert Level', count: 16 },
    { id: 'general', name: 'General Discussion', count: 14 }
  ];

  const forumPosts: ForumPost[] = [
    {
      id: 'post-1',
      title: 'How to identify sophisticated phishing emails?',
      content: 'I completed the Foundation course but still struggle with advanced phishing techniques. Can anyone share practical tips for spotting subtle signs?',
      author: 'Sarah_Chen',
      authorLevel: 'Foundation',
      courseLevel: 'foundation',
      category: 'foundation',
      createdAt: '2025-08-31T10:30:00Z',
      replies: 8,
      views: 45,
      upvotes: 12,
      downvotes: 1,
      userVote: 'up',
      isBookmarked: true,
      tags: ['phishing', 'email-security', 'identification']
    },
    {
      id: 'post-2',
      title: 'Best practices for business email compromise prevention',
      content: 'Working through the Intermediate level content. What are the most effective BEC prevention strategies you\'ve implemented in your organizations?',
      author: 'Marcus_T',
      authorLevel: 'Intermediate',
      courseLevel: 'intermediate',
      category: 'intermediate',
      createdAt: '2025-08-31T09:15:00Z',
      replies: 15,
      views: 89,
      upvotes: 18,
      downvotes: 2,
      tags: ['bec', 'business-security', 'prevention']
    },
    {
      id: 'post-3',
      title: 'Case Study: Investment Scam Analysis',
      content: 'Found an interesting case in the Advanced course materials. Would love to discuss the red flags and prevention strategies with fellow learners.',
      author: 'Dr_Mitchell',
      authorLevel: 'Expert',
      courseLevel: 'advanced',
      category: 'advanced',
      createdAt: '2025-08-31T08:45:00Z',
      replies: 22,
      views: 156,
      upvotes: 24,
      downvotes: 0,
      tags: ['case-study', 'investment-fraud', 'analysis']
    }
  ];

  const handleVote = (postId: string, voteType: 'up' | 'down') => {
    // Handle voting logic
    console.log(`Voted ${voteType} on post ${postId}`);
  };

  const handleBookmark = (postId: string) => {
    // Handle bookmark logic
    console.log(`Bookmarked post ${postId}`);
  };

  const filteredPosts = forumPosts.filter(post => {
    const categoryMatch = selectedCategory === 'all' || post.category === selectedCategory;
    const searchMatch = searchQuery === '' || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return categoryMatch && searchMatch;
  });

  const PostCard = ({ post }: { post: ForumPost }) => (
    <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => setSelectedPost(post.id)}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <Badge variant="outline" className="text-xs">
                {post.authorLevel}
              </Badge>
              {post.courseLevel && (
                <Badge className="text-xs bg-blue-100 text-blue-800">
                  {post.courseLevel}
                </Badge>
              )}
              <span className="text-xs text-gray-500">
                {format(new Date(post.createdAt), 'MMM dd, yyyy')}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
              {post.title}
            </h3>
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
              {post.content}
            </p>
            <div className="flex flex-wrap gap-1 mb-3">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
          <div className="ml-4 text-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                handleBookmark(post.id);
              }}
              className={post.isBookmarked ? 'text-yellow-500' : 'text-gray-400'}
            >
              <Bookmark className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <span className="font-medium text-gray-700">{post.author}</span>
            <div className="flex items-center space-x-1">
              <MessageCircle className="h-4 w-4" />
              <span>{post.replies}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Eye className="h-4 w-4" />
              <span>{post.views}</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  handleVote(post.id, 'up');
                }}
                className={`p-1 ${post.userVote === 'up' ? 'text-green-600' : 'text-gray-400'}`}
              >
                <ArrowUp className="h-4 w-4" />
              </Button>
              <span className="text-sm font-medium">{post.upvotes - post.downvotes}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  handleVote(post.id, 'down');
                }}
                className={`p-1 ${post.userVote === 'down' ? 'text-red-600' : 'text-gray-400'}`}
              >
                <ArrowDown className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  if (showCreatePost) {
    return <CreatePostForm onCancel={() => setShowCreatePost(false)} onSubmit={() => setShowCreatePost(false)} />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Community Forum</h2>
          <p className="text-gray-600">Connect with fellow fraud prevention professionals</p>
        </div>
        <Button onClick={() => setShowCreatePost(true)} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="mr-2 h-4 w-4" />
          New Post
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search discussions..."
                  className="pl-10"
                />
              </div>
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 rounded-md bg-white"
            >
              <option value="latest">Latest</option>
              <option value="popular">Most Popular</option>
              <option value="trending">Trending</option>
            </select>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Categories Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Categories</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-blue-100 text-blue-700'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-sm">{category.name}</span>
                      <Badge variant="secondary" className="text-xs">
                        {category.count}
                      </Badge>
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Forum Stats */}
          <Card className="mt-4">
            <CardHeader>
              <CardTitle className="text-lg">Forum Stats</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Total Posts</span>
                  <span className="font-semibold">142</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Active Members</span>
                  <span className="font-semibold">89</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">This Week</span>
                  <span className="font-semibold">12 posts</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Posts List */}
        <div className="lg:col-span-3">
          <div className="space-y-4">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <MessageSquare className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No discussions found</h3>
                  <p className="text-gray-600 mb-4">
                    Be the first to start a discussion in this category!
                  </p>
                  <Button onClick={() => setShowCreatePost(true)} className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="mr-2 h-4 w-4" />
                    Start Discussion
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function CreatePostForm({ onCancel, onSubmit }: { onCancel: () => void; onSubmit: () => void }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('foundation');
  const [tags, setTags] = useState('');

  const handleSubmit = () => {
    // Validate and submit form
    if (!title.trim() || !content.trim()) {
      alert('Please fill in all required fields');
      return;
    }
    
    console.log('Creating post:', { title, content, category, tags });
    onSubmit();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Discussion</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Title <span className="text-red-500">*</span>
          </label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter a descriptive title for your discussion"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white"
          >
            <option value="foundation">Foundation Level</option>
            <option value="intermediate">Intermediate Level</option>
            <option value="advanced">Advanced Level</option>
            <option value="expert">Expert Level</option>
            <option value="general">General Discussion</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Content <span className="text-red-500">*</span>
          </label>
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Share your question, experience, or insights..."
            className="min-h-[120px]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tags (comma-separated)
          </label>
          <Input
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="e.g., phishing, email-security, prevention"
          />
        </div>

        <div className="flex space-x-4 pt-4">
          <Button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700">
            Create Discussion
          </Button>
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}