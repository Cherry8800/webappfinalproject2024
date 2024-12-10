import React from 'react';
import '../styles/ClinicTeam.css';

const ClinicTeamPage = () => {
  return (
    <div className="clinic-team-container">
      <h1>Meet Our Clinic Team</h1>
      <p>
        Our dedicated team of healthcare professionals is here to provide you with the best care possible. 
        Learn more about each team member by clicking on their profiles below.
      </p>
      <ul className="team-list">
        <li><a href="https://www.mlmedical.com/">Maple Leaf Medical Clinic</a></li>
        <li><a href="https://www.stoneclinic.com/">Stone Clinic</a></li>
        <li><a href="https://icloudhospital.com/">Cloud Hospital</a></li>
        <li><a href="https://www.sinaihealth.ca/our-hospitals/mount-sinai-hospital">Mountain Sinai Hospital</a></li>
        <li><a href="https://www.treetophospital.com/">Tree Top Hospital</a></li>
      </ul>
      <p>
        Our team is committed to your well-being and ensuring you receive personalized and effective care.
      </p>
    </div>
  );
};

export default ClinicTeamPage;