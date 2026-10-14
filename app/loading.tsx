export default function Loading() {
  return (
    <div className="bg-ink flex min-h-screen w-full items-center justify-center">
      <div
        className="border-t-gold-300 h-8 w-8 animate-spin rounded-full border-2 border-white/15"
        role="status"
        aria-label="Loading"
      />
    </div>
  );
}
