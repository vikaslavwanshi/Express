const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Define the Mongoose schema for Todo
const todoSchema = new mongoose.Schema({
    taskName: String
});

// Create the Todo model
const Todo = mongoose.model('Todo', todoSchema);

// Middleware to parse request body
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect('mongodb+srv://vikasdb:vikas1234@cluster0.ni5rb3r.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => {
        console.log('Connected to MongoDB');
        // Call createPost after connecting to MongoDB
        createPost();
        getPosts();
    })
    .catch(err => console.error('Could not connect to MongoDB', err));
    
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

// Route to handle POST requests to create a new post
app.post('/create-post', async (req, res) => {
    const { title, body, author, tags } = req.body;
    try {
        await createPost(title, body, author, tags.split(','));
        res.send('Post created successfully');
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).send('Error creating post');
    }
});

app.get('/', (req, res) => {
    res.send('Welcome to my Todo application');
});


// Start the Express server
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
