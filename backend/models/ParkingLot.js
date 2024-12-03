const mongoose = require("mongoose")


// MongoDB Schema for Parking Lot
const parkingSchema = new mongoose.Schema({
    
    name: { type: String, required: true },          // Parking lot name (String)
    status: { type: String, required: false }, 
    latitude: { type: Number, required: true },      // Latitude (Number)
    longitude: { type: Number, required: true },     // Longitude (Number)
    updatedAt: { type: Date, default: Date.now }
});

const ParkingLotModel = mongoose.model("parkinglots", parkingSchema);
module.exports = ParkingLotModel;