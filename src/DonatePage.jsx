import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  HeartHandshake,
  LockKeyhole,
  Users,
  X,
  Landmark,
} from "lucide-react";

import donateHero from "./assets/images/donate/donate-hero.jpg";
import donationIllustration from "./assets/images/donate/donation-illustration.png";
import impactImageOne from "./assets/images/donate/donation-impact-1.jpg";
import impactImageTwo from "./assets/images/donate/donation-impact-2.jpg";
import impactImageThree from "./assets/images/donate/donation-impact-3.jpg";



import "./donate.css";

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

const initialForm = {
  firstName: "",
  lastName: "",
  email: "",
  country: "India",
  countryCode: "+91",
  phone: "",
  amount: "",
  anonymous: false,
};

function DonatePage() {
  const [form, setForm] = useState(initialForm);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, []);

  useEffect(() => {
    if (!showSuccess) return undefined;

    const timer = window.setTimeout(() => {
      setShowSuccess(false);
    }, 4000);

    return () => window.clearTimeout(timer);
  }, [showSuccess]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("http://localhost:5000/api/donation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error("Failed to submit donation details.");
      }

      setShowSuccess(true);
      setForm(initialForm);
    } catch (error) {
      setSubmitError("We could not submit your donation details. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="donate-page-content">
      {/* HERO */}

      <motion.section
        className="donate-page-hero"
        variants={revealUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.18 }}
      >
        <img
          className="donate-page-hero-image"
          src={donateHero}
          alt="Children participating in a community gardening activity"
        />

        <div className="donate-page-hero-overlay" />

        <motion.div
          className="donate-page-hero-inner"
          variants={revealUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <span className="donate-page-label">
            Support Our Mission
          </span>

          <h1>
            Donate Us for
            <strong>Better Tomorrow!</strong>
          </h1>

          <p>
            Your contribution helps us empower children, youth and communities
            through education, skill training, technology and impactful
            initiatives. Together, we can create a stronger, more inclusive and
            brighter future for all.
          </p>
        </motion.div>
      </motion.section>

      {/* DONATION FORM */}

      <motion.section
        className="donate-form-wrapper"
        variants={revealUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.18 }}
      >
        <motion.div
          className="donate-form-card"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.18 }}
        >
          <motion.div className="donate-form-column" variants={revealLeft}>
            <div className="donate-page-heading">
              <h2>Be a Donor</h2>
              <span />
            </div>

            <motion.form className="donate-form" onSubmit={handleSubmit} variants={revealUp}>
              <div className="donate-form-row">
                <label>
                  <span>
                    First name <b>*</b>
                  </span>

                  <input
                    type="text"
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    placeholder="Enter First Name"
                    required
                  />
                </label>

                <label>
                  <span>
                    Last name <b>*</b>
                  </span>

                  <input
                    type="text"
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    placeholder="Enter Last Name"
                    required
                  />
                </label>
              </div>

              <label>
                <span>
                  Email Address <b>*</b>
                </span>

                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter Email Address"
                  required
                />
              </label>

              <div className="donate-form-row">
                <label>
                  <span>Country</span>

                  <select
                    name="country"
                    value={form.country}
                    onChange={handleChange}
                  >
                    <option value="India">India</option>
                    <option value="Singapore">Singapore</option>
                    <option value="United States">United States</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Other">Other</option>
                  </select>
                </label>

                <label>
                  <span>Phone number</span>

                  <div className="donate-phone-control">
                    <select
                      name="countryCode"
                      value={form.countryCode}
                      onChange={handleChange}
                      aria-label="Country calling code"
                    >
                      <option value="+91">IN +91</option>
                      <option value="+65">SG +65</option>
                      <option value="+1">US +1</option>
                      <option value="+44">UK +44</option>
                    </select>

                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="Enter Phone Number"
                    />
                  </div>
                </label>
              </div>

              <label>
                <span>
                  Donation Amount <b>*</b>
                </span>

                <div className="donate-amount-control">
                  <span className="donate-currency">₹</span>

                  <input
                    type="number"
                    name="amount"
                    value={form.amount}
                    onChange={handleChange}
                    placeholder="Enter Amount"
                    min="1"
                    required
                  />
                </div>
              </label>

              <div className="donate-qr-payment">
  
<div className="donate-bank-details">
  <div className="donate-bank-icon">
    <Landmark size={30} />
  </div>

  <div className="donate-bank-content">
    <h3>Our Bank Details</h3>

    <p>
      You can make a direct bank transfer to support our mission.
    </p>

    <div className="donate-bank-grid">
      <div className="donate-bank-item">
        <span>Bank Name</span>
        <strong>CANARA BANK</strong>
      </div>

      <div className="donate-bank-item">
        <span>Account No.</span>
        <strong>120027004050</strong>
      </div>

      <div className="donate-bank-item">
        <span>IFSC</span>
        <strong>CNRB0015260</strong>
      </div>

      <div className="donate-bank-item">
        <span>Branch</span>
        <strong>15260-GITTIKHADAN, NAGPUR 440013</strong>
      </div>
    </div>
  </div>
