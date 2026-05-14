// Minimal Lucide-style icon set as React components.
// Stroke icons; pass className for sizing/color.

const _svg = (paths, viewBox = "0 0 24 24") => ({ className = "w-5 h-5", strokeWidth = 1.75, ...rest } = {}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox={viewBox}
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
    {...rest}
  >
    {paths}
  </svg>
);

const Menu = _svg(<><line x1="4" y1="7" x2="20" y2="7" /><line x1="4" y1="12" x2="20" y2="12" /><line x1="4" y1="17" x2="20" y2="17" /></>);
const X = _svg(<><line x1="6" y1="6" x2="18" y2="18" /><line x1="18" y1="6" x2="6" y2="18" /></>);
const ArrowRight = _svg(<><line x1="5" y1="12" x2="19" y2="12" /><polyline points="13 6 19 12 13 18" /></>);
const ArrowDown = _svg(<><line x1="12" y1="5" x2="12" y2="19" /><polyline points="6 13 12 19 18 13" /></>);
const Activity = _svg(<polyline points="3 12 7 12 10 4 14 20 17 12 21 12" />);
const Users = _svg(<><path d="M17 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></>);
const FileText = _svg(<><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="8" y1="13" x2="16" y2="13" /><line x1="8" y1="17" x2="14" y2="17" /></>);
const Shield = _svg(<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />);
const Heart = _svg(<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 1 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />);
const Network = _svg(<><rect x="9" y="2" width="6" height="6" rx="1" /><rect x="2" y="16" width="6" height="6" rx="1" /><rect x="16" y="16" width="6" height="6" rx="1" /><path d="M5 16v-3h14v3" /><path d="M12 8v5" /></>);
const BookOpen = _svg(<><path d="M2 4h7a3 3 0 0 1 3 3v14a2 2 0 0 0-2-2H2z" /><path d="M22 4h-7a3 3 0 0 0-3 3v14a2 2 0 0 1 2-2h8z" /></>);
const Quote = _svg(<><path d="M7 7h3a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H8c0 2 1 3 3 4" /><path d="M15 7h3a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2c0 2 1 3 3 4" /></>);
const ChevronDown = _svg(<polyline points="6 9 12 15 18 9" />);
const Building = _svg(<><rect x="4" y="3" width="16" height="18" rx="1" /><line x1="9" y1="7" x2="9" y2="7.01" /><line x1="15" y1="7" x2="15" y2="7.01" /><line x1="9" y1="11" x2="9" y2="11.01" /><line x1="15" y1="11" x2="15" y2="11.01" /><line x1="9" y1="15" x2="9" y2="15.01" /><line x1="15" y1="15" x2="15" y2="15.01" /><line x1="10" y1="21" x2="14" y2="21" /></>);
const Scale = _svg(<><path d="M16 16l3-8 3 8c-2 1-4 1-6 0z" /><path d="M2 16l3-8 3 8c-2 1-4 1-6 0z" /><path d="M7 21h10" /><path d="M12 3v18" /><path d="M5 8h14" /></>);
const Home = _svg(<><path d="M3 11l9-8 9 8" /><path d="M5 10v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V10" /><path d="M10 21v-6h4v6" /></>);
const Mail = _svg(<><rect x="3" y="5" width="18" height="14" rx="2" /><polyline points="3 7 12 13 21 7" /></>);
const MapPin = _svg(<><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" /><circle cx="12" cy="10" r="3" /></>);
const TrendingUp = _svg(<><polyline points="3 17 9 11 13 15 21 7" /><polyline points="15 7 21 7 21 13" /></>);
const Hospital = _svg(<><path d="M4 21V6a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v15" /><line x1="2" y1="21" x2="22" y2="21" /><path d="M12 9v6" /><path d="M9 12h6" /><line x1="9" y1="21" x2="9" y2="17" /><line x1="15" y1="21" x2="15" y2="17" /></>);
const Handshake = _svg(<><path d="M11 17l2 2a1 1 0 0 0 1.4 0l4-4a1 1 0 0 0 0-1.4l-2-2" /><path d="M22 12l-4-4-6 6-4-4-5 5 4 4 2-2" /><path d="M11 17l1.5 1.5" /></>);
const Sparkle = _svg(<><path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z" /></>);

window.Icons = {
  Menu, X, ArrowRight, ArrowDown, Activity, Users, FileText, Shield, Heart, Network,
  BookOpen, Quote, ChevronDown, Building, Scale, Home, Mail, MapPin, TrendingUp,
  Hospital, Handshake, Sparkle
};
