export default function Feed({ name, content, dateStamp }) {
  return (
    <div className="bg-white m-4 rounded-xl shadow-md p-6 transition-all duration-200 hover:shadow-lg">
      <div className="flex flex-col">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
          <span className="text-gray-500 text-sm">
            {new Date(dateStamp).toLocaleString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
              hour: 'numeric',
              minute: '2-digit',
              hour12: true,
            })}
          </span>
        </div>
        <p className="text-gray-700 leading-relaxed">{content}</p>
      </div>
    </div>
  );
}