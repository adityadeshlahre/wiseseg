const Delete = ({ color }: { color?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={29} height={29} fill="none">
    <rect width={28} height={28} x={0.969} y={0.68} fill="#fff" rx={4} />
    <path
      stroke={color ?? '#999'}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={0.867}
      d="M8.969 10.68h12m-1.334 0v9.333c0 .667-.666 1.333-1.333 1.333h-6.667c-.666 0-1.333-.666-1.333-1.333V10.68m2 0V9.346c0-.666.667-1.333 1.333-1.333h2.667c.667 0 1.333.667 1.333 1.333v1.334m-4 3.333v4m2.667-4v4"
    />
  </svg>
)
export default Delete
