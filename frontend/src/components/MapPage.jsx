import React, { useState } from 'react';
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';
import './MapPage.css';

const MapPage = () => {
    const mapOptions = {
        mapTypeControl: false,
        streetViewControl: false,
        zoomControl: false,
        scaleControl: false,
        rotateControl: false,
        fullscreenControl: false,
    };

    // Default state
    const [center, setCenter] = useState({ lat: 35.2045, lng: -97.4430 }); // Center point for all markers
    const [zoom, setZoom] = useState(14.7); // Zoom level for showing all markers
    const [selectedParking, setSelectedParking] = useState(null); // Store the selected parking details


    // const [zoom, setZoom] = useState(14.7);

    // Parking Locations Data
    const [parkingLocations, setParkingLocations] = useState({
        duckPond: {
            position: { lat: 35.207152, lng: -97.439607 },
            address: 'Duck Pond Parking Lot',
            status: 'g', // Initial status
        },
        jenkins: {
            position: { lat: 35.2014, lng: -97.44194 },
            address: 'Jenkins Parking Garage',
            status: 'Unknown', // Initial status
        },
        asp: {
            position: { lat: 35.20535, lng: -97.44414 },
            address: 'Asp Parking Garage',
            status: 'Unknown', // Initial status
        },
        elm: {
            position: { lat: 35.20962, lng: -97.44847 },
            address: 'Elm Parking Garage',
            status: 'Unknown', // Initial status
        },
        timberdell: {
            position: { lat: 35.197417, lng: -97.442142 },
            address: 'Timberdell Parking Garage',
            status: 'Unknown', // Initial status
        },
    });

    // Handlers for Button Clicks
    const handleParkingClick = (locationKey) => {
        const location = parkingLocations[locationKey];
        setCenter(location.position);
        setZoom(17);
        setSelectedParking(locationKey);
    };

    const handleShowAllClick = () => {
        setCenter({ lat: 35.2045, lng: -97.4430  }); // Center point for all markers
        setZoom(14.7); // Zoom level to show all markers
        setSelectedParking(null); // Reset selected parking
    };

    const handleStatusChange = (locationKey, status) => {
        // Send the status change to the backend (MongoDB)
        fetch('http://localhost:3000/update-status', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                parkingId: locationKey, // Passing the parking lot ID (key)
                status: status,
            }),
        })
        .then((response) => response.json())
        .then((data) => {
            // Handle successful response: Update the local state
            setParkingLocations((prevState) => ({
                ...prevState,
                [locationKey]: {
                    ...prevState[locationKey],
                    status: data.status, // Update the status with the response from the server
                },
            }));
        })
        .catch((error) => {
            console.error('Error updating parking status:', error);
        });
    };

    return (
        <div>
            <h1 className="title">OU PARK MAP</h1>

            <div className="map-container">
                <div className="map">
                    <APIProvider apiKey="AIzaSyCcZqLYksoUy07wWgk7-Eg4UC2ICuDbsz8">
                        <Map
                            center={center}
                            zoom={zoom}
                            style={{
                                height: '450px',
                                width: '450px',
                                border: '10px white solid',
                                borderRadius: '20px',
                                boxShadow: '0 0 10px 10px rgba(0, 0, 0, 0.1)',
                            }}
                            options={mapOptions}
                        >
                            {Object.values(parkingLocations).map((location, index) => (
                                <Marker
                                    key={index}
                                    position={location.position}
                                    title={`Parking Location: ${location.status}`} // Show the current status on marker
                                />
                            ))}
                        </Map>
                    </APIProvider>
                </div>
                


                <div className="parkingarea">
                    
                    
                    {selectedParking ? (
                        <>
                            <p><strong>{parkingLocations[selectedParking].address}</strong></p>
                            <p>Status: {parkingLocations[selectedParking].status}</p>
                            <div className="status-buttons">
                                <button
                                    className="level-1"
                                    onClick={() => handleStatusChange(selectedParking, 'Completely Empty')}
                                >
                                    Completely Empty
                                </button>
                                <button
                                    className="level-2"
                                    onClick={() => handleStatusChange(selectedParking, 'Mostly Empty')}
                                >
                                    Mostly Empty
                                </button>
                                <button
                                    className="level-3"
                                    onClick={() => handleStatusChange(selectedParking, 'Moderately Busy')}
                                >
                                    Moderately Busy
                                </button>
                                <button
                                    className="level-4"
                                    onClick={() => handleStatusChange(selectedParking, 'Almost Full')}
                                >
                                    Almost Full
                                </button>
                                <button
                                    className="level-5"
                                    onClick={() => handleStatusChange(selectedParking, 'Full')}
                                >
                                    Full
                                </button>
                                
                            </div>
                        </>
                    ) : (
                        <p>Select a parking lot to view or update live statuses.</p>
                    )}
                </div>
                <div className='coverup'></div>
                <div className='coverup1'></div>
                <div className='coverup2'></div>
            </div>

            <div className="buttons">
                <button className="button1" onClick={() => handleParkingClick('duckPond')}>
                    Duck Pond Parking
                </button>
                <button className="button2" onClick={() => handleParkingClick('jenkins')}>
                    Jenkins Parking Garage
                </button>
                <button className="button3" onClick={() => handleParkingClick('asp')}>
                    Asp Parking Garage
                </button>
                <button className="button4" onClick={() => handleParkingClick('elm')}>
                    Elm Parking Garage
                </button>
                <button className="button6" onClick={() => handleParkingClick('timberdell')}>
                    Timberdell Parking Garage
                </button>
                <button className="button5" onClick={handleShowAllClick}>
                    Show All
                </button>
            </div>
        </div>
    );
};

export default MapPage;
