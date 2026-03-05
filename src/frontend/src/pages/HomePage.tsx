import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "@tanstack/react-router";
import {
  Award,
  CheckCircle,
  ChevronRight,
  Clock,
  Cpu,
  DollarSign,
  HardDrive,
  Laptop,
  Loader2,
  Mail,
  MapPin,
  Menu,
  MessageSquare,
  Monitor,
  Phone,
  Printer,
  Shield,
  ShoppingBag,
  Smartphone,
  Star,
  Stethoscope,
  Tv,
  Wrench,
  X,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import CyberBar from "../components/ChristmasLights";
import { useBusinessInfo } from "../hooks/useBusinessInfo";
import { useSubmitServiceRequest } from "../hooks/useQueries";

/* ── Data ──────────────────────────────────────────── */
const SERVICES = [
  {
    icon: Stethoscope,
    title: "PC Diagnostics",
    desc: "Full hardware and software assessment to identify and solve performance issues.",
    category: "repair",
  },
  {
    icon: Cpu,
    title: "RAM & Storage Upgrades",
    desc: "Boost speed and capacity with professionally fitted RAM and SSD upgrades.",
    category: "repair",
  },
  {
    icon: Smartphone,
    title: "Screen Replacement",
    desc: "Cracked or flickering screen? Fast same-day replacement for most models.",
    category: "repair",
  },
  {
    icon: HardDrive,
    title: "Data Recovery",
    desc: "Recover lost files from failed drives, corrupted partitions, and damaged SSDs.",
    category: "repair",
  },
  {
    icon: Shield,
    title: "Virus & Malware Removal",
    desc: "Deep-clean your system, remove ransomware, and harden your defences.",
    category: "repair",
  },
  {
    icon: Wrench,
    title: "Hardware Repair",
    desc: "Motherboard, PSU, GPU, and component-level repairs for laptops and desktops.",
    category: "repair",
  },
  {
    icon: Printer,
    title: "Printer Repair",
    desc: "Diagnose and fix all printer issues — paper jams, connectivity, cartridge problems.",
    category: "repair",
  },
  {
    icon: Laptop,
    title: "Laptop Sales",
    desc: "Brand-new and renewed laptops for home, school, and business — quality-checked.",
    category: "sales",
  },
  {
    icon: ShoppingBag,
    title: "Printer Sales",
    desc: "Inkjet and laser printers for home and office use, with setup assistance included.",
    category: "sales",
  },
  {
    icon: Monitor,
    title: "Desktop Sales",
    desc: "Custom-built and ready-made desktop PCs suited to your budget and performance needs.",
    category: "sales",
  },
  {
    icon: Tv,
    title: "Monitor Sales",
    desc: "Full HD and 4K monitors from top brands — ideal for work, gaming, and creative use.",
    category: "sales",
  },
];

const WHY_US = [
  {
    icon: Zap,
    title: "Fast Turnaround",
    desc: "Most repairs completed within 24–48 hours. Same-day service available.",
  },
  {
    icon: Award,
    title: "Experienced Technicians",
    desc: "10+ years hands-on experience with all major brands and operating systems.",
  },
  {
    icon: DollarSign,
    title: "Affordable Pricing",
    desc: "Transparent flat-rate pricing. No hidden fees, ever.",
  },
  {
    icon: CheckCircle,
    title: "Free Diagnostics",
    desc: "We diagnose your device for free before any repair work begins.",
  },
];

const TESTIMONIALS = [
  {
    name: "Sarah Thompson",
    role: "Small Business Owner",
    rating: 5,
    text: "Brought in my work laptop after it completely died. They recovered all my data and had it running perfectly within two days. Absolute lifesavers!",
  },
  {
    name: "Marcus Okafor",
    role: "University Student",
    rating: 5,
    text: "Cracked screen replaced in under 3 hours. The price was way cheaper than what the manufacturer quoted. Friendly staff and genuinely honest advice.",
  },
  {
    name: "Linda Carver",
    role: "Retired Teacher",
    rating: 5,
    text: "My computer was riddled with viruses and running at a crawl. These guys cleaned it up, explained everything clearly, and even installed free protection. Highly recommend.",
  },
];

/* ── ContactForm ────────────────────────────────────── */
function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    deviceType: "",
    issueDescription: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const mutation = useSubmitServiceRequest();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !form.name ||
      !form.email ||
      !form.phone ||
      !form.deviceType ||
      !form.issueDescription
    ) {
      toast.error("Please fill in all fields.");
      return;
    }
    try {
      await mutation.mutateAsync(form);
      setSubmitted(true);
      toast.success("Repair request submitted! We'll be in touch shortly.");
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center gap-4 py-12 text-center"
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-full border border-primary/30 bg-primary/10 glow-cyan-sm">
          <CheckCircle className="h-8 w-8 text-primary" />
        </div>
        <h3 className="font-display text-2xl font-bold text-neon-cyan">
          Request Received!
        </h3>
        <p className="max-w-sm text-muted-foreground">
          We've got your details and will contact you within 1 business hour to
          confirm your booking.
        </p>
        <Button
          variant="outline"
          onClick={() => {
            setSubmitted(false);
            setForm({
              name: "",
              email: "",
              phone: "",
              deviceType: "",
              issueDescription: "",
            });
          }}
          className="mt-2 border-primary/40 hover:border-primary/70 hover:text-primary"
          data-ocid="contact.secondary_button"
        >
          Submit Another Request
        </Button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label
            htmlFor="name"
            className="font-mono-tech text-xs uppercase tracking-wider text-muted-foreground"
          >
            Full Name
          </Label>
          <Input
            id="name"
            placeholder="Jane Smith"
            value={form.name}
            onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
            className="border-border bg-background/50 focus-visible:ring-primary/50"
            data-ocid="contact.input"
          />
        </div>
        <div className="space-y-2">
          <Label
            htmlFor="email"
            className="font-mono-tech text-xs uppercase tracking-wider text-muted-foreground"
          >
            Email Address
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="jane@example.com"
            value={form.email}
            onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
            className="border-border bg-background/50 focus-visible:ring-primary/50"
            data-ocid="contact.input"
          />
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label
            htmlFor="phone"
            className="font-mono-tech text-xs uppercase tracking-wider text-muted-foreground"
          >
            Phone Number
          </Label>
          <Input
            id="phone"
            type="tel"
            placeholder="+91 74114 38800"
            value={form.phone}
            onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
            className="border-border bg-background/50 focus-visible:ring-primary/50"
            data-ocid="contact.input"
          />
        </div>
        <div className="space-y-2">
          <Label
            htmlFor="device"
            className="font-mono-tech text-xs uppercase tracking-wider text-muted-foreground"
          >
            Device Type
          </Label>
          <Select
            value={form.deviceType}
            onValueChange={(v) => setForm((p) => ({ ...p, deviceType: v }))}
          >
            <SelectTrigger
              id="device"
              className="border-border bg-background/50 focus:ring-primary/50"
              data-ocid="contact.select"
            >
              <SelectValue placeholder="Select device…" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Laptop">Laptop</SelectItem>
              <SelectItem value="Desktop">Desktop PC</SelectItem>
              <SelectItem value="Tablet">Tablet</SelectItem>
              <SelectItem value="Phone">Phone</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="space-y-2">
        <Label
          htmlFor="issue"
          className="font-mono-tech text-xs uppercase tracking-wider text-muted-foreground"
        >
          Describe the Issue
        </Label>
        <Textarea
          id="issue"
          rows={4}
          placeholder="Tell us what's happening with your device…"
          value={form.issueDescription}
          onChange={(e) =>
            setForm((p) => ({ ...p, issueDescription: e.target.value }))
          }
          className="resize-none border-border bg-background/50 focus-visible:ring-primary/50"
          data-ocid="contact.textarea"
        />
      </div>
      <Button
        type="submit"
        disabled={mutation.isPending}
        className="w-full bg-primary font-semibold text-primary-foreground hover:bg-primary/90 glow-cyan-sm"
        data-ocid="contact.submit_button"
      >
        {mutation.isPending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Submitting…
          </>
        ) : (
          <>
            Book My Repair
            <ChevronRight className="ml-2 h-4 w-4" />
          </>
        )}
      </Button>
    </form>
  );
}

