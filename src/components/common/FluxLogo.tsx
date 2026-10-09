import fluxLogoWhite from '../../assets/Flux Corporation Logo on White.png';

interface FluxLogoProps {
  className?: string;
  highlighted?: boolean;
}

export default function FluxLogo({ className = 'h-12 w-auto', highlighted = false }: FluxLogoProps) {
  return (
    <img
      src={fluxLogoWhite}
      alt="Flux Corporation"
      className={`${className} object-contain ${
        highlighted
          ? 'rounded-lg bg-white px-2.5 py-1.5 shadow-[0_0_0_1px_rgba(15,23,42,0.08)]'
          : ''
      }`}
      width={280}
      height={72}
    />
  );
}