</div>
              </div>
              <label className="donate-anonymous-option">
                <input
                  type="checkbox"
                  name="anonymous"
                  checked={form.anonymous}
                  onChange={handleChange}
                />

                <span>I would like to donate anonymously.</span>
              </label>

              {submitError && (
                <p className="donate-submit-error" role="alert">
                  {submitError}
                </p>
              )}

              <button
                type="submit"
                className="donate-submit-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Donation Details"}
              </button>
            </motion.form>
          </motion.div>

          <motion.div className="donate-illustration-column" variants={revealRight}>
            <img
              src={donationIllustration}
              alt="People contributing hearts to a donation jar"
            />
          </motion.div>
        </motion.div>
      </motion.section>

      {/* WHY YOUR DONATION MATTERS */}

      <motion.section
        className="donate-impact-section"
        variants={revealUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.18 }}
      >
        <motion.div className="donate-impact-heading" variants={revealUp}>
          <h2>Why Your Donation Matters</h2>
          <span />

          <p>
            Every contribution, big or small, helps us reach more lives and
            create long-lasting impact in the areas that need it the most.
          </p>
        </motion.div>

        <motion.div
          className="donate-impact-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.16 }}
        >
          <motion.article className="donate-impact-card" variants={revealUp}>
            <div className="donate-impact-image">
              <img
                src={impactImageOne}
                alt="Children participating in a community activity"
              />

              <div className="donate-card-icon donate-card-icon-pink">
                <HeartHandshake size={27} />
              </div>
            </div>

            <h3>Making donations by contributing</h3>

            <p>
              Igniting change through compassion and empowering children for a
              brighter tomorrow.
            </p>
          </motion.article>

          <motion.article className="donate-impact-card" variants={revealUp}>
            <div className="donate-impact-image">
              <img
                src={impactImageTwo}
                alt="Young people supporting each other"
              />

              <div className="donate-card-icon donate-card-icon-purple">
                <CheckCircle2 size={27} />
              </div>
            </div>

            <h3>Education and community support</h3>

            <p>
              Empowering communities through education, skills and meaningful
              opportunities that create positive change.
            </p>
          </motion.article>

          <motion.article className="donate-impact-card" variants={revealUp}>
            <div className="donate-impact-image">
              <img
                src={impactImageThree}
                alt="A smiling child supported through community programs"
              />

              <div className="donate-card-icon donate-card-icon-green">
                <Users size={27} />
              </div>
            </div>

            <h3>Volunteering together</h3>

            <p>
              Join us on a transformative journey as we impact lives through
              educational and community initiatives.
            </p>
          </motion.article>
        </motion.div>
      </motion.section>

      {/* PAYMENT SECURITY */}

      <motion.section
  className="donate-security-strip"
  variants={revealUp}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.18 }}
>
  <motion.div
    className="donate-security-icon"
    variants={revealLeft}
  >
    <Landmark size={32} />
  </motion.div>

  <motion.div
    className="donate-security-text"
    variants={revealUp}
  >
    <h3>Direct Bank Transfer</h3>

    <p>
      Please use the bank details above to make your donation
      directly through your bank. After completing the transfer,
      submit your donation details through this form.
    </p>
  </motion.div>

  <motion.div
    className="donate-bank-security-details"
    variants={revealRight}
  >
    <div>
      <span>Bank</span>
      <strong>CANARA BANK</strong>
    </div>

    <div>
      <span>IFSC</span>
      <strong>CNRB0015260</strong>
    </div>
  </motion.div>
</motion.section>

      {/* SUCCESS POPUP */}

      {showSuccess && (
        <div
          className="donate-popup-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="donate-popup-title"
        >
          <div className="donate-popup">
            <button
              type="button"
              className="donate-popup-close"
              aria-label="Close message"
              onClick={() => setShowSuccess(false)}
            >
              <X size={20} />
            </button>

            <div className="donate-popup-icon">
              <CheckCircle2 size={38} />
            </div>

           <h3 id="donate-popup-title">
  Thank You for Your Support!
</h3>

<p>
  Your donation details have been submitted successfully.
  Thank you for supporting Tek-Shakti Foundation and being
  a part of our mission to create meaningful impact.
</p>

            <button
              type="button"
              className="donate-popup-button"
              onClick={() => setShowSuccess(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

export default DonatePage;