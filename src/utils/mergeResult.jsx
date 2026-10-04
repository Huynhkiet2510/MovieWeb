export const mergeResult = (movieRes, tvRes) => {
  const combined = [
    ...movieRes.data.results.map(i => ({ ...i, media_type: "movie" })),
    ...tvRes.data.results.map(i => ({ ...i, media_type: "tv" })),
  ];

  combined.sort((a, b) => b.popularity - a.popularity);

  return {
    results: combined,
    totalPages: Math.max(
      movieRes.data.total_pages,
      tvRes.data.total_pages
    ),
  };
};