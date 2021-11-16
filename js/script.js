$('#search-field').keyup(function(event) {
	if (event.keyCode === 13) {
		$('#search').click();
	}
});

$('#search').click(function() {
	window.location.href = 'search.html';
});

function saveID(id) {
	localStorage.setItem('MOVIEID', id);
}


// let nameInput = document.getElementById('search-field');
// nameInput.addEventListener('keyup', (e) => {
//   if (e.keyCode === 13) {

//     $("#search").click();
//   }
// });
// $("#search").click(function () {
//   alert("Button clicked");
// });
function resetFeatured() {
	endlessScroll = true;
	currentRender = `trending`;
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
	if (document.getElementById('search-field').value.trim() != '') {
		movieSearchQuery = document.getElementById('search-field').value.trim();
	}
	movieSearch(render);
}
function saveMovie(id) {
	if (savedMovies.length == 0) {
		savedMovies.push({ id });
	} else {
		for (let movie of savedMovies) {
			if (movie.id == id) {
				return;
			}
		}
		savedMovies.push({ id });
	}
	console.log(savedMovies);
	save();
}
function viewSaved() {
	heading = 'Saved Movies';
	trendingHTML = `<div class="android-more-section
  ">
  <div class="android-section-title mdl-typography--display-1-color-contrast center">${heading}</div>
  <div class="android-card-container mdl-grid">`;
	savedAPICall();
}
function deleteMovie(id) {
	let index = savedMovies.indexOf(id);
	savedMovies.splice(index, 1);
	trendingHTML = `<div class="android-more-section
  ">
  <div class="android-section-title mdl-typography--display-1-color-contrast center">${heading}</div>
  <div class="android-card-container mdl-grid">`;
	save();
	savedAPICall();
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
//Endless Scroll
$(function() {
	let $win = $(window);
	$win.scroll(function() {
		if ($win.height() + $win.scrollTop() == $(document).height()) {
			loadMore();
			// console.log("LoadMore")
			// console.log(pageNum)
			// console.log(endlessScroll)
			// console.log(currentRender)
		}
	});
});
