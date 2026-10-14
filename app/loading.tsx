export default function Loading() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#F7F5F3]">
      <div
        className="h-8 w-8 animate-spin rounded-full border-2 border-[rgba(55,50,47,0.15)] border-t-[#37322F]"
        role="status"
        aria-label="Loading"
      />
    </div>
  );
}
