// API CODE

const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const UserModel = require("./models/User")

const app = express()
app.use(express.json())
app.use(cors())

// connection string with db-password db-name
mongoose.connect("mongodb+srv://pravachanpatra:J6wZDwngkNu5uJEg@parkingdb1.uscaf.mongodb.net/?retryWrites=true&w=majority&appName=parkingdb1")
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.log("Error connecting to MongoDB:", err));

// confirm server is running
app.listen(3001, () => {
    console.log("server is running")
})

// api-endpoint-post for register-form submission, request that was sent to this endpoint, response that we will give
app.post("/register", (req, res) => {
    const {name, email, password} = req.body;
    const existingUser =  UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    UserModel.create(req.body)  // request.body = { name, email, password }
    .then(user => res.json(users))
    .catch(err => res.json(err))

})

// post-request-login-api-endpoint
app.post("/login", (req, res) => {
    
    const {email, password} = req.body;

    UserModel.findOne({email: email})
    .then(user => {
        if (user) {
            if (user.password === password) {
                console.log("YES")
                res.json("succesfully logged in user") // send response back
            } else {
                console.log("NO")
                res.json("incorrect email/password or user doesn't exist")
            }
        }
    })



})

