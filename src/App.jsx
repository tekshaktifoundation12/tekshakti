import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import {
  ArrowRight,
  Award,
  CheckCircle2,
  Eye,
  Mail,
  MapPin,
  Menu,
  MonitorPlay,
  Phone,
  Target,
  Users,
  X,
} from "lucide-react";

import { FaLinkedinIn, FaInstagram } from "react-icons/fa";

/* =========================================================
   MAIN WEBSITE IMAGES
   Ye images src/assets/images folder me honi chahiye
========================================================= */

import tekshaktiLogo from "./assets/images/tekshakti-logo.png";
import heroImage from "./assets/images/hero-foundation.jpg";

import aboutLearningImage from "./assets/images/about-learning.jpg";
import aboutElectronicsImage from "./assets/images/about-electronics.jpg";
import aboutMentorshipImage from "./assets/images/about-mentorship.jpg";
import aboutCommunityImage from "./assets/images/about-community.jpg";

import founderImage from "./assets/images/founder.jpg";
import cofounderImage from "./assets/images/cofounder.jpg";
import advisorImage from "./assets/images/advisor.jpg";

/* =========================================================
   PARTNER LOGOS
   Ye images src/assets/images/partners folder me honi chahiye
========================================================= */

import glass3dLogo from "./assets/images/partners/3d_glass_solutions_logo.png";
import asipLogo from "./assets/images/partners/ASIP.png";
import cdilLogo from "./assets/images/partners/CDIL-Semiconductors-Yellow-Trans-Logo.png";
import cgPowerLogo from "./assets/images/partners/cg-power.png";
import hclFoxconnLogo from "./assets/images/partners/hcl-foxconn.png";
import kaynesLogo from "./assets/images/partners/kaynes.png";
import micronLogo from "./assets/images/partners/micron.png";
import sicsemLogo from "./assets/images/partners/sicsem.png";
import tataLogo from "./assets/images/partners/tata.png";
import teksysLogo from "./assets/images/partners/Teksys-logo.png";
import techdataxLogo from "./assets/images/partners/techdatax.png";

/* =========================================================
   ANIMATION SETTINGS
========================================================= */

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 45,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: "easeOut",
    },
  },
};

