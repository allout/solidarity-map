# Pride #Undistanced

> An #Undistanced Virtual Pride geotagging action of solidarity

## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

## Getting map data for a new city

This is the process I used for St Petersburg

1. Go to https://nominatim.openstreetmap.org/ and search for the city, in this case "St Petersburg"

   Results: https://nominatim.openstreetmap.org/search.php?q=st+petersburg&polygon_geojson=1&viewbox=

1. Choose the OSM relation on the left of the page that defines the area of the city you are after (in my case I didn't need to select anything, the correct one was already chosen).

1. Zoom the map to the desired level so the city just fills the map area.

1. Click the "show map bounds" button on the map box. Take note of the "map center", "map zoom" and "viewbox" values

1. In the "maps" folder of this project, duplicate the StPetersburg folder example, naming the folder after your city in a similar camelCase format.

1. Set the "map center", "map zoom" and "viewbox" values in the initial.js file accordingly

1. Back on https://nominatim.openstreetmap.org/ page, click the "details" button on the chosen relation. Scrolling the list you should find an Address section, or an OSM entry. This contains the OSM relation id for the city data you are after. Take note of this id.

1. Navigate to http://overpass-turbo.eu/

1. Run the following query, where <relation_id> is the id you noted in the previous step

   ```
   relation(<relation_id>);
   (._;>;);
   out;
   ```

   You should see a similar map to before.

1. Click the "Export" button, go to the "Data" section and download as GeoJSON

1. Copy this file to your maps/cityName folder in this project and name the file area.geojson
