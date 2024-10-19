// src/App.js
import React from 'react';
// src/index.js
import 'bootstrap/dist/css/bootstrap.min.css';

import Weather from './Weather';

const App = () => {
    return (
        <div>
            <header className="bg-primary text-white text-center py-3">
                <h1>Weather App</h1>
                <p>Get the latest weather updates</p>
            </header>

            <main className="container my-4">
                <Weather />
            </main>

            <footer className="bg-light text-center py-3">
                <p>&copy; {new Date().getFullYear()} Weather App. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default App;