const slideLeft = {
  hidden: {
    opacity: 0,
    x: -60,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const slideRight = {
  hidden: {
    opacity: 0,
    x: 60,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.16,
    },
  },
};

/* =========================================================
   LEADERSHIP INFORMATION
========================================================= */

const leaders = [
  {
    role: "FOUNDER & DIRECTOR",
    name: "Sushmita Singh",
    image: founderImage,
    description:
      "A strategic technology and communications leader with over 13 years of experience across AI, electronics, semiconductor and enterprise sectors. She leads Tek-Shakti Foundation with a vision to empower youth, women and underserved communities through technology-driven education, innovation and digital inclusion.",
  },
  {
    role: "CO-FOUNDER & DIRECTOR",
    name: "Dr. Kumud Ranjan",
    image: cofounderImage,
    description:
      "Former Scientist at DRDO with over 20 years of expertise in defence electronics and semiconductor technologies. He mentors technical programs and guides the Foundation in building industry-relevant skills through learning, innovation and expert guidance.",
  },
  {
    role: "MENTOR & ADVISOR",
    name: "Mr. Nandkishore Choudhary",
    image: advisorImage,
    description:
      "He leads the Foundation's operations, educational programs and community initiatives. He ensures effective project execution, strengthens partnerships and supports meaningful learning opportunities that create lasting social impact.",
  },
];


/* =========================================================
   PARTNER LOGOS
========================================================= */

const partnerLogos = [
  {
    image: techdataxLogo,
    name: "TechDataX",
  },
  {
    image: teksysLogo,
    name: "Teksys Services",
  },
  {
    image: glass3dLogo,
    name: "3D Glass Solutions",
  },
  {
    image: asipLogo,
    name: "ASIP Technologies",
  },
  {
    image: cdilLogo,
    name: "CDIL Semiconductors",
  },
  {
    image: cgPowerLogo,
    name: "CG Power",
  },
  {
    image: hclFoxconnLogo,
    name: "HCL Foxconn",
  },
  {
    image: kaynesLogo,
    name: "Kaynes Semicon",
  },
  {
    image: micronLogo,
    name: "Micron",
  },
  {
    image: sicsemLogo,
    name: "SICSEM",
  },
  {
    image: tataLogo,
    name: "Tata Electronics",
  },
];

/* =========================================================
   REUSABLE COMPONENTS
========================================================= */

function SectionLabel({ children, light = false }) {
  return (
    <span className={`section-label ${light ? "light-label" : ""}`}>
      <span className="section-dot" />
      {children}
    </span>
  );
}

function BrandLogo({ footer = false }) {
  return (
    <a
      href="#home"
      className={`brand-logo ${footer ? "footer-logo" : ""}`}
      aria-label="Tek-Shakti Foundation Home"
    >
      <img src={tekshaktiLogo} alt="Tek-Shakti Foundation" />
    </a>
  );
}

function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    organisation: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState("");
 
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const validate = () => {
    if (!form.name.trim()) {
      setErrorMessage("Name is required.");
      return false;
    }
    const emailRe = /^\S+@\S+\.\S+$/;
    if (!emailRe.test(form.email)) {
      setErrorMessage("A valid email is required.");
      return false;
    }
    if (!form.message.trim()) {
      setErrorMessage("Message is required.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setStatus(null);
    if (!validate()) return;

    setLoading(true);

    try {
      const response = await fetch("https://formsubmit.co/ajax/tekshaktifoundation12@gmail.com", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone || "N/A",
          organisation: form.organisation || "N/A",
          subject: form.subject || "Website Enquiry",
          message: form.message,
          _replyto: form.email,
          _captcha: "false",
        }),
      });

      const result = await response.json();

if (response.ok && (result.success === true || result.success === "true")) {
  setStatus("success");

  setForm({
    name: "",
    email: "",
    phone: "",
    organisation: "",
    subject: "",
    message: "",
  });

  setShowSuccessPopup(true);
}else {
        throw new Error(
          result.message ||
            "Please activate the FormSubmit email link sent to tekshaktifoundation12@gmail.com, then try again."
        );
      }
    } catch (err) {
      setStatus("error");
      setErrorMessage(err?.message || "Unable to send your message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  if (!showSuccessPopup) return;

  const popupTimer = setTimeout(() => {
    setShowSuccessPopup(false);
    setStatus(null);
  }, 4000);

  return () => clearTimeout(popupTimer);
}, [showSuccessPopup]);

  return (
      <>
    <motion.form
      className="contact-form"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={slideRight}
      onSubmit={handleSubmit}
    >
      <h3>Send us a message</h3>

      <div className="form-grid">
        <label>
          Name *
          <input name="name" type="text" value={form.name} onChange={handleChange} required />
        </label>

        <label>
          Email *
          <input name="email" type="email" value={form.email} onChange={handleChange} required />
        </label>

        <label>
          Phone
          <input name="phone" type="tel" value={form.phone} onChange={handleChange} />
        </label>

        <label>
          Organisation / Institute
          <input name="organisation" type="text" value={form.organisation} onChange={handleChange} />
        </label>
      </div>

      <label>
        Subject
        <input name="subject" type="text" value={form.subject} onChange={handleChange} />
      </label>

      <label>
        Message *
        <textarea name="message" value={form.message} onChange={handleChange} required />
      </label>

      <button type="submit" disabled={loading}>
        {loading ? "Sending..." : "Send Message"}
      </button>

      {status === "error" && (
        <small className="form-error">{errorMessage || "Unable to send your message. Please try again."}</small>
      )}

      {status === null && errorMessage && (
        <small className="form-error">{errorMessage}</small>
      )}

      <small>
        By submitting, you agree to be contacted about your enquiry. Your information will not be shared.
      </small>
    </motion.form>

    {showSuccessPopup && (
      <div
        className="success-popup-overlay"
        role="dialog"
        aria-modal="true"
        aria-labelledby="success-popup-title"
      >
        <div className="success-popup">
          <div className="success-popup-icon">
            <CheckCircle2 size={38} />
          </div>

          <h3 id="success-popup-title">
            Message Sent Successfully!
          </h3>

          <p>
            Thank you for contacting Tek-Shakti Foundation. Our team will get
            back to you soon.
          </p>

          <button
            type="button"
            className="success-popup-close"
            onClick={() => {
              setShowSuccessPopup(false);
              setStatus(null);
            }}
          >
            Close
          </button>
        </div>
      </div>
    )}
  </>
);
}

