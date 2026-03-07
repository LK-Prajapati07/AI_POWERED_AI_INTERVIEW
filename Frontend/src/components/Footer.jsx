import React from "react";
import { HiSparkles } from "react-icons/hi";
import { BsGithub, BsLinkedin, BsTwitter } from "react-icons/bs";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 mt-32">
      <div className="max-w-7xl mx-auto px-6 py-16">

        {/* Top Section */}
        <div className="grid md:grid-cols-4 gap-12">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 text-white text-xl font-semibold mb-4">
              <HiSparkles className="text-green-500" size={22} />
              AI Interview
            </div>

            <p className="text-slate-400 text-sm leading-relaxed">
              AI-powered smart interview platform designed to simulate real
              interview environments and deliver actionable performance insights.
            </p>

            {/* Social Icons */}
            <div className="flex gap-4 mt-6 text-slate-400">
              <a href="#" className="hover:text-green-500 transition">
                <BsGithub size={20} />
              </a>
              <a href="#" className="hover:text-green-500 transition">
                <BsLinkedin size={20} />
              </a>
              <a href="#" className="hover:text-green-500 transition">
                <BsTwitter size={20} />
              </a>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Platform</h3>
            <ul className="space-y-3 text-slate-400 text-sm">
              <li>
                <Link to="/interview-start" className="hover:text-green-500 transition">
                  Start Interview
                </Link>
              </li>
              <li>
                <Link to="/interview-history" className="hover:text-green-500 transition">
                  Interview History
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="hover:text-green-500 transition">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-3 text-slate-400 text-sm">
              <li>
                <Link to="/about" className="hover:text-green-500 transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-green-500 transition">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-green-500 transition">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Get In Touch</h3>
            <p className="text-slate-400 text-sm mb-3">
              Have questions or feedback?
            </p>
            <p className="text-slate-400 text-sm">
              support@aiinterview.com
            </p>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="border-t border-slate-800 mt-12 pt-6 text-center text-slate-500 text-sm">
          © {new Date().getFullYear()} AI Interview Platform. All rights reserved.
        </div>

      </div>
    </footer>
  );
};

export default Footer;