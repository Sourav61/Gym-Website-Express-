const express = require('express');
const fs = require('fs');
const path = require('path')
const app = express();
const port = 80;

// EXPRESS SPECIFIC
app.use('/static', express.static(path.join(__dirname, '/static')));
app.use(express.urlencoded()) // Middleware

// PUG SPECIFIC Configuration
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// ENDPOINTS
app.get('/', (req,res) => {
    const params = {'title': 'Whattt is PUG?', 'content': 'Why are we using PUGG?'};
    res.status(200).render('index.pug', params);
})

app.post('/', (req,res) => {
    console.log(req.body);

    let {name, age, gender, address, more} = req.body;

    let outputToWrite = `The clients info is: ${name} ${age} ${gender} ${address} ${more}`;

    fs.writeFileSync('output.txt', outputToWrite);

    const params = {'message': 'Your form has been submitted successfully'};
    res.status(200).render('index.pug', params)
})

// START THE SERVER
app.listen(port, () => {
    console.log(`Server started at 127.0.0.1:${port}`);
})