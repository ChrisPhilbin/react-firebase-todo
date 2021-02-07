// const functions = require("firebase-functions");

// exports.helloWorld = functions.https.onRequest((request, response) => {
//     response.send("Hello from Firebase!");
// });

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const functions = require('firebase-functions');
const app = require('express')();
const auth = require('./util/auth');

const {
    getAllTodos,
    getOneTodo,
    postOneTodo,
    deleteTodo,
    editTodo
} = require('./APIs/todos')

app.get('/todos', auth, getAllTodos);
app.get('/todos/:todoId', auth, getOneTodo);
app.post('/todos', auth, postOneTodo);
app.delete('/todos/:todoId', auth, deleteTodo);
app.put('/todos/:todoId', auth, editTodo);

const {
    loginUser,
    signUpUser,
    getUserDetail,
    updateUserDetails,
    uploadProfilePhoto
} = require('./APIs/users')

app.post('/login', loginUser);
app.post('/signup', signUpUser);
app.post('/user/image', auth, uploadProfilePhoto);
app.get('/user', auth, getUserDetail);
app.post('/user', auth, updateUserDetails);

exports.api = functions.https.onRequest(app);