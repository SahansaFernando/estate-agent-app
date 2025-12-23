import { useState } from "react";
import { DropdownList, NumberPicker, DatePicker } from "react-widgets";
import "react-widgets/styles.css";

function SearchForm({ onSearch, onReset }) {
  const initialState = {
    type: "Any",
    minPrice: null,
    maxPrice: null,
    minBedrooms: null,
    maxBedrooms: null,
    startDate: null,
    endDate: null,
    postcode: ""
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
          <DropdownList
            data={["Any", "House", "Flat"]}
            value={criteria.type}
            onChange={(value) =>
              setCriteria({ ...criteria, type: value })
            }
          />

          <NumberPicker
            placeholder="Min Price"
            value={criteria.minPrice}
            onChange={(value) =>
              setCriteria({ ...criteria, minPrice: value })
            }
          />

          <NumberPicker
            placeholder="Max Price"
            value={criteria.maxPrice}
            onChange={(value) =>
              setCriteria({ ...criteria, maxPrice: value })
            }
          />

          <NumberPicker
            placeholder="Min Bedrooms"
            value={criteria.minBedrooms}
            onChange={(value) =>
              setCriteria({ ...criteria, minBedrooms: value })
            }
          />

          <NumberPicker
            placeholder="Max Bedrooms"
            value={criteria.maxBedrooms}
            onChange={(value) =>
              setCriteria({ ...criteria, maxBedrooms: value })
            }
          />

          <DatePicker
            placeholder="Added After"
            value={criteria.startDate}
            onChange={(value) =>
              setCriteria({ ...criteria, startDate: value })
            }
          />

          <DatePicker
            placeholder="Added Before"
            value={criteria.endDate}
            onChange={(value) =>
              setCriteria({ ...criteria, endDate: value })
            }
          />

          <input
            type="text"
            placeholder="Postcode area (e.g. BR5)"
            value={criteria.postcode}
            onChange={(e) =>
              setCriteria({ ...criteria, postcode: e.target.value })
            }
          />

          <button type="submit">Search</button>
          <button type="button" onClick={handleReset}>
            Reset
          </button>
        </form>
      </div>
    </section>
  );
}

export default SearchForm;
