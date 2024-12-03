// API CODE

const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const UserModel = require("./models/User")
const ParkingLotModel = require("./models/ParkingLot")


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
app.post("/register", async (req, res) => {
    const {name, email, password} = req.body;
    
    const existingUser = await UserModel.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

    UserModel.create(req.body)  // request.body = { name, email, password }
    .then(user => res.json(users))
    .catch(err => res.json(err))

})

// post-request-login-api-endpoint
app.post("/login", (req, res) => {
    
    const {email, password} = req.body;
    console.log("loginEndpoint-> " + "sucess");

    UserModel.findOne({email: email})
    .then(user => {
        if (user) {
            if (user.password === password) {
                console.log("YES")
                res.json("succesfully logged in user") // send response back
            // if user credentials dont match
            } else {
                console.log("NO")
                res.status(400).json("incorrect email/password or user doesn't exist") // sending status code so we can check err-response in client
            }
        // if user obj is not found
        } else {
            console.log("NO")
                res.status(400).json("incorrect email/password or user doesn't exist")
        }
    })

})


app.post("/create-parking-lot", async (req, res) => {
    
    try {
        const { name, latitude, longitude } = req.body;

        if (!name || latitude === undefined || longitude === undefined) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const newParkingLot = new ParkingLotModel({ name, latitude, longitude });

        await newParkingLot.save();

        res.status(201).json({ message: "Parking lot created successfully", parkingLot: newParkingLot });
    } catch (err) {
        console.error("Error creating parking lot:", err);
        res.status(500).json({ error: "Internal server error" });
    }
    

})