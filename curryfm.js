import R from 'ramda';
import http from 'http';
import qs from 'querystring';

function lastfm(api_key, resource, method, params) {
	const prependAndKeyEquals = R.mapObjIndexed((value, key, object) => `&${key}=${qs.escape(value)}`);
	const add = (a, b) => a + b;
	const paramStr = R.compose(R.reduce(add, ''), R.values, prependAndKeyEquals);
	const queryStr = `http://ws.audioscrobbler.com/2.0/?api_key=${api_key}&method=${resource}.${method}${paramStr(params)}`;
	return new Promise((resolve, reject) => {
		http.get(queryStr, (res) => {
			let body = '';
			res.on('data', (chunk) => {
				body += chunk;
			});
			res.on('end', () => {
				resolve(JSON.parse(body));
			});
		}).on('error', (err) => {
			reject(err);
		});
	});
};

export default R.curry(lastfm);
