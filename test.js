import curryfm from './curryfm';
import readjson from 'read-json-sync';
import test from 'ava';

const { api_key: API_KEY } = readjson("./config.json");
const client = curryfm(API_KEY);
const params = {
 user: "sidjain26",
 period: "7day",
 limit: 10,
 format: "json"
};

test('api key is set for tests to run', t => {
  t.true(typeof API_KEY === 'string');
});

test('wrapper is curried with arity of 4', t => {
  t.plan(5);
  t.is(typeof curryfm, 'function');
  t.is(typeof curryfm(API_KEY), 'function');
  t.is(typeof curryfm(API_KEY)("user"), 'function');
  t.is(typeof curryfm(API_KEY)("user")("getTopTracks"), 'function');
  t.is(typeof curryfm(API_KEY)("user")("getTopTracks")(params).then, 'function');
});

test('returns relevant object when promise resolved/rejected', async t => {
  try {
    const result = await curryfm('API_KEY')("user")("getTopTracks")(params);
    t.true(result.hasOwnProperty('toptracks') || result.hasOwnProperty('message'));
  } catch (err) {
    t.true(err.hasOwnProperty('code'));
  }
});
