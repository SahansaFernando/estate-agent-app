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

  if (!property) {
    return <p>Property not found</p>;
  }

  const imageEntries = Object.entries(property.images || {});
  const [mainImage, setMainImage] = useState(property.picture);

  return (
    <div className="content">
      <Link to="/">⬅ Back to results</Link>

      <h2>{property.type}</h2>
      <p><strong>£{property.price.toLocaleString()}</strong></p>
      <p>{property.bedrooms} bedrooms · {property.location}</p>

      {/* MAIN IMAGE */}
      <img
        src={mainImage}
        alt="Main property"
        className="main-image"
      />

      {/* IMAGE GALLERY / THUMBNAILS */}
      <div className="thumbnail-row">
        {imageEntries.map(([label, img]) => (
          <img
            key={label}
            src={img}
            alt={label}
            className={`thumbnail ${
              img === mainImage ? "active" : ""
            }`}
            onClick={() => setMainImage(img)}
            title={label}
          />
        ))}
      </div>

      {/* REACT TABS */}
      <Tabs>
        <TabList>
          <Tab>Description</Tab>
          <Tab>Floor Plan</Tab>
          <Tab>Location</Tab>
        </TabList>

        {/* DESCRIPTION TAB */}
        <TabPanel>
          <p className="tab-content">
            {property.description}
          </p>
        </TabPanel>

        {/* FLOOR PLAN TAB */}
        <TabPanel>
          <img
            src={property.floorPlan}
            alt="Floor plan"
            className="floorplan-image"
          />
        </TabPanel>

        {/* GOOGLE MAP TAB */}
        <TabPanel>
          <iframe
            title="map"
            width="100%"
            height="400"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            src={`https://www.google.com/maps?q=${property.lat},${property.lng}&z=15&output=embed`}
          />
        </TabPanel>
      </Tabs>
    </div>
  );
}

export default PropertyDetails;
