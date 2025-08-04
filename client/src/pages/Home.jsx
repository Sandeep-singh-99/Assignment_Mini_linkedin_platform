import React, { useEffect } from 'react';
import FeedForm from '../components/FeedForm';
import Feed from '../components/Feed';
import { useDispatch, useSelector } from 'react-redux';
import { getAllFeeds } from '../redux/slice/feedSlice';

export default function Home() {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.feed);

  useEffect(() => {
    dispatch(getAllFeeds());
  }, [dispatch]);

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-gray-50">
      <div className="w-full max-w-2xl px-4">
        <FeedForm />
        <div className="space-y-4">
          {posts.length > 0 ? (
            posts.map((post) => (
              <Feed
                key={post._id}
                name={post.user.name}
                content={post.content}
                dateStamp={post.createdAt}
                userId={post.user._id}
              />
            ))
          ) : (
            <div className="text-gray-500 text-center mt-6 bg-white py-6 px-4 rounded-lg shadow-sm">
              No posts available. Share your thoughts to get started!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}