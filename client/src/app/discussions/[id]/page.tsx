'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import { format } from 'date-fns';
import { FaUser, FaClock } from 'react-icons/fa';
import Cookies from 'js-cookie';
import styles from './page.module.css';

interface Reply {
  id: number;
  content: string;
  createdAt: string;
  user: {
    name: string;
    email: string;
  };
}

interface Thread {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  user: {
    name: string;
    email: string;
  };
  replies: Reply[];
  event: {
    id: number;
    title: string;
  };
}

export default function DiscussionPage() {
  const params = useParams();
  const [thread, setThread] = useState<Thread | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [replyContent, setReplyContent] = useState('');
  const [error, setError] = useState<string | null>(null);

  const fetchThreadDetails = async () => {
    try {
      const response = await fetch(`http://localhost:3001/discussions/${params.id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch thread details');
      }
      const data = await response.json();
      setThread(data);
    } catch (err) {
      setError('Failed to load discussion thread');
      console.error('Error fetching thread details:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyContent.trim()) return;

    try {
      const response = await fetch('http://localhost:3001/discussions/reply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add your auth token here
          'Authorization': `Bearer ${Cookies.get('token')}`,
        },
        body: JSON.stringify({
          discussionId: Number(params.id),
          content: replyContent.trim()
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to post reply');
      }

      // Clear the form and refresh the thread
      setReplyContent('');
      fetchThreadDetails();
    } catch (err) {
      console.error('Error posting reply:', err);
      alert('Failed to post reply. Please try again.');
    }
  };

  useEffect(() => {
    fetchThreadDetails();
  }, [params.id]);

  if (isLoading) {
    return (
      <div>
        <Navbar />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-lg text-gray-600">Loading...</div>
        </div>
      </div>
    );
  }

  if (error || !thread) {
    return (
      <div>
        <Navbar />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-lg text-red-600">{error || 'Thread not found'}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />
      <div className={styles.container}>
        {/* Event Context */}
        <div className="mb-8">
          {thread.event && (
            <Link 
              href={`/events/${thread.event.id}`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-50 text-purple-600 hover:bg-purple-100 transition-colors font-medium"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to {thread.event.title}
            </Link>
          )}
        </div>

        {/* Discussion Header */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8 border border-gray-100">
          <div className="p-8">
            <h1 className="text-3xl font-bold mb-6 text-gray-900">{thread?.title}</h1>
            <div className="flex items-center gap-6 mb-6 text-gray-600 text-sm">
              <div className="flex items-center gap-2 bg-gray-50 px-3 py-1 rounded-full">
                <FaUser className="text-purple-600 w-4 h-4" />
                <span className="font-medium">{thread?.user?.name}</span>
              </div>
              <div className="flex items-center gap-2 bg-gray-50 px-3 py-1 rounded-full">
                <FaClock className="text-purple-600 w-4 h-4" />
                <span>{thread?.createdAt ? format(new Date(thread.createdAt), 'MMM d, yyyy h:mm a') : ''}</span>
              </div>
            </div>
            <div className="prose prose-purple max-w-none">
              <p className="text-gray-800 text-lg leading-relaxed whitespace-pre-line">{thread?.content}</p>
            </div>
          </div>
        </div>

        {/* Replies Section */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Replies</h2>
            <div className="px-3 py-1 bg-purple-50 text-purple-600 rounded-full text-sm font-medium">
              {thread?.replies?.length || 0} replies
            </div>
          </div>
          
          {!thread?.replies?.length ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
              <div className="text-gray-400 mb-3">
                <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <p className="text-gray-500 font-medium">No replies yet. Be the first to reply!</p>
            </div>
          ) : (
            <div className="space-y-6">
              {thread.replies.map((reply) => (
                <div key={reply.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 transition-shadow hover:shadow-md">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                      <FaUser className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{reply.user?.name}</div>
                      <div className="text-sm text-gray-500">
                        {reply.createdAt ? format(new Date(reply.createdAt), 'MMM d, yyyy h:mm a') : ''}
                      </div>
                    </div>
                  </div>
                  <div className="pl-14">
                    <p className="text-gray-800 leading-relaxed whitespace-pre-line">{reply.content}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Reply Form */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-8 border border-gray-100">
          <h3 className="text-xl font-bold mb-6 text-gray-900">Add a Reply</h3>
          <form onSubmit={handleSubmitReply} className="space-y-6">
            <div>
              <textarea
                className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 resize-none transition-shadow hover:shadow-sm"
                rows={4}
                placeholder="Share your thoughts..."
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                required
              />
            </div>
            <div className="flex items-center justify-end gap-4">
              <button
                type="submit"
                className="bg-purple-600 text-white px-8 py-3 rounded-xl hover:bg-purple-700 transition-all hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                disabled={!replyContent.trim()}
              >
                Post Reply
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
