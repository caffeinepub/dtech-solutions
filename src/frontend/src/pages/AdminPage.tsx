import { Badge } from "@/components/ui/badge";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  Building2,
  ClipboardList,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  LogOut,
  RefreshCw,
  Save,
  Shield,
  Wrench,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import type { ServiceRequest } from "../backend.d";
import { useActor } from "../hooks/useActor";
import { type BusinessInfo, useBusinessInfo } from "../hooks/useBusinessInfo";
import {
  useGetAllServiceRequests,
  useUpdateRequestStatus,
} from "../hooks/useQueries";

const ADMIN_PASSWORD = "DTech@Admin2024";
const AUTH_KEY = "admin_auth";

const STATUS_OPTIONS = ["Pending", "In Progress", "Completed", "Cancelled"];

const STATUS_COLORS: Record<string, string> = {
  Pending: "border-amber-500/30 bg-amber-500/10 text-amber-400",
  "In Progress": "border-blue-500/30 bg-blue-500/10 text-blue-400",
  Completed: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
  Cancelled: "border-red-500/30 bg-red-500/10 text-red-400",
};

function formatTimestamp(ns: bigint): string {
  try {
    const ms = Number(ns / 1_000_000n);
    return new Date(ms).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return "—";
  }
}

function StatusCell({ request }: { request: ServiceRequest }) {
  const mutation = useUpdateRequestStatus();

  const handleChange = async (newStatus: string) => {
    try {
      await mutation.mutateAsync({ id: request.id, status: newStatus });
      toast.success(`Status updated to "${newStatus}"`);
    } catch {
      toast.error("Failed to update status. Please try again.");
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Select
        value={request.status}
        onValueChange={handleChange}
        disabled={mutation.isPending}
      >
        <SelectTrigger className="h-8 w-36 border-border bg-background/50 text-xs focus:ring-primary/50">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {STATUS_OPTIONS.map((s) => (
            <SelectItem key={s} value={s} className="text-xs">
              {s}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {mutation.isPending && (
        <Loader2 className="h-3 w-3 animate-spin text-primary" />
      )}
    </div>
  );
}

// ─── Login Gate ──────────────────────────────────────────────────────────────

function LoginGate({ onLogin }: { onLogin: () => void }) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    // Brief delay for UX feedback
    await new Promise((r) => setTimeout(r, 400));

    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem(AUTH_KEY, "true");
      onLogin();
    } else {
      setError("Incorrect password. Please try again.");
      setPassword("");
    }
    setIsSubmitting(false);
  };

  return (
    <div className="relative min-h-screen bg-background flex items-center justify-center overflow-hidden">
      {/* Atmospheric grid background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

      {/* Orange glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(220,120,30,0.08) 0%, transparent 70%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-sm mx-4"
      >
        {/* Card */}
        <div
          className="rounded-2xl border border-border bg-card p-8"
          style={{
            boxShadow:
              "0 0 40px rgba(220,120,30,0.12), 0 20px 60px rgba(0,0,0,0.5)",
          }}
        >
          {/* Logo + Branding */}
          <div className="flex flex-col items-center mb-8">
            <img
              src="/assets/uploads/dtech-logo-transparent.dim_400x120-1.png"
              alt="DTech Solutions"
              className="h-12 w-auto object-contain mb-4"
            />
            <div className="flex items-center gap-2 mb-1">
              <div className="flex h-7 w-7 items-center justify-center rounded bg-primary/10 border border-primary/30">
                <Shield className="h-3.5 w-3.5 text-primary" />
              </div>
              <span className="font-display font-bold text-lg">
                Admin <span className="text-primary">Portal</span>
              </span>
            </div>
            <p className="font-mono-tech text-xs text-muted-foreground tracking-wider">
              RESTRICTED ACCESS
            </p>
          </div>

          {/* Divider */}
          <div className="mb-6 h-px bg-border" />

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label
                htmlFor="admin-password"
                className="font-mono-tech text-xs uppercase tracking-wider text-muted-foreground"
              >
                Admin Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                <Input
                  id="admin-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) setError("");
                  }}
                  placeholder="Enter admin password"
                  className="pl-10 pr-10 bg-background/60 border-border focus:border-primary/60 focus:ring-primary/30"
                  autoComplete="current-password"
                  // eslint-disable-next-line jsx-a11y/no-autofocus
                  autoFocus
                  disabled={isSubmitting}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  tabIndex={-1}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Error message */}
            <AnimatePresence mode="wait">
              {error && (
                <motion.p
                  key="error-msg"
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-2 rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-xs text-red-400"
                  role="alert"
                >
                  <span className="shrink-0">⚠</span>
                  {error}
                </motion.p>
              )}
            </AnimatePresence>

            <Button
              type="submit"
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
              disabled={isSubmitting || !password}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Verifying…
                </>
              ) : (
                <>
                  <Lock className="mr-2 h-4 w-4" />
                  Login
                </>
              )}
            </Button>
          </form>
        </div>

        {/* Back link */}
        <div className="mt-4 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 font-mono-tech text-xs text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to DTech Solutions
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Business Info Editor ─────────────────────────────────────────────────────

