import { fetch } from 'whatwg-fetch';
import { GET, POST, PUT, DELETE } from './requestType';

const HOST_NAME = 'http://localhost:8090';

const headers = (type, bodyObj = {}) => {
	const headers = {
		method: type, // *GET, POST, PUT, DELETE, etc.
	  mode: "cors", // no-cors, cors, *same-origin
	  cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
	  credentials: "omit", // include, *same-origin, omit
	  headers: {
	      "Content-Type": "application/json; charset=utf-8",
	      // "Access-Control-Allow-Origin": "*",
	      // "Content-Type": "application/x-www-form-urlencoded",
	  },
	  redirect: "follow", // manual, *follow, error
	  referrer: "no-referrer", // no-referrer, *client
	};

	return bodyObj ? {...headers, body: JSON.stringify(bodyObj)} : headers;
}

const request = (uri, headers) => new Promise(
	(resolve, reject) => {
		console.log(headers);
		fetch(`${HOST_NAME}${uri}`, headers)
			.then(response => response.json())
			.then(result => resolve(result))
			.catch(error => reject(error));
	}
)

const fetchApi = {
	post: (uri, bodyObj) => request(uri, headers(POST, bodyObj)),
	get: uri => request(uri),
	delete: uri => request(uri, headers(DELETE)),
}

export default fetchApi;