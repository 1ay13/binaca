"use client";

import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

const contact = () => {
  const imageLoader = ({ src }) => {
    return `${src}`;
  };

  const form = useRef();

  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value === `Write Your ${name.replace("_", " ")}` ? "" : value,
    });
  };

  const [result, setResult] = useState();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_uhv0fpu",
        "template_4jhmk8c",
        form.current,
        "PQGuYeqiQ6CscpTGH"
      )
      .then(
        (result) => {
          console.log(result.text);
          setResult(
            "Thank You for your message, Bianca will get back to you soon."
          );
          setFormData({
            user_name: "",
            user_email: "",
            message: "",
          });
        },
        (error) => {
          console.log(error.text);
          setResult("Please try back after sometime, there was an error.");
        }
      );
  };

  return (
    <div className="pb-8 md:pb-10">
      <h1 className="font-extrabold leading-snug mb-7 md:mb-10 text-xl-28 max-md:text-center md:text-xl-40">
        Get in Touch
      </h1>
      <div className="mb-12 md:mb-20">
        <p className="text-center">
        Contact me for business inquiries, freelance projects & branding proposals. 
        </p>
      </div>
      <div className="">
        <form
          ref={form}
          onSubmit={sendEmail}
          className="grid p-12 gap-8 grid-cols-1 border-gray-200 border-2"
        >
          <input
            type="text"
            name="user_name"
            value={formData.user_name}
            onChange={handleInputChange}
            className="block border-black border-b-2 pb-5"
            placeholder="Enter Your Name"
          />
          <input
            type="email"
            name="user_email"
            value={formData.user_email}
            onChange={handleInputChange}
            className="block border-black border-b-2 pb-5"
            placeholder="Enter Your Email Address"
          />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            className="block border-black border-b-2 pb-5"
            placeholder="Message"
          />
          <input type="submit" value="Send" />
        </form>
        <p className="mt-6">{result}</p>
      </div>
    </div>
  );
};

export default contact;
