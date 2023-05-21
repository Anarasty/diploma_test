import React from "react";
import Row from "react-bootstrap/Row";
import emailjs from "@emailjs/browser";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ContactPage = () => {
  const sendEmail = (e) => {
    e.preventDefault();
    // alert("SEND!");
    toast.success("Message sended!");
    emailjs.sendForm(
      "service_0ttl2hu",
      "template_1d6oi72",
      e.target,
      "5K5JYL9KArKvhFouy"
    );
  };

  return (
    <div>
      <div className="contact-box">
        <Row>
          <h1>Contact Us</h1>
          <ToastContainer position="bottom-center" limit={1} />
          <form className="contact-form" onSubmit={sendEmail}>
            <label htmlFor="emailFrom">Email:</label>
            <input required
              type="email"
              name="email_from"
              id="emailFrom"
              className="email-from"
              placeholder="email@example.com"
            />
            <label htmlFor="message">Message:</label>
            <textarea required
              name="message"
              id="message"
              className="message-box"
            ></textarea>
            <input type="submit" value="Send" />
          </form>
        </Row>
      </div>
    </div>
  );
};

export default ContactPage;
