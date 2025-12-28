import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import SearchForm from "./components/SearchForm";
import PropertyCard from "./components/PropertyCard";
import PropertyDetails from "./pages/PropertyDetails";
import data from "./data/properties.json";
import "./App.css";
import "react-widgets/styles.css";



function App() {
  const [properties] = useState(data.properties);
  const [results, setResults] = useState(data.properties);
  const [favourites, setFavourites] = useState([]);
  const [draggingProperty, setDraggingProperty] = useState(null);
  const [draggingFavId, setDraggingFavId] = useState(null);
const handleSearch = (criteria) => {
  const filtered = properties.filter((property) => {
    // Convert property.dateAdded (DD/MM/YYYY) to Date object
    const [day, month, year] = property.dateAdded.split("/");
    const propertyDate = new Date(`${year}-${month}-${day}`);

    // Native HTML date input gives YYYY-MM-DD, convert directly
    const startDate = criteria.startDate ? new Date(criteria.startDate) : null;
    const endDate = criteria.endDate ? new Date(criteria.endDate) : null;

    return (
      (criteria.type === "Any" || property.type === criteria.type) &&
      (!criteria.minPrice || property.price >= criteria.minPrice) &&
      (!criteria.maxPrice || property.price <= criteria.maxPrice) &&
      (!criteria.minBedrooms || property.bedrooms >= criteria.minBedrooms) &&
      (!criteria.maxBedrooms || property.bedrooms <= criteria.maxBedrooms) &&
      (!startDate || propertyDate >= startDate) &&
      (!endDate || propertyDate <= endDate) &&
      (!criteria.postcode ||
        property.location.toUpperCase().includes(criteria.postcode.toUpperCase()))
    );
  });

  setResults(filtered);
};



  const resetSearch = () => {
    setResults(properties);
  };
  //  ADD FAVOURITE (CLICK OR DROP)
  const addFavourite = (property) => {
    if (!favourites.find((fav) => fav.id === property.id)) {
      setFavourites([...favourites, property]);
    }
  };
  //  REMOVE FAVOURITE
  const removeFavourite = (id) => {
    setFavourites(favourites.filter((fav) => fav.id !== id));
  };
  return (
    <div className="page">
      <Routes>
        {/* ================= HOME PAGE ================= */}
        <Route
          path="/"
          element={
            <>
              <SearchForm onSearch={handleSearch} onReset={resetSearch} />
              <main className="content">
                <h2>Results ({results.length})</h2>
                <div className="results-grid">
                  {results.map((property) => (
                    <div
                      key={property.id}
                      draggable
                      onDragStart={() => setDraggingProperty(property)}
                    >
                      <PropertyCard
                        property={property}
                        onFavourite={addFavourite}
                      />
                    </div>
                  ))}
                </div>
              </main>
              {/* ================= FAVOURITES ================= */}
              <section
                className="favourites"
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => {
                  if (draggingProperty) {
                    addFavourite(draggingProperty);
                    setDraggingProperty(null);
                  }
                }}
              >
                <h2>Favourites</h2>
                {/*  DROP ZONE INSIDE CARD */}
                <div
                  className="favourite-drop-card"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => {
                    if (draggingProperty) {
                      addFavourite(draggingProperty);
                      setDraggingProperty(null);
                    }
                  }}
                >
                  ⭐ Drag properties here to add to favourites
                </div>
                {favourites.length === 0 && <p>No favourites yet</p>}
                <ul className="favourites-list">
                  {favourites.map((fav) => (
                    <li
                      key={fav.id}
                      className="favourite-item"
                      draggable
                      onDragStart={() => setDraggingFavId(fav.id)}
                    >
                      <img
                        src={fav.heroImages?.[0] || fav.picture}
                        alt={fav.type}
                        className="favourite-image"
                      />
                      <div className="favourite-info">
                        <strong>{fav.type}</strong>
                        <p>£{fav.price.toLocaleString()}</p>
                        <p>{fav.bedrooms} bedrooms</p>
                        <p>{fav.location}</p>
                      </div>
                      {/* KEEP CLICK REMOVE */}
                      <button
                        className="remove-fav"
                        onClick={() => removeFavourite(fav.id)}
                      >
                        Remove ❌
                      </button>
                    </li>
                  ))}
                </ul>
                {/*  DRAG TO REMOVE */}
                {favourites.length > 0 && (
                  <>
                    <div
                      className="remove-zone"
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => {
                        if (draggingFavId) {
                          removeFavourite(draggingFavId);
                          setDraggingFavId(null);
                        }
                      }}
                    >
                      Drag here to remove❌
                    </div>
                    <button className="remove-fav" onClick={() => setFavourites([])}>
                       Clear All Favourites
                    </button>
                  </>
                )}
              </section>
            </>
          }
        />
        {/* ================= PROPERTY DETAILS ================= */}
        <Route path="/property/:id" element={<PropertyDetails />} />
      </Routes>
      <footer className="footer-bar">
  <div className="footer-content">
    <p>© 2025 Estate Agency</p>
    <p>📍 Address: London,United Kindom |
        📞 Phone: +44 20 7123 4567 |
        ✉️ Email: Estateagency@gmail.com </p>
  </div>
</footer>
    </div>
  );
}
export default App;
