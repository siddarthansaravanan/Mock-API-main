import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faBuilding, faBriefcase } from '@fortawesome/free-solid-svg-icons';

interface Contact {
  id: string;
  avatar: string;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  company: string;
  job_title: string;
}

const ContactList: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    axios.get('https://60ac9dff9e2d6b0017457815.mockapi.io/ag/contacts')
      .then((response) => {
        setContacts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching contacts:", error);
        setLoading(false);
      });
  }, []);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = "https://via.placeholder.com/80?text=No+Image";
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="contact-list">
      <h1>Contact Directory</h1>
      <div className="contact-grid">
        {contacts.map(contact => (
          <div key={contact.id} className="contact-card">
            <img 
              src={contact.avatar} 
              alt={`${contact.first_name} ${contact.last_name}`} 
              className="avatar" 
              onError={handleImageError} 
            />
            <div className="contact-details">
              <h2>{contact.first_name} {contact.last_name}</h2>
              <p><FontAwesomeIcon icon={faEnvelope} /> {contact.email}</p>
              <p><FontAwesomeIcon icon={faPhone} /> {contact.phone}</p>
              <p><FontAwesomeIcon icon={faBuilding} /> {contact.company}</p>
              <p><FontAwesomeIcon icon={faBriefcase} /> {contact.job_title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactList;
