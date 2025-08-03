import React, { useEffect } from 'react'
import FeedForm from '../components/FeedForm'
import Feed from '../components/Feed'
import { useDispatch } from 'react-redux'
import { getAllFeeds } from '../redux/slice/feedSlice';
import { useSelector } from "react-redux";

export default function Home() {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.feed);

  useEffect(() => {
    dispatch(getAllFeeds());
  }, [dispatch]);

  return (
    <div className='flex flex-col items-center w-full min-h-screen bg-gray-100'>
      <FeedForm />

     <div>
        {
          posts.length > 0 ? (
            posts.map((post) => (
              <Feed key={post._id} name={post.user.name} content={post.content} dateStamp={post.createdAt} />
            ))
          ) : (
            <div className="text-gray-500 text-center mt-4">
              No posts available. Create a post to see it here.
            </div>
          )}
     </div>
    </div>
  )
}