function BusinessInfoEditor() {
  const { info, updateInfo } = useBusinessInfo();
  const [form, setForm] = useState<BusinessInfo>(info);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    await new Promise((r) => setTimeout(r, 300));
    updateInfo(form);
    setIsSaving(false);
    toast.success("Business info updated successfully.");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-2xl"
    >
      <div className="mb-6">
        <div className="mb-2 font-mono-tech text-xs uppercase tracking-widest text-primary">
          {"// Business Details"}
        </div>
        <h2 className="font-display text-2xl font-black">Business Info</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Update your address, phone, email, and opening hours. Changes reflect
          instantly on the customer-facing site.
        </p>
      </div>

      <form
        onSubmit={handleSave}
        className="rounded-xl border border-border bg-card p-6 md:p-8 space-y-5"
      >
        <div className="space-y-2">
          <Label
            htmlFor="bi-phone"
            className="font-mono-tech text-xs uppercase tracking-wider text-muted-foreground"
          >
            Phone Number
          </Label>
          <Input
            id="bi-phone"
            value={form.phone}
            onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
            placeholder="e.g. 7411438800"
            className="bg-background/60 border-border focus:border-primary/60"
          />
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="bi-email"
            className="font-mono-tech text-xs uppercase tracking-wider text-muted-foreground"
          >
            Email Address
          </Label>
          <Input
            id="bi-email"
            type="email"
            value={form.email}
            onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
            placeholder="e.g. contact@dtechsolutions.com"
            className="bg-background/60 border-border focus:border-primary/60"
          />
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="bi-address"
            className="font-mono-tech text-xs uppercase tracking-wider text-muted-foreground"
          >
            Address
          </Label>
          <Textarea
            id="bi-address"
            rows={3}
            value={form.address}
            onChange={(e) =>
              setForm((p) => ({ ...p, address: e.target.value }))
            }
            placeholder="Full address..."
            className="resize-none bg-background/60 border-border focus-visible:ring-primary/50"
          />
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="bi-hours"
            className="font-mono-tech text-xs uppercase tracking-wider text-muted-foreground"
          >
            Opening Hours
          </Label>
          <Input
            id="bi-hours"
            value={form.hours}
            onChange={(e) => setForm((p) => ({ ...p, hours: e.target.value }))}
            placeholder="e.g. Monday – Sunday: 11:00am – 8:00pm"
            className="bg-background/60 border-border focus:border-primary/60"
          />
        </div>

        <div className="pt-2">
          <Button
            type="submit"
            disabled={isSaving}
            className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
          >
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving…
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </form>
    </motion.div>
  );
}

// ─── Dashboard ───────────────────────────────────────────────────────────────

