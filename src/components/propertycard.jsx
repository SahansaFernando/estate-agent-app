import { Link } from "react-router-dom";

function PropertyCard({ property, onFavourite }) {
  return (
    <Link
      to={`/property/${property.id}`}
      className="property-card"
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <img
        src={property.heroImages?.[0] || property.picture}
        alt={property.type}
        className="property-image"
      />

      <div className="property-info">
        <h3>{property.type}</h3>
        <p><strong>£{property.price.toLocaleString()}</strong></p>
        <p>{property.bedrooms} bedrooms</p>
        <p>{property.location}</p>

       <button
  className="add-fav"
  onClick={(e) => {
    e.preventDefault();
    onFavourite(property);
  }}
>
   Add to Favourites ⭐
</button>
      </div>
    </Link>
  );
}

export default PropertyCard;
