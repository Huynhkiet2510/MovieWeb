const MovieDetailSkeleton = () => {
  return (
    <div className="animate-pulse">

      <div className="relative w-full h-[600px] bg-gradient-to-b from-gray-700 to-[#0f1015]" />


      <div className="relative flex flex-col md:flex-row -mt-50 px-6 md:px-10 gap-6 z-20">

        <div className="w-[260px] h-[360px] bg-gray-600 rounded-2xl shadow-xl shrink-0" />


        <div className="flex-1 bg-[#2b2c38] rounded-2xl p-6 md:p-10 space-y-5">

          <div className="h-8 w-2/3 bg-gray-600 rounded" />

          <div className="space-y-3">
            <div className="h-4 w-1/3 bg-gray-700 rounded" />
            <div className="h-4 w-1/4 bg-gray-700 rounded" />
            <div className="h-4 w-2/5 bg-gray-700 rounded" />
            <div className="h-4 w-1/2 bg-gray-700 rounded" />
            <div className="h-4 w-2/3 bg-gray-700 rounded" />
          </div>

          <div className="space-y-2 mt-4">
            <div className="h-3 w-full bg-gray-700 rounded" />
            <div className="h-3 w-full bg-gray-700 rounded" />
            <div className="h-3 w-5/6 bg-gray-700 rounded" />
          </div>

          <div className="flex gap-4 mt-6">
            <div className="h-10 w-40 bg-gray-600 rounded-3xl" />
            <div className="h-10 w-20 bg-gray-600 rounded-lg" />
            <div className="h-10 w-20 bg-gray-600 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieDetailSkeleton
