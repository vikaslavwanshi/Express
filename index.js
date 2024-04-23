const express = require('express');

const app = express();

const mongoose = require( 'mongoose' );

const postSchema = new mongoose.Schema({
    title: String,
    author: String,
    tag: [ String ],
    date: {type: Date, default: Date.now}
    });

const Post = mongoose.model( 'Post', postSchema);
async function createPost(){
    const post = new Post({
        title:'Second Post',
        body: 'This is the body of our second post..',
        author: 'COMP6006',
        tag: [ 'demo', 'mongo' ]
    });
    const result = await post.save();
    console.log(result);
}

async function getPosts() {
    const posts = await Post
        .find({ tag: 'Second', author: 'COMP6006' })
        .select({ title: 1, body: 1 })
        .then((data) => {
            console.log(data);
        })
        .catch((err) => {
            console.error("Error:", err);
        });
}

mongoose.connect('mongodb+srv://vikasdb:vikas1234@cluster0.ni5rb3r.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => {
        console.log('Connected to MongoDB');
        // Call createPost after connecting to MongoDB
        createPost();
        getPosts();
    })
    .catch(err => console.error('Could not connect to MongoDB', err));
    

app.set('view engine', 'pug');
app.get('/', (req, res) => {
    res.render('index', { theTitle: 'COMP6006app', theMessage: 'Hello World, I am here' });
});

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

// const bodyParser = require('body-parser' );
// app.use(bodyParser.urlencoded({extended: true}));

// app.get('/'
// , function(req, res){
// res.sendFile(__dirname + '/index.html');
// });

// app.post('/todos', function(req, res){
//     console.log(req.body);
//     res.send('POST success');
// });

app.listen(3001, function() {
    console.log('Listening to port 3001');
});