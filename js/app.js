let movieSearchQuery = 'venom';
let pageNum = 1;
let apiKey = `00d9cfd2d63643eb08d2411d55b3a170`;
let heading = 'Featured Movies';
let movie_id = `370172`;
let savedMovies = []
let nameInput = document.getElementById('search-field');
nameInput.addEventListener('keyup', (e) => {
	if (e.keyCode === 13) {
		searchInput();
	}
});
// OnLoad
function trendingMovies(cb) {
	fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}`)
		.then((response) => response.json())
		.then((data) => cb(data));
}
//OnSearchgit
function movieSearch(cb) {
	fetch(
		`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${movieSearchQuery}%20&page=${pageNum}&include_adult=false`
	)
		.then((response) => response.json())
		.then((data) => cb(data));
}
//DetailsPage
function movieDetails(cb) {
	fetch(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=${apiKey}&language=en-US`)
		.then((response) => response.json())
		.then((data) => cb(data));
}
function movieVideos(cb) {
	fetch(`https://api.themoviedb.org/3/movie/${movie_id}/videos?api_key=${apiKey}&language=en-US`)
		.then((response) => response.json())
		.then((data) => cb(data));
}
function movieCredits(cb) {
	fetch(`https://api.themoviedb.org/3/movie/${movie_id}/credits?api_key=${apiKey}&language=en-US`)
		.then((response) => response.json())
		.then((data) => cb(data));
}
function releaseDate(cb) {
	fetch(`https://api.themoviedb.org/3/movie/${movie_id}/release_dates?api_key=${apiKey}`)
		.then((response) => response.json())
		.then((data) => cb(data));
}
function similarMovies(cb) {
	fetch(`https://api.themoviedb.org/3/movie/${movie_id}/similar?api_key=${apiKey}&language=en-US&page=1`)
		.then((response) => response.json())
		.then((data) => cb(data));
}
function movieReviews(cb) {
	fetch(`https://api.themoviedb.org/3/movie/${movie_id}/reviews?api_key=${apiKey}&language=en-US&page=1`)
		.then((response) => response.json())
		.then((data) => cb(data));
}
movieDetails(getApi);
// movieReviews(getApi)
movieVideos(getApi);
// movieCredits(getApi)
// releaseDate(getApi)
// similarMovies(getApi)
function getApi(data) {
	console.log(data);
}
trendingMovies(render);
function render(data) {
	if (data.results == null) {
		document.getElementById('movieCards').innerHTML = `<p id="noResults">Your query returned 0 results</p>`;
		return;
	}
	console.log(data);
	let imageSource = ``;
	let trendingHTML = `<div class="android-more-section
    ">
    <div class="android-section-title mdl-typography--display-1-color-contrast center">${heading}</div>
    <div class="android-card-container mdl-grid">`;
	for (let i = 0; i < 20; i++) {
		if (data.results[i].poster_path === null) {
			imageSource = 'default-movie.png';
		} else {
			imageSource = `https://image.tmdb.org/t/p/w500/${data.results[i].poster_path}`;
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
            <a class="android-link mdl-button mdl-js-button mdl-typography--text-uppercase" href="#top" onclick="viewDetails(${data
        .results[i].id})">
              More Details
              </a>
              <i class="fa-solid fa-heart" onclick = "saveMovie(${data.results[i].id})"></i>
              </div>
              </div>`;
  }
  document.getElementById('movieCards').innerHTML = trendingHTML;
}
function viewDetails(id) {
	movie_id = id;
	movieDetails(detailsRender);
}
function detailsRender(data) {
	console.log('true');
	console.log(data);
	let detailsHTML = `<div class="android-wear-section" style = "background: url('https://image.tmdb.org/t/p/w500${data.backdrop_path}'); background-size: cover; background-position: center;">
  <div class="mask"></div>
  <div class="android-wear-band">
  <div id="trailer"></div>
  <div class="android-wear-band-text">
  <div class="mdl-typography--display-2 mdl-typography--font-thin">${data.original_title}</div>
  <div class="mdl-typography--display-1 mdl-typography--font-thin">Overview</div>
  
  <p class="mdl-typography--headline mdl-typography--font-thin">
  ${data.overview}
  </p>
  <p>
  
  </p>
  <div class="mdl-typography--display-1 mdl-typography--font-thin">Your Rating</div>
  <p>
  
  <i class="far fa-star liked"></i>
  <i class="far fa-star liked"></i>
  <i class="far fa-star liked"></i>
  <i class="far fa-star"></i>
  <i class="far fa-star"></i>
  </p>
  </div>
  </div>
  </div>
  </div>`;
  document.getElementById('movieCards').innerHTML = detailsHTML;
  movieVideos(insertTrailer)
}
function insertTrailer(data) {
	let trailerHTML = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${data.results[0]
		.key}" title="YouTube video player"
  frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowfullscreen></iframe>`;
	document.getElementById('trailer').innerHTML = trailerHTML;
}
function searchInput() {
	heading = 'Search Results';
	movieSearchQuery = document.getElementById('search-field').value.trim();
	movieSearch(render);
}
function saveMovie(id) {
  if (savedMovies.length == 0) {
    savedMovies.push(id)
  }
  else {
    for (let movie of savedMovies) {
      if (movie == id) {
        return
      }
    }
    savedMovies.push(id)
  }
  console.log(savedMovies)
}
// show and hide back to top button
window.onscroll = function() {
	if (scrollY >= 1000) {
		document.getElementById('view-source').style.visibility = 'visible';
		document.getElementById('view-source').style.opacity = 1;
	} else {
		document.getElementById('view-source').style.visibility = 'hidden';
		document.getElementById('view-source').style.opacity = 0;
	}
};
