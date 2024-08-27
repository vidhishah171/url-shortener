const express = require("express")
const router = require('./routes/url')
const {connectMongoDB} = require('./connect.js')

const app = express();
const port = 8001;

connectMongoDB("mongodb://localhost:27017/short-url")
.then(() => console.log("MongoDB connected."))
.catch((err) => console.log("Error while connecting to MongoDB: ", err))

app.use(express.json())

app.use("/url", router);

app.listen(port, () => console.log(`Server started at port: ${port}.`));

