const FLUX_LOGO_SRC = '/flux-logo.jpeg';

interface FluxLogoProps {
  className?: string;
}

export default function FluxLogo({ className = 'h-12 w-auto' }: FluxLogoProps) {
  return (
    <img
      src={FLUX_LOGO_SRC}
      alt="Flux Corporation"
      className={className}
      width={180}
      height={48}
    />
  );
}
