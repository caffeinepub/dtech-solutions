import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ClipboardList,
  Loader2,
  RefreshCw,
  Wrench,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import type { ServiceRequest } from "../backend.d";
import {
  useGetAllServiceRequests,
  useUpdateRequestStatus,
} from "../hooks/useQueries";

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

export default function AdminPage() {
  const {
    data: requests = [],
    isLoading,
    refetch,
    isFetching,
  } = useGetAllServiceRequests();
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
                ByteFixPro <span className="text-primary">Admin</span>
              </span>
            </div>
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
            Refresh
          </Button>
        </div>
      </header>

      <main className="container py-10">
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
          {isLoading ? (
            <div className="flex items-center justify-center gap-3 py-24 text-muted-foreground">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span className="font-mono-tech text-sm">
                Loading service requests…
              </span>
            </div>
          ) : sorted.length === 0 ? (
            <div className="flex flex-col items-center gap-4 py-24 text-center">
              <ClipboardList className="h-12 w-12 text-muted-foreground/40" />
              <div>
                <p className="font-semibold text-muted-foreground">
                  No service requests yet
                </p>
                <p className="text-sm text-muted-foreground/60">
                  Bookings will appear here once customers submit the contact
                  form.
                </p>
              </div>
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
                  {sorted.length} request{sorted.length !== 1 ? "s" : ""} total
                </p>
              </div>
            </div>
          )}
        </motion.div>
      </main>

      <footer className="border-t border-border/50 py-6">
        <div className="container">
          <p className="text-center font-mono-tech text-xs text-muted-foreground">
            ByteFixPro Admin Dashboard · © {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
}
