export default function Loading() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-[#F7F5F3]">
      <div
        className="h-8 w-8 rounded-full border-2 border-[rgba(55,50,47,0.15)] border-t-[#37322F] animate-spin"
        role="status"
        aria-label="Loading"
      />
    </div>
  )
}
