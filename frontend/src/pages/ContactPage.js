import React from "react";
import Row from "react-bootstrap/Row";
import emailjs from "@emailjs/browser";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ContactPage = () => {
  // Function that sends
  // an email using the emailjs library by preventing the default
  // form submission behavior, displaying a success message using
  // the toast library, and then sending the form data using the specified
  // email service, template, and sender ID.
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

  // React component that
  // renders a contact form with an email input, message textarea,
  // and a submit button, allowing users to send an email message
  // by triggering the sendEmail function when the form is submitted,
  // and displaying a toast message at the bottom-center position.
  return (
    <div>
      <div className="contact-box">
        <Row>
          <h1 className="contact-page-title">Contact Us</h1>
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
