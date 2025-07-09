import React from "react";
import Container from "../UI/Container";
import Logo from "../UI/Logo";

const Footer = () => {
  return (
    <footer className="bg-base-200">
      <Container className="footer sm:footer-horizontal text-base-content p-10">
        <aside className="flex flex-col">
          <Logo />
          <p className="text-xl footer-title">"Learn. Build. Shine."</p>
        </aside>
        <nav>
          <h6 className="footer-title">Services</h6>
          <a className="link link-hover">Branding</a>
          <a className="link link-hover">Design</a>
          <a className="link link-hover">Marketing</a>
          <a className="link link-hover">Advertisement</a>
        </nav>
        <nav>
          <h6 className="footer-title">Company</h6>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press kit</a>
        </nav>
        <nav>
          <h6 className="footer-title">Legal</h6>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </nav>
      </Container>
    </footer>
  );
};

export default Footer;
