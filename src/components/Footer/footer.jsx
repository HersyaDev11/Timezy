import { FiTwitter, FiInstagram, FiGithub, FiLinkedin } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="relative">
      {/* Top Gradient Line */}
      <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="bg-[#0f172a]/90 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 md:px-16 py-16">
          <div className="grid md:grid-cols-4 gap-12">
            {/* Brand */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-white">Timezy</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Platform manajemen waktu modern untuk mahasiswa ambisius. Fokus
                lebih tajam, prestasi lebih tinggi.
              </p>

              <div className="flex gap-4 pt-4">
                <SocialIcon>
                  <FiTwitter />
                </SocialIcon>
                <SocialIcon>
                  <FiInstagram />
                </SocialIcon>
                <SocialIcon>
                  <FiGithub />
                </SocialIcon>
                <SocialIcon>
                  <FiLinkedin />
                </SocialIcon>
              </div>
            </div>

            {/* Product */}
            <FooterColumn
              title="Product"
              links={["Features", "Pricing", "Integrations", "Roadmap"]}
            />

            {/* Company */}
            <FooterColumn
              title="Company"
              links={["About", "Blog", "Careers", "Contact"]}
            />

            {/* Legal */}
            <FooterColumn
              title="Legal"
              links={["Privacy Policy", "Terms of Service", "Security"]}
            />
          </div>

          {/* Bottom */}
          <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
            <p>© {new Date().getFullYear()} Timezy. All rights reserved.</p>
            <p>Built with focus & ambition 🚀</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* Reusable Components */

function FooterColumn({ title, links }) {
  return (
    <div>
      <h4 className="text-white font-semibold mb-6">{title}</h4>
      <ul className="space-y-3">
        {links.map((link, index) => (
          <li key={index}>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition duration-300"
            >
              {link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialIcon({ children }) {
  return (
    <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition duration-300 cursor-pointer">
      {children}
    </div>
  );
}
