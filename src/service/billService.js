import { fetch } from 'whatwg-fetch';

export const getBills = () => new Promise((resolve, reject) => {
  fetch(`http://localhost:8090/bills`)
  .then(response => response.json())
  .then(data => resolve(data))
  .catch(error => console.log(error));
});

export const addBill = (bill) => new Promise((resolve, reject) => {
  console.log(bill);
  fetch(`http://localhost:8090/addBill`, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, cors, *same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        // credentials: "include", // include, *same-origin, omit
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            // "Content-Type": "application/x-www-form-urlencoded",
        },
        redirect: "follow", // manual, *follow, error
        referrer: "no-referrer", // no-referrer, *client
        body: JSON.stringify(bill), // body data type must match "Content-Type" header
    })
    .then(response => response.json())
    .then(result => resolve(result))
    .catch(error => console.log(error));
});

export const getBillTypes = () => new Promise((resolve, reject) => {
  const billTypes = [
    {
      id: 1,
      name: 'Water',
      desc: 'Water',
    },
    {
      id: 2,
      name: 'Electricity',
      desc: 'Electricity',
    },
    {
      id: 3,
      name: 'Internet',
      desc: 'Internet',
    }
  ];

  resolve(billTypes);
});


export const getProviders = () => new Promise((resolve, reject) => {
  const providers = [{
    id: 1,
    type: ['Water'],
    name: 'City Council',
    desc: 'City Council',
  }, {
    id: 2,
    type: ['Internet'],
    name: 'Spark',
    desc: 'Spark',
  },
  {
    id: 3,
    type: ['Internet'],
    name: 'Vodaphone',
    desc: 'Vodaphone',
  },
  {
    id: 4,
    type: ['Electricity', 'Internet'],
    name: 'Contact Energy',
    desc: 'Contact Energy',
  },
  {
    id: 5,
    type: ['Electricity', 'Internet'],
    name: 'Mecrucy',
    desc: 'Mecrucy',
  },
];

  resolve(providers);
});
