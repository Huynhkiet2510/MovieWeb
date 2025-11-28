# Movie Web (React + Vite)

A movie web application built with **React** and **Vite**, powered by the **TMDB API**.

## Features

* Filter popular TV shows and movies, top-rated, by genre, and by country.
* Search for movies by title.
* View detailed movie information.
* Save favorite movies or tv shows.
* Save a watchlist movies or tv shows.
* View user profile.
* Rate movies or tv shows.

## Setup

1. **Clone the repository:**

```bash
git clone <your-repo-url>
cd <your-repo-folder>
```

2. **Install dependencies:**

```bash
npm install
```

3. **Create a `.env` file based on `.env.example` and add your TMDB API key:**

```env
VITE_TMDB_TOKEN="your_api_key_here"
```

> ⚠️ **Important:** Do not commit your `.env` file to GitHub. It is ignored in `.gitignore`.

4. **Run the app:**

```bash
npm run dev
```

5. **Open in browser:**
   The app will usually be available at [http://localhost:5173](http://localhost:5173)

## Notes

* You need a TMDB account to get an API key: [TMDB API](https://www.themoviedb.org/documentation/api)
* The `.env.example` file is provided so you know what variables to set.

## Technologies Used

* React
* Vite
* Axios
* Tailwind CSS
* React Router DOM
* React Icons

## License

MIT License
