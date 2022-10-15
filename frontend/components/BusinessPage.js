import React from "react";
import BusinessPageContent from "./BusinessPage/BusinessPageContent";
import BusinessPageLander from "./BusinessPage/BusinessPageLander";
import Hritvi from "./BusinessPage/Hritvi";
import Satvaa from "./BusinessPage/Satvaa";
import Vestege from "./BusinessPage/Vestege";

function BusinessPage() {
  return (
    <div className="mainBusinessPage">
      <BusinessPageLander />
      <BusinessPageContent />
      <Satvaa />
      <Hritvi />
      <Vestege />
    </div>
  );
}

export default BusinessPage;
