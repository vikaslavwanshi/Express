const express = require('express');

const app = express();


// app.get('/', function(req, res) {     // Here we are using a callback function "function" which is being used or called by another function "app"
//     res.send('Hello World, im here');
    
// });

// app.get( '/post/:postID'
// , (req, res) => {
// res.send(req.params.postID)
// });

// app.get('/post/:year/:month'
// , (req, res) => {
// res.send(req.params)
// // res.send(req.query)
// });

const bodyParser = require('body-parser' );
app.use(bodyParser.urlencoded({extended: true}));

app.get('/'
, function(req, res){
res.sendFile(__dirname + '/index.html');
});

app.post('/todos', function(req, res){
    console.log(req.body);
    res.send('POST success');
});

app.listen(3000, function()  {
    console.log('Listening to port 3000')
    });