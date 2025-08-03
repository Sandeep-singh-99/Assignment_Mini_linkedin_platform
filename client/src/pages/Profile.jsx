import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../redux/slice/feedSlice";

export default function Profile() {
  const { user } = useSelector((state) => state.auth);

  const { posts } = useSelector((state) => state.feed);

  const dispatch = useDispatch();

   useEffect(() => {
      dispatch(getUserProfile());
    }, [dispatch]);

  return (
    <main className="bg-gray-50 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Profile Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6 transition-all hover:shadow-xl">
          {user ? (
            <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
              <div className="flex-1 text-center sm:text-left">
                <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
                <p className="text-gray-600">{user.email}</p>
                <div className="mt-4">
                  <h2 className="text-lg font-semibold text-gray-900">Bio</h2>
                  <p className="text-gray-600 mt-1">
                    {user.bio || "No bio provided."}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500">
              <p>No user data available. Please log in.</p>
            </div>
          )}
        </div>

        {/* Posts Section */}
        <div className="">
          <ul className="space-y-4">
            <li className="text-gray-500 space-y-5">
             {
              posts.length > 0 ? (
                posts.map((post) => (
                  <li
                    key={post._id}
                    className="p-4 bg-white rounded-lg hover:bg-gray-100 transition-colors shadow-lg "
                  >
                    <p className="text-gray-800">{post.content}</p>
                    <span className="text-sm text-gray-500">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </span>
                  </li>
                ))
              ) : (
                <li className="text-gray-500 text-center">No posts available.</li>
              )}
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}