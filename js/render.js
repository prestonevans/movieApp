let trendingHTML = `<div class="android-more-section
">
<div class="android-section-title mdl-typography--display-1-color-contrast center">${heading}</div>
<div class="android-card-container mdl-grid">`;
function render(data) {
	endlessScroll = true;
	if (data.results == null) {
		document.getElementById('movieCards').innerHTML = `<p id="noResults">Your query returned 0 results</p>`;
		return;
	}
	let imageSource = ``;
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
              <div class="mask2"></div>
                <span class="mdl-typography--font-light mdl-typography--subhead">${data.results[i].overview}</span>
              </div>
              <div class="mdl-card__actions">
                <a class="android-link mdl-button mdl-js-button mdl-typography--text-uppercase" href="details.html" onclick="saveID(${data
					.results[i].id})">
                  More Details
                </a>
                <i class="fa-solid fa-heart" onclick="saveMovie(${data.results[i].id})"></i>
              </div>
            </div>
            `;
	}
	document.getElementById('movieCards').innerHTML = trendingHTML;
}
function loadMore() {
	if (endlessScroll == true) {
		pageNum += 1;
		if (currentRender == 'trending') {
			trendingMovies(render);
		} else if (currentRender == 'search') {
			movieSearch(render);
		}
	}
}
function viewDetails() {
	movie_id = localStorage.getItem('MOVIEID');
	movieDetails(detailsRender);
}
function detailsRender(data) {
	endlessScroll = false;
	let detailsHTML = `<div class="android-wear-section" style = "background: url('https://image.tmdb.org/t/p/w500${data.backdrop_path}'); background-size: cover; background-position: center;">
    <div class="mask"></div>
    <div class="android-wear-band">
    <div id="trailer"></div>
      <div class="android-wear-band-text">
        <div class="mdl-typography--display-2 mdl-typography--font-thin">${data.original_title}</div>
        <div class="mdl-typography--display-1 mdl-typography--font-thin">Overview</div>
  
        <p id='overview'class="mdl-typography--headline mdl-typography--font-thin">
        ${data.overview}
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
</div>
<p id='commentTitle' class="mdl-typography--headline mdl-typography--font-thin">Comments</p>
<form id='comment'>
  <div class="mdl-textfield mdl-js-textfield">
    <input class="mdl-textfield__input" type="text" id="sample1" placeholder='Add a comment'>
    <input type="submit" value="Send">
  </div>
  </form>
  <div class='commentBox'>
    <p>testing this stuff adf sasfs fas fas f asdf as fas fa sdf asf as dfa sdf asf a sfa sf asdf asd fas df asdf asf as fas dfas dfa sdf s</p>
    <p>testing this stuff adf sasfs fas fas f asdf as fas fa sdf asf as dfa sdf asf a sfa sf asdf asd fas df asdf asf as fas dfas dfa sdf s</p>
    <p>testing this stuff adf sasfs fas fas f asdf as fas fa sdf asf as dfa sdf asf a sfa sf asdf asd fas df asdf asf as fas dfas dfa sdf s</p>
    <p>testing this stuff adf sasfs fas fas f asdf as fas fa sdf asf as dfa sdf asf a sfa sf asdf asd fas df asdf asf as fas dfas dfa sdf s</p>
  </div>`;
	document.getElementById('movieCards').innerHTML = detailsHTML;
	movieVideos(insertTrailer);
	document.querySelector('form').addEventListener('submit', (e) => {
		e.preventDefault();
		const commentBox = document.querySelector('.commentBox');
		const input = document.querySelector('.mdl-js-textfield input');
		const p = document.createElement('p');
		p.innerHTML = input.value;
		commentBox.append(p);
	});
}
function insertTrailer(data) {
	let trailerHTML = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${data.results[0]
		.key}" title="YouTube video player"
    frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen></iframe>`;
	document.getElementById('trailer').innerHTML = trailerHTML;
}

function savedAPICall() {
	endlessScroll = false;
	let imageSource = ``;
	// fix for last hearted movie not being deleted
	if (savedMovies.length === 0) {
		document.getElementById('movieCards').innerHTML = '';
		return;
	}
	for (let i = 0; i < savedMovies.length; i++) {
		currentSaved = savedMovies[i].id;
		savedMoviesRetrieve(savedMoviesRender);
	}
}
let savedHTML = '';
function savedMoviesRender(data) {
	let imageSource = '';
	if (data.poster_path === null) {
		imageSource = 'default-movie.png';
	} else {
		imageSource = `https://image.tmdb.org/t/p/w500/${data.poster_path}`;
	}
	trendingHTML += `
          <div class="mdl-cell mdl-cell--3-col mdl-cell--4-col-tablet mdl-cell--4-col-phone mdl-card mdl-shadow--3dp">
            <div class="mdl-card__media">
            <img src="${imageSource}">
            </div>
            <div class="mdl-card__title">
              <h4 class="mdl-card__title-text">${data.original_title}</h4>
            </div>
            <div class="mdl-card__supporting-text">
              <div class='mask2'></div>
              <span class="mdl-typography--font-light mdl-typography--subhead">${data.overview}</span>
            </div>
            <div class="mdl-card__actions">
              <a class="android-link mdl-button mdl-js-button mdl-typography--text-uppercase" href="details.html" onclick="saveID(${data.id})">
                More Details
              </a>
              <i class="fa fa-trash-alt" onclick="deleteMovie(${data.id})"></i>
            </div>
          </div>
          `;
	document.getElementById('movieCards').innerHTML = trendingHTML;
}
