import { fetch } from 'whatwg-fetch';
import { GET, POST, PUT, DELETE } from './requestType';

const HOST_NAME = 'http://localhost:8090';

const headers = (type, bodyObj) => {
	const headers = {
		"Content-Type": 'application/json',
    "Accept": 'application/json',
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

const request = (hostName, uri, headers) => new Promise(
	(resolve, reject) => {
		fetch(`${hostName}${uri}`, headers)
			.then(response => response.json())
			.then(result => resolve(result))
			.catch(error => reject(error));
	}
)

const fetchApi = (hostName = HOST_NAME ) => ({
	put: (uri, bodyObj) => request(hostName, uri, headers(PUT, bodyObj)),
	post: (uri, bodyObj) => request(hostName, uri, headers(POST, bodyObj)),
	get: uri => request(hostName, uri),
	delete: uri => request(hostName, uri, headers(DELETE)),
})

export default fetchApi;