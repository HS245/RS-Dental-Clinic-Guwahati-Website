import React, { useState } from "react";
import "./App.css";
import logo from "./assets/logo.png";
import drTkImage from "./assets/Dr. Tk.jpeg"; // Dr. Taslima Khan image
import dentalMicroscopy from "./assets/dental-microscopy.mp4";

const StarRating = () => {
  return (
    <div className="star-rating">
      {[...Array(5)].map((_, index) => (
        <span key={index} className="star" role="img" aria-label="star">
          ⭐
        </span>
      ))}
    </div>
  );
};

const services = [
  {
    title: "Preventive Dental Care Guwahati",
    description:
      "Comprehensive dental exams, professional teeth cleanings, and advanced digital X-rays to keep every smile healthy year-round. Regular preventive care at our Dhirenpara clinic helps avoid costly dental problems.",
  },
  {
    title: "Cosmetic Dentistry Services",
    description:
      "Professional smile transformations with teeth whitening, porcelain veneers, and dental bonding tailored to your aesthetic goals. Achieve the perfect smile at Guwahati's premier cosmetic dental clinic.",
  },
  {
    title: "Restorative Dental Solutions",
    description:
      "Durable dental crowns, implants, and natural-looking tooth-colored fillings designed for lasting comfort and optimal function. Expert restorative dentistry in Guwahati, Assam.",
  },
  {
    title: "Emergency Dental Care",
    description:
      "Same-day emergency dental relief for severe toothaches, dental trauma, chips, and other urgent dental concerns. Available when you need immediate dental care in Guwahati.",
  },
];

const specialties = [
  {
    title: "Family Focused",
    copy: "From first check-ups to senior care, we personalize visits for every stage of life.",
  },
  {
    title: "Comfort Technology",
    copy: "Modern equipment, gentle techniques, and sedation options reduce anxiety and downtime.",
  },
  {
    title: "Flexible Scheduling",
    copy: "Evening appointments and text reminders make it easy to stay on track with treatment.",
  },
];

const testimonials = [
  {
    quote:
      "As an NRI i went to the clinic which was refered by my relatives. I hv done my scaling and other which was very good and comfortable.Price:Budgetable.Treatment:very good. Behaviour:polite. So I referred others to visit and give a chance.Regards",
    name: "Abdul Kayum",
    service: "Smile makeover patient",
  },
  {
    quote:
      "I highly recommend RS Dental clinic to anyone seeking dental care. Her professionalism, expertise, and genuine concern for her patients make her an outstanding dental doctor. I have complete confidence in her abilities, and I will definitely be returning for my future dental needs",
    name: "Amit Varma",
    service: "Family dentistry patient",
  },
  {
    quote:
      "Great service, wonderful and warm experience from start to finish. Soft spoken and will make sure if the patient is comfortable throughout the session. Highly recommend Dr. Taslima Khan for any dental needs.",
    name: "Nagma Begum",
    service: "Emergency visit",
  },
];

