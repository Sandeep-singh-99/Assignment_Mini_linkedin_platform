import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createFeed } from '../redux/slice/feedSlice';
import { toast } from 'react-toastify';

export default function FeedForm() {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return; 
    setIsSubmitting(true);
    try {
      const result = await dispatch(createFeed({ content })).unwrap();
      if (result.error) {
        throw new Error(result.payload.message || 'Failed to create post');
      }
      setContent('');
      toast.success('Post created successfully!');
    } catch (error) {
      console.error('Failed to create post:', error);
      toast.error(error.message || 'Failed to create post');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white m-4 rounded-xl shadow-md p-6 transition-all duration-200 hover:shadow-lg">
      <form onSubmit={handleSubmit} className="flex flex-col">
        <textarea
          placeholder="What's on your mind?"
          rows={4}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-gray-700 placeholder-gray-400"
          disabled={isSubmitting}
        />
        <button
          type="submit"
          disabled={isSubmitting || !content.trim()}
          className={`mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg font-medium text-sm hover:bg-blue-700 transition-colors duration-200 ${
            isSubmitting || !content.trim() ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isSubmitting ? 'Posting...' : 'Share Post'}
        </button>
      </form>
    </div>
  );
}