export const lightAjustment = 55;

export const getTextColor = (backgroundColor: any, ajustment?: number) => {
  const hslColor = hexToHsl(backgroundColor);
  const lightness = hslColor[2];
  let adjustedLightness = lightness > 50 ? lightness - lightAjustment : lightness + lightAjustment;
  if (ajustment) adjustedLightness = lightness > 50 ? lightness - ajustment : lightness + ajustment;
  const textColor = `hsl(${hslColor[0]}, ${hslColor[1]}%, ${adjustedLightness}%)`;
  return textColor;
};

export const hexToHsl = (hex: string) => {
  const r = parseInt(hex.substring(1, 3), 16) / 255;
  const g = parseInt(hex.substring(3, 5), 16) / 255;
  const b = parseInt(hex.substring(5, 7), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0,
    s = 0,
    l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
      default:
        break;
    }

    h /= 6;
  }

  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
};
