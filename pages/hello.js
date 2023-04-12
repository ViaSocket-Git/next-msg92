// Parent Component
import React from 'react';
import ProductComponent from "@/components/comps/productComp";
import json from "./content.json"; 

const ParentComponent = () => {
  const data = json.global.hello; 
  return (
    <>    
      <ProductComponent pageData={data} />    
    </>
  );
};

export default ParentComponent;