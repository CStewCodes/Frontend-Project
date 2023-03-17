//initalize the map!
var map = L.map('map').setView([38.66, -99.31], 3);
//add tile layer, its what gives the map it's look. We use OpenStreetMap here, and any time we add a tile layer we need to provide attribution

var tileLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

//declaring a variable that acts like the data we might get back from DVIDS API if it worked.
let imgMetadata = [
   {
   imgID: 1,
   Headline: "Farewell to Germany",
   Description: "A CH-47F Chinook helicopter crew assigned to the 101st Combat Aviation Brigade, 101st Airborne Division (Air Assault) flies a U.S. flag during their last flight over Illesheim, Germany on the way to port in Rotterdam, the Netherlands, March 15, 2021. The 101st has been in Europe for nine months supporting Atlantic Resolve, an initiave meant to foster interoperability between NATO ally and partner nations. (U.S. Army National Guard photo by Staff Sgt. Garrett L. Dipuma)", 
   City: "Illesheim",
   State: "",
   CountryRegion: "Germany",
   ISOCountryCode: "DE",
   Creator: "Staff Sgt. Garrett L. Dipuma",
   DateCreated: "2021-03-15",
   imgLink: "https://d1ldvf68ux039x.cloudfront.net/thumbs/photos/2103/6559671/1000w_q95.jpg",
   DVIDSLink: "https://www.dvidshub.net/image/6559671/farewell-germany",
   latlng: [50, 8.60],
   },
   {
   imgID: 2,
   Headline: "Mobilization to Europe",
   Description: "Soldiers from the 82nd Airborne Division and the 18th Airborne Corps file onto a U.S. Air Force  C-17 Globemaster III aircraft at Fort Bragg, North Carolina, Feb. 3, 2022. The Soldiers are deploying to Eastern Europe as directed by the U.S. Secretary of Defense to assure the United States NATO allies and deter Russian aggression.", 
   City: "Fort Bragg",
   State: "North Carolina",
   CountryRegion: "United States",
   ISOCountryCode: "US",
   Creator: "XVIII Airborne Corps Public Affairs",
   DateCreated: "2022-02-07",
   imgLink: "https://d1ldvf68ux039x.cloudfront.net/thumbs/photos/2202/7042142/1000w_q95.jpg",
   DVIDSLink: "https://www.dvidshub.net/image/7042142/mobilization-europe",
   latlng: [35.10, -79.17],
   },
  {
   imgID: 3,
   Headline: "Its an Infantry thing",
   Description: "U.S. Army Trooper Spc. Nikolas Garcia, an infantryman assigned to Regimental Headquarters and Headquarters Troop, 3d Cavalry Regiment, scans the terrain and provides security during a tactical operation center change of location or “jump,” May 18, 2022 at the National Training Center, Fort Irwin, California. 3d Cavalry Regiment conducted a training rotation throughout the month to validate their warfighting capabilities. (U.S. Army photo by Staff Sgt. Christopher Stewart).", 
   City: "Fort Hood",
   State: "Texas",
   CountryRegion: "United States",
   ISOCountryCode: "US",
   Creator: "Staff Sgt. Christopher Stewart",
   DateCreated: "2022-05-18",
   imgLink: "https://cdn.dvidshub.net/media/thumbs/photos/2206/7272328/1000w_q75.jpg",
   DVIDSLink: "https://www.dvidshub.net/image/7272328/its-infantry-thing",
   latlng: [31.17, -97.69]
  },
  {
   imgID: 0,
   Headline: "Energy project provides resilience for Fort Irwin, National Training Center",
   Description: "Soldiers conduct a dismounted patrol at the National Training Center, Fort Irwin. Calif. The U.S. Army and Engineering Support Center, Huntsville’s Energy Division awarded a third-party contract in September that will improve energy independence and resiliency, as well as provide energy savings for Fort Irwin, home to the National Training Center, a remote major training area for the U.S. military located in the Mojave Desert in northern San Bernardino County, California.", 
   City: "Fort Irwin",
   State: "California",
   CountryRegion: "United States",
   ISOCountryCode: "US",
   Creator: "William Farrow",
   DateCreated: "2023-01-27",
   imgLink: "https://cdn.dvidshub.net/media/thumbs/photos/2301/7605516/1000w_q75.jpg",
   DVIDSLink: "https://www.dvidshub.net/image/7605516/energy-project-provides-resilience-fort-irwin-national-training-center",
   latlng: [35.28, -116.62],
   },

]



