export const APIKEY="b4d6ba01099d88e9c7e1d9f4609fe685";

const requests={
    trending:`https://api.themoviedb.org/3/trending/all/week?api_key=${APIKEY}&language=en-US`,
    netflixOriginals:`https://api.themoviedb.org/3/discover/tv?api_key=${APIKEY}&with_networks=213`,
    topRated:`https://api.themoviedb.org/3/movie/top_rated?api_key=${APIKEY}&language=en-US&page=1`,
    actionMovies:`https://api.themoviedb.org/3/discover/movie?api_key=${APIKEY}&with_genres=28`,
    comedyMovies:`https://api.themoviedb.org/3/discover/movie?api_key=${APIKEY}&with_genres=35`,
    horrorMovies:`https://api.themoviedb.org/3/discover/movie?api_key=${APIKEY}&with_genres=27`,
    docuMovies:`https://api.themoviedb.org/3/discover/movie?api_key=${APIKEY}&with_genres=99`,
    romanticMovies:`https://api.themoviedb.org/3/discover/movie?api_key=${APIKEY}&with_genres=10749`,
}
export default requests;