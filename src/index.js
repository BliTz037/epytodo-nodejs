const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const userRoutes = require("./routes/user/user");
const todoRoutes = require("./routes/todos/todos");
const authRoutes = require("./routes/auth/auth");

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    console.log("Requête !");
    next();
});

app.use(express.json());
app.use('/', authRoutes);
app.use('/user', userRoutes);
app.use('/todo', todoRoutes);
app.use(function(req, res, next) {
    res.status(404).json({msg: "Route not found !"});
});

console.log('Epytodo API server started on: ' + port);
app.listen(port);