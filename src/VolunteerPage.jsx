import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Globe2,
  HandHeart,
  Heart,
  Mail,
  Phone,
  User,
  Users,
} from "lucide-react";

import "./volunteer.css";
import volunteerHero from "./assets/images/volunteer/volunteer-hero.jpg";

const revealUp = {
  hidden: {
    opacity: 0,
    y: 45,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

const revealLeft = {
  hidden: {
    opacity: 0,
    x: -45,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

const revealRight = {
  hidden: {
    opacity: 0,
    x: 45,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.14,
    },
  },
};

const VolunteerPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    interest: "",
    message: "",
  });

  const scrollToVolunteerForm = (event) => {
    event.preventDefault();

    const formSection = document.getElementById("volunteer-form");

    if (formSection) {
      const navbarHeight = 100;
      const sectionPosition =
        formSection.getBoundingClientRect().top +
        window.scrollY -
        navbarHeight;

      window.scrollTo({
        top: sectionPosition,
        behavior: "smooth",
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitError("");
    setShowSuccess(false);
    setIsSubmitting(true);

    try {
      const response = await fetch("http://localhost:5000/api/volunteer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || "Submission failed");
      }

      setShowSuccess(true);
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        interest: "",
        message: "",
      });
    } catch (error) {
      console.error("Volunteer submission error:", error);

      if (error?.message?.includes("Failed to submit volunteer application") || error?.message?.includes("Submission failed")) {
        setSubmitError("We could not submit your application. Please try again.");
      } else {
        setSubmitError("We could not submit your application. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="volunteer-page">
      {/* HERO SECTION */}
      <motion.section
        className="volunteer-hero"
        variants={revealUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.18 }}
      >
        <motion.div className="volunteer-hero-content" variants={revealLeft}>
          <div className="volunteer-brand-line">
            <div className="volunteer-brand-icon">
              <Users size={25} />
            </div>

            <span className="volunteer-brand-name">
              TEK-SHAKTI
              <small>FOUNDATION</small>
            </span>

            <span className="volunteer-brand-divider" />

            <span className="volunteer-change-text">
              Be the <strong>Change</strong>
            </span>
          </div>

          <h1>
            Be a Part of
            <span>Tek-Shakti</span>
          </h1>

          <div className="volunteer-heading-line" />

          <p>
            Your time and effort can bring hope, empower lives and build a
            better tomorrow.
          </p>
          <motion.a
            href="#volunteer-form"
            className="volunteer-hero-button"
            onClick={scrollToVolunteerForm}
            variants={revealUp}
          >
            Join as a Volunteer
            <ArrowRight size={18} />
          </motion.a>
        </motion.div>

        <motion.div className="volunteer-hero-visual" variants={revealRight}>
          <div className="volunteer-image-shape">
            <img
              src={volunteerHero}
              alt="Volunteers working together for positive change"
            />
          </div>

          <div className="volunteer-curved-line" />
        </motion.div>
      </motion.section>

      {/* FORM SECTION */}
      <motion.section
        className="volunteer-form-section"
        id="volunteer-form"
        variants={revealUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.18 }}
      >
        <div className="volunteer-floating-icon">
          <HandHeart size={32} />
        </div>

        <motion.div className="volunteer-form-heading" variants={revealUp}>
          <h2>Volunteer With Us</h2>
          <span />
        </motion.div>

        <motion.div
          className="volunteer-form-layout"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.16 }}
        >
          <motion.aside className="volunteer-quote-panel" variants={revealLeft}>
            <div className="volunteer-hands-icon">
              <Heart size={48} />
              <HandHeart size={100} strokeWidth={1.25} />
            </div>

            <blockquote>
              Alone we can do so little;
              <br />
              together we can do so much.
            </blockquote>

            <p>– Helen Keller</p>
          </motion.aside>

          <motion.form className="volunteer-form" onSubmit={handleSubmit} variants={revealRight}>
            <div className="volunteer-input-group">
              <User size={20} />

              <input
                type="text"
                name="fullName"
                placeholder="Full Name *"
                aria-label="Full Name *"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                required
              />
            </div>

            <div className="volunteer-input-group">
              <Mail size={20} />

              <input
                type="email"
                name="email"
                placeholder="Email Address *"
                aria-label="Email Address *"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <div className="volunteer-input-group">
              <Phone size={20} />

              <input
                type="tel"
                name="phone"
                placeholder="Phone Number *"
                aria-label="Phone Number *"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
              />
            </div>

            <div className="volunteer-input-group">
              <Users size={20} />

              <select
                name="interest"
                value={formData.interest}
                onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                aria-label="Area of Interest *"
                required
              >
                <option value="" disabled hidden>
                  Area of Interest *
                </option>

                <option value="education">Education & Training</option>
                <option value="events">Events & Campaigns</option>
                <option value="community">Community Development</option>
                <option value="digital">Digital & Social Media</option>
                <option value="administration">Administration Support</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="volunteer-input-group volunteer-textarea-group">
              <Heart size={20} />

              <textarea
                name="message"
                placeholder="Why do you want to volunteer? (Optional)"
                aria-label="Why do you want to volunteer?"
                rows="4"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />
            </div>

            <label className="volunteer-checkbox">
              <input type="checkbox" required />

              <span>
                I agree to the{" "}
                <a href="/terms-and-conditions">terms and conditions</a> and{" "}
                <a href="/privacy-policy">privacy policy</a>.
              </span>
            </label>

            <button type="submit" className="volunteer-submit-button" disabled={isSubmitting}>
              Join as a Volunteer
              <ArrowRight size={20} />
            </button>

            {submitError && (
              <div className="volunteer-error-message">{submitError}</div>
            )}

            {showSuccess && (
              <div className="volunteer-success-message">
                Thank You for Joining Us!
                <br />
                Your volunteer application has been submitted successfully. Thank you for your interest in being a part of Tek-Shakti Foundation. Our team will review your details and get in touch with you.
              </div>
            )}
          </motion.form>
        </motion.div>
      </motion.section>

      {/* BENEFITS SECTION */}
      <motion.section
        className="volunteer-benefits"
        variants={revealUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.18 }}
      >
        <motion.div className="volunteer-benefit-item" variants={revealUp}>
          <div className="volunteer-benefit-icon">
            <Heart size={38} />
          </div>

          <div>
            <h3>Make an Impact</h3>
            <p>Contribute to meaningful causes and create change.</p>
          </div>
        </motion.div>

        <div className="volunteer-benefit-divider" />

        <motion.div className="volunteer-benefit-item" variants={revealUp}>
          <div className="volunteer-benefit-icon">
            <Users size={38} />
          </div>

          <div>
            <h3>Grow Together</h3>
            <p>Learn, connect and grow with like-minded people.</p>
          </div>
        </motion.div>

        <div className="volunteer-benefit-divider" />

        <motion.div className="volunteer-benefit-item" variants={revealUp}>
          <div className="volunteer-benefit-icon">
            <Globe2 size={38} />
          </div>

          <div>
            <h3>Inspire Change</h3>
            <p>Be a part of building a better tomorrow.</p>
          </div>
        </motion.div>
      </motion.section>

      {/* CLOSING STRIP */}
      <motion.section
        className="volunteer-closing-strip"
        variants={revealUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.18 }}
      >
        <Heart size={22} />

        <p>Let’s create a better tomorrow, together.</p>

        <span />
      </motion.section>
    </main>
  );
};

export default VolunteerPage;