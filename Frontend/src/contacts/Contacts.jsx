import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Contact from '../components/Contact'; // relative path to the Contact component

const ContactsPage = () => {
  return (
    <>
      <Navbar />
      <div>
        <Contact />
      </div>
      <Footer />
    </>
  );
};

export default ContactsPage;
