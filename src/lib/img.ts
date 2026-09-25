import { IMAGES, type ImageKey } from './images.generated';

export function getImage(key: string) {
  const img = IMAGES[key as ImageKey];
  if (!img) throw new Error(`Unbekannter Bild-Key: ${key}`);
  return img;
}