function PartnerCarousel({ logos }) {
  const [paused, setPaused] = useState(false);
  const animatedLogos = [...logos, ...logos];

  return (
    <section className="partners-section">
      <div className="partners-inner">
        <div className="section-heading">
          <SectionLabel>OUR INDUSTRY & KNOWLEDGE PARTNERS</SectionLabel>
          <p>
            Trusted collaborators who support Tek-Shakti Foundation’s mission with
            innovation, education and industry expertise.
          </p>
        </div>

        <div
          className={`partners-carousel ${paused ? "paused" : ""}`}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="partners-track">
            {animatedLogos.map((partner, index) => (
              <div className="partner-slide" key={`${partner.name}-${index}`}>
                <div className="partner-card">
                  <img src={partner.image} alt={partner.name} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   MAIN APP
========================================================= */

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <div className="website">
      {/* =====================================================
          NAVBAR
      ====================================================== */}

      <header className="navbar">
        <div className="container navbar-inner">
          <BrandLogo />

          <button
            type="button"
            className="mobile-menu-button"
            aria-label="Toggle navigation"
            onClick={() => setMenuOpen((current) => !current)}
          >
            {menuOpen ? <X size={27} /> : <Menu size={27} />}
          </button>

          <nav className={menuOpen ? "nav-links open" : "nav-links"}>
            <a href="#home" onClick={closeMenu}>
              Home
            </a>

            <a href="#about" onClick={closeMenu}>
              About Us
            </a>

          <a href="/events" onClick={closeMenu}>
  Events
</a>

            <a href="#training" onClick={closeMenu}>
              Semiconductor Skill Training Program
            </a>

            <a href="#contact" onClick={closeMenu}>
              Contact Us
            </a>

            <a
              href="#contact"
              className="get-in-touch-button"
              onClick={closeMenu}
            >
              Get in Touch
            </a>
          </nav>
        </div>
      </header>

      <main>
        {/* =====================================================
            HERO SECTION
        ====================================================== */}

        <section className="hero-section" id="home">
          <div className="container hero-layout">
            <motion.div
              className="hero-content"
              initial="hidden"
              animate="visible"
              variants={slideLeft}
            >
              <span className="hero-label">A NON-PROFIT INITIATIVE</span>

              <h1>
                Empowering Communities.
                <span>Creating Future Innovators.</span>
              </h1>

              <p>
                Tek-Shakti Foundation works to make technology education,
                digital skills and semiconductor learning accessible to
                students, professionals and communities.
              </p>

              <a href="#about" className="primary-button">
                Know More About Us
                <ArrowRight size={19} />
              </a>
            </motion.div>

            <motion.div
              className="hero-image"
              initial="hidden"
              animate="visible"
              variants={slideRight}
            >
              <img
                src={heroImage}
                alt="Students participating in technology education"
              />
            </motion.div>
          </div>

          <div className="hero-bottom-wave" />
        </section>
      {/* =====================================================
    ABOUT TEK-SHAKTI FOUNDATION
====================================================== */}

<section className="about-foundation-section" id="about">
  <div className="about-wide-container">
    {/* CENTERED ABOUT HEADING */}

    <motion.div
      className="about-main-heading"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeUp}
    >
      <SectionLabel>ABOUT TEK-SHAKTI FOUNDATION</SectionLabel>

      <h2>
        Building Skills.
        <span>Building Opportunities.</span>
      </h2>

      <p>
        Tek-Shakti Foundation is a non-profit initiative committed to making
        technology education, digital literacy and emerging technology learning
        accessible to students and communities.
      </p>

      <p>
        Through expert-led online programs, mentorship, semiconductor awareness
        and community initiatives, we help learners build the knowledge,
        confidence and skills required for future opportunities.
      </p>
    </motion.div>

    {/* TWO LARGE FOUNDATION IMAGES */}

    <motion.div
      className="about-two-image-grid"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={staggerContainer}
    >
      <motion.figure className="about-large-image-card" variants={fadeUp}>
        <img
          src={aboutElectronicsImage}
          alt="Technology education initiative"
        />

        <figcaption>
          <span>01</span>

          <div>
            <h3>Technology Education</h3>

            <p>
              Digital learning, electronics awareness and emerging technology
              education for future-ready learners.
            </p>
          </div>
        </figcaption>
      </motion.figure>

      <motion.figure className="about-large-image-card" variants={fadeUp}>
        <img
          src={aboutCommunityImage}
          alt="Community empowerment initiative"
        />

        <figcaption>
          <span>02</span>

          <div>
            <h3>Community Empowerment</h3>

            <p>
              Creating inclusive learning opportunities that build confidence,
              awareness and long-term community impact.
            </p>
          </div>
        </figcaption>
      </motion.figure>
    </motion.div>

    {/* OUR VISION */}

    <div className="about-horizontal-section vision-horizontal-section">
      <motion.div
        className="about-horizontal-content"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={slideLeft}
      >
      

        <div className="about-section-icon">
          <Eye size={36} />
        </div>

        <SectionLabel>OUR VISION</SectionLabel>

        <h3>
          A future where every learner can innovate, participate and lead.
        </h3>

        <div className="about-purple-line" />

        <p>
          We envision an inclusive and future-ready society where students,
          professionals and communities can participate confidently in
          technology, innovation, research and the digital economy.
        </p>

        <div className="vision-highlight-list">
          <span>Accessible Education</span>
          <span>Future-Ready Skills</span>
          <span>Inclusive Innovation</span>
        </div>
      </motion.div>

      <motion.div
        className="about-horizontal-image"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={slideRight}
      >
        <img
          src={aboutLearningImage}
          alt="Students participating in a Tek-Shakti learning initiative"
        />
      </motion.div>
    </div>

    {/* OUR MISSION */}

    <div className="about-horizontal-section mission-horizontal-section">
      <motion.div
        className="about-horizontal-image"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={slideLeft}
      >
        <img
          src={aboutMentorshipImage}
          alt="Tek-Shakti mentorship and educational guidance"
        />
      </motion.div>

      <motion.div
        className="about-horizontal-content"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={slideRight}
      >

        <div className="about-section-icon">
          <Target size={36} />
        </div>

        <SectionLabel>OUR MISSION</SectionLabel>

        <h3>Empower. Educate. Elevate.</h3>

        <div className="about-purple-line" />

        <ul className="updated-mission-list">
          <li>
            <CheckCircle2 size={22} />

            <span>
              Make quality technology education and digital skills accessible
              to learners and communities.
            </span>
          </li>

          <li>
            <CheckCircle2 size={22} />

            <span>
              Promote semiconductor education and emerging technologies for
              future careers and innovation.
            </span>
          </li>

          <li>
            <CheckCircle2 size={22} />

            <span>
              Build an ecosystem of mentorship, research, collaboration and
              community development.
            </span>
          </li>
        </ul>
      </motion.div>
    </div>
  </div>
</section>

        {/* =====================================================
            SEMICONDUCTOR TRAINING
        ====================================================== */}

        <section className="training-section" id="training">
          <div className="training-decoration decoration-left" />
          <div className="training-decoration decoration-right" />

          <motion.div
            className="container training-content"
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.25,
            }}
            variants={fadeUp}
          >
            <SectionLabel light>TEK-SHAKTI TRAINING ACADEMY</SectionLabel>

            <h2>Semiconductor Skill Training Academy</h2>

            <p>
              Expert-led online programs covering semiconductor fundamentals,
              GaN, SiC, RF and microwave engineering, sensors, materials and
              advanced semiconductor systems.
            </p>

            <div className="training-features">
              <span>
                <Users size={18} />
                Industry Expert Faculty
              </span>

              <span>
                <MonitorPlay size={18} />
                100% Online Learning
              </span>

              <span>
                <Award size={18} />
                Global Certification with TechDataX
              </span>
            </div>

            <a href="#contact" className="training-button">
              Explore Our Programs
              <ArrowRight size={18} />
            </a>
          </motion.div>
        </section>

        {/* =====================================================
    LEADERSHIP
====================================================== */}

<section className="leadership-section">
  <div className="leadership-wide-container">
    <motion.div
      className="leadership-heading"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeUp}
    >
      <SectionLabel>OUR LEADERSHIP</SectionLabel>

      <h2>
        Meet the Leaders Behind
        <span>Our Mission</span>
      </h2>

      <p>
        Experienced professionals driving Tek-Shakti Foundation forward with
        expertise, vision and a strong commitment to empowering communities
        through education and technology.
      </p>
    </motion.div>

    <motion.div
      className="leadership-card-grid"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.12 }}
      variants={staggerContainer}
    >
      {leaders.map((leader) => (
        <motion.article
          className="leadership-profile-card"
          key={leader.name}
          variants={fadeUp}
        >
          <div className="leadership-photo-wrapper">
            <img
              src={leader.image}
              alt={leader.name}
              className="leadership-profile-photo"
            />
          </div>

          <div className="leadership-profile-content">
            <div className="leadership-role-row">
              <div className="leadership-person-icon">
                <Users size={22} />
              </div>

              <span>{leader.role}</span>
            </div>

            <h3>{leader.name}</h3>

            <div className="leadership-purple-line" />

            <p>{leader.description}</p>
          </div>
        </motion.article>
      ))}
    </motion.div>
  </div>
