const express = require('express');
const mockData = require('./MOCK_DATA.json');

const app = express();

// TODO document
// TODO implement other needed rest API endpoints

app.get('/api/v1/users', (req, res) => {
	return res.send(mockData);
});

// app.post('/', (req, res) => {
// 	return res.send('Received a POST HTTP method');
// });
//
// app.put('/', (req, res) => {
// 	return res.send('Received a PUT HTTP method');
// });
//
// app.delete('/', (req, res) => {
// 	return res.send('Received a DELETE HTTP method');
// });

app.listen(9090, () => console.log('Server listening on port 9090!'));