//create function to give lat&&long when you click on that point in the map
var popup =L.popup();
function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(map);
}
//call the function
map.on('click', onMapClick);


/*given the data from the imgMetadata (which is acting as data we'd get from the DVIDS API), 
create a new map marker on the map for each new set of data (basically new marker per new result 
from searching in the DVIDS API database).
2. create a popup on that map marker
3. create a thumbnail version of that image
4. display the following in that popup: thumbnail, headline -max 30 char-, description -max 60 char-, Creator, date created, view more button
*/

function creatNewMapMarker(imgMeta) {
  console.log(`Images: ${imgMeta.length}`)
  // console.log(imgMeta[0].Description)
    for (let i=0; i<imgMeta.length; i++) {
        let newMapMarker= L.marker(imgMeta[i].latlng).addTo(map);
        let thumbnail = `<img class="thumbnail" src="${imgMeta[i].imgLink}" alt = "${imgMeta[i].Description}" onclick="window.open('${imgMeta[i].DVIDSLink}', '_blank');".`;
        let headlineMax50 = imgMeta[i].Headline;
            if (headlineMax50.length >50) {
                headlineMax50=`${headlineMax50.slice(0,50)}...`;
            }

        let content = `${thumbnail}<br><strong>${imgMeta[i].Headline}</strong><br>${imgMeta[i].Description.slice(0, 200)}...<br>Creator: ${imgMeta[i].Creator}<br>Date Created: ${imgMeta[i].DateCreated}`;
        newMapMarker.bindPopup(content).openPopup();
    }
}
 creatNewMapMarker(imgMetadata);

// for (let i = 0; i < imgMetadata.length; i++) {
//     let marker = L.marker(imgMetadata[i].latlng).addTo(map);
//     let thumbnail = `<img src=${imgMetadata[i].Link} alt=${imgMetadata[i].Description} style='height:100px; width:auto'>`;
//     let content = `${thumbnail}<br><b>${imgMetadata[i].Headline}</b><br>${imgMetadata[i].Description.slice(0, 30)}...<br>Creator: ${imgMetadata[i].Creator}<br>Date Created: ${imgMetadata[i].DateCreated}<br><button onclick='displayCard(${i})'>View More</button>`;
//     marker.bindPopup(content).openPopup();
//   }


/* 
This function is designed to respond to the mouse click of a user. When the user clicks on the "View More" button on that popup,
then it should: 
1. create a new card div
2. Display a larger version of the photo and the data from the variable imgMetadata

----------
!!!!!!!!!!
Ok so I don't like the way this looks. When a user clicks on the popup photo, these cards take over. They are displayed under the map and if the screen size is large
enough, then it will be too big. It will then display under the map, but if you try to move the map or manipulate it in any way while the photo is under the map then the browser will act like you're
clicking on the image even if its below the map. So I'm removing the functionality until I have time to work on it at a later time. 
!!!!!!!!!
---------
*/
// function displayImgMetadata(index) {
//   let image = imgMetadata[index]
//   console.log(image)
//     // Create a container for the card
//     const cardContainer = document.createElement("div");
//     cardContainer.classList.add("card-container");
  
//     // Create a card element
//     const card = document.createElement("div");
//     card.classList.add("card");
  
//     // Create an image element and set its source to the image URL
//     const img = document.createElement("img");
//     img.classList.add("card-image");
//     img.src = image.imgLink;
  
//     // Append the image to the card
//     card.appendChild(img);
  
//     // Create a container for the metadata values
//     const metadataContainer = document.createElement("div");
//     metadataContainer.classList.add("metadata-container");
  
//     // Loop through the metadata and create a paragraph element for each value
//     // for (const [key, value] of Object.entries(imgMetadata)) {
//     //   if (key !== "imgUrl") {
//     //     const metadataItem = document.createElement("p");
//     //     metadataItem.classList.add("metadata-item");
//     //     metadataItem.innerHTML = `<strong>${key}:</strong> ${value}`;
//     //     metadataContainer.appendChild(metadataItem);
//     //   }
//     // }
  
//     // Append the metadata container to the card
//     card.appendChild(metadataContainer);
  
//     // Append the card to the container
//     cardContainer.appendChild(card);
  
//     // Add the card container to the document
//     document.body.appendChild(cardContainer);
//   }

// //Lookie lookie for my button in the DOM!
// const viewMoreButton = document.querySelector(".view-more");
// // Make-ie make-ie my button do the function I want it to do!
// viewMoreButton.addEventListener("click", () => {
//   displayImgMetadata(imgMetadata);
// });
  
