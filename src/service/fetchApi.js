import { fetch } from 'whatwg-fetch';

const HOST_NAME = 'http://localhost:8090';

const headers = bodyObj => {
	return {
	  method: "POST", // *GET, POST, PUT, DELETE, etc.
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
	  body: JSON.stringify(bodyObj), // body data type must match "Content-Type" header
	};
}

const request = (uri, headers) => new Promise(
	(resolve, reject) => {
		fetch(`${HOST_NAME}${uri}`, headers)
			.then(response => response.json())
			.then(result => resolve(result))
			.catch(error => {
				console.log(error);
				reject(error);
		});
	}
)

const fetchApi = {
	post: (uri, bodyObj) => request(uri, headers(bodyObj)),
	get: uri => request(uri),
}

export default fetchApi;