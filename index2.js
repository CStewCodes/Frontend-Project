//initialize map!
var map = L.map('map').setView([38.66, -99.31], 3);
//add tile layer, its what gives the map it's look. We use OpenStreetMap here, and any time we add a tile layer we need to provide attribution
var tileLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

//create function to give lat&&long when you click on that point in the map
function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(map);
}
//call the function
map.on('click', onMapClick);

//the

// Creates a new map marker for a given location
function createMapMarker(map, location) {
    return new L.marker(location).addTo(map);
  }
  
  // Creates a popup for a given map marker
  function markerPopUp(marker, content) {
    return marker.bindPopup(content);
  }
  
  // Creates a new card with given content
  function createNewCard(content) {
    // Check if another card is active and hide it
    const activeCard = document.querySelector('.active-card');
    if (activeCard) {
      activeCard.classList.remove('active-card');
    }
  
    // Create new card
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = content;
  
    // Add click listener to card to toggle active state
    card.addEventListener('click', () => {
      card.classList.toggle('active-card');
    });
  
    // Add card to DOM
    const cardsContainer = document.querySelector('.cards-container');
    cardsContainer.appendChild(card);
  }
  
  // Scans all story content for image sources and creates markers, popups, and cards for each
  function allStoryContent(map) {
    const storyContent = document.querySelectorAll('.story-content');
  
    for (let i = 0; i < storyContent.length; i++) {
      const images = storyContent[i].querySelectorAll('img.source-image');
  
      for (let j = 0; j < images.length; j++) {
        const location = [Number(images[j].dataset.lat), Number(images[j].dataset.lng)];
        const marker = createMapMarker(map, location);
        const content = `<img src="${images[j].src}" alt="Story Image" /><p>${storyContent[i].textContent}</p>`;
        markerPopUp(marker, content);
  
        images[j].addEventListener('click', () => {
          createNewCard(content);
        });
      }
    }
  }
  // Call the function to handle all the story content
  allStoryContent();