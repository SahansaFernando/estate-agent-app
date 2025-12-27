import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import data from "../data/properties.json";
import "../App.css";

function PropertyDetails() {
  const { id } = useParams();
  const property = data.properties.find(
    (p) => p.id.toString() === id
  );

  const [lightboxImage, setLightboxImage] = useState(null);

  if (!property) return <p>Property not found</p>;

  const imageEntries = Object.entries(property.images || {});

  return (
    <div className="property-page">

      {/* BACK LINK */}
      <Link to="/" className="back-link">⬅ Back to results</Link>

      {/* PROPERTY OVERVIEW CARD */}
      <div className="property-card-info">
        <h2>Property Overview</h2>
        <p><strong>Type:</strong> {property.type}</p>
        <p><strong>Price:</strong> £{property.price.toLocaleString()}</p>
        <p><strong>Bedrooms:</strong> {property.bedrooms}</p>
        <p><strong>Tenure:</strong> {property.tenure}</p>
        <p><strong>Location:</strong> {property.location}</p>
      </div>

      {/* MAIN IMAGE CARD */}
         <div className="main-image-card">
        <img
            src={property.heroImages[0]}
            alt="Main view"
            className="main-image primary"
        />

        <img
            src={property.heroImages[1]}
            alt="Secondary view"
            className="main-image secondary"
        />
        </div>

      {/* THUMBNAILS WITH LABELS */}
      <div className="thumbnail-row">
        {imageEntries.map(([label, img]) => (
          <div
            key={label}
            className="thumbnail"
            onClick={() => setLightboxImage(img)}
          >
            <img src={img} alt={label} />
            <span className="thumbnail-label">
              {label.replace(/([A-Z])/g, " $1")}
            </span>
          </div>
        ))}
      </div>

      {/* TABS */}
      <Tabs className="property-tabs">
        <TabList>
          <Tab>Description</Tab>
          <Tab>Floor Plan</Tab>
          <Tab>Location</Tab>
        </TabList>

        <TabPanel>
          <p className="description-text">{property.description}</p>
        </TabPanel>

        <TabPanel>
          <img
            src={property.floorPlan}
            alt="Floor plan"
            className="floorplan-image"
          />
        </TabPanel>

        <TabPanel>
          <iframe
            title="map"
            width="100%"
            height="400"
            style={{ border: 0 }}
            loading="lazy"
            src={`https://www.google.com/maps?q=${property.lat},${property.lng}&z=15&output=embed`}
          />
        </TabPanel>
      </Tabs>

      {/* LIGHTBOX */}
      {lightboxImage && (
        <div className="lightbox" onClick={() => setLightboxImage(null)}>
          <img src={lightboxImage} alt="Enlarged view" />
          <span className="close">✕</span>
        </div>
      )}

    </div>
  );
}

export default PropertyDetails;
