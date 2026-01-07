const MovieDetailSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="relative w-full h-[600px] bg-card-skeleton/30 " />

      <div className="relative flex flex-col items-center md:items-start md:flex-row -mt-50 px-6 md:px-10 gap-6 z-20">
        <div className="w-[260px] h-[360px] bg-card-skeleton rounded-2xl shadow-xl shrink-0" />

        <div className="flex-1 bg-card-bg rounded-2xl p-6 md:p-10 space-y-5 border border-border">
          <div className="h-8 w-2/3 bg-card-skeleton rounded" />

          <div className="space-y-3">
            <div className="h-4 w-1/3 bg-card-skeleton/80 rounded" />
            <div className="h-4 w-1/4 bg-card-skeleton/80 rounded" />
            <div className="h-4 w-2/5 bg-card-skeleton/80 rounded" />
            <div className="h-4 w-1/2 bg-card-skeleton/80 rounded" />
            <div className="h-4 w-2/3 bg-card-skeleton/80 rounded" />
          </div>

          <div className="space-y-2 mt-4">
            <div className="h-3 w-full bg-card-skeleton/50 rounded" />
            <div className="h-3 w-full bg-card-skeleton/50 rounded" />
            <div className="h-3 w-5/6 bg-card-skeleton/50 rounded" />
          </div>

          <div className="flex gap-4 mt-6">
            <div className="h-10 w-40 bg-card-skeleton rounded-3xl" />
            <div className="h-10 w-20 bg-card-skeleton rounded-lg" />
            <div className="h-10 w-20 bg-card-skeleton rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieDetailSkeleton