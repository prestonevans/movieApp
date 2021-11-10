let movieSearchQuery = "venom"
let pageNum = 1
let apiKey = `00d9cfd2d63643eb08d2411d55b3a170`
let heading = "Featured Movies"
function movieSearch(cb) {
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${movieSearchQuery}%20&page=${pageNum}&include_adult=false`)
        .then(response => response.json())
        .then(data => cb(data));
}
function trendingMovies(cb) {
    fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}`)
        .then(response => response.json())
        .then(data => cb(data));
}
// function findByID(cb) {
//     fetch(`https://api.themoviedb.org/3/search/movie?api_key=00d9cfd2d63643eb08d2411d55b3a170&language=en-US&query=${movieSearch}%20&page=1&include_adult=false`)
//         .then(response => response.json())
//         .then(data => cb(data));
// }
// function popularMovies(cb) {
//     fetch(`https://api.themoviedb.org/3/search/movie?api_key=00d9cfd2d63643eb08d2411d55b3a170&language=en-US&query=${movieSearch}%20&page=1&include_adult=false`)
//         .then(response => response.json())
//         .then(data => cb(data));
// }
// function movieGenres(cb) {
//     fetch(`https://api.themoviedb.org/3/search/movie?api_key=00d9cfd2d63643eb08d2411d55b3a170&language=en-US&query=${movieSearch}%20&page=1&include_adult=false`)
//         .then(response => response.json())
//         .then(data => cb(data));
// }
// movieSearch(getApi)
// trendingMovies(getApi)
function getApi(data) {
    console.log(data)
}
trendingMovies(render)
function render(data) {
    let imageSource = ``
    let trendingHTML = `<div class="android-more-section
    ">
    <div class="android-section-title mdl-typography--display-1-color-contrast center">${heading}</div>
    <div class="android-card-container mdl-grid">`
    for (let i = 0; i < 20; i++) {
        if (data.results[i].poster_path === null) {
            imageSource = 'default-movie.png'
        }
        else {
            imageSource = `https://image.tmdb.org/t/p/w500/${data.results[i].poster_path}`
        }
        trendingHTML += `
        
          <div class="mdl-cell mdl-cell--3-col mdl-cell--4-col-tablet mdl-cell--4-col-phone mdl-card mdl-shadow--3dp">
            <div class="mdl-card__media">
            <img src="${imageSource}">
            </div>
            <div class="mdl-card__title">
              <h4 class="mdl-card__title-text">${data.results[i].original_title}</h4>
            </div>
            <div class="mdl-card__supporting-text">
              <span class="mdl-typography--font-light mdl-typography--subhead">${data.results[i].overview}</span>
            </div>
            <div class="mdl-card__actions">
              <a class="android-link mdl-button mdl-js-button mdl-typography--text-uppercase" href="">
                More Details
              </a>
            </div>
          </div>`
    }
    document.getElementById("movieCards").innerHTML = trendingHTML
}

function searchInput() {
    heading = "Search Results"
    movieSearchQuery = document.getElementById("search-field").value.trim()
    movieSearch(render)
}