let nameInput = document.getElementById('search-field');
nameInput.addEventListener('keyup', (e) => {
	if (e.keyCode === 13) {
		searchInput();
	}
});
trendingMovies(render);
function resetFeatured() {
	currentRender = `featured`;
	heading = 'Featured Movies';
	trendingHTML = `<div class="android-more-section
  ">
  <div class="android-section-title mdl-typography--display-1-color-contrast center">${heading}</div>
  <div class="android-card-container mdl-grid">`;
	pageNum = 1;
	movieSearchQuery = document.getElementById('search-field').value.trim();
	trendingMovies(render);
}
function searchInput() {
	currentRender = `search`;
	heading = 'Search Results';
	trendingHTML = `<div class="android-more-section
  ">
  <div class="android-section-title mdl-typography--display-1-color-contrast center">${heading}</div>
  <div class="android-card-container mdl-grid">`;
	pageNum = 1;
	movieSearchQuery = document.getElementById('search-field').value.trim();
	movieSearch(render);
}
function saveMovie(id) {
	if (savedMovies.length == 0) {
		savedMovies.push(id);
	} else {
		for (let movie of savedMovies) {
			if (movie == id) {
				return;
			}
		}
		savedMovies.push(id);
	}
	console.log(savedMovies);
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

$(function() {
	let $win = $(window);
	$win.scroll(function() {
		if ($win.height() + $win.scrollTop() == $(document).height()) {
			loadMore();
		}
	});
});
