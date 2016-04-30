import R from 'ramda';

const lastfm = (api_key, resource, name, method, params, callback) => {
	const prependAndKeyEquals = R.mapObjIndexed((value, key, object) => `&${key}=${value}`);
	const add = (a, b) => a + b;
	const paramStr = R.compose(R.reduce(add, ''), R.values, prependAndKeyEquals);
	const queryStr = `http://ws.audioscrobbler.com/2.0/?api_key=${api_key}&method=${resource}.${method}&${resource}=${name}${paramStr(params)}`;
	//console.log(queryStr);
	let result = undefined;
	http.get(queryStr, (res) => {
			let body = '';
			res.on('data', (chunk) => {
				body += chunk;
			});
			res.on('end', () => {
				callback(JSON.parse(body));
			});
		})
		.on('error', (e) => {
			callback(`Error: ${e}`);
		});
	return result;
};

const curryfm = R.curry(lastfm);
export default curryfm;
