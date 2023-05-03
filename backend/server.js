const express = require("express");
const dotenv = require('dotenv');
const cors = require('cors');
// const Connection = require('./database/db')
const userRoutes = require('./routes/userRoutes')
const db = require('./models')
const app = express();
dotenv.config()
const PORT = process.env.PORT;

// Connection();



app.get("/", (req, res) => {
    res.send("API is running")
})


app.use(express.json({ limit: '100mb' }))
app.use(express.urlencoded({ extended: true }));

app.use( cors())
app.use("/api/users", userRoutes);

db.sequelize.sync().then(()=>{
    app.listen(PORT, () => {
        console.log(`server started on port ${PORT}`);
    })
})
