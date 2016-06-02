# curryfm
Curried Node wrapper around the public GET methods of Lastfm API.
Uses Ramda, Babel and ES6.

## Usage
```
npm install --save curryfm;
```

Then package exports a default curried function which takes 5 arguments:
`api_key`, `resource`, `method`, `params` and `callback`. Check [LastFM docs](http://www.last.fm/api) for all more info regarding these arguments.

```javascript
import curryfm from 'curryfm';
import readjson from 'read-json-sync';

const { api_key: API_KEY } = readjson("./secrets/lastfm-config.json");

const client = curryfm(API_KEY);

const userClient = client("user");
const asrtistClient = client("artist");

const userTopTracks = userClient("getTopTracks");
const artistSimilar = asrtistClient("getSimilar");

const log = (result, err) => {
 if (err) {
  console.error(err);
 }
 else console.log(result);
};

let params = {
 user: "sidjain26",
 period: "7day",
 limit: 10,
 format: "json"
};

userTopTracks(params, log);

params = {
  artist: "Drake",
  limit: 10,
  format: "json"
};

artistSimilar(params, log);

curryfm(API_KEY, "album", "search", {album: "Songs About Jane", limit: 10}, log); // Alternatively you can call the function with all arguments
```
