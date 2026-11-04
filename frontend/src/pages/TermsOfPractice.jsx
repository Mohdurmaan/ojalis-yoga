import { Link } from "react-router-dom";
import "../legal.css";

function TermsOfPractice() {
  return (
    <main className="legal-page-wrap">
      {/* 1. Page Hero Banner */}
      <section className="page-hero-banner">
        <div className="container">
          <span className="page-hero-tag">AGREEMENT & CODE OF PRACTICE</span>
          <h1 className="page-hero-title">Terms of Practice</h1>
          <p className="page-hero-subtitle">
            Effective from 1 November 2026. These terms apply to every OJALIS session, in person or online.
          </p>
        </div>
      </section>

      {/* 2. Document Content */}
      <section className="legal-content-container">
        <div className="legal-document-card">
          {/* <div className="legal-meta-bar">
            <span className="legal-effective-date">Effective: 1 November 2026</span>
            <span className="legal-doc-pill">In-Person & Online Sadhana</span>
          </div> */}

          {/* Section 1 */}
          <div className="legal-section" id="acceptance">
            <h2 className="legal-section-title">
              <span className="section-num">1.</span> Acceptance
            </h2>
            <p className="legal-paragraph">
              By booking, joining or attending any OJALIS session, in person at our studio or online, you accept these Terms of Practice.
            </p>
          </div>

          {/* Section 2 */}
          <div className="legal-section" id="nature-of-ojalis">
            <h2 className="legal-section-title">
              <span className="section-num">2.</span> The nature of OJALIS
            </h2>
            <p className="legal-paragraph">
              OJALIS offers yoga, pranayama, meditation, Yoga Nidra and related breath-based practice for general wellbeing and learning. It is educational in nature. OJALIS does not diagnose, treat or cure any medical condition, and it does not replace the care, medication or advice of a registered medical practitioner.
            </p>
          </div>

          {/* Section 3 */}
          <div className="legal-section" id="health-declaration">
            <h2 className="legal-section-title">
              <span className="section-num">3.</span> Health declaration
            </h2>
            <p className="legal-paragraph">
              Before your first session you confirm that the health information you provide is complete and accurate. You agree to tell us promptly about any change, including a medical condition, recent surgery or injury, pregnancy, or a change in medication. Where a practice may not suit you, we may ask you to seek medical advice first, and may adapt or decline a session for your safety.
            </p>
          </div>

          {/* Section 4 */}
          <div className="legal-section" id="your-practice">
            <h2 className="legal-section-title">
              <span className="section-num">4.</span> Your practice
            </h2>
            <p className="legal-paragraph">
              You practise at your own pace and in accordance with the guidance of your teacher. You may pause or stop any practice at any time. Please tell your teacher if you feel dizziness, pain, unusual breathlessness or any other discomfort, and seek medical advice if these continue.
            </p>
          </div>

          {/* Section 5 */}
          <div className="legal-section" id="breath-signature">
            <h2 className="legal-section-title">
              <span className="section-num">5.</span> The Breath Signature
            </h2>
            <p className="legal-paragraph">
              The Breath Signature is an individual, one-to-one assessment of your breathing, used to plan your practice. It is not a medical examination, a diagnosis or a clinical assessment.
            </p>
          </div>

          {/* Section 6 */}
          <div className="legal-section" id="group-sessions">
            <h2 className="legal-section-title">
              <span className="section-num">6.</span> Group sessions
            </h2>
            <p className="legal-paragraph">
              Group sessions are capped at six students. Places are confirmed through booking.
            </p>
          </div>

          {/* Section 7 */}
          <div className="legal-section" id="bookings-fees">
            <h2 className="legal-section-title">
              <span className="section-num">7.</span> Bookings, fees and cancellations
            </h2>
            <p className="legal-paragraph">
              Fees, booking, rescheduling and cancellation arrangements are confirmed in writing when you book. Those confirmed terms form part of this agreement.
            </p>
          </div>

          {/* Section 8 */}
          <div className="legal-section" id="conduct">
            <h2 className="legal-section-title">
              <span className="section-num">8.</span> Conduct in the studio and online
            </h2>
            <p className="legal-paragraph">
              We ask that you arrive on time, follow your teacher's guidance, and keep the practice space quiet and respectful for everyone. For online sessions, please join from a calm, private space with a stable connection.
            </p>
          </div>

          {/* Section 9 */}
          <div className="legal-section" id="recording-images">
            <h2 className="legal-section-title">
              <span className="section-num">9.</span> Recording and images
            </h2>
            <p className="legal-paragraph">
              Sessions are not recorded, and photographs or video of participants are not taken or shared, without prior written consent.
            </p>
          </div>

          {/* Section 10 */}
          <div className="legal-section" id="intellectual-property">
            <h2 className="legal-section-title">
              <span className="section-num">10.</span> Intellectual property
            </h2>
            <p className="legal-paragraph">
              The name OJALIS, its logo, the tagline, the term Breath Signature as used by OJALIS, the website content, images, and all course and teaching materials are the proprietary property of <strong>Kuldeep Kumar Dubey, trading as OJALIS</strong>. Trademark registration is in process. No part of these may be copied, reproduced, distributed or used commercially without prior written permission from OJALIS.
            </p>
          </div>

          {/* Section 11 */}
          <div className="legal-section" id="limitation-of-responsibility">
            <h2 className="legal-section-title">
              <span className="section-num">11.</span> Limitation of responsibility
            </h2>
            <p className="legal-paragraph">
              OJALIS takes reasonable care in planning and delivering its sessions. Physical practice carries an inherent element of risk, and you take part on the basis of the health information you have given and the guidance you receive. Nothing in these terms limits any liability that cannot be limited under the law of India.
            </p>
          </div>

          {/* Section 12 */}
          <div className="legal-section" id="participants-under-18">
            <h2 className="legal-section-title">
              <span className="section-num">12.</span> Participants under 18
            </h2>
            <p className="legal-paragraph">
              A session for a person under 18 requires the written consent of a parent or legal guardian.
            </p>
          </div>

          {/* Section 13 */}
          <div className="legal-section" id="changes">
            <h2 className="legal-section-title">
              <span className="section-num">13.</span> Changes to these terms
            </h2>
            <p className="legal-paragraph">
              We may update these terms from time to time. The updated version will be published on ojalis.com with its effective date.
            </p>
          </div>

          {/* Section 14 */}
          <div className="legal-section" id="governing-law">
            <h2 className="legal-section-title">
              <span className="section-num">14.</span> Governing law and jurisdiction
            </h2>
            <p className="legal-paragraph">
              These terms are governed by the laws of India. The courts at Gurugram, Haryana, have jurisdiction over any dispute arising from them.
            </p>
          </div>

          {/* Section 15 */}
          <div className="legal-section" id="contact">
            <h2 className="legal-section-title">
              <span className="section-num">15.</span> Contact
            </h2>
            <div className="legal-callout-box">
              <div className="legal-callout-grid">
                <div className="legal-callout-item">
                  <span className="label">Founder & Teacher</span>
                  <span className="value">Kuldeep Kumar Dubey, trading as OJALIS</span>
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
                  <span className="label">Studio Sanctuary</span>
                  <span className="value">A/214, Green Oaks, BPTP Astaire Gardens, Sector 70A, Gurugram, Haryana 122101</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Switcher */}
          <div className="legal-switcher-box">
            <span style={{ fontSize: "14px", color: "var(--ojalis-text-muted)" }}>
              Want to see our privacy and data practices?
            </span>
            <Link to="/privacy-policy" className="legal-switcher-btn">
              View Privacy Policy →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default TermsOfPractice;

