const MediaCard = ({ media }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-gray-800">{media.name}</h3>
        <span className="text-sm text-gray-500">{media.category}</span>
      </div>
      
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="bg-blue-50 p-3 rounded-lg">
          <p className="text-sm text-gray-600">Views</p>
          <p className="text-2xl font-bold text-blue-600">{media.views.toLocaleString()}</p>
        </div>
        <div className="bg-green-50 p-3 rounded-lg">
          <p className="text-sm text-gray-600">Shares</p>
          <p className="text-2xl font-bold text-green-600">{media.shares.toLocaleString()}</p>
        </div>
      </div>

      <div className="mt-4">
        <h4 className="text-sm font-semibold text-gray-700">Latest Articles</h4>
        <ul className="mt-2 space-y-2">
          {media.articles?.slice(0, 2).map((article, index) => (
            <li key={index} className="text-sm text-gray-600 hover:text-blue-600">
              {article.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MediaCard; 