// //writing in markers that are just hard coded in.
// // L.marker([31.17, -97.69]).addTo(map)
// // .bindPopup(`<div class="popup-content"><img src="assets/infantry.jpg" class="thumbnail"><br> ${imgMetadata[2].Headline}<br> ${imgMetadata[2].Description.slice(0,20)}...<br>${imgMetadata[2].DateCreated}<br>${imgMetadata[2].Creator}<br><button class="view-button"> View</button></div>`)
// // .openPopup();

// // L.marker([35.10, -79.17]).addTo(map)
// //     .bindPopup(`<div class="popup-content"><img src="assets/Bragg.jpg" class="thumbnail"><br> {Img Title placeholder}<br> {Caption limit char 20}<br>{date placeholder}<br>{credit-line}<br><button class="view-button"> View</button></div>`)
// //     .openPopup();

// // L.marker([35.28, -116.62]).addTo(map)
// //     .bindPopup(`<div class="popup-content"><img src="assets/Irwin.jpg" class="thumbnail"><br> {Img Title placeholder}<br> {Caption limit char 20}<br>{date placeholder}<br>{credit-line}<br><button class="view-button"> View</button></div>`)
// //     .openPopup();

// // L.marker([50, 8.60]).addTo(map)
// //     .bindPopup(`<div class="popup-content"><img src="assets/Chinook.jpg" class="thumbnail"><br> {Img Title placeholder}<br> {Caption limit char 20}<br>{date placeholder}<br>{credit-line}<br><button class="view-button"> View</button></div>`)
// //     .openPopup();

// // L.marker([55, 12]).addTo(map)
// //     .bindPopup(`<div class="popup-content"><img src="assets/Chinook.jpg" class="thumbnail"><br> {Img Title placeholder}<br> {Caption limit char 20}<br>{date placeholder}<br>{credit-line}<br><button class="view-button"> View</button></div>`)
// //     .openPopup();



  
// //create practice data that acts as what the DVIDS API would return


// //create variable to associate the view button,
// //then create an event listener to wait for the user to click on the button
// //event listener 

// const viewButton = document.getElementsByClassName('view-button');

// viewButton.addEventListener('click', function() {
//     createCard;
// });


// function createCard(imgMetadata) {
//     // create elements
//     const card = document.createElement('div');
//     const cardContent = document.createElement('div');
//     const cardTitle = document.createElement('p');
//     const cardCaption = document.createElement('p');
//     const cardImage = document.createElement('img');
    
//     // add classes and content
//     card.classList.add('card');
//     cardContent.classList.add('card-content');
//     cardTitle.classList.add('title');
//     cardTitle.textContent = data.title;
//     cardCaption.classList.add('subtitle');
//     cardCaption.textContent = data.subtitle;
//     cardImage.src = data.imageUrl;
    
//     // append elements
//     cardContent.appendChild(cardTitle);
//     cardContent.appendChild(cardCaption);
//     card.appendChild(cardContent);
//     card.appendChild(cardImage);
//     document.getElementById('card-container').appendChild(card);
//   }
  
//   function renderCards(data) {
//     const container = document.querySelector('.cards-container');
//     container.innerHTML = '';
  
//     data.forEach((img) => {
//       const card = document.createElement('div');
//       card.classList.add('card');
  
//       const imgContainer = document.createElement('div');
//       imgContainer.classList.add('img-container');
//       const imgEl = document.createElement('img');
//       imgEl.src = `https://picsum.photos/id/${img.imgID}/500/300`;
//       imgContainer.appendChild(imgEl);
//       card.appendChild(imgContainer);
  
//       const cardInfo = document.createElement('div');
//       cardInfo.classList.add('card-info');
  
//       const title = document.createElement('h2');
//       title.textContent = img.Headline;
//       cardInfo.appendChild(title);
  
//       const caption = document.createElement('p');
//       caption.classList.add('caption');
//       caption.textContent = img.Description;
//       cardInfo.appendChild(caption);
  
//       const date = document.createElement('p');
//       date.classList.add('date');
//       date.textContent = `Date: ${img.DateCreated}`;
//       cardInfo.appendChild(date);
  
//       const author = document.createElement('p');
//       author.classList.add('author');
//       author.textContent = `Journalist: ${img.Creator}`;
//       cardInfo.appendChild(author);
  
//       const link = document.createElement('a');
//       link.href = img.Link;
//       link.textContent = 'Source';
//       cardInfo.appendChild(link);
  
//       card.appendChild(cardInfo);
//       container.appendChild(card);
//     });
//   }
  