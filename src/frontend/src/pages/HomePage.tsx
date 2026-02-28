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
import { useBusinessInfo } from "../hooks/useBusinessInfo";
import { useSubmitServiceRequest } from "../hooks/useQueries";

/* ── Data ──────────────────────────────────────────── */
const SERVICES = [
  {
    icon: Stethoscope,
    title: "PC Diagnostics",
    desc: "Full hardware and software assessment to identify and solve performance issues.",
  },
  {
    icon: Cpu,
    title: "RAM & Storage Upgrades",
    desc: "Boost speed and capacity with professionally fitted RAM and SSD upgrades.",
  },
  {
    icon: Smartphone,
    title: "Screen Replacement",
    desc: "Cracked or flickering screen? Fast same-day replacement for most models.",
  },
  {
    icon: HardDrive,
    title: "Data Recovery",
    desc: "Recover lost files from failed drives, corrupted partitions, and damaged SSDs.",
  },
  {
    icon: Shield,
    title: "Virus & Malware Removal",
    desc: "Deep-clean your system, remove ransomware, and harden your defences.",
  },
  {
    icon: Wrench,
    title: "Hardware Repair",
    desc: "Motherboard, PSU, GPU, and component-level repairs for laptops and desktops.",
  },
  {
    icon: Printer,
    title: "Printer Repair",
    desc: "Diagnose and fix all printer issues — paper jams, connectivity, cartridge problems, and more.",
  },
  {
    icon: Laptop,
    title: "Laptop Sales",
    desc: "Brand-new and renewed laptops for home, school, and business — all quality-checked before handover.",
  },
  {
    icon: ShoppingBag,
    title: "Printer Sales",
    desc: "Inkjet and laser printers for home and office use, with setup assistance included.",
  },
  {
    icon: Monitor,
    title: "Desktop Sales",
    desc: "Custom-built and ready-made desktop PCs suited to your budget and performance needs.",
  },
  {
    icon: Tv,
    title: "Monitor Sales",
    desc: "Full HD and 4K monitors from top brands — ideal for work, gaming, and creative use.",
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
        <div className="flex h-16 w-16 items-center justify-center rounded-full border border-primary/30 bg-primary/10 glow-orange">
          <CheckCircle className="h-8 w-8 text-primary" />
        </div>
        <h3 className="font-display text-2xl font-bold">Request Received!</h3>
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
          className="mt-2 border-border hover:border-primary/50 hover:text-primary"
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
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            placeholder="Jane Smith"
            value={form.name}
            onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
            className="border-border bg-background/50 focus-visible:ring-primary/50"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            placeholder="jane@example.com"
            value={form.email}
            onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
            className="border-border bg-background/50 focus-visible:ring-primary/50"
          />
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="+91 74114 38800"
            value={form.phone}
            onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
            className="border-border bg-background/50 focus-visible:ring-primary/50"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="device">Device Type</Label>
          <Select
            value={form.deviceType}
            onValueChange={(v) => setForm((p) => ({ ...p, deviceType: v }))}
          >
            <SelectTrigger
              id="device"
              className="border-border bg-background/50 focus:ring-primary/50"
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
        <Label htmlFor="issue">Describe the Issue</Label>
        <Textarea
          id="issue"
          rows={4}
          placeholder="Tell us what's happening with your device…"
          value={form.issueDescription}
          onChange={(e) =>
            setForm((p) => ({ ...p, issueDescription: e.target.value }))
          }
          className="resize-none border-border bg-background/50 focus-visible:ring-primary/50"
        />
      </div>
      <Button
        type="submit"
        disabled={mutation.isPending}
        className="w-full bg-primary font-semibold text-primary-foreground hover:bg-primary/90 glow-orange-sm"
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
          className={`h-4 w-4 ${i < rating ? "fill-primary text-primary" : "text-muted"}`}
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
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/90 backdrop-blur-md">
        <div className="container flex h-20 items-center justify-between">
          {/* Logo */}
          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center"
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
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
            >
              Home
            </button>
            <button
              type="button"
              onClick={() => scrollTo(servicesRef)}
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
            >
              Services
            </button>
            <button
              type="button"
              onClick={() => scrollTo(aboutRef)}
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
            >
              About
            </button>
            <button
              type="button"
              onClick={() => scrollTo(contactRef)}
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
            >
              Contact
            </button>
            <Link
              to="/admin"
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
            >
              Admin
            </Link>
            <Button
              size="sm"
              asChild
              className="bg-primary text-primary-foreground hover:bg-primary/90 glow-orange-sm"
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
            className="md:hidden text-muted-foreground hover:text-foreground"
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Mobile dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden border-t border-border/50 bg-background/95 md:hidden"
            >
              <div className="container flex flex-col gap-4 py-4">
                <button
                  type="button"
                  onClick={scrollToTop}
                  className="text-left text-sm font-medium text-foreground/80"
                >
                  Home
                </button>
                <button
                  type="button"
                  onClick={() => scrollTo(servicesRef)}
                  className="text-left text-sm font-medium text-foreground/80"
                >
                  Services
                </button>
                <button
                  type="button"
                  onClick={() => scrollTo(aboutRef)}
                  className="text-left text-sm font-medium text-foreground/80"
                >
                  About
                </button>
                <button
                  type="button"
                  onClick={() => scrollTo(contactRef)}
                  className="text-left text-sm font-medium text-foreground/80"
                >
                  Contact
                </button>
                <Link
                  to="/admin"
                  className="text-sm font-medium text-foreground/80"
                >
                  Admin
                </Link>
                <Button
                  size="sm"
                  asChild
                  className="w-fit bg-primary text-primary-foreground"
                >
                  <a href="tel:7411438800">
                    <Phone className="mr-1.5 h-3.5 w-3.5" />
                    Call Now
                  </a>
                </Button>
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
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('/assets/generated/hero-repair-bg.dim_1600x800.jpg')",
            }}
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/65" />
          {/* Subtle grid */}
          <div className="absolute inset-0 bg-grid-pattern opacity-10" />

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
                className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 backdrop-blur-sm"
              >
                <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                <span className="text-sm font-medium text-primary">
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
                  <span className="text-gradient-orange">Repair</span>
                  {/* Orange underline decoration */}
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
                      stroke="#ff8c00"
                      strokeWidth="2.5"
                      strokeLinecap="round"
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
                className="mt-6 max-w-xl text-base text-white/70 md:text-lg"
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
                  className="bg-primary text-primary-foreground hover:bg-primary/90 glow-orange font-semibold"
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
                  className="border-white/30 bg-white/5 text-white backdrop-blur-sm hover:border-primary/60 hover:bg-primary/10 hover:text-white"
                >
                  <MessageSquare className="mr-2 h-4 w-4" />
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
            className="relative z-10 border-t border-white/10 bg-black/40 backdrop-blur-sm"
          >
            <div className="container">
              <div className="grid grid-cols-3 divide-x divide-white/10">
                {[
                  { value: "5+", label: "Years Experience" },
                  { value: "2000+", label: "Repairs Done" },
                  { value: "7 Days", label: "Open Every Day" },
                ].map(({ value, label }) => (
                  <div
                    key={label}
                    className="flex flex-col items-center py-5 px-4 text-center"
                  >
                    <span className="font-display text-2xl font-black text-primary md:text-3xl">
                      {value}
                    </span>
                    <span className="mt-1 text-xs font-medium text-white/60 uppercase tracking-wide">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        {/* ── Services ── */}
        <section ref={servicesRef} id="services" className="py-20 md:py-28">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-12"
            >
              <div className="mb-3 font-mono-tech text-xs uppercase tracking-widest text-primary">
                {"// What We Fix & Sell"}
              </div>
              <h2 className="font-display text-3xl font-black md:text-4xl">
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
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="group rounded-lg border border-border bg-card p-6 card-hover"
                >
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-md border border-primary/20 bg-primary/10 transition-colors group-hover:border-primary/40 group-hover:bg-primary/15">
                    <service.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-display text-lg font-bold">
                    {service.title}
                  </h3>
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
          className="border-y border-border/50 bg-card/30 py-20 md:py-28"
        >
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-12 text-center"
            >
              <div className="mb-3 font-mono-tech text-xs uppercase tracking-widest text-primary">
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
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-primary/30 bg-primary/10 glow-orange-sm">
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
        <section className="py-20 md:py-28">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-12"
            >
              <div className="mb-3 font-mono-tech text-xs uppercase tracking-widest text-primary">
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
                  className="rounded-lg border border-border bg-card p-6 card-hover"
                >
                  <StarRating rating={t.rating} />
                  <blockquote className="mt-4 text-sm leading-relaxed text-foreground/90">
                    "{t.text}"
                  </blockquote>
                  <div className="mt-5 flex items-center gap-3 border-t border-border/50 pt-4">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 border border-primary/20">
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
          className="border-t border-border/50 bg-card/20 py-20 md:py-28"
        >
          <div className="container">
            <div className="grid gap-12 lg:grid-cols-2">
              {/* Left col */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="mb-3 font-mono-tech text-xs uppercase tracking-widest text-primary">
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
                      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded border border-primary/20 bg-primary/10">
                        <Icon className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <div className="font-mono-tech text-xs text-muted-foreground">
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
                className="rounded-xl border border-border bg-card p-6 md:p-8"
              >
                <ContactForm />
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-border/50 bg-background py-12">
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
