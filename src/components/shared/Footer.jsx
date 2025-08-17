import React from "react";
import Container from "../UI/Container";
import Logo from "../UI/Logo";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import Swal from "sweetalert2";

const Footer = () => {
  const handleSubscribe = (e) => {
    e.preventDefault();
    Swal.fire({
      icon: "success",
      title: "You have successfully Subscribed!!!",
      showConfirmButton: false,
      timer: 1500,
    });
    e.target.reset();
  };
  return (
    <footer className="bg-base-200">
      <Container className="footer sm:footer-horizontal text-base-content p-10">
        <aside className="flex flex-col gap-2">
          <Logo />
          <p className="text-lg font-medium text-primary">
            "Learn. Build. Shine."
          </p>
          <p className="text-sm text-gray-500 mt-2">
            © {new Date().getFullYear()} SkillSpark. All rights reserved.
          </p>
        </aside>

        <nav>
          <h6 className="footer-title">Explore</h6>
          <a className="link link-hover" href="/all-classes">
            All Courses
          </a>
          <a className="link link-hover" href="/teach-on-skill-spark">
            Become a Teacher
          </a>
          <a className="link link-hover" href="/dashboard">
            Student Dashboard
          </a>
          <a className="link link-hover" href="/">
            FAQs
          </a>
        </nav>

        <nav>
          <h6 className="footer-title">Contact Us</h6>
          <p className="text-sm mt-2 flex items-center gap-2">
            <FaPhoneAlt className="text-primary" /> +880 1234-567890
          </p>
          <p className="text-sm mt-2 flex items-center gap-2">
            <FaEnvelope className="text-primary" /> contact@skillspark.academy
          </p>
          <p className="text-sm mt-2 flex items-center gap-2">
            <FaMapMarkerAlt className="text-primary" /> Dhaka, Bangladesh
          </p>
        </nav>

        <nav>
          <h6 className="footer-title">Join Us Today</h6>
          <p>Subscribe to get latest news and offer</p>
          <form onSubmit={handleSubscribe} className="join">
            <div>
              <label className="input validator join-item">
                <svg
                  className="h-[1em] opacity-50"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                  </g>
                </svg>
                <input type="email" placeholder="mail@site.com" required />
              </label>
              <div className="validator-hint hidden">
                Enter valid email address
              </div>
            </div>
            <button className="btn btn-primary join-item">Join</button>
          </form>
        </nav>
      </Container>
    </footer>
  );
};

export default Footer;
