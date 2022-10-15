import React from "react";
import OurBusinesses from "./OurBusinesses";
// images
import businesses1 from "../../../images/BusinessPage/businesses1.jpg";

function BusinessPageContent() {
  const content1 =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum repudiandae enim a molestiae? Ut a corporis, odio dolor atque commodi.";
  const content2 =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum repudiandae enim a molestiae? Ut a corporis, odio dolor atque commodi.";
  const content3 =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum repudiandae enim a molestiae? Ut a corporis, odio dolor atque commodi.";
  return (
    <div className="business_page_content">
      <div className="our_businesses">
        <OurBusinesses header="VESTEGE" content={content1} img={businesses1} />
        <OurBusinesses
          header="HRITVI HEALTH"
          content={content2}
          img={businesses1}
        />
        <OurBusinesses
          header="HRITVI SAATVA"
          content={content3}
          img={businesses1}
        />
      </div>
    </div>
  );
}

export default BusinessPageContent;
