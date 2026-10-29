const STYLES = {
  BEGINNER: 'bg-success/10 text-success border-success/30',
  INTERMEDIATE: 'bg-warning/10 text-warning border-warning/30',
  EXPERT: 'bg-rust/10 text-rust border-rust/30',
};

/**
 * Color-coded difficulty tag. Mono-label styling (small caps, tracked,
 * bordered) rather than a soft pill — reads like a route grade marker.
 * BEGINNER -> green, INTERMEDIATE -> amber, EXPERT -> rust.
 */
export default function Badge({ level }) {
  return (
    <span
      className={`font-mono-label inline-block border px-2.5 py-1 text-[0.65rem] font-semibold ${STYLES[level] || STYLES.BEGINNER}`}
    >
      {level}
    </span>
  );
}
