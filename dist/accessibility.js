export const focusRingClass = "an-focus-ring";
export const reducedMotionClass = "an-reduced-motion-safe";
export const screenReaderOnlyClass = "an-visually-hidden";
export const accessibilityStyles = `
.an-visually-hidden{position:absolute!important;width:1px!important;height:1px!important;padding:0!important;margin:-1px!important;overflow:hidden!important;clip:rect(0,0,0,0)!important;white-space:nowrap!important;border:0!important}
.an-focus-ring:focus-visible{outline:3px solid currentColor;outline-offset:3px}
@media (prefers-reduced-motion:reduce){.an-reduced-motion-safe{animation:none!important;transition:none!important;scroll-behavior:auto!important}}
`;