function AppointmentForm() {
  const timeSlots = [
    "Select preferred time",
    "1:30 PM",
    "2:00 PM",
    "2:30 PM",
    "3:00 PM",
    "3:30 PM",
    "4:00 PM",
    "4:30 PM",
    "5:00 PM",
  ];

  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    date: "",
    time: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    // Basic form validation
    if (
      !form.name.trim() ||
      !form.email.trim() ||
      !form.mobile.trim() ||
      !form.date ||
      !form.time
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      alert("Please enter a valid email address.");
      return;
    }

    // Mobile number validation (basic)
    const mobileRegex = /^[0-9]{10}$/;
    if (!mobileRegex.test(form.mobile.replace(/[^0-9]/g, ""))) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }

    setSubmitting(true);

    try {
      // Use no-cors mode to bypass CORS restrictions
      const res = await fetch(
        "https://script.google.com/macros/s/AKfycbxptvZ9w8m-Q6wNYEstQMkqSylKY0sI--VXDnqk-YIV14E-D1C2zH_WhhTQvUeO0IbfjQ/exec",
        {
          method: "POST",
          mode: "no-cors", // This bypasses CORS but gives opaque response
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      // With no-cors mode, we can't read the response, but the request was sent
      // We'll assume success since the request went through
      alert(
        "Appointment request submitted! Dr. Taslima Khan will contact you soon."
      );

      // Reset form
      setForm({
        name: "",
        email: "",
        mobile: "",
        date: "",
        time: "",
        message: "",
      });
    } catch (err) {
      console.error("Appointment submit error:", err);
      alert(
        "We couldn't submit your request. Please try again or call the clinic directly at " +
          "+91 6001868643"
      );
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <form className="appointment-form" onSubmit={handleSubmit}>
      <h3>Book Appointment with Dr. Taslima Khan</h3>
      <input
        type="text"
        name="name"
        value={form.name}
        placeholder="Full Name"
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        value={form.email}
        placeholder="Email Address"
        onChange={handleChange}
        required
      />
      <input
        type="tel"
        name="mobile"
        value={form.mobile}
        placeholder="Mobile Number"
        onChange={handleChange}
        required
      />
      <input
        type="date"
        name="date"
        value={form.date}
        onChange={handleChange}
        min={new Date().toISOString().split("T")[0]}
        required
      />
      <select
        name="time"
        value={form.time}
        onChange={handleChange}
        required
        className="time-select"
      >
        {timeSlots.map((slot, index) => (
          <option
            key={index}
            value={index === 0 ? "" : slot}
            disabled={index === 0}
          >
            {slot}
          </option>
        ))}
      </select>
      <textarea
        name="message"
        value={form.message}
        placeholder="Additional Message (Optional)"
        onChange={handleChange}
        rows="3"
      />
      <button type="submit" className="btn primary" disabled={submitting}>
        <span className="btn-text">
          {submitting ? "Sending..." : "Request Appointment"}
        </span>
      </button>
    </form>
  );
}

function HamburgerMenu({ links }) {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => {
    setOpen(!open);
  };

  const closeMenu = () => {
    setOpen(false);
  };

  return (
    <nav className="hamburger-nav">
      <div
        className={`hamburger-icon ${open ? "open" : ""}`}
        onClick={toggleMenu}
        aria-label="Toggle menu"
        role="button"
        tabIndex={0}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Overlay to close menu when clicking outside */}
      {open && <div className="menu-overlay" onClick={closeMenu}></div>}

      <ul className={`nav-links ${open ? "open" : ""}`}>
        {links.map((link) => (
          <li key={link}>
            <a
              href={`#${link.toLowerCase().replace(/ /g, "-")}`}
              onClick={closeMenu}
            >
              {link}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function App() {
  const clinic = {
    name: "RS Dental Clinic",
    address: "M Market, 25, A K Deb Road, Dhirenpara, Guwahati, Assam 781025",
    phone: "+91 6001868643",
    email: "rsdentalclinic43@gmail.com",
    timings: {
      Monday: "10:00 AM - 01:00 PM- Evening- 05:00 PM - 08:00 PM",
      Tuesday: "10:00 AM - 01:00 PM- Evening- 05:00 PM - 08:00 PM",
      Wednesday: "10:00 AM - 01:00 PM- Evening- 05:00 PM - 08:00 PM",
      Thursday: "10:00 AM - 01:00 PM- Evening- 05:00 PM - 08:00 PM",
      Friday: "10:00 AM - 01:00 PM- Evening- 05:00 PM - 08:00 PM",
      Saturday: "10:00 AM - 01:00 PM- Evening- 05:00 PM - 08:00 PM",
      Sunday: "10:00 AM - 01:00 PM",
      ByAppointment: "01:30 PM - 05:00 PM Monday to Saturday",
    },
    doctor: {
      name: "Dr. Taslima Khan",
      role: "Lead Dentist",
      focus:
        "Provides Compassionate, Gentle care with a Focus on Patient Trust and Comfort.",
    },
  };

  const navLinks = ["Home", "Services", "About", "Appointment", "Contact"];

  return (
    <div className="app">
      {/* Move navigation out of header so fixed nav does not overlap header content */}
      <nav className="top-nav">
        <a
          href="#home"
          className="brand"
          style={{
            textDecoration: "none",
            color: "inherit",
            display: "flex",
            alignItems: "center",
          }}
        >
          <img src={logo} alt="RS Dental Clinic Guwahati Logo - Best Dentist in Dhirenpara" className="Clinic-logo" />
          RS Dental Clinic
        </a>
        <HamburgerMenu links={navLinks} />
      </nav>

      <header className="hero" id="home">
        <div className="hero-content">
          <div className="hero-text">
            <p className="hero-tagline">
              Gentle, personalized dentistry for every smile
            </p>
            <h1>Best Dental Clinic in Guwahati - Your Neighborhood Home for Confident, Healthy Smiles</h1>
            <p className="hero-description">
              Dr. Taslima Khan and our experienced team at RS Dental Clinic deliver high-quality, compassionate
              dental care in Dhirenpara, Guwahati using advanced technology. New patients welcome, same-day and
              evening appointments available. Serving Guwahati, Assam with excellence.
            </p>
            <div className="hero-actions">
              <a
                className="btn primary"
                href={`tel:${clinic.phone.replace(/[^0-9]/g, "")}`}
              >
                <span className="btn-text">Call {clinic.phone}</span>
              </a>
              <a className="btn ghost" href="#appointment">
                <span className="btn-text">Schedule Online</span>
              </a>
            </div>
            <ul className="hero-highlights">
              <li>Affordable transparent pricing</li>
              <li>Best Dental Services</li>
              <li>Comfort On-site services</li>
            </ul>
          </div>
          <div className="hero-visual" aria-hidden="true">
            <video
              src={dentalMicroscopy}
              autoPlay
              loop
              muted
              playsInline
              className="hero-video"
            ></video>

            <div className="hero-card">
              <span className="hero-card-label">Book Your Appointment</span>
              <div className="hero-card-day">Today</div>
              <div className="hero-card-time">Available</div>
              <p className="hero-card-note">Slots open</p>
            </div>
          </div>
        </div>
      </header>

      <main>
        <section className="section services" id="services">
          <div className="section-heading">
            <h2>Comprehensive Dental Services in Guwahati Under One Roof</h2>
            <p>
              At RS Dental Clinic Dhirenpara, our customized treatment plans keep your smile bright. We focus on
              prevention first and support you with advanced restorative and cosmetic dental care when you need it.
              Serving patients across Guwahati, Assam with state-of-the-art dental technology.
            </p>
          </div>
          <div className="grid">
            {services.map((service) => (
              <article key={service.title} className="card">
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section specialties">
          <div className="section-heading">
            <h2>
              We plan every visit around comfort, clarity, and lasting results
            </h2>
          </div>
          <div className="grid specialties-grid">
            {specialties.map((item) => (
              <div key={item.title} className="feature">
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="section about" id="about">
          <div className="section-heading">
            <h2>About RS Dental Clinic Guwahati - Leading Dental Care in Dhirenpara</h2>
            <p>
              Located at {clinic.address}, RS Dental Clinic is Guwahati's trusted dental care provider, offering
              high-quality, compassionate dental treatment in Dhirenpara, Assam. Our modern dental clinic uses 
              advanced technology and maintains a calming environment to ensure maximum patient comfort. Led by 
              experienced dentist {clinic.doctor.name}, patients of all ages receive personalized and gentle dental care, 
              with comprehensive services including professional teeth cleanings, dental crowns, restorations, 
              fluoride treatments, tooth extractions, orthodontics, dental implants, cosmetic dentistry, and emergency dental services.
            </p>
          </div>
          <div className="grid team-grid">
            <div className="team-card">
              <div className="avatar">
                <img src={drTkImage} alt="Dr. Taslima Khan - Best Dentist in Guwahati, Lead Dentist at RS Dental Clinic Dhirenpara" />
              </div>
              <h3>{clinic.doctor.name}</h3>
              <div className="role">{clinic.doctor.role}</div>
              <p>{clinic.doctor.focus}</p>
            </div>
          </div>
        </section>

        <section className="section testimonials">
          <div className="section-heading">
            <h2>Real stories from neighbors who trust us with their care</h2>
          </div>
          <div className="grid testimonials-grid">
            {testimonials.map((testimonial, idx) => (
              <article key={idx} className="testimonial">
                <p>"{testimonial.quote}"</p>
                <StarRating />
                <footer>
                  <div>{testimonial.name}</div>
                  <div className="service">{testimonial.service}</div>
                </footer>
              </article>
            ))}
          </div>
        </section>

        <section className="section appointment" id="appointment">
          <div className="section-heading">
            <h2>Schedule Your Dental Appointment in Guwahati Online</h2>
            <p>
              Book your dental appointment online with Dr. Taslima Khan at RS Dental Clinic Dhirenpara 
              and receive personalized, professional dental care in Guwahati, Assam. Same-day appointments available.
            </p>
          </div>
          <AppointmentForm />
        </section>

        <section className="section contact" id="contact">
          <div className="contact-card">
            <div>
              <h2>Visit RS Dental Clinic Guwahati and Experience Exceptional Dental Care</h2>
              <p>
                Call us at +91 6001868643 or book your dental appointment online anytime. We provide personalized
                dental treatment plans in Guwahati, Dhirenpara. Recognized as the best dental clinic in
                Guwahati, Assam with state-of-the-art facilities and experienced dental professionals.
              </p>
              <div className="contact-actions">
                <a
                  className="btn primary"
                  href={`tel:${clinic.phone.replace(/[^0-9]/g, "")}`}
                >
                  <span className="btn-text">Call {clinic.phone}</span>
                </a>
                <a className="btn ghost" href="#appointment">
                  <span className="btn-text">Book Appointment</span>
                </a>
                {/* Google Map location below buttons */}
                <div
                  style={{
                    width: "100%",
                    marginTop: "18px",
                    borderRadius: "18px",
                    overflow: "hidden",
                    maxWidth: "480px",
                    boxShadow: "0 2px 18px rgba(0,0,0,0.09)",
                    boxSizing: "border-box",
                  }}
                >
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3581.433201241327!2d91.726544!3d26.1500176!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x375a5bdca6031e57%3A0x3b1c91614b25a110!2sR%20S%20Dental%20Clinic%20(Dr.%20Taslima)!5e0!3m2!1sen!2sin!4v1760735506281!5m2!1sen!2sin"
                    width="100%"
                    height="230"
                    style={{ border: 0, borderRadius: "18px" }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="RS Dental Clinic Location"
                  ></iframe>
                </div>
              </div>
            </div>
            <div className="contact-details">
              <div>
                <h3>Visit Us</h3>
                <address>{clinic.address}</address>
                <p>
                  Phone:{" "}
                  <a href={`tel:${clinic.phone.replace(/[^0-9]/g, "")}`}>
                    {clinic.phone}
                  </a>
                </p>
                <p>
                  Email: <a href={`mailto:${clinic.email}`}>{clinic.email}</a>
                </p>
              </div>
              <div>
                <h3>Clinic Hours</h3>
                <ul>
                  {Object.entries(clinic.timings).map(([day, time]) => (
                    <li key={day}>
                      <strong>{day}:</strong> {time}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-content">
          <div>
            <span className="brand">RS Dental Clinic</span>
            <p>
              Compassionate care for confident smiles in Guwahati Dhirenpara and
              srrurrounding communities.
            </p>
          </div>
          <nav aria-label="Footer">
            {navLinks.map((link) => (
              <a key={link} href={`#${link.toLowerCase().replace(/ /g, "-")}`}>
                {link}
              </a>
            ))}
          </nav>
        </div>
        {/* <p className="footer-note">
          &copy; {new Date().getFullYear()} RS Dental Clinic. All rights
          reserved.
        </p> */}
        <div className="dev-credit">
          Site developed by
          <a
            href="https://github.com/HS245"
            target="_blank"
            rel="noopener noreferrer"
          >
            Hassan Shahid
          </a>
          •
          <a
            href="https://github.com/HS245"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          |
          <a
            href="https://www.linkedin.com/in/hassan-shahid-0991071a3"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          |
          <a
            href="https://www.instagram.com/__hs__0002/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </a>
          |
          <br />
          <a href="mailto:hassanshahid245@gmail.com">
            hassanshahid245@gmail.com
          </a>
          {/* Portfolio/Website: */}
          <br />
          <span className="dev-contact">
            Contact me for site development 👨‍💻
          </span>
        </div>
        <p
          className="footer-note"
          style={{
            marginTop: "7px",
            textAlign: "center",
            fontSize: "0.97em",
            color: "#999",
          }}
        >
          &copy; {new Date().getFullYear()} RS Dental Clinic. All rights
          reserved.
        </p>
      </footer>
    </div>
  );
}

export default App;
