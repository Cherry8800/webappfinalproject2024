import React from 'react';
import '../styles/AboutUs.css';

const AboutUsPage = () => {
  return (
    <div className="about-us-container">
      <h1>Welcome to the Schedule Managing System!</h1>
      <p>
        At <strong>QueueCare</strong>, we aim to simplify and streamline the scheduling process for healthcare professionals and their patients. 
        Our system is designed to provide an efficient and reliable solution for managing appointments with ease.
      </p>
      <h2>Our Mission</h2>
      <p>
        We believe in empowering clinics and hospitals by providing a system that reduces administrative workload, minimizes scheduling errors, 
        and enhances patient satisfaction. With our platform, healthcare providers can focus more on delivering quality care.
      </p>
      <h2>Why Choose Us?</h2>
      <ul>
        <li>Easy-to-use interface for both staff and patients.</li>
        <li>Customizable scheduling options tailored to your needs.</li>
        <li>Secure data management to protect patient privacy.</li>
        <li>Real-time updates and notifications for efficient communication.</li>
        <li>Dedicated support to ensure a seamless experience.</li>
      </ul>
      <p>
        Join us in revolutionizing healthcare management and ensuring a smoother experience for everyone involved.
      </p>
      <p><strong>Let’s schedule the future, together.</strong></p>
    </div>
  );
};

export default AboutUsPage;