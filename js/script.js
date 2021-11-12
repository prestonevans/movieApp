
let nameInput = document.getElementById('search-field');
nameInput.addEventListener('keyup', (e) => {
  if (e.keyCode === 13) {
    searchInput();
  }
});
trendingMovies(render);

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
window.onscroll = function () {
  if (scrollY >= 1000) {
    document.getElementById('view-source').style.visibility = 'visible';
    document.getElementById('view-source').style.opacity = 1;
  } else {
    document.getElementById('view-source').style.visibility = 'hidden';
    document.getElementById('view-source').style.opacity = 0;
  }
};