/* ── StarRating ─────────────────────────────────────── */
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          // biome-ignore lint/suspicious/noArrayIndexKey: star index is stable
          key={i}
          className={`h-4 w-4 ${i < rating ? "fill-accent text-accent" : "text-muted"}`}
        />
      ))}
    </div>
  );
}

/* ── Main Page ──────────────────────────────────────── */
export default function HomePage() {
  const servicesRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { info: bizInfo } = useBusinessInfo();

  const scrollTo = (ref: React.RefObject<HTMLElement | null>) => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMobileMenuOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* ── Nav ── */}
      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/92 backdrop-blur-md">
        <div className="container flex h-20 items-center justify-between">
          {/* Logo */}
          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center"
            data-ocid="nav.button"
          >
            <img
              src="/assets/uploads/dtech-logo-transparent.dim_400x120-1.png"
              alt="DTech Solutions"
              className="h-16 w-auto"
            />
          </button>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-6 md:flex">
            <button
              type="button"
              onClick={scrollToTop}
              className="font-mono-tech text-xs uppercase tracking-widest text-foreground/70 transition-colors hover:text-neon-cyan"
              data-ocid="nav.link"
            >
              Home
            </button>
            <button
              type="button"
              onClick={() => scrollTo(servicesRef)}
              className="font-mono-tech text-xs uppercase tracking-widest text-foreground/70 transition-colors hover:text-neon-cyan"
              data-ocid="nav.link"
            >
              Services
            </button>
            <button
              type="button"
              onClick={() => scrollTo(aboutRef)}
              className="font-mono-tech text-xs uppercase tracking-widest text-foreground/70 transition-colors hover:text-neon-cyan"
              data-ocid="nav.link"
            >
              About
            </button>
            <button
              type="button"
              onClick={() => scrollTo(contactRef)}
              className="font-mono-tech text-xs uppercase tracking-widest text-foreground/70 transition-colors hover:text-neon-cyan"
              data-ocid="nav.link"
            >
              Contact
            </button>
            <Link
              to="/admin"
              className="font-mono-tech text-xs uppercase tracking-widest text-foreground/70 transition-colors hover:text-neon-cyan"
              data-ocid="nav.link"
            >
              Admin
            </Link>
            <Button
              size="sm"
              asChild
              className="bg-accent text-accent-foreground hover:bg-accent/90 glow-orange-sm font-mono-tech text-xs uppercase tracking-wider font-bold"
              data-ocid="nav.primary_button"
            >
              <a href="tel:7411438800">
                <Phone className="mr-1.5 h-3.5 w-3.5" />
                Call Now
              </a>
            </Button>
          </nav>

          {/* Mobile menu toggle */}
          <button
            type="button"
            className="md:hidden text-muted-foreground hover:text-primary transition-colors"
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            data-ocid="nav.toggle"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Cyber scan bar */}
        <CyberBar />

        {/* Mobile dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden border-t border-border/50 bg-background/98 md:hidden"
            >
              <div className="container flex flex-col gap-4 py-4">
                {[
                  { label: "Home", action: scrollToTop },
                  { label: "Services", action: () => scrollTo(servicesRef) },
                  { label: "About", action: () => scrollTo(aboutRef) },
                  { label: "Contact", action: () => scrollTo(contactRef) },
                ].map(({ label, action }, index) => (
                  <motion.button
                    key={label}
                    type="button"
                    onClick={action}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: index * 0.05,
                      duration: 0.25,
                      ease: "easeOut",
                    }}
                    className="text-left font-mono-tech text-xs uppercase tracking-widest text-foreground/70 hover:text-primary transition-colors"
                    data-ocid="nav.link"
                  >
                    {label}
                  </motion.button>
                ))}
                <motion.div
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: 4 * 0.05,
                    duration: 0.25,
                    ease: "easeOut",
                  }}
                >
                  <Link
                    to="/admin"
                    className="font-mono-tech text-xs uppercase tracking-widest text-foreground/70 hover:text-primary transition-colors"
                    data-ocid="nav.link"
                  >
                    Admin
                  </Link>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: 5 * 0.05,
                    duration: 0.25,
                    ease: "easeOut",
                  }}
                >
                  <Button
                    size="sm"
                    asChild
                    className="w-fit bg-accent text-accent-foreground glow-orange-sm font-mono-tech text-xs uppercase tracking-wider font-bold"
                    data-ocid="nav.primary_button"
                  >
                    <a href="tel:7411438800">
                      <Phone className="mr-1.5 h-3.5 w-3.5" />
                      Call Now
                    </a>
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main>
        {/* ── Hero ── */}
        <section className="relative overflow-hidden min-h-[600px] flex flex-col justify-between">
          {/* Background image */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage:
                "url('/assets/generated/tech-bg-cyber.dim_1920x1080.jpg')",
            }}
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/72" />
          {/* Cyan radial glow from top-left */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 70% 60% at 20% 30%, rgba(0,120,200,0.22) 0%, transparent 65%)",
            }}
          />
          {/* Subtle grid overlay */}
          <div className="absolute inset-0 bg-grid-pattern opacity-20" />

          <div className="container relative z-10 py-20 md:py-28 flex-1">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="max-w-3xl"
            >
              {/* Pill badge */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/50 bg-primary/10 px-4 py-1.5 backdrop-blur-sm glow-cyan-sm"
              >
                <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                <span className="font-mono-tech text-xs uppercase tracking-widest text-neon-cyan">
                  Bengaluru's Trusted Computer Repair
                </span>
              </motion.div>

              {/* Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="font-display text-4xl font-black leading-tight tracking-tight text-white md:text-5xl lg:text-6xl"
              >
                Expert Computer
                <br />
                <span className="relative inline-block">
                  <span className="text-gradient-cyan">Repair</span>
                  {/* Cyan neon underline */}
                  <svg
                    className="absolute -bottom-1 left-0 w-full"
                    height="6"
                    viewBox="0 0 200 6"
                    fill="none"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M0 5 Q50 1 100 4 Q150 7 200 3"
                      stroke="#00c3ff"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      style={{
                        filter: "drop-shadow(0 0 4px rgba(0,195,255,0.8))",
                      }}
                    />
                  </svg>
                </span>
                <span className="text-white"> &amp; IT Services</span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="mt-6 max-w-xl text-base text-white/65 md:text-lg"
              >
                Fast, reliable, and affordable repairs for laptops and desktops.
                We get your devices back to peak performance.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.45 }}
                className="mt-8 flex flex-wrap gap-4"
              >
                <Button
                  size="lg"
                  asChild
                  className="bg-accent text-accent-foreground hover:bg-accent/90 glow-orange font-bold"
                  data-ocid="hero.primary_button"
                >
                  <a href="tel:7411438800">
                    <Phone className="mr-2 h-4 w-4" />
                    Call Now
                  </a>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => scrollTo(contactRef)}
                  className="border-primary/40 bg-primary/5 text-white backdrop-blur-sm hover:border-primary/70 hover:bg-primary/10 hover:text-white glow-cyan"
                  data-ocid="hero.secondary_button"
                >
                  <MessageSquare className="mr-2 h-4 w-4 text-primary" />
                  Get a Quote
                </Button>
              </motion.div>
            </motion.div>
          </div>

          {/* Stats bar at bottom */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="relative z-10 border-t border-primary/20 bg-black/60 backdrop-blur-sm"
          >
            <div className="container">
              <div className="grid grid-cols-3 divide-x divide-primary/20">
                {[
                  { value: "5+", label: "Years Experience" },
                  { value: "2000+", label: "Repairs Done" },
                  { value: "7 Days", label: "Open Every Day" },
                ].map(({ value, label }) => (
                  <div
                    key={label}
                    className="flex flex-col items-center py-5 px-4 text-center"
                  >
                    <span className="font-display text-2xl font-black text-neon-cyan md:text-3xl">
                      {value}
                    </span>
                    <span className="mt-1 font-mono-tech text-xs text-white/50 uppercase tracking-wide">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Cyan bottom fade */}
          <div
            className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 z-10"
            style={{
              background:
                "linear-gradient(to top, rgba(5,10,30,0.5) 0%, transparent 100%)",
            }}
          />
        </section>

        {/* ── Services ── */}
        <section
          ref={servicesRef}
          id="services"
          className="py-20 md:py-28 relative"
        >
          {/* Dot pattern overlay */}
          <div className="absolute inset-0 bg-dots-pattern opacity-30 pointer-events-none" />
          <div className="container relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-12"
            >
              <div className="mb-3 font-mono-tech text-xs uppercase tracking-widest text-neon-cyan">
                {"// What We Fix & Sell"}
              </div>
              <h2 className="font-display text-3xl font-black md:text-4xl text-foreground">
                Our Services
              </h2>
              <p className="mt-3 max-w-xl text-muted-foreground">
                From expert repairs to quality renewed &amp; new sales —
                laptops, printers, desktops, and monitors.
              </p>
            </motion.div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {SERVICES.map((service, i) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
                  whileTap={{ scale: 0.98 }}
                  className="group rounded-xl border border-border bg-card/80 backdrop-blur-sm p-6 card-hover"
                  data-ocid={`services.item.${i + 1}`}
                >
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg border border-primary/25 bg-primary/10 transition-all group-hover:border-primary/60 group-hover:bg-primary/20 group-hover:glow-cyan-sm">
                    <service.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-foreground">
                    {service.title}
                  </h3>
                  {service.category === "sales" && (
                    <span className="mt-1 inline-block rounded-full border border-accent/40 bg-accent/10 px-2 py-0.5 font-mono-tech text-[10px] uppercase tracking-wider text-accent">
                      Sales
                    </span>
                  )}
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {service.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Why Us (About) ── */}
        <section
          ref={aboutRef}
          id="about"
          className="border-y border-border/50 py-20 md:py-28 relative"
          style={{
            background:
              "linear-gradient(180deg, oklch(var(--card) / 0.5) 0%, oklch(var(--background)) 100%)",
          }}
        >
          {/* Cyan radial glow center */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,100,180,0.10) 0%, transparent 70%)",
            }}
          />
          <div className="container relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-12 text-center"
            >
              <div className="mb-3 font-mono-tech text-xs uppercase tracking-widest text-neon-cyan">
                {"// Why DTech Solutions"}
              </div>
              <h2 className="font-display text-3xl font-black md:text-4xl">
                The DTech Solutions Advantage
              </h2>
            </motion.div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {WHY_US.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-primary/30 bg-primary/10 glow-cyan-sm">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-display text-lg font-bold">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Testimonials ── */}
        <section className="py-20 md:py-28 relative">
          <div className="absolute inset-0 bg-dots-pattern opacity-20 pointer-events-none" />
          <div className="container relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-12"
            >
              <div className="mb-3 font-mono-tech text-xs uppercase tracking-widest text-neon-cyan">
                {"// Client Feedback"}
              </div>
              <h2 className="font-display text-3xl font-black md:text-4xl">
                What Our Customers Say
              </h2>
            </motion.div>

            <div className="grid gap-6 md:grid-cols-3">
              {TESTIMONIALS.map((t, i) => (
                <motion.div
                  key={t.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="rounded-xl border border-border bg-card/80 backdrop-blur-sm p-6 card-hover"
                  data-ocid={`testimonials.item.${i + 1}`}
                >
                  <StarRating rating={t.rating} />
                  <blockquote className="mt-4 text-sm leading-relaxed text-foreground/85">
                    "{t.text}"
                  </blockquote>
                  <div className="mt-5 flex items-center gap-3 border-t border-border/50 pt-4">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 border border-primary/25">
                      <span className="font-display text-sm font-bold text-primary">
                        {t.name[0]}
                      </span>
                    </div>
                    <div>
                      <div className="font-semibold text-sm">{t.name}</div>
                      <div className="font-mono-tech text-xs text-muted-foreground">
                        {t.role}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Contact / Booking ── */}
        <section
          ref={contactRef}
          id="contact"
          className="border-t border-border/50 py-20 md:py-28 relative"
          style={{
            background:
              "linear-gradient(180deg, oklch(var(--card) / 0.3) 0%, oklch(var(--background)) 100%)",
          }}
        >
          <div className="container relative z-10">
            <div className="grid gap-12 lg:grid-cols-2">
              {/* Left col */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="mb-3 font-mono-tech text-xs uppercase tracking-widest text-neon-cyan">
                  {"// Get in Touch"}
                </div>
                <h2 className="font-display text-3xl font-black md:text-4xl">
                  Book a Repair
                </h2>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  Fill in the form and we'll get back to you within 1 business
                  hour to confirm your appointment.
                </p>

                <div className="mt-8 space-y-4">
                  {[
                    {
                      icon: Phone,
                      label: "Phone",
                      value: bizInfo.phone,
                    },
                    {
                      icon: Mail,
                      label: "Email",
                      value: bizInfo.email,
                    },
                    {
                      icon: MapPin,
                      label: "Address",
                      value: bizInfo.address,
                    },
                    {
                      icon: Clock,
                      label: "Hours",
                      value: bizInfo.hours,
                    },
                  ].map(({ icon: Icon, label, value }) => (
                    <div key={label} className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded border border-primary/25 bg-primary/10">
                        <Icon className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <div className="font-mono-tech text-xs text-muted-foreground uppercase tracking-wider">
                          {label}
                        </div>
                        <div className="text-sm font-medium">{value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Right col — form */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="rounded-2xl border border-border bg-card/80 backdrop-blur-sm p-6 md:p-8"
                style={{
                  boxShadow:
                    "0 0 40px rgba(0,195,255,0.05), 0 20px 60px rgba(0,0,0,0.4)",
                }}
              >
                <ContactForm />
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-border/50 bg-background py-12 relative">
        {/* Cyan glow at top of footer */}
        <div
          className="pointer-events-none absolute top-0 left-0 right-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(0,195,255,0.35) 30%, rgba(0,195,255,0.35) 70%, transparent)",
            boxShadow: "0 0 8px rgba(0,195,255,0.25)",
          }}
        />
        <div className="container">
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <button
                type="button"
                onClick={scrollToTop}
                className="flex items-center"
              >
                <img
                  src="/assets/uploads/dtech-logo-transparent.dim_400x120-1.png"
                  alt="DTech Solutions"
                  className="h-14 w-auto"
                />
              </button>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                Your trusted local computer repair specialist. Fast, honest, and
                affordable.
              </p>
            </div>

            <div>
              <h4 className="font-mono-tech text-xs uppercase tracking-widest text-muted-foreground mb-4">
                Opening Hours
              </h4>
              <div className="space-y-2 text-sm">
                <div className="text-muted-foreground">{bizInfo.hours}</div>
              </div>
            </div>

            <div>
              <h4 className="font-mono-tech text-xs uppercase tracking-widest text-muted-foreground mb-4">
                Contact
              </h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>{bizInfo.phone}</div>
                <div>{bizInfo.email}</div>
                <div>{bizInfo.address}</div>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-border/50 pt-6 text-xs text-muted-foreground sm:flex-row">
            <span>
              © {new Date().getFullYear()} DTech Solutions. All rights reserved.
            </span>
            <span>
              Built with ❤️ using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary/80 hover:text-primary transition-colors"
              >
                caffeine.ai
              </a>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
