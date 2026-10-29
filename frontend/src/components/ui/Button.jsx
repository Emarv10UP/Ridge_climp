import { forwardRef } from 'react';

// Distinctive shape: a single clipped corner (top-right) rather than a
// soft pill or plain rectangle — echoes the angular logo mark without
// being a gimmick. Defined once here so every button matches.
const CLIP_STYLE = { clipPath: 'polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 0 100%)' };

const VARIANTS = {
  primary: 'bg-navy text-white hover:bg-navy-800',
  secondary: 'bg-glacier text-navy hover:bg-glacier-dark hover:text-white',
  outline: 'border-2 border-navy text-navy hover:bg-navy hover:text-white',
  'outline-white': 'border-2 border-white text-white hover:bg-white hover:text-navy',
  ghost: 'text-navy hover:bg-navy/10',
};

const SIZES = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

/**
 * Brand button — clipped top-right corner is the signature shape detail,
 * used consistently across every CTA. Supports primary/secondary/outline/
 * ghost variants and a loading state for async form submissions.
 */
const Button = forwardRef(
  ({ variant = 'primary', size = 'md', isLoading = false, children, className = '', style, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={isLoading || props.disabled}
        style={{ ...CLIP_STYLE, ...style }}
        className={`
          inline-flex items-center justify-center gap-2 font-display text-sm tracking-wide uppercase
          transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed
          ${VARIANTS[variant]} ${SIZES[size]} ${className}
        `}
        {...props}
      >
        {isLoading && (
          <span
            className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
            aria-hidden="true"
          />
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
export default Button;
