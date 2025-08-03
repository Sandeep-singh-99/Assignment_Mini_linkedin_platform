export default function Feed({ name, content, dateStamp }) {
  return (
    <div className=" min-w-lg bg-white m-4 rounded-2xl shadow-lg p-6">
      <div className="flex flex-col border-gray-200 py-4 ">
        <div className="flex items-center justify-between gap-2 mb-2">
          <h3 className="text-lg font-semibold">{name}</h3>
          <span className="text-gray-500 text-sm">
            {new Date(dateStamp).toLocaleDateString()}
          </span>
        </div>
        <p className="text-gray-700">{content}</p>
      </div>
    </div>
  );
}
