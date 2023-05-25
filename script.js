const AppCode = 'ni4kbDviF90gEYVZhT5F'
const commentsURL = `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${AppCode}/comments`;
const likesURL = `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${AppCode}/likes`;

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

// Comments API calls

const createComment = async (id, username, comment) => {
  const commentBody = {
    item_id: id,
    username,
    comment,
  };

  const results = await fetch(commentsURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(commentBody),
  });
  return results.status;
};

const getComments = async (id) => {
  const result = await fetch(`${commentsURL}?item_id=${id}`);
  const comments = await result.json();
  if (comments.error?.status === 500 || comments.error?.status === 400) {
    return [];
  }
  return comments;
};

// Likes API's calls

const addLike = async (id) => {
  const likeBody = {
    item_id: id,
  };

  const response = await fetch(likesURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(likeBody),
  });
  return response.status;
};

const getLikes = async () => {
  const result = await fetch(likesURL);
  const likes = await result.json();

  if (likes.error?.status === 500 || likes.error?.status === 400) {
    return [];
  }
  return likes;
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

const likeCounter = (likeObject) => {
  const likesShowNum = likeObject[0].likes;
  return likesShowNum;
};

const reloadWindow = document.getElementById('reload');
  reloadWindow.addEventListener('click', () => {
    window.location.reload();
});

const displayArtworks = async (collectionArray) => {
  const likes = await getLikes();

  const artworksCategory = document.getElementById('artworks-category');
  artworksCategory.innerHTML = `<h3>${collectionArray[0].artist_title}</h3>`

  const artworksList = document.getElementById('artworks-listing');
  collectionArray.forEach((artwork) => {
    const likeObject = likes.filter((like) => like.item_id == artwork.id);
    let numberOfLikes = '';
    if (likeObject.length > 0) {
      numberOfLikes = `${likeCounter(likeObject)} likes`;
    } else {
      numberOfLikes = '0 likes';
    }

    artworksList.insertAdjacentHTML('beforeend', ` 
      <div class="art-items-container">
        <div class="">
          <img src="https://www.artic.edu/iiif/2/${artwork.image_id}/full/200,/0/default.jpg" />
        </div>
        <div>
          <h6>${artwork.id}</h6>
          <h6>${artwork.artist_title}</h6>
          <h4>${artwork.title}</h4>
          <h6>${numberOfLikes}</h6>
        </div>
        <button data-id="${artwork.id}" class="btn-details">Details</button>
        <button like-id="${artwork.id}" class="icon-likes"><i class="fas fa-heart"></i></button>
      </div> 
    `);
    const detailsButton = document.querySelectorAll(`[data-id="${artwork.id}"]`)[0];
    detailsButton.addEventListener('click', (e) => {
      const artworkId = e.target.getAttribute('data-id');
      findArtworkById(artworkId);
    });
    const likeButton = document.querySelectorAll(`[like-id="${artwork.id}"]`)[0];
    likeButton.addEventListener('click', async (e) => {
      const artworkId = e.target.parentElement.getAttribute('like-id');
      const status = await addLike(artworkId);
      const addedLikes = await getLikes();
      const likesObject = addedLikes.filter((like) => like.item_id === artworkId);
      const numberOfLikes = `${likesObject[0].likes} likes`;
      if (status === 201) {
        const likeDisplay = likeButton.previousElementSibling.previousElementSibling.children[3];
        likeDisplay.innerText = numberOfLikes;
      }
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
      <div class="comments-generate"></div>
      <div>
        <button id="close-window" class="btn-close" onclick="closeArtworkDetails()" >Close Window</button>
      </div>
    </div>
  `;
  const commentsContent = document.querySelector('.comments-generate');
  commentsContent.innerHTML=`
    <div class="">
      <div class="">
        <h4 class="">Comments:<span class="comments-counter"></span></h4>
        <div class="comments-data"></div>
      </div>          
    </div>
    <div class="">
    <form id="post-comment" action="">
      <label for="name">Name:</label><br>
      <input id="name" type="text" name="fname" required><br>
      <label for="comment">Comment:</label><br>
      <textarea id="commentText" rows="4" cols="50" name="comment" form="post-comment" required></textarea>
      <input id="comment-btn" class="btn-comment" type="submit" value="Submit">
    </form> 
    </div>
  `;
  const submitComment = document.getElementById('comment-btn');
  submitComment.addEventListener('click', (e) => {
    e.preventDefault();
      const id = artworkObject.data.id;
      const username = document.getElementById('name').value;
      const comment = document.getElementById('commentText').value;
      createComment(id, username, comment)
      document.getElementById('post-comment').reset();
  });
  const commentsData = document.querySelector('.comments-data');
  const id = artworkObject.data.id;
  const comments = await getComments(id)
  comments.forEach((comment) => {
    commentsData.insertAdjacentHTML('afterend', `
      <p class="comments-number"> ** Dated: ${comment.creation_date}  ** By: ${comment.username}</p>
      <p> Comment: ${comment.comment}</p>
      <br>
    `);
  });
}
