export const CAR_FRAME_COUNT = 31;

export function carFrameSrc(index: number): string {
  const n = Math.min(CAR_FRAME_COUNT, Math.max(1, index));
  return `/car-frames/${String(n).padStart(3, '0')}.png`;
}

export const CAR_FRAME_URLS = Array.from({ length: CAR_FRAME_COUNT }, (_, i) =>
  carFrameSrc(i + 1),
);
