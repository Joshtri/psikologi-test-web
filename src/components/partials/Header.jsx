import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import { Menu } from "lucide-react";
import { motion } from "framer-motion";

export default function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Navbar fluid rounded className="bg-blue-600 text-white">
        <NavbarBrand href="/">
          <span className="self-center whitespace-nowrap text-xl font-semibold text-white">
            MyApp
          </span>
        </NavbarBrand>
        <NavbarToggle>
          <Menu className="md:hidden" />
        </NavbarToggle>
        <NavbarCollapse>
          <NavbarLink
            href="/"
            active
            className="text-white hover:text-gray-300"
          >
            Home
          </NavbarLink>
          <NavbarLink href="/about" className="text-white hover:text-gray-300">
            About
          </NavbarLink>
          <NavbarLink
            href="/services"
            className="text-white hover:text-gray-300"
          >
            Services
          </NavbarLink>
          <NavbarLink
            href="/contact"
            className="text-white hover:text-gray-300"
          >
            Contact
          </NavbarLink>
        </NavbarCollapse>
      </Navbar>
    </motion.header>
  );
}
