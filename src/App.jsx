import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import SearchForm from "./components/SearchForm";
import PropertyCard from "./components/PropertyCard";
import PropertyDetails from "./pages/PropertyDetails";
import data from "./data/properties.json";
import "./App.css";

function App() {
  const [properties] = useState(data.properties);
  const [results, setResults] = useState(data.properties);
  const [favourites, setFavourites] = useState([]);

  // SEARCH
  const handleSearch = (criteria) => {
    const filtered = properties.filter((property) => {
      const propertyDate = new Date(property.dateAdded);

      return (
        (criteria.type === "Any" || property.type === criteria.type) &&
        (!criteria.minPrice || property.price >= criteria.minPrice) &&
        (!criteria.maxPrice || property.price <= criteria.maxPrice) &&
        (!criteria.minBedrooms || property.bedrooms >= criteria.minBedrooms) &&
        (!criteria.maxBedrooms || property.bedrooms <= criteria.maxBedrooms) &&
        (!criteria.startDate ||
          propertyDate >= new Date(criteria.startDate)) &&
        (!criteria.endDate ||
          propertyDate <= new Date(criteria.endDate)) &&
        (!criteria.postcode ||
          property.location
            .toUpperCase()
            .includes(criteria.postcode.toUpperCase()))
      );
    });

    setResults(filtered);
  };

  // RESET SEARCH ✅
  const resetSearch = () => {
    setResults(properties);
  };

  // FAVOURITES
  const addFavourite = (property) => {
    if (!favourites.find((fav) => fav.id === property.id)) {
      setFavourites([...favourites, property]);
    }
  };

  const removeFavourite = (id) => {
    setFavourites(favourites.filter((fav) => fav.id !== id));
  };

  return (
    <div className="page">
      <Routes>

        {/* HOME PAGE */}
        <Route
          path="/"
          element={
            <>
              <SearchForm
                onSearch={handleSearch}
                onReset={resetSearch}
              />

              <main className="content">
                <h2>Results ({results.length})</h2>

                <div className="results-grid">
                  {results.map((property) => (
                    <PropertyCard
                      key={property.id}
                      property={property}
                      onFavourite={addFavourite}
                    />
                  ))}
                </div>
              </main>

              {/* FAVOURITES */}
              <section className="favourites">
                <h2>Favourites</h2>

                {favourites.length === 0 && <p>No favourites yet</p>}

                <ul className="favourites-list">
                  {favourites.map((fav) => (
                    <li key={fav.id} className="favourite-item">
                      <img
                        src={fav.picture}
                        alt={fav.type}
                        className="favourite-image"
                      />

                      <div className="favourite-info">
                        <strong>{fav.type}</strong>
                        <p>£{fav.price.toLocaleString()}</p>
                        <p>{fav.bedrooms} bedrooms</p>
                        <p>{fav.location}</p>
                      </div>

                      <button
                        className="remove-fav"
                        onClick={() => removeFavourite(fav.id)}
                      >
                        Remove ❌
                      </button>
                    </li>
                  ))}
                </ul>

                {favourites.length > 0 && (
                  <button onClick={() => setFavourites([])}>
                    Clear Favourites
                  </button>
                )}
              </section>
            </>
          }
        />

        {/* PROPERTY DETAILS PAGE */}
        <Route path="/property/:id" element={<PropertyDetails />} />

      </Routes>
    </div>
  );
}

export default App;
