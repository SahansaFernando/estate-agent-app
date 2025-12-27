import { useState } from "react";
import { DropdownList, NumberPicker, DatePicker } from "react-widgets";
import "react-widgets/styles.css"; // necessary for the widgets


// ===========================
// Number Picker Component
// ===========================
function NumberWithControls({ value, step, min = 0, placeholder, onChange }) {
  return (
    <NumberPicker
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      min={min}
      step={step}
      className="number-picker"
    />
  );
}

// ===========================
// Main Search Form
// ===========================
function SearchForm({ onSearch, onReset }) {
  const initialState = {
    type: "Any",
    minPrice: null,
    maxPrice: null,
    minBedrooms: null,
    maxBedrooms: null,
    startDate: null,
    endDate: null,
    postcode: "",
  };

  const [criteria, setCriteria] = useState(initialState);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(criteria);
  };

  const handleReset = () => {
    setCriteria(initialState);
    onReset();
  };

  return (
    <section className="hero">
      <h1>You dream it, we find it</h1>
      <div className="search-card">
        <h2>Search Properties</h2>
        <form className="search-bar" onSubmit={handleSubmit}>
          {/* Property Type */}
          <DropdownList
            data={["Any", "House", "Flat"]}
            value={criteria.type}
            onChange={(value) => setCriteria({ ...criteria, type: value })}
          />

          {/* Prices */}
          <NumberWithControls
            placeholder="Min Price"
            step={1000}
            value={criteria.minPrice}
            onChange={(v) => setCriteria({ ...criteria, minPrice: v })}
          />
          <NumberWithControls
            placeholder="Max Price"
            step={1000}
            value={criteria.maxPrice}
            onChange={(v) => setCriteria({ ...criteria, maxPrice: v })}
          />

          {/* Bedrooms */}
          <NumberWithControls
            placeholder="Min Bedrooms"
            step={1}
            value={criteria.minBedrooms}
            onChange={(v) => setCriteria({ ...criteria, minBedrooms: v })}
          />
          <NumberWithControls
            placeholder="Max Bedrooms"
            step={1}
            value={criteria.maxBedrooms}
            onChange={(v) => setCriteria({ ...criteria, maxBedrooms: v })}
          />

          {/* Dates */}
          <DatePicker
            placeholder="Added After DD/MM/YYYY"
            value={criteria.startDate}
            onChange={(date) => setCriteria({ ...criteria, startDate: date })}
            valueFormat="DD/MM/YYYY"
          />
          <DatePicker
            placeholder="Added Before DD/MM/YYYY"
            value={criteria.endDate}
            onChange={(date) => setCriteria({ ...criteria, endDate: date })}
            valueFormat="DD/MM/YYYY"
          />

          {/* Postcode */}
          <input
            type="text"
            placeholder="Postcode area (e.g. BR5)"
            value={criteria.postcode}
            onChange={(e) =>
              setCriteria({ ...criteria, postcode: e.target.value })
            }
          />

          {/* Buttons */}
          <div className="search-buttons">
            <button type="submit" className="btn-search">
              Search
            </button>
            <button type="button" className="btn-reset" onClick={handleReset}>
              Reset
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default SearchForm;
