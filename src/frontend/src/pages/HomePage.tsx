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
  Loader2,
  Mail,
  MapPin,
  Menu,
  Monitor,
  Phone,
  Shield,
  Smartphone,
  Star,
  Stethoscope,
  Wrench,
  X,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";
import { toast } from "sonner";
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
    icon: Monitor,
    title: "Hardware Repair",
    desc: "Motherboard, PSU, GPU, and component-level repairs for laptops and desktops.",
  },
  {
    icon: Wrench,
    title: "Printer Repair",
    desc: "Diagnose and fix all printer issues — paper jams, connectivity, cartridge problems, and more.",
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
        <div className="flex h-16 w-16 items-center justify-center rounded-full border border-primary/30 bg-primary/10 glow-cyan">
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
            placeholder="+1 (555) 000-0000"
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
        className="w-full bg-primary font-semibold text-primary-foreground hover:bg-primary/90 glow-cyan-sm"
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollTo = (ref: React.RefObject<HTMLElement | null>) => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* ── Nav ── */}
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded bg-primary/10 border border-primary/30">
              <Wrench className="h-4 w-4 text-primary" />
            </div>
            <span className="font-display text-lg font-bold tracking-tight">
              DTech<span className="text-primary"> Solutions</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-6 md:flex">
            <button
              type="button"
              onClick={() => scrollTo(servicesRef)}
              className="font-mono-tech text-xs font-medium uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
            >
              Services
            </button>
            <button
              type="button"
              onClick={() => scrollTo(contactRef)}
              className="font-mono-tech text-xs font-medium uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
            >
              Contact
            </button>
            <Link
              to="/admin"
              className="font-mono-tech text-xs font-medium uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
            >
              Admin
            </Link>
            <Button
              size="sm"
              onClick={() => scrollTo(contactRef)}
              className="bg-primary text-primary-foreground hover:bg-primary/90 glow-cyan-sm"
            >
              Book a Repair
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
                  onClick={() => scrollTo(servicesRef)}
                  className="text-left font-mono-tech text-xs uppercase tracking-widest text-muted-foreground"
                >
                  Services
                </button>
                <button
                  type="button"
                  onClick={() => scrollTo(contactRef)}
                  className="text-left font-mono-tech text-xs uppercase tracking-widest text-muted-foreground"
                >
                  Contact
                </button>
                <Link
                  to="/admin"
                  className="font-mono-tech text-xs uppercase tracking-widest text-muted-foreground"
                >
                  Admin
                </Link>
                <Button
                  size="sm"
                  onClick={() => scrollTo(contactRef)}
                  className="w-fit bg-primary text-primary-foreground"
                >
                  Book a Repair
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main>
        {/* ── Hero ── */}
        <section className="relative overflow-hidden py-20 md:py-32">
          {/* Background */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('/assets/generated/hero-circuit-bg.dim_1600x700.jpg')",
            }}
          />
          <div className="absolute inset-0 bg-background/75" />
          <div className="absolute inset-0 bg-grid-pattern opacity-20" />

          {/* Glow orb */}
          <div className="absolute -top-20 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />

          <div className="container relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="max-w-3xl"
            >
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1">
                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                <span className="font-mono-tech text-xs text-primary">
                  Professional Computer Repair
                </span>
              </div>

              <h1 className="font-display text-4xl font-black leading-tight tracking-tight md:text-6xl lg:text-7xl">
                Expert Computer
                <br />
                <span className="text-gradient-cyan">Repairs You</span>
                <br />
                Can Trust
              </h1>

              <p className="mt-6 max-w-xl text-lg text-muted-foreground">
                Fast, affordable, and professional tech support for your
                laptops, desktops, and devices. No jargon, no hidden fees — just
                results.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Button
                  size="lg"
                  onClick={() => scrollTo(contactRef)}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 glow-cyan"
                >
                  Book a Repair
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => scrollTo(servicesRef)}
                  className="border-border hover:border-primary/50 hover:text-primary"
                >
                  Our Services
                </Button>
              </div>

              {/* Stats bar */}
              <div className="mt-12 flex flex-wrap gap-8">
                {[
                  ["500+", "Devices Repaired"],
                  ["24hr", "Avg. Turnaround"],
                  ["98%", "Satisfaction Rate"],
                ].map(([val, label]) => (
                  <div key={label}>
                    <div className="font-display text-2xl font-black text-primary">
                      {val}
                    </div>
                    <div className="font-mono-tech text-xs text-muted-foreground">
                      {label}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
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
                {"// What We Fix"}
              </div>
              <h2 className="font-display text-3xl font-black md:text-4xl">
                Our Services
              </h2>
              <p className="mt-3 max-w-xl text-muted-foreground">
                From simple software fixes to complex component-level repairs —
                we handle it all.
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

        {/* ── Why Us ── */}
        <section className="border-y border-border/50 bg-card/30 py-20 md:py-28">
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
                      value: "7411438800",
                    },
                    {
                      icon: Mail,
                      label: "Email",
                      value: "dhanush.dtechsolutions@gmail.com",
                    },
                    {
                      icon: MapPin,
                      label: "Address",
                      value:
                        "D301, DB Lakven Visishta, Belathur Main Rd, Belathur, Krishnarajapuram, Bengaluru, Karnataka 560067",
                    },
                    {
                      icon: Clock,
                      label: "Hours",
                      value: "Monday – Sunday: 11:00am – 8:00pm",
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
              <Link to="/" className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded bg-primary/10 border border-primary/30">
                  <Wrench className="h-4 w-4 text-primary" />
                </div>
                <span className="font-display text-lg font-bold">
                  DTech<span className="text-primary"> Solutions</span>
                </span>
              </Link>
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
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Monday – Sunday</span>
                  <span>11:00am – 8:00pm</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-mono-tech text-xs uppercase tracking-widest text-muted-foreground mb-4">
                Contact
              </h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>7411438800</div>
                <div>dhanush.dtechsolutions@gmail.com</div>
                <div>
                  D301, DB Lakven Visishta, Belathur Main Rd, Belathur,
                  Krishnarajapuram, Bengaluru, Karnataka 560067
                </div>
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
