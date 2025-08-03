import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile } from '../redux/slice/feedSlice';
import { User2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Profile() {
  const { user } = useSelector((state) => state.auth);
  const { posts, status } = useSelector((state) => state.feed);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);

  return (
    <main className="bg-gray-50 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Profile Card */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8 transition-all duration-200 hover:shadow-lg">
          {user ? (
            <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
              <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={`${user.name}'s avatar`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User2 className="w-8 h-8 text-gray-500" />
                )}
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
                <p className="text-gray-600 text-sm mt-1">{user.email}</p>
                <div className="mt-4">
                  <h2 className="text-lg font-semibold text-gray-900">Bio</h2>
                  <p className="text-gray-600 mt-1 leading-relaxed">
                    {user.bio || 'No bio provided. Add one to share more about yourself!'}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500 py-6">
              <p>No user data available. Please log in.</p>
              <Link
                to="/login"
                className="mt-4 inline-block text-blue-600 hover:text-blue-700 font-medium"
              >
                Go to Login
              </Link>
            </div>
          )}
        </div>

        {/* Posts Section */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Posts</h2>
          {status === 'loading' ? (
            <div className="text-center py-6">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-600 mx-auto"></div>
            </div>
          ) : posts.length > 0 ? (
            <ul className="space-y-4">
              {posts.map((post) => (
                <li
                  key={post._id}
                  className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
                >
                  <p className="text-gray-800 leading-relaxed">{post.content}</p>
                  <span className="text-sm text-gray-500 mt-2 block">
                    {new Date(post.createdAt).toLocaleString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                      hour: 'numeric',
                      minute: '2-digit',
                      hour12: true,
                    })}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-gray-500 text-center py-6 bg-white rounded-lg shadow-sm">
              No posts yet. Share your first post!
            </div>
          )}
        </div>
      </div>
    </main>
  );
}