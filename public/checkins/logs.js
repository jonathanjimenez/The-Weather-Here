// Making a map and tiles
const myMap = L.map('checkinMap').setView([0, 0], 1);
const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(myMap);

getData();

async function getData() {
    const response = await fetch('/api');
    const data = await response.json();
    
    for (const item of data) {
        const marker = L.marker([item.lat, item.lon]).addTo(myMap);
        let text = `The weather here at ${item.lat}&deg;, ${item.lon}&deg; is ${item.weather.summary} with a temperature of ${item.weather.temperature}&deg; C. `;
        if (item.air.value < 0) {
            text += 'No air quality reading';
        }
        else {
            text += `The concentration of particulate matter (${item.air.parameter}) is ${item.air.value} ${item.air.unit} last read on ${item.air.lastUpdated}.`
        }
        
        marker.bindPopup(text);
    }
    console.log(data);
}