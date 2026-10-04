export const formatDuration = (type, movie) => {
  if (!movie) return "Không rõ";

  if (type === "movie" && movie.runtime > 0) {
    return `${movie.runtime} phút`;
  } 
  
  if (type === "tv" && Array.isArray(movie.episode_run_time)) {
    const times = movie.episode_run_time.filter((t) => t > 0);
    if (times.length === 1) return `${times[0]} phút / tập`;
    if (times.length > 1) {
      return `${Math.min(...times)}–${Math.max(...times)} phút / tập`;
    }
  }

  return "Không rõ";
};