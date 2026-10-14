export function FlagshipBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800">
      <span
        aria-hidden="true"
        className="h-1.5 w-1.5 rounded-full bg-emerald-500"
      />
      Flagship Product
    </span>
  );
}
