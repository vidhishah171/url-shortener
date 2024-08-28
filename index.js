const express = require("express")
const router = require('./routes/url')
const staticRouter = require('./routes/staticRouter')
const URL = require('./models/url')
const {connectMongoDB} = require('./connect.js')
const path = require('path')

const app = express();
const port = 8001;

connectMongoDB("mongodb://localhost:27017/short-url")
.then(() => console.log("MongoDB connected."))
.catch((err) => console.log("Error while connecting to MongoDB: ", err))

app.set("view engine", "ejs");
app.set('views', path.resolve("./views"));


app.use(express.json())
app.use(express.urlencoded({extended: false}))


// app.get('/test', async (req,res) => {
//     const allUrls = await URL.find({});
//     return res.end(`
//         <html>
//             <head>></head>
//             <body>
//                 <ol>
//                     ${allUrls.map(url => `<li>${url.shortId} - ${url.redirectUrl} - ${url.visitHistory.length}</li>`).join('')}
//                 </ol>
//             </body>
//         </html>
//         `);
// })

// app.get('/test', async (req,res) => {
//     const allUrls = await URL.find({});
//     return res.render('home', {
//         urls: allUrls,
//         name: 'Vidhi'
//     });
// })

app.use("/url", router);
app.use("/", staticRouter);


app.listen(port, () => console.log(`Server started at port: ${port}.`));

