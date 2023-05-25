// Artworks API calls

const getArtworks = async (searchString) => {
  const URL = `https://api.artic.edu/api/v1/artworks/search?q=${searchString}&size=12&fields=id,title,image_id,artist_title`;
  const results = await fetch(`${URL}`);
  const artworks = await results.json();
  console.log(artworks.data);
};

// Search bar

document.getElementById('search-bar').addEventListener('submit', (e) => {
  e.preventDefault();
  searchString = document.getElementById('search-category').value;
  searchString.toLowerCase()
  getArtworks(searchString);
  console.log(searchString);
});
