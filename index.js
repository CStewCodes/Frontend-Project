var map = L.map('map').setView([1, 1], 4);
var tileLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copright">OpenStreetMap</a>'
}).addTo(map);

L.marker([30.3, 262.2]).addTo(map)
    .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
    .openPopup();