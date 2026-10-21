import Link from "next/link";
import {
  HeartHandshake,
  Mail,
  MapPin,
  ArrowUpRight,
} from "lucide-react";

const footerLinks = {
  Platform: [
    { label: "Home", href: "/" },
    { label: "Explore Events", href: "/events" },
    { label: "About Us", href: "/about" },
  ],
  Community: [
    { label: "Become a Volunteer", href: "/register" },
    { label: "Create an Account", href: "/register" },
    { label: "Log In", href: "/login" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-300">
      <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="inline-flex items-center gap-2.5">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white">
                <HeartHandshake size={23} />
              </span>

              <span className="text-xl font-extrabold text-white">
                Together<span className="text-emerald-400">WeCan</span>
              </span>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-7 text-gray-400">
              Connecting people, empowering volunteers, and bringing
              communities together through meaningful events.
            </p>
          </div>

          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h3 className="font-bold text-white">{heading}</h3>

              <ul className="mt-5 space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="inline-flex items-center gap-1 text-sm text-gray-400 transition hover:text-emerald-400"
                    >
                      {link.label}
                      <ArrowUpRight size={13} />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="font-bold text-white">Get in touch</h3>

            <div className="mt-5 space-y-4">
              <p className="flex items-start gap-3 text-sm leading-6 text-gray-400">
                <Mail size={18} className="mt-1 shrink-0 text-emerald-400" />
                Contact information coming soon
              </p>

              <p className="flex items-start gap-3 text-sm leading-6 text-gray-400">
                <MapPin size={18} className="mt-1 shrink-0 text-emerald-400" />
                Bangladesh
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-gray-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} TogetherWeCan. All rights reserved.
          </p>

          <p>Built for stronger communities.</p>
        </div>
      </div>
    </footer>
  );
}