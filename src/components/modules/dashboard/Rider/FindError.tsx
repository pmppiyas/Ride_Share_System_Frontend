

export default function FindError() {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
      <div className="flex items-center gap-2">
        <div className="bg-red-500 rounded-full p-1">
          <span className="text-white text-xs">❌</span>
        </div>
        <div>
          <h4 className="font-medium text-red-800">Connection Error</h4>
          <p className="text-red-600 text-sm mt-1">
            Failed to load driver data from server. Please refresh the page.
          </p>
        </div>
      </div>
    </div>
  )
}
