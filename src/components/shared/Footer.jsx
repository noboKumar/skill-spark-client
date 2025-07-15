import React from "react";
import Container from "../UI/Container";
import Logo from "../UI/Logo";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const Footer = () => {
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
          <h6 className="footer-title">Legal</h6>
          <a className="link link-hover" href="/">
            Terms of Service
          </a>
          <a className="link link-hover" href="/">
            Privacy Policy
          </a>
          <a className="link link-hover" href="/">
            Cookie Policy
          </a>
        </nav>
      </Container>
    </footer>
  );
};

export default Footer;
