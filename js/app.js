let movieSearchQuery = "No Time To Die"
let pageNum = 1
function movieSearch(cb) {
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=00d9cfd2d63643eb08d2411d55b3a170&language=en-US&query=${movieSearchQuery}%20&page=${pageNum}&include_adult=false`)
        .then(response => response.json())
        .then(data => cb(data));
}
function trendingMovies(cb) {
    fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=00d9cfd2d63643eb08d2411d55b3a170`)
        .then(response => response.json())
        .then(data => cb(data));
}
function findByID(cb) {
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=00d9cfd2d63643eb08d2411d55b3a170&language=en-US&query=${movieSearch}%20&page=1&include_adult=false`)
        .then(response => response.json())
        .then(data => cb(data));
}
function popularMovies(cb) {
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=00d9cfd2d63643eb08d2411d55b3a170&language=en-US&query=${movieSearch}%20&page=1&include_adult=false`)
        .then(response => response.json())
        .then(data => cb(data));
}
function movieGenres(cb) {
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=00d9cfd2d63643eb08d2411d55b3a170&language=en-US&query=${movieSearch}%20&page=1&include_adult=false`)
        .then(response => response.json())
        .then(data => cb(data));
}
movieSearch(getApi)
trendingMovies(getApi)
function getApi(data) {
    console.log(data)
}