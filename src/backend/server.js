const express = require('express');
const mockData = require('./MOCK_DATA.json');

const app = express();
app.use(express.json());

// TODO document
// TODO implement other needed rest API endpoints

app.get('/api/v1/users', (req, res) => {
	// return res.setTimeout(3000, function(){
	// 	console.log('Request has timed out.');
	// 	res.send(mockData);
	// });

	res.send(mockData);
});

// app.post('/', (req, res) => {
// 	return res.send('Received a POST HTTP method');
// });

app.put('/api/v1/users/:userId', (req, res) => {
	mockData[req.params.userId - 1] = req.body;
	res.send(req.body);
});
//
// app.delete('/', (req, res) => {
// 	return res.send('Received a DELETE HTTP method');
// });

app.listen(9090, () => console.log('Server listening on port 9090!'));
