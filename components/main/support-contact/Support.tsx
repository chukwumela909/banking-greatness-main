import React from "react";
import SupportInfo from "./SupportInfo";
import ContactForm from "./ContactForm";
import Headerstuffs from "./Headerstuffs";

export default function SupportContact() {
  return (
    <div className="lg:mt-32 mt-44 mb-10 relative">
      <Headerstuffs />
      <div className="md:px-10 px-4 grid lg:grid-cols-3 grid-cols-1">
        <div className="premiere ">
          <SupportInfo />
        </div>
        <div className="col-span-2">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
