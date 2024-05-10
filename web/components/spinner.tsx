export default function Spinner({ color = 'text-sky-700', size = '5' }) {
  return (
    <span
      className={`animate-spin inline-block w-${size} h-${size} border-[3px] border-current border-t-transparent rounded-full ${color}`}
      role="status"
      aria-label="loading"
    >
      <span className="sr-only">Loading...</span>
    </span>
  )
}
