export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-800 via-dark-700 to-dark-800 flex items-center justify-center">
      <div className="text-center space-y-6">
        {/* Animated Logo */}
        <div className="flex justify-center">
          <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-3xl flex items-center justify-center shadow-2xl shadow-primary/30 animate-pulse">
            <span className="text-4xl">🚀</span>
          </div>
        </div>

        {/* Spinner */}
        <div className="flex justify-center">
          <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
        </div>

        {/* Loading Text */}
        <div className="space-y-2">
          <p className="text-lg font-semibold text-white animate-pulse">
            Loading...
          </p>
          <p className="text-sm text-gray-400">
            Please wait...
          </p>
        </div>
      </div>
    </div>
  );
}
