import { Link } from 'react-router-dom';
import {
  FaFacebook, FaTwitter, FaInstagram, FaLinkedin,
  FaYoutube, FaPhone, FaEnvelope, FaMapMarkerAlt
} from 'react-icons/fa';

const devServices = [
  { to: '/services/website-development', label: 'Website Development' },
  { to: '/services/app-development', label: 'App Development' },
  { to: '/services/software-development', label: 'System/Software Development' },
  { to: '/services/ui-ux-design', label: 'UI/UX Design' },
];

const mktServices = [
  { to: '/services/seo', label: 'Search Engine Optimization (SEO)' },
  { to: '/services/social-media-marketing', label: 'Social Media Marketing (SMM)' },
  { to: '/services/graphic-design', label: 'Graphic Design' },
  { to: '/services/content-writing', label: 'Content Writing' },
  { to: '/services/pay-per-click', label: 'Pay Per Click' },
  { to: '/services/digital-marketing', label: 'Digital Marketing' },
];

const quickLinks = [
  { to: '/about', label: 'About Us' },
  { to: '/services', label: 'Our Services' },
  { to: '/contact', label: 'Contact Us' },
  { to: '/blog', label: 'Blog' },
  { to: '/career', label: 'Career' },
  { to: '/portfolio', label: 'Our Work' },
];

export default function Footer() {
  return (
    <footer className="bg-dark text-gray-300">
      {/* Main footer */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Company info */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center mb-5">
              <img
                src="https://res.cloudinary.com/duhouukqs/image/upload/v1774392570/cropped-reviral_Logo_gyd70h.webp"
                alt="Reviral Technology"
                className="h-10 w-auto object-contain brightness-0 invert"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div className="hidden items-center gap-2">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-white font-black text-xl">R</span>
                </div>
                <div>
                  <div className="font-black text-white text-lg">Reviral</div>
                  <div className="text-xs text-gray-400 -mt-1">Technology</div>
                </div>
              </div>
            </Link>
            <p className="text-sm leading-relaxed mb-6 text-gray-400">
              We are a leading IT company committed to providing comprehensive digital
              solutions to enhance your online presence and grow your business.
            </p>
            <div className="flex gap-3">
              {[
                { Icon: FaFacebook, href: '#' },
                { Icon: FaTwitter, href: '#' },
                { Icon: FaInstagram, href: '#' },
                { Icon: FaLinkedin, href: '#' },
                { Icon: FaYoutube, href: '#' },
              ].map(({ Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="w-9 h-9 bg-gray-800 hover:bg-primary rounded-lg flex items-center justify-center transition-colors duration-300"
                >
                  <Icon className="text-sm" />
                </a>
              ))}
            </div>
          </div>

          {/* Development services */}
          <div>
            <h4 className="text-white font-bold mb-5 text-sm uppercase tracking-wider">
              Development Services
            </h4>
            <ul className="space-y-2.5">
              {devServices.map((s) => (
                <li key={s.to}>
                  <Link
                    to={s.to}
                    className="text-sm text-gray-400 hover:text-primary transition-colors flex items-center gap-2"
                  >
                    <span className="w-1 h-1 bg-primary rounded-full flex-shrink-0" />
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white font-bold mb-5 text-sm uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-sm text-gray-400 hover:text-primary transition-colors flex items-center gap-2"
                  >
                    <span className="w-1 h-1 bg-gray-500 rounded-full flex-shrink-0" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Marketing services */}
          <div>
            <h4 className="text-white font-bold mb-5 text-sm uppercase tracking-wider">
              Marketing Services
            </h4>
            <ul className="space-y-2.5">
              {mktServices.map((s) => (
                <li key={s.to}>
                  <Link
                    to={s.to}
                    className="text-sm text-gray-400 hover:text-primary transition-colors flex items-center gap-2"
                  >
                    <span className="w-1 h-1 bg-accent rounded-full flex-shrink-0" />
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h4 className="text-white font-bold mb-5 text-sm uppercase tracking-wider">
              Connect with us
            </h4>
            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3 text-sm">
                <FaPhone className="text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-400 text-xs mb-0.5">Phone</p>
                  <a href="tel:+9779811418243" className="text-gray-300 hover:text-primary transition-colors block">
                    +977-9811418243
                  </a>
                  <a href="tel:+9779807433130" className="text-gray-300 hover:text-primary transition-colors block">
                    9807433130
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3 text-sm">
                <FaEnvelope className="text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-400 text-xs mb-0.5">Email</p>
                  <a href="mailto:info@reviraltechnology.com" className="text-gray-300 hover:text-primary transition-colors">
                    info@reviraltechnology.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3 text-sm">
                <FaMapMarkerAlt className="text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-400 text-xs mb-0.5">Office</p>
                  <p className="text-gray-300">Narayanpath, Bhairahawa, Nepal</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <div className="container-custom py-5 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Reviral Technology. All Rights Reserved.
          </p>
          <div className="flex gap-4 text-sm text-gray-500">
            <Link to="/faq" className="hover:text-primary transition-colors">FAQ</Link>
            <Link to="/terms" className="hover:text-primary transition-colors">Terms & Conditions</Link>
            <Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
