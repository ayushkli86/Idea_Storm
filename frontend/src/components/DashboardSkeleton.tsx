import { Loader2, Database } from "lucide-react";

const DashboardSkeleton = () => {
  return (
    <div className="min-h-screen pt-16 bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Fetching Data Overlay */}
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <div className="bg-card rounded-2xl p-8 shadow-2xl border-2 border-primary/20 max-w-md w-full mx-4">
            <div className="flex flex-col items-center gap-4">
              {/* Animated Icon */}
              <div className="relative">
                <Database className="w-16 h-16 text-primary/30" />
                <Loader2 className="w-16 h-16 text-primary animate-spin absolute inset-0" />
              </div>
              
              {/* Loading Text */}
              <div className="text-center space-y-2">
                <h3 className="text-xl font-bold text-foreground">Fetching Data</h3>
                <p className="text-sm text-muted-foreground">
                  Loading dashboard analytics...
                </p>
              </div>

              {/* Progress Dots */}
              <div className="flex gap-2">
                <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Background Skeleton (blurred) */}
        <div className="opacity-30 blur-sm pointer-events-none">
          {/* Header Skeleton */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="h-8 w-48 bg-muted rounded animate-pulse mb-2" />
              <div className="h-4 w-64 bg-muted rounded animate-pulse" />
            </div>
            <div className="h-10 w-32 bg-muted rounded animate-pulse" />
          </div>

          {/* Stats Cards Skeleton */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-card rounded-xl p-5 shadow-card border">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-lg bg-muted animate-pulse" />
                  <div className="h-5 w-16 bg-muted rounded animate-pulse" />
                </div>
                <div className="h-8 w-24 bg-muted rounded animate-pulse mb-2" />
                <div className="h-4 w-32 bg-muted rounded animate-pulse" />
              </div>
            ))}
          </div>

          {/* Charts Skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="bg-card rounded-xl p-6 shadow-card border">
              <div className="h-6 w-40 bg-muted rounded animate-pulse mb-4" />
              <div className="h-64 bg-muted rounded animate-pulse" />
            </div>
            <div className="bg-card rounded-xl p-6 shadow-card border">
              <div className="h-6 w-48 bg-muted rounded animate-pulse mb-4" />
              <div className="h-64 bg-muted rounded animate-pulse" />
            </div>
          </div>

          {/* Table Skeleton */}
          <div className="bg-card rounded-xl shadow-card border overflow-hidden">
            <div className="p-6 border-b">
              <div className="h-6 w-48 bg-muted rounded animate-pulse" />
            </div>
            <div className="p-4 space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex gap-4">
                  <div className="h-12 flex-1 bg-muted rounded animate-pulse" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSkeleton;
