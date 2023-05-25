// Artworks API calls

const getArtworks = async (searchString) => {
  const URL = `https://api.artic.edu/api/v1/artworks/search?q=${searchString}&size=12&fields=id,title,image_id,artist_title`;
  const results = await fetch(`${URL}`);
  const artworks = await results.json();
  displayArtworks(artworks.data);
};

// Search bar

document.getElementById('search-bar').addEventListener('submit', (e) => {
  e.preventDefault();
  searchString = document.getElementById('search-category').value;
  searchString.toLowerCase()
  getArtworks(searchString);
  const landingPage = document.getElementById('museum-info');
  landingPage.style.display = 'none';
});

// Display Collection

const countArtworks = () => {
  const artworksCount = document.getElementById('artworks-listing').children.length;
  return artworksCount;
};

const updateArtworksCount = (count) => {
  const artworksTitle = document.getElementById('by-category-works');
  artworksTitle.innerText = `Artworks in this Category: (${count})`;
};

const displayArtworks = async (collectionArray) => {
  const artworksCategory = document.getElementById('artworks-category');
  artworksCategory.innerHTML = `<h3>${collectionArray[0].artist_title}</h3>`

  const artworksList = document.getElementById('artworks-listing');
  collectionArray.forEach((artwork) => {
    artworksList.insertAdjacentHTML('beforeend', ` 
      <div class="art-items-container">
        <div class="">
          <img src="https://www.artic.edu/iiif/2/${artwork.image_id}/full/200,/0/default.jpg" />
        </div>
        <div>
          <h6>${artwork.id}</h6>
          <h6>${artwork.artist_title}</h6>
          <h4>${artwork.title}</h4>
        </div>
      </div> 
    `);
  });
  const count = countArtworks();
  updateArtworksCount(count);
};
