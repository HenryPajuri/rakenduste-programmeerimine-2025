import React from "react"
import "../Profile.css"

const Profile = () => {
  return (
    <div className="profile-container">
      <div className="profile-content">
        <h1>Henry</h1>

        <h2>Huvid ja hobid</h2>
        <ul className="interests-list">
          <li>Programmeerimine</li>
          <li>Muusika</li>
          <li>Reisimine</li>
        </ul>

        <h2>Kontakt</h2>
        <form className="contact-form">
          <div className="form-group">
            <label htmlFor="email">E-mail:</label>
            <input type="email" id="email" name="email" />
          </div>

          <div className="form-group">
            <label htmlFor="message">Sõnum:</label>
            <textarea id="message" name="message" rows={4}></textarea>
          </div>

          <button type="button" className="cta-button">
            Võta ühendust
          </button>
        </form>
      </div>
    </div>
  )
}

export default Profile