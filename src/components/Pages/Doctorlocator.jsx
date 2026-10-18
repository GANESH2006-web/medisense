import React, { useState } from 'react';
import axios from 'axios';

const HospitalSearch = () => {
    const [locationName, setLocationName] = useState('');
    const [specialty, setSpecialty] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    // Step 1: Geocode Location to Lat/Lon
    const geocodeLocation = async (location) => {
        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`;
        try {
            const response = await axios.get(url);
            if (response.data.length === 0) throw new Error('Location not found');
            const { lat, lon } = response.data[0];
            return { lat, lon };
        } catch (error) {
            console.error('Geocoding error:', error);
            return null;
        }
    };

    // Step 2: Fetch Hospitals/Clinics based on Specialty
    const searchHospitals = async (lat, lon, specialty) => {
        const radius = 5000; // 5 km radius
        const overpassUrl = 'https://overpass-api.de/api/interpreter';

        // Dynamically search based on specialty
        const query = `
      [out:json];
      (
        node["amenity"="hospital"]["name"~"${specialty}", i](around:${radius},${lat},${lon});
        node["healthcare"="clinic"]["name"~"${specialty}", i](around:${radius},${lat},${lon});
        node["healthcare:speciality"~"${specialty}", i](around:${radius},${lat},${lon});
      );
      out;
    `;

        try {
            const response = await axios.post(overpassUrl, `data=${encodeURIComponent(query)}`, {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            });

            return response.data.elements;
        } catch (error) {
            console.error('Overpass API error:', error);
            return [];
        }
    };

    // Step 3: Handle Form Submit
    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        setResults([]);

        // Get lat/lon for the location name
        const location = await geocodeLocation(locationName);
        if (!location) {
            alert('Location not found!');
            setLoading(false);
            return;
        }

        // Fetch hospitals matching specialty
        const hospitals = await searchHospitals(location.lat, location.lon, specialty);
        setResults(hospitals);
        setLoading(false);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-4xl text-teal-400 font-bold font-playwrite text-center mb-10 dark:text-blue-400">
                Find Nearby Hospitals by Specialty
            </h2>

            <form onSubmit={handleSearch}
                  className="bg-white shadow-md rounded-xl p-8 space-y-6 max-w-xl mx-auto dark:bg-gray-800">
                <div>
                    <label htmlFor="location"
                           className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Location
                    </label>
                    <input
                        id="location"
                        type="text"
                        placeholder="Enter Location (e.g., Hyderabad)"
                        value={locationName}
                        onChange={(e) => setLocationName(e.target.value)}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-teal-400 focus:border-teal-400 dark:bg-gray-700 dark:text-white"
                    />
                </div>

                <div>
                    <label htmlFor="specialty"
                           className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Specialty
                    </label>
                    <input
                        id="specialty"
                        type="text"
                        placeholder="Enter Specialty (e.g., ENT, Cardiology)"
                        value={specialty}
                        onChange={(e) => setSpecialty(e.target.value)}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-teal-400 focus:border-teal-400 dark:bg-gray-700 dark:text-white"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-2 px-4 rounded-lg text-white font-semibold bg-teal-400 hover:bg-teal-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-400 dark:bg-blue-400 transition ${
                        loading ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                >
                    {loading ? 'Searching...' : 'Search'}
                </button>
            </form>

            <div className="max-w-xl mx-auto mt-10">
                {loading && (
                    <div className="text-center text-teal-400 font-semibold animate-pulse dark:text-blue-400">
                        Loading results...
                    </div>
                )}

                {results.length > 0 && (
                    <div className="bg-teal-50 rounded-xl p-6 shadow-md dark:bg-gray-900">
                        <h3 className="text-2xl font-semibold text-teal-400 mb-4 dark:text-blue-400">
                            Results:
                        </h3>
                        <ul className="space-y-4">
                            {results.map((hospital) => (
                                <li
                                    key={hospital.id}
                                    className="border border-gray-200 rounded-lg p-4 bg-white hover:shadow-lg transition dark:bg-gray-800 dark:border-gray-700"
                                >
                                    <p className="font-bold text-gray-800 dark:text-blue-400">
                                        {hospital.tags.name || 'Unnamed Hospital/Clinic'}
                                    </p>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">
                                        Latitude: {hospital.lat}, Longitude: {hospital.lon}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HospitalSearch;
