import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes, FaLeaf } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-green-600 text-white shadow-lg">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold flex items-center gap-2">
            <FaLeaf /> Plant ID
          </Link>
          
          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>

          {/* Desktop menu */}
          <div className="hidden md:flex space-x-6">
            <NavLinks />
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden pt-4"
          >
            <div className="flex flex-col space-y-4">
              <NavLinks mobile setIsOpen={setIsOpen} />
            </div>
          </motion.div>
        )}
      </nav>
    </header>
  );
};

const NavLinks = ({ mobile, setIsOpen }) => {
  const links = [
    { to: "/", text: "Home" },
    { to: "/upload", text: "Upload" },
    { to: "/about", text: "About" },
    { to: "/contact", text: "Contact" },
  ];

  return links.map((link) => (
    <Link
      key={link.to}
      to={link.to}
      className={`hover:text-green-200 transition-colors ${mobile ? 'block' : ''}`}
      onClick={() => mobile && setIsOpen(false)}
    >
      {link.text}
    </Link>
  ));
};

export default Header;
