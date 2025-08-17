import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

export default function ContactUs() {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    // simulate form submission
    console.log(data);
    Swal.fire({
      icon: "success",
      title: "Message Sent!",
      text: "Thank you for contacting us. We will get back to you soon.",
      timer: 2500,
      showConfirmButton: false,
    });
    reset();
  };

  return (
    <div className="min-h-screen bg-base-100 text-base-content">
      {/* Hero Section */}
      <section className="relative bg-base-200 py-20 px-6 text-center rounded-2xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
        <p className="max-w-2xl mx-auto text-lg opacity-90">
          Have questions, suggestions, or want to collaborate? Reach out to us
          and we’ll respond as soon as possible.
        </p>
      </section>

      {/* Contact Info Section */}
      <section className="max-w-6xl mx-auto py-16 px-6 grid md:grid-cols-3 gap-10 text-center">
        <div className="bg-base-200 p-8 rounded-2xl shadow-md border border-gray-200">
          <FaEnvelope className="text-primary text-4xl mb-4 mx-auto" />
          <h2 className="text-2xl font-semibold mb-2">Email Us</h2>
          <p className="opacity-80">support@skillspark.com</p>
        </div>
        <div className="bg-base-200 p-8 rounded-2xl shadow-md border border-gray-200">
          <FaPhone className="text-primary text-4xl mb-4 mx-auto" />
          <h2 className="text-2xl font-semibold mb-2">Call Us</h2>
          <p className="opacity-80">+880 1234 567 890</p>
        </div>
        <div className="bg-base-200 p-8 rounded-2xl shadow-md border border-gray-200">
          <FaMapMarkerAlt className="text-primary text-4xl mb-4 mx-auto" />
          <h2 className="text-2xl font-semibold mb-2">Our Location</h2>
          <p className="opacity-80">Dhaka, Bangladesh</p>
        </div>
      </section>

      {/* Contact Form */}
      <section className="max-w-3xl mx-auto py-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-8">Send Us a Message</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 bg-base-200 p-8 rounded-2xl shadow-md border border-gray-200"
        >
          <div>
            <label className="block mb-2 font-medium">Name</label>
            <input
              {...register("name", { required: true })}
              type="text"
              placeholder="Your Name"
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block mb-2 font-medium">Email</label>
            <input
              {...register("email", { required: true })}
              type="email"
              placeholder="Your Email"
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block mb-2 font-medium">Message</label>
            <textarea
              {...register("message", { required: true })}
              placeholder="Your Message"
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
              rows={6}
            ></textarea>
          </div>
          <button
            type="submit"
            className="btn btn-primary rounded-2xl shadow-md w-full py-3"
          >
            Send Message
          </button>
        </form>
      </section>
    </div>
  );
}
