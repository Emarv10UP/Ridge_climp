// Same clipped-corner signature as Button, scaled up — ties cards back
// to the brand mark's angularity without repeating a literal triangle.
const CLIP_STYLE = { clipPath: 'polygon(0 0, calc(100% - 22px) 0, 100% 22px, 100% 100%, 0 100%)' };

/**
 * Plain content card base — clipped top-right corner, light background,
 * subtle lift-and-shadow on hover. Used as a wrapper for expedition
 * cards, training program cards, pricing cards, etc.
 */
export default function Card({ children, className = '', hoverable = true, clipped = true }) {
  return (
    <div
      style={clipped ? CLIP_STYLE : undefined}
      className={`
        bg-white overflow-hidden
        ${hoverable ? 'transition-all duration-300 hover:shadow-xl hover:-translate-y-1' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
