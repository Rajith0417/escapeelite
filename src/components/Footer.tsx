"use client";
import Image from "next/image";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-8">
          {/* Column 1 - Logo and Payment Info */}
          <div className="col-span-2 space-y-4">
            {/* Logo */}
            <Image
              src={`${basePath}/images/logoSL.png`}
              alt="Logo"
              width={360}
              height={0} // keep some aspect ratio (adjust as needed)
              priority // ensures no blur on first load
              className="w-[360px] h-auto"
            />

            <div className="">We Accept:</div>

            <Image
              src={`${basePath}/images/cards.png`}
              alt="Logo"
              width={164}
              height={0}   // keep some aspect ratio (adjust as needed)
              priority       // ensures no blur on first load
              className="w-[164px] h-auto"
            />

            {/* Registration Info */}
            <div className="text-xs space-y-1">
              <div>Registered In England & Wales</div>
              <div>Registration Number: 15071008</div>
            </div>
          </div>

          {/* Column 2 - Company */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Sitemap
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3 - Legal */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4 - Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Contact Info</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <Image
                  src={`${basePath}/icons/telephoneW.svg`}
                  alt=""
                  width={24}
                  height={24}
                  className=""
                />
                <span>+44 20 3892 1812</span>
              </div>
              <div className="flex items-center space-x-2">
                <Image
                  src={`${basePath}/icons/mail.svg`}
                  alt=""
                  width={24}
                  height={24}
                  className=""
                />
                <span>admin@escapeelite.com</span>
              </div>
            </div>
          </div>

          {/* Column 5 - Follow Us */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Follow Us</h3>
            <div className="flex space-x-4">
              {/* Facebook */}
              <a
                href="#"
                className="w-8 h-8 flex items-center justify-center hover:bg-blue-700 transition-colors"
              >
                <Image
                  src={`${basePath}/icons/facebook.svg`}
                  alt=""
                  width={24}
                  height={24}
                  className=""
                />
              </a>

              {/* Instagram */}
              <a
                href="#"
                className="w-8 h-8 flex items-center justify-center hover:bg-pink-700 transition-colors"
              >
                <Image
                  src={`${basePath}/icons/instagram.svg`}
                  alt=""
                  width={24}
                  height={24}
                  className=""
                />
              </a>

              {/* LinkedIn */}
              <a
                href="#"
                className="w-8 h-8 flex items-center justify-center hover:bg-blue-800 transition-colors"
              >
                <Image
                  src={`${basePath}/icons/linkedIn.svg`}
                  alt=""
                  width={24}
                  height={24}
                  className=""
                />
              </a>

              {/* YouTube */}
              <a
                href="#"
                className="w-8 h-8 flex items-center justify-center hover:bg-red-700 transition-colors"
              >
                <Image
                  src={`${basePath}/icons/youtube.svg`}
                  alt=""
                  width={24}
                  height={24}
                  className=""
                />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section - Copyright */}
      <div className="border-t border-blue-500">
        <div className="container mx-auto px-4 py-4">
          <div className="text-center text-sm">
            <p>ALL RIGHTS RESERVED © ESCAPE ELITE – 2025</p>
          </div>
        </div>
        <div className="border-t border-blue-500 border-dotted"></div>
      </div>
    </footer>
  );
}
