# :curry: curryfm
Curried Node wrapper around the public GET methods of Lastfm API.
Uses Ramda, Babel and ES6.

## Usage
```
npm install --save curryfm;
```

Then package exports a default curried function which takes 4 arguments:
* `api_key`
* `resource` - (one of 'user', 'track', 'artist', 'album' etc.)
* `method` - (method called on resource e.g. 'getTopTracks', 'getInfo' etc.)
* `params`

Check [LastFM docs](http://www.last.fm/api) for info regarding these arguments. The function finally returns a `Promise`.

```javascript
import curryfm from 'curryfm';
import readjson from 'read-json-sync';

const { api_key: API_KEY } = readjson("./config.json");

const client = curryfm(API_KEY);

const userClient = client("user");
const asrtistClient = client("artist");

const userTopTracks = userClient("getTopTracks");
const artistSimilar = asrtistClient("getSimilar");

const log = async (method, params) => {
  try {
    console.log(await method(params));
  } catch (err) {
    console.error(err);
  }
};

let params = {
 user: "sidjain26",
 period: "7day",
 limit: 10,
 format: "json"
};

log(userTopTracks, params);

params = {
  artist: "Drake",
  limit: 10,
  format: "json"
};

log(artistSimilar, params);

curryfm(API_KEY, "album", "search", {album: "Songs About Jane", limit: 10}).then((result) => {
  console.log(result);
}); // Alternatively you can call the function with all arguments
```
