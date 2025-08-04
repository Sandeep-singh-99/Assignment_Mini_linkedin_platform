import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfileById } from '../redux/slice/feedSlice';
import { User2 } from 'lucide-react';
import { useParams } from 'react-router-dom';

export default function ProfileView() {
  const { profile, loading, error } = useSelector((state) => state.feed);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(getUserProfileById(id));
    }
  }, [dispatch, id]);

  return (
    <main className="bg-gray-50 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {loading && (
          <div className="text-center text-gray-600">Loading profile...</div>
        )}
        {error && (
          <div className="text-center text-red-600">
            Error: {error.message || 'Failed to load profile'}
          </div>
        )}
        {!loading && !error && profile?.userData && (
          <>
            {/* User Profile Section */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-8 transition-all duration-200 hover:shadow-lg">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                  <User2 className="w-8 h-8 text-gray-500" />
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <h1 className="text-2xl font-bold text-gray-900">
                    {profile.userData.name}
                  </h1>
                  <p className="text-gray-600 text-sm mt-1">
                    {profile.userData.email}
                  </p>
                  <div className="mt-4">
                    <h2 className="text-lg font-semibold text-gray-900">Bio</h2>
                    <p className="text-gray-600 mt-1 leading-relaxed">
                      {profile.userData.bio || 'No bio provided. Add one to share more about yourself!'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* User Feeds Section */}
            <div className="bg-white rounded-xl shadow-md p-6 transition-all duration-200 hover:shadow-lg">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Posts</h2>
              {profile.content && profile.content.length > 0 ? (
                profile.content.map((post) => (
                  <div
                    key={post.feedId}
                    className="border-b border-gray-200 py-4 last:border-b-0"
                  >
                    <p className="text-gray-800">{post.text}</p>
                    <p className="text-gray-500 text-sm mt-1">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-gray-600">No posts yet.</p>
              )}
            </div>
          </>
        )}
        {!loading && !error && !profile?.userData && (
          <div className="text-center text-gray-600">No profile data found.</div>
        )}
      </div>
    </main>
  );
}