function Dashboard({ onLogout }: { onLogout: () => void }) {
  const { isFetching: isActorFetching } = useActor();
  const {
    data: requests = [],
    isLoading,
    refetch,
    isFetching,
  } = useGetAllServiceRequests();

  const showLoading = isActorFetching || isLoading;
  const [sortField, setSortField] = useState<keyof ServiceRequest>("timestamp");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  const sorted = [...requests].sort((a, b) => {
    const av = a[sortField];
    const bv = b[sortField];
    if (av < bv) return sortDir === "asc" ? -1 : 1;
    if (av > bv) return sortDir === "asc" ? 1 : -1;
    return 0;
  });

  const toggleSort = (field: keyof ServiceRequest) => {
    if (sortField === field) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDir("asc");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="font-mono-tech text-xs">Back to Site</span>
            </Link>
            <div className="h-4 w-px bg-border" />
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded bg-primary/10 border border-primary/30">
                <Wrench className="h-3.5 w-3.5 text-primary" />
              </div>
              <span className="font-display font-bold">
                DTech Solutions <span className="text-primary">Admin</span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => refetch()}
              disabled={isFetching}
              className="border-border hover:border-primary/50 hover:text-primary"
            >
              {isFetching ? (
                <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" />
              ) : (
                <RefreshCw className="mr-2 h-3.5 w-3.5" />
              )}
              Refresh
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={onLogout}
              className="border-red-500/30 text-red-400 hover:border-red-500/60 hover:bg-red-500/10 hover:text-red-300"
            >
              <LogOut className="mr-2 h-3.5 w-3.5" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container py-10">
        <Tabs defaultValue="repair">
          <TabsList className="mb-8 bg-card border border-border">
            <TabsTrigger
              value="repair"
              className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <Wrench className="h-3.5 w-3.5" />
              Repair Dashboard
            </TabsTrigger>
            <TabsTrigger
              value="info"
              className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <Building2 className="h-3.5 w-3.5" />
              Business Info
            </TabsTrigger>
          </TabsList>

          <TabsContent value="repair">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              {/* Page title */}
              <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <div className="mb-2 font-mono-tech text-xs uppercase tracking-widest text-primary">
                    {"// Service Requests"}
                  </div>
                  <h1 className="font-display text-3xl font-black">
                    Repair Dashboard
                  </h1>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Manage and update all incoming repair bookings.
                  </p>
                </div>

                {/* Summary counts */}
                <div className="flex flex-wrap gap-3">
                  {STATUS_OPTIONS.map((s) => {
                    const count = requests.filter((r) => r.status === s).length;
                    return (
                      <div
                        key={s}
                        className={`rounded border px-3 py-1.5 text-xs font-semibold ${STATUS_COLORS[s] ?? "border-border bg-card text-foreground"}`}
                      >
                        {count} {s}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Table */}
              {showLoading ? (
                <div className="flex flex-col items-center justify-center gap-4 py-24 text-muted-foreground">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <span className="font-mono-tech text-sm">
                    Connecting to backend — loading service requests…
                  </span>
                </div>
              ) : sorted.length === 0 ? (
                <div className="flex flex-col items-center gap-4 py-24 text-center">
                  <div className="rounded-full border border-border bg-card p-5">
                    <ClipboardList className="h-10 w-10 text-primary/60" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">
                      No bookings yet
                    </p>
                    <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                      When customers submit the repair form, their details will
                      appear here. Try refreshing if you expect to see requests.
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => refetch()}
                    disabled={isFetching}
                    className="border-border hover:border-primary/50 hover:text-primary"
                  >
                    {isFetching ? (
                      <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <RefreshCw className="mr-2 h-3.5 w-3.5" />
                    )}
                    Refresh Now
                  </Button>
                </div>
              ) : (
                <div className="rounded-xl border border-border bg-card overflow-hidden">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-border hover:bg-transparent">
                          {[
                            { key: "id", label: "ID" },
                            { key: "name", label: "Name" },
                            { key: "email", label: "Email" },
                            { key: "phone", label: "Phone" },
                            { key: "deviceType", label: "Device" },
                            { key: "issueDescription", label: "Issue" },
                            { key: "status", label: "Status" },
                            { key: "timestamp", label: "Date" },
                          ].map(({ key, label }) => (
                            <TableHead
                              key={key}
                              className="font-mono-tech text-xs uppercase tracking-wider cursor-pointer select-none text-muted-foreground hover:text-foreground whitespace-nowrap"
                              onClick={() =>
                                toggleSort(key as keyof ServiceRequest)
                              }
                            >
                              {label}
                              {sortField === key && (
                                <span className="ml-1 text-primary">
                                  {sortDir === "asc" ? "↑" : "↓"}
                                </span>
                              )}
                            </TableHead>
                          ))}
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {sorted.map((req, i) => (
                          <TableRow
                            key={req.id.toString()}
                            style={{
                              opacity: 0,
                              animation: `fade-up 0.3s ease-out ${i * 0.03}s forwards`,
                            }}
                            className="border-border hover:bg-accent/10 transition-colors"
                          >
                            <TableCell className="font-mono-tech text-xs text-muted-foreground">
                              #{req.id.toString()}
                            </TableCell>
                            <TableCell className="font-medium whitespace-nowrap">
                              {req.name}
                            </TableCell>
                            <TableCell className="text-sm text-muted-foreground">
                              {req.email}
                            </TableCell>
                            <TableCell className="text-sm whitespace-nowrap">
                              {req.phone}
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant="outline"
                                className="border-border font-mono-tech text-xs"
                              >
                                {req.deviceType}
                              </Badge>
                            </TableCell>
                            <TableCell className="max-w-[220px]">
                              <p
                                className="text-sm text-muted-foreground truncate"
                                title={req.issueDescription}
                              >
                                {req.issueDescription}
                              </p>
                            </TableCell>
                            <TableCell>
                              <StatusCell request={req} />
                            </TableCell>
                            <TableCell className="whitespace-nowrap text-sm text-muted-foreground">
                              {formatTimestamp(req.timestamp)}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>

                  <div className="border-t border-border/50 px-4 py-3">
                    <p className="font-mono-tech text-xs text-muted-foreground">
                      {sorted.length} request{sorted.length !== 1 ? "s" : ""}{" "}
                      total
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          </TabsContent>

          <TabsContent value="info">
            <BusinessInfoEditor />
          </TabsContent>
        </Tabs>
      </main>

      <footer className="border-t border-border/50 py-6">
        <div className="container">
          <p className="text-center font-mono-tech text-xs text-muted-foreground">
            DTech Solutions Admin Dashboard · © {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
}

// ─── Page Entry Point ─────────────────────────────────────────────────────────

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    () => sessionStorage.getItem(AUTH_KEY) === "true",
  );

  const handleLogout = () => {
    sessionStorage.removeItem(AUTH_KEY);
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <LoginGate onLogin={() => setIsAuthenticated(true)} />;
  }

  return <Dashboard onLogout={handleLogout} />;
}
