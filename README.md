# Frontend-Project
This is my first front end project, done at week 4 of the Galvanize: OperationLevelUp bootcamp

**NOTE** This application is not associated with the U.S. Department of Defense or any branch of the U.S. military. This code was written by a U.S. Army Soldier who is learning software development but also has a background in Army Public Affairs. DoD Public Affairs Officers use DVIDS to archive their visual information that they publish about the units they are assigned, and these PAOS are assigned to pretty much all units in the Army, which is why this map would work well to show the data that I want to show. The data provided is not intended for analysis, but just as a visual representation of generally where visual information from the D.o.D. is published around the globe. 

For more information on what DVIDS is: https://www.dvidshub.net/

PROJECT OVERVIEW:
Eventually I want to get this application to serve users data from DVIDS using a map. The goal is for users to be able to search DVIDS and have the information populate on the map with map markers. 
I want the user to see where in the world the US Department of Defense operates based off of the visual information that is published in DVIDS. This information is not sensitive, no OPSEC issues. It has been vetted by public affairs professionals to be released to the public. So in all, this map will not show where sensitive operations happen, or basically any information that is not publicly released. 



For this app to be a minimum viable product, we first need to widdle down the big idea into something that may not have as much functionality as originally intended.

We need a map, sourced from Leaflet.js, map markers that indicate where the content was created, and then create cards that pop up on the right side of the map when a user clicks on the map marker. In those cards we want to display the title of the image, date, location, caption, and journalist.

We want to create a header that names the map and a subheader that describes the functionality of the map to the user. We want a footer that says this was created by yours truly.

We want everything styled in the CSS sheet, functionality of the page and as many adjustments to the DOM in JavaScript as possible, and of course to make sure that everything works.  
Directions

Set up coding enviornment:
    1. Create HTML, JS, CSS files
    2. Create an asset folders to host the images. For this project we'll use 10 images.
Source the map API into the page.
    3. Source the map from Leaflet.js
        a. get a basic map to populate on our page
        b. clean the code out so there is only the map and a map marker to display. We may come back to this to add more bonus features to the map like implementing a heat map but for now we're just going to work on the MVP.
    4. Create functions to change metadata in the image to a random 2-digit-lat, 2-digit-long, so that can be read by leaflet.
    4.A. ***I might be able to replace step 4 with an Leaflet-internal API, look for documentation on `Geocode`
    5. create functions
         a. createMapMarker; creates a new map marker each time it identifies an image.
         b. markerPopUp; creates a map marker pop up that displays when the map marker is clicked on.
         c. createNewCard; creates a popup card displaying more information about the story/content and only appears when the user clicks on the map marker. Make sure to add a conditional in the beginning of this to hide another card if one is acive. 
         d. allStoryContent; will basically look for the source file image, and when it sees one then call createMapMarker, markerPopUp, createNewCard.
         e. add a `for` loop for every image source it finds inside the allStoryContent


Some sources I found:
http://mutiny.cz/exifr/  && https://www.npmjs.com/package/exifr for reading exif data on an image
https://david-hooper.github.io/HackathonLinks/ for all kinds of APIs 



----Here's what Chat GPT gave us back for instructions--
1. Create HTML, JS, and CSS files:

Create a new folder for your project and name it something relevant, like "DVIDS Map App."
Inside the folder, create three new files: "index.html," "style.css," and "script.js."
In "index.html," add the basic structure of an HTML page, including the DOCTYPE declaration, head, and body tags.
In the head tag, link to the Leaflet.js and Bootstrap CSS files.
In the body tag, create a div element with an ID of "mapid" where the map will be displayed.
Add a script tag at the bottom of the body tag to link to your "script.js" file.
Create an asset folder to host the images:

Inside your project folder, create a new folder called "assets."
Download and save 10 DVIDS images to the assets folder.
Source the map API into the page:

In "script.js," create a new instance of the Leaflet.js map object and set the view to your desired location and zoom level.
Add a map tile layer to the map using a source from a tile server, like OpenStreetMap.
Add a map marker to the map using the L.marker method and set the coordinates to your desired location.
Create functions to change metadata in the image to a random 2-digit-lat, 2-digit-long:

Define a function called "randomizeCoordinates" that takes an image file as an argument.
Use the exif-js library to read the metadata of the image and extract the GPS latitude and longitude values.
Convert the latitude and longitude values to a 2-digit format using the toFixed() method.
Write the new latitude and longitude values back to the image metadata using exif-js.
Create functions:

Define a function called "createMapMarker" that takes the latitude and longitude values as arguments and creates a new map marker at those coordinates.
Define a function called "markerPopUp" that takes the image title, date, location, caption, and journalist as arguments and creates a map marker pop-up with that information.
Define a function called "createNewCard" that takes the same image information as arguments and creates a new card with that information.
Define a function called "allStoryContent" that searches for image files in the assets folder and calls the createMapMarker, markerPopUp, and createNewCard functions for each image found.
Add a for loop to the allStoryContent function to iterate through each image in the assets folder.
Style the page with CSS:

In "style.css," add styles to format the map, map marker, and card elements.
Customize the header and footer with your desired text and styling.
Test the application:

Open "index.html" in a web browser to test the application.
Verify that the map, map marker, and card elements display as expected.
Test the application with different images and locations to ensure that the functions are working correctly.