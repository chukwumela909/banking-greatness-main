import Footer from "@/components/main/Footer/Footer";
import Contact from "@/components/main/contact/Contact";
import Navbar from "@/components/main/navbar/Navbar";
import React from "react";

export default function page() {
  return (
    <div>
      <Navbar />

      <Contact />
      <Footer />
    </div>
  );
}
