const MediaCard = ({ media }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-gray-800">{media.name}</h3>
        <span className="text-sm text-gray-500">{media.category}</span>
      </div>
      
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="bg-blue-50 p-3 rounded-lg">
          <p className="text-sm text-gray-600">Followers</p>
          <p className="text-2xl font-bold text-blue-600">{media.metrics?.followers?.toLocaleString() || '0'}</p>
        </div>
        <div className="bg-green-50 p-3 rounded-lg">
          <p className="text-sm text-gray-600">Engagement</p>
          <p className="text-2xl font-bold text-green-600">{media.metrics?.engagement?.toLocaleString() || '0'}%</p>
        </div>
      </div>

      <div className="mt-4">
        <h4 className="text-sm font-semibold text-gray-700">Description</h4>
        <p className="mt-2 text-sm text-gray-600">{media.description}</p>
      </div>

      <div className="mt-4">
        <a 
          href={media.website} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          Visit Website →
        </a>
      </div>
    </div>
  );
};

export default MediaCard; 