import React from "react";
import {
  Footer,
  FooterBrand,
  FooterLinkGroup,
  FooterLink,
  FooterDivider,
  FooterCopyright,
} from "flowbite-react";
import { motion } from "framer-motion";

export default function FooterCustom() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
    >
      <Footer container className="bg-blue-600 text-white">
        <div className="w-full text-center">
          <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
            <FooterBrand href="/" name="MyApp" className="text-white" />
            <FooterLinkGroup>
              <FooterLink
                href="/about"
                className="text-white hover:text-gray-300"
              >
                About
              </FooterLink>
              <FooterLink
                href="/privacy"
                className="text-white hover:text-gray-300"
              >
                Privacy Policy
              </FooterLink>
              <FooterLink
                href="/contact"
                className="text-white hover:text-gray-300"
              >
                Contact
              </FooterLink>
            </FooterLinkGroup>
          </div>
          <FooterDivider />
          <FooterCopyright className="text-white" href="/" by="MyApp" year={2025} />
        </div>
      </Footer>
    </motion.footer>
  );
}
