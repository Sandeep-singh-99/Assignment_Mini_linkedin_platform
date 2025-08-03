import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createFeed } from "../redux/slice/feedSlice";

export default function FeedForm() {
  const [content, setContent] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createFeed({ content }));
    setContent("");
  };

  return (
    <div className="flex flex-col min-w-lg bg-white m-4 rounded-2xl shadow-lg p-6">
      <div className="flex flex-col">
        <h2 className="text-lg font-semibold mb-4">Create Post</h2>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <textarea
            placeholder="Write your post here..."
            rows={4}
            value={content}
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setContent(e.target.value)}
          />
          <button
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
            type="submit"
          >
            Create Post
          </button>
        </form>
      </div>
    </div>
  );
}