</section>

        {/* =====================================================
            CONTACT FORM
        ====================================================== */}

        <section className="contact-section" id="contact">
          <div className="container contact-layout">
            <motion.div
              className="contact-information"
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.2,
              }}
              variants={slideLeft}
            >
              <SectionLabel>GET IN TOUCH</SectionLabel>

              <h2>Talk to Tek-Shakti Foundation</h2>

              <div className="contact-item">
                <div className="contact-icon">
                  <Phone size={20} />
                </div>

                <div>
                  <span>PHONE</span>

                  <a href="tel:+918600418168">+91 86004 18168</a>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">
                  <Mail size={20} />
                </div>

                <div>
                  <span>EMAIL</span>

                  <a href="mailto:tekshaktifoundation12@gmail.com">
                    tekshaktifoundation12@gmail.com
                  </a>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">
                  <MapPin size={20} />
                </div>

                <div>
                  <span>LOCATION</span>

                  <p>Nagpur, Maharashtra, India</p>
                </div>
              </div>

              <iframe
                className="contact-map"
                title="Tek-Shakti Foundation Location"
                src="https://www.google.com/maps?q=TEK-SHAKTI+FOUNDATION,+Nagpur&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </motion.div>

            <ContactForm />
          </div>
        </section>

        {/* =====================================================
            CONTACT BANNER
        ====================================================== */}

       <section className="contact-banner">
          <div className="container">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.25,
              }}
              variants={fadeUp}
            >
              <h2>
                Let&apos;s create meaningful
                <span>technology opportunities.</span>
              </h2>

              <p>
                Connect with our team for foundation programs, partnerships,
                events and semiconductor training enquiries.
              </p>
            </motion.div>
          </div>
        </section>

        <PartnerCarousel logos={partnerLogos} />

      </main>

      {/* =====================================================
          FOOTER
      ====================================================== */}

      <footer className="footer">
        <div className="container footer-grid">
