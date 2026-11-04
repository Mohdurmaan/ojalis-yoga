import { Link } from "react-router-dom";
import "../legal.css";

function PrivacyPolicy() {
  return (
    <main className="legal-page-wrap">
      {/* 1. Page Hero Banner */}
      <section className="page-hero-banner">
        <div className="container">
          <span className="page-hero-tag">DATA PROTECTION & PRIVACY</span>
          <h1 className="page-hero-title">Privacy Policy</h1>
          <p className="page-hero-subtitle">
            Effective from 1 November 2026. This policy applies to ojalis.com and to all OJALIS enquiries, bookings and sessions.
          </p>
        </div>
      </section>

      {/* 2. Document Content */}
      <section className="legal-content-container">
        <div className="legal-document-card">
          {/* <div className="legal-meta-bar">
            <span className="legal-effective-date">Effective: 1 November 2026</span>
            <span className="legal-doc-pill">Digital Personal Data Protection Act, 2023 Compliant</span>
          </div> */}

          {/* Section 1 */}
          <div className="legal-section" id="who-we-are">
            <h2 className="legal-section-title">
              <span className="section-num">1.</span> Who we are
            </h2>
            <p className="legal-paragraph">
              This website and the services described on it are operated by <strong>Kuldeep Kumar Dubey, trading as OJALIS</strong>, a sole proprietorship registered under the Udyam Registration (<strong>UDYAM-DL-02-0124683</strong>).
            </p>
            <div className="legal-callout-box">
              <div className="legal-callout-item">
                <span className="label">Registered Studio Sanctuary</span>
                <span className="value">A/214, Green Oaks, BPTP Astaire Gardens, Sector 70A, Gurugram, Haryana 122101</span>
              </div>
            </div>
          </div>

          {/* Section 2 */}
          <div className="legal-section" id="scope">
            <h2 className="legal-section-title">
              <span className="section-num">2.</span> Scope
            </h2>
            <p className="legal-paragraph">
              This policy explains how OJALIS collects, uses, stores and protects personal information when you visit ojalis.com, send an enquiry, book a Breath Signature or any other session, or contact us by email, telephone or WhatsApp. It is prepared in line with the Digital Personal Data Protection Act, 2023 and other applicable laws of India.
            </p>
          </div>

          {/* Section 3 */}
          <div className="legal-section" id="information-we-collect">
            <h2 className="legal-section-title">
              <span className="section-num">3.</span> Information we collect
            </h2>
            <ul className="legal-list">
              <li>
                <strong>Information you give us:</strong> your name, email address, telephone number, the session or programme you enquire about, and any health information you choose to share so that we can plan a suitable practice.
              </li>
              <li>
                <strong>Information collected automatically:</strong> basic technical records such as device and browser type, pages requested and the time of your visit, which our hosting provider keeps to keep the website secure and running.
              </li>
              <li>
                <strong>Communications:</strong> messages you send us by email, telephone or WhatsApp, and our replies.
              </li>
            </ul>
          </div>

          {/* Section 4 */}
          <div className="legal-section" id="health-information">
            <h2 className="legal-section-title">
              <span className="section-num">4.</span> Health information
            </h2>
            <p className="legal-paragraph">
              Health information is collected only when you provide it, and only to judge whether a practice is suitable for you. It is held in confidence, used solely to plan your sessions, and is not published. It is shared only as described in section 6, or where the law requires it.
            </p>
          </div>

          {/* Section 5 */}
          <div className="legal-section" id="how-we-use-information">
            <h2 className="legal-section-title">
              <span className="section-num">5.</span> How we use your information
            </h2>
            <ul className="legal-list">
              <li>To reply to your enquiries and arrange your Breath Signature or other sessions.</li>
              <li>To plan a safe and suitable practice for you, including adaptations where needed.</li>
              <li>To send confirmations, reminders and essential service messages.</li>
              <li>To keep records required for our practice and to meet legal obligations.</li>
            </ul>
            <p className="legal-paragraph" style={{ fontWeight: 600, color: "var(--ojalis-burgundy)" }}>
              We do not sell personal information.
            </p>
          </div>

          {/* Section 6 */}
          <div className="legal-section" id="sharing">
            <h2 className="legal-section-title">
              <span className="section-num">6.</span> Sharing
            </h2>
            <p className="legal-paragraph">
              We share personal information only with service providers who help us run the website, messaging and booking, such as hosting, email and WhatsApp Business tools, and only to the extent they need it to perform that service under obligations of confidentiality. We may disclose information where required by law or by a competent authority.
            </p>
          </div>

          {/* Section 7 */}
          <div className="legal-section" id="cookies">
            <h2 className="legal-section-title">
              <span className="section-num">7.</span> Cookies
            </h2>
            <p className="legal-paragraph">
              This website does not use cookies or analytics tracking tools.
            </p>
          </div>

          {/* Section 8 */}
          <div className="legal-section" id="retention">
            <h2 className="legal-section-title">
              <span className="section-num">8.</span> How long we keep information
            </h2>
            <p className="legal-paragraph">
              Enquiry details are kept for as long as needed to respond to you. Session and health records are kept for as long as needed to provide your practice and for any period the law requires. When no longer needed, information is deleted or anonymised.
            </p>
          </div>

          {/* Section 9 */}
          <div className="legal-section" id="your-rights">
            <h2 className="legal-section-title">
              <span className="section-num">9.</span> Your rights
            </h2>
            <p className="legal-paragraph">
              Under the Digital Personal Data Protection Act, 2023, you may ask us to confirm what personal data we hold about you, to correct or update it, to erase it where no longer needed, and to withdraw your consent. You may also raise a grievance with us at any time. Write to <a href="mailto:hello@ojalis.com" style={{ color: "var(--ojalis-burgundy)", fontWeight: 600 }}>hello@ojalis.com</a>. We will respond within a reasonable time. Withdrawing consent may affect our ability to provide sessions to you.
            </p>
          </div>

          {/* Section 10 */}
          <div className="legal-section" id="security">
            <h2 className="legal-section-title">
              <span className="section-num">10.</span> Security
            </h2>
            <p className="legal-paragraph">
              We apply reasonable technical and organisational measures appropriate to the information we hold. No transmission over the internet is entirely secure, and you share information with us on that understanding.
            </p>
          </div>

          {/* Section 11 */}
          <div className="legal-section" id="participants-under-18">
            <h2 className="legal-section-title">
              <span className="section-num">11.</span> Participants under 18
            </h2>
            <p className="legal-paragraph">
              An enquiry or booking for a person under 18 must be made by a parent or legal guardian, who gives consent on that person's behalf.
            </p>
          </div>

          {/* Section 12 */}
          <div className="legal-section" id="grievance-officer">
            <h2 className="legal-section-title">
              <span className="section-num">12.</span> Grievance Officer
            </h2>
            <div className="legal-callout-box">
              <div className="legal-callout-grid">
                <div className="legal-callout-item">
                  <span className="label">Officer</span>
                  <span className="value">Kuldeep Kumar Dubey, OJALIS</span>
                </div>
                <div className="legal-callout-item">
                  <span className="label">Email</span>
                  <a href="mailto:hello@ojalis.com">hello@ojalis.com</a>
                </div>
                <div className="legal-callout-item">
                  <span className="label">Telephone</span>
                  <a href="tel:+918881443000">+91 8881443000</a>
                </div>
                <div className="legal-callout-item" style={{ gridColumn: "1 / -1" }}>
                  <span className="label">Address</span>
                  <span className="value">A/214, Green Oaks, BPTP Astaire Gardens, Sector 70A, Gurugram, Haryana 122101</span>
                </div>
              </div>
            </div>
          </div>

          {/* Section 13 */}
          <div className="legal-section" id="changes">
            <h2 className="legal-section-title">
              <span className="section-num">13.</span> Changes to this policy
            </h2>
            <p className="legal-paragraph">
              We may update this policy from time to time. The effective date at the top of this page shows the current version.
            </p>
          </div>

          {/* Section 14 */}
          <div className="legal-section" id="governing-law">
            <h2 className="legal-section-title">
              <span className="section-num">14.</span> Governing law
            </h2>
            <p className="legal-paragraph">
              This policy is governed by the laws of India. The courts at Gurugram, Haryana, have jurisdiction over any matter arising from it.
            </p>
          </div>

          {/* Footer Switcher */}
          <div className="legal-switcher-box">
            <span style={{ fontSize: "14px", color: "var(--ojalis-text-muted)" }}>
              Need to review our session guidelines?
            </span>
            <Link to="/terms-of-practice" className="legal-switcher-btn">
              View Terms of Practice →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default PrivacyPolicy;

