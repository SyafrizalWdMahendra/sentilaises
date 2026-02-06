import { ChevronDown } from "lucide-react";

export function ModelInfoSkeleton() {
  return (
    <div className="rounded-xl border bg-card p-6">
      <div className="mb-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center pr-3 h-9 w-64 rounded-md border border-border">
            <ChevronDown className="ml-auto h-4 w-4 text-gray-400" />
          </div>
        </div>

        <div className="h-4.5 w-13.5 rounded-full bg-gray-200" />
      </div>

      <div className="mb-6 min-h-[40px] space-y-2">
        <div className="h-4 w-3/4 rounded bg-gray-100" />
        <div className="h-4 w-1/2 rounded bg-gray-100" />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-2">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="flex items-center gap-3 rounded-lg border border-border/40 bg-secondary/50 p-3"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted/60">
              <div className="h-7 w-7 rounded bg-gray-200" />
            </div>

            <div className="flex-1 space-y-2">
              <div className="h-3 w-20 rounded bg-gray-100" />
              <div className="h-4 w-15 rounded bg-gray-200" />
            </div>
          </div>
        ))}
      </div>

      {/* Footer info */}
      <div className="mt-8 space-y-3 border-t pt-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center justify-between">
            {/* label */}
            <div className="h-4 w-32 rounded bg-gray-100" />
            {/* value */}
            <div className="h-4 w-44 rounded bg-gray-100" />
          </div>
        ))}
      </div>
    </div>
  );
}