<div className="footer-about">
  <div className="footer-logo-wrap">
    <img
      src={tekshaktiLogo}
      alt="Tek-Shakti Foundation"
      className="footer-logo-image"
    />
  </div>

  <p>
    A non-profit initiative empowering learners and communities through
    technology education, digital skills and semiconductor learning.
  </p>

  <div className="footer-social">
    <a
      className="footer-social-link"
      href="https://linkedin.com/in/tekshakti-foundation-05aa0b311"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Tek-Shakti Foundation LinkedIn"
    >
      <FaLinkedinIn />
    </a>

    <a
      className="footer-social-link"
      href="https://www.instagram.com/tekshakti_foundation"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Tek-Shakti Foundation Instagram"
    >
      <FaInstagram />
    </a>
  </div>
</div>

          <div className="footer-column">
            <h3>Quick Links</h3>
            <a href="#home">Home</a>
            <a href="#about">About Us</a>
            <a href="/events">Events</a>
            <a href="#training">Training Program</a>
            <a href="#contact">Contact Us</a>
          </div>

          <div className="footer-column">
            <h3>Programs</h3>
            <span>Foundation Initiatives</span>
            <span>Semiconductor Courses</span>
            <span>Educational Events</span>
            <span>Digital Skill Development</span>
            <span>Community Programs</span>
          </div>

          <div className="footer-column">
            <h3>Contact Us</h3>
            <span>Nagpur, Maharashtra, India</span>
            <a href="tel:+918600418168">+91 86004 18168</a>
            <a href="mailto:tekshaktifoundation12@gmail.com">
              tekshaktifoundation12@gmail.com
            </a>
          </div>

          <div className="footer-support">
            <h3>Support Our Mission</h3>

            <p>
              Your support helps us empower more learners and communities.
            </p>

            <a href="#contact">Get Involved</a>
          </div>
        </div>

        <div className="container footer-bottom">
          <span>© 2026 Tek-Shakti Foundation. All Rights Reserved.</span>
          <span>Privacy Policy | Terms &amp; Conditions</span>
        </div>
      </footer>
    </div>
  );
}

export default App;