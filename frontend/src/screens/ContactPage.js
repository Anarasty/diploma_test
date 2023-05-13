import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import emailjs from "@emailjs/browser";

const ContactPage = () => {
  const sendEmail = (e) => {
    e.preventDefault();
    alert("SEND!");
    emailjs.sendForm("service_0ttl2hu", "template_1d6oi72", e.target, '5K5JYL9KArKvhFouy')
  };

  return (
    <div>
      <h1>Contact us</h1>
      <div className="contact-box">
        <Row>
          <h1 className="page__title">Contact Us</h1>
          <form className="contact__form" onSubmit={sendEmail}>
            <label htmlFor="emailFrom">Email:</label>
            <input
              type="text"
              name="email_from"
              id="emailFrom"
              className="email__from"
              placeholder="person@example.com"
            />
            <label htmlFor="message">Message:</label>
            <textarea
              name="message"
              id="message"
              className="message__box"
            ></textarea>
            {/* <input type="submit">Submit</input> */}
            <input type="submit" value="SnD" />
          </form>
        </Row>
      </div>
    </div>
  );
};

export default ContactPage;
