// Artworks API calls

const getArtworks = async (searchString) => {
  const URL = `https://api.artic.edu/api/v1/artworks/search?q=${searchString}&size=12&fields=id,title,image_id,artist_title`;
  const results = await fetch(`${URL}`);
  const artworks = await results.json();
  displayArtworks(artworks.data);
};

const findArtworkById = async (id) => {
  const result = await fetch(`https://api.artic.edu/api/v1/artworks/${id}`);
  const artwork = await result.json();
  displayArtworkDetails(artwork)
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

const reloadWindow = document.getElementById('reload');
  reloadWindow.addEventListener('click', () => {
    window.location.reload();
});

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
        <button data-id="${artwork.id}" class="btn-details">Details</button>
      </div> 
    `);
    const detailsButton = document.querySelectorAll(`[data-id="${artwork.id}"]`)[0];
    detailsButton.addEventListener('click', (e) => {
      const artworkId = e.target.getAttribute('data-id');
      findArtworkById(artworkId);
    });
  });
  const count = countArtworks();
  updateArtworksCount(count);
};

// Display Artwork Details

const closeArtworkDetails = () => {
  const popup = document.getElementById('artwork-details');
  popup.style.display = 'none';
};

const displayArtworkDetails = async (artworkObject) => { 
  const artworkInfo = document.getElementById('artwork-details');
  console.log(artworkObject.data.image_id)
  artworkInfo.classList.add("popup-container")
  artworkInfo.innerHTML=` 
    <div class="artwork-details-container">
      <div class="">
        <img src="https://www.artwork.edu/iiif/2/${artworkObject.data.image_id}/full/200,/0/default.jpg" />
      </div>
      <div>
        <h6>${artworkObject.data.id}</h6>
        <h6>Artist: <span>${artworkObject.data.artist_title}</span></h6>
        <h4>${artworkObject.data.title}</h4>
        <h6>Artwork Type: <span>${artworkObject.data.artwork_type_title}</span></h6>
        <h6>Medium: <span>${artworkObject.data.medium_display}</span></h6>
        <h6>Dimensions: <span>${artworkObject.data.dimensions}</span></h6>
        <h6>Date: <span>${artworkObject.data.date_display}</span></h6>
        <h6>Place of Origin: <span>${artworkObject.data.place_of_origin}</span></h6>
        <h6>Department Title: <span>${artworkObject.data.department_title}</span></h6>
      </div>
      <div>
        <button id="close-window" class="btn-close" onclick="closeArtworkDetails()" >Close Window</button>
      </div>
    </div>
  `;
}
