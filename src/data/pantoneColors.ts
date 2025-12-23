// Pantone color database with hex values
// Comprehensive color database for accurate color matching
import chroma from 'chroma-js'
export interface PantoneColor {
  name: string;
  hex: string;
  code: string;
  rgb: string;
}

export const PANTONE_COLORS: PantoneColor[] = [
  // Reds
  { name: "Red 032 C", hex: "#F0051B", code: "032 C", rgb: "240, 5, 27" },
  { name: "Red 485 C", hex: "#C1272D", code: "485 C", rgb: "193, 39, 45" },
  { name: "Red Peppers", hex: "#F63440", code: "1797", rgb: "246, 52, 64" },
  { name: "Tomato Red", hex: "#EC1C24", code: "179", rgb: "236, 28, 36" },
  { name: "Crimson", hex: "#DC143C", code: "1805 C", rgb: "220, 20, 60" },
  { name: "Scarlet", hex: "#FF2400", code: "18-1564 TCX", rgb: "255, 36, 0" },
  { name: "Burgundy", hex: "#800020", code: "5045 C", rgb: "128, 0, 32" },

  // Blues
  { name: "Blue 072 C", hex: "#0078D4", code: "072 C", rgb: "0, 120, 212" },
  { name: "Blue 279 C", hex: "#002B50", code: "279 C", rgb: "0, 43, 80" },
  { name: "Cerulean", hex: "#0066CC", code: "Cerulean", rgb: "0, 102, 204" },
  { name: "Daphne Blue", hex: "#0066FF", code: "2718", rgb: "0, 102, 255" },
  { name: "Process Blue", hex: "#0047AB", code: "279 C", rgb: "0, 71, 171" },
  { name: "Royal Blue", hex: "#1F45FC", code: "659 C", rgb: "31, 69, 252" },
  { name: "Sky Blue", hex: "#87CEEB", code: "12-0605 TCX", rgb: "135, 206, 235" },
  { name: "Midnight Blue", hex: "#191970", code: "532 C", rgb: "25, 25, 112" },
  { name: "Navy", hex: "#001f3f", code: "533 C", rgb: "0, 31, 63" },

  // Greens
  { name: "Green 354 C", hex: "#009B77", code: "354 C", rgb: "0, 155, 119" },
  { name: "Green 807 C", hex: "#00A651", code: "807 C", rgb: "0, 166, 81" },
  { name: "Grass Green", hex: "#7CB342", code: "2425", rgb: "124, 179, 66" },
  { name: "Fresh Green", hex: "#00AA44", code: "803 C", rgb: "0, 170, 68" },
  { name: "Emerald Green", hex: "#005A4D", code: "567 C", rgb: "0, 90, 77" },
  { name: "Forest Green", hex: "#228B22", code: "357 C", rgb: "34, 139, 34" },
  { name: "Lime Green", hex: "#32CD32", code: "2287 C", rgb: "50, 205, 50" },
  { name: "Olive", hex: "#808000", code: "448 C", rgb: "128, 128, 0" },

  // Teals & Turquoise (EXPANDED)
  { name: "Teal", hex: "#008080", code: "3265 C", rgb: "0, 128, 128" },
  { name: "Turquoise", hex: "#40E0D0", code: "14-1520 TCX", rgb: "64, 224, 208" },
  { name: "Aquamarine", hex: "#00D1B2", code: "3262 C", rgb: "0, 209, 178" },
  { name: "Light Turquoise", hex: "#7FFFD4", code: "13-1520 TCX", rgb: "127, 255, 212" },
  { name: "Dark Turquoise", hex: "#00CED1", code: "3258 C", rgb: "0, 206, 209" },
  { name: "Cyan", hex: "#00FFFF", code: "2975 C", rgb: "0, 255, 255" },
  { name: "Cadet Blue", hex: "#5F9EA0", code: "14-1505 TCX", rgb: "95, 158, 160" },
  { name: "Medium Turquoise", hex: "#48D1CC", code: "3255 C", rgb: "72, 209, 204" },
  { name: "Turquoise Green", hex: "#00B8A9", code: "3252 C", rgb: "0, 184, 169" },
  { name: "Seafoam", hex: "#93E9BE", code: "13-0520 TCX", rgb: "147, 233, 190" },

  // Yellows & Oranges
  { name: "Yellow 012 C", hex: "#FFD200", code: "012 C", rgb: "255, 210, 0" },
  { name: "Orange 030 C", hex: "#F7941D", code: "030 C", rgb: "247, 148, 29" },
  { name: "Orange 021 C", hex: "#FF6900", code: "021 C", rgb: "255, 105, 0" },
  { name: "Gold", hex: "#FFB81C", code: "1235", rgb: "255, 184, 28" },
  { name: "Golden", hex: "#FFD700", code: "109 C", rgb: "255, 215, 0" },
  { name: "Lemon", hex: "#FFFACD", code: "460 C", rgb: "255, 250, 205" },
  { name: "Khaki", hex: "#F0E68C", code: "12-0605 TCX", rgb: "240, 230, 140" },

  // Purples & Pinks
  { name: "Purple 267 C", hex: "#662D91", code: "267 C", rgb: "102, 45, 145" },
  { name: "Purple 525 C", hex: "#80358C", code: "525 C", rgb: "128, 53, 140" },
  { name: "Magenta 226 C", hex: "#D94399", code: "226 C", rgb: "217, 67, 153" },
  { name: "Hot Pink", hex: "#FF1493", code: "1955 C", rgb: "255, 20, 147" },
  { name: "Violet", hex: "#EE82EE", code: "2095 C", rgb: "238, 130, 238" },
  { name: "Orchid", hex: "#DA70D6", code: "2087 C", rgb: "218, 112, 214" },
  { name: "Magenta", hex: "#FF00FF", code: "806 C", rgb: "255, 0, 255" },

  // Warm Colors
  { name: "Brown", hex: "#8B4513", code: "5005 C", rgb: "139, 69, 19" },
  { name: "Coral", hex: "#FF7F50", code: "16-1429 TCX", rgb: "255, 127, 80" },
  { name: "Salmon", hex: "#FA8072", code: "16-1520 TCX", rgb: "250, 128, 114" },
  { name: "Peach", hex: "#FFDAB9", code: "13-1404 TCX", rgb: "255, 218, 185" },
  { name: "Chocolate", hex: "#D2691E", code: "469 C", rgb: "210, 105, 30" },
  { name: "Peru", hex: "#CD853F", code: "876 C", rgb: "205, 133, 63" },
  { name: "Tan", hex: "#D2B48C", code: "14-0820 TCX", rgb: "210, 180, 140" },

  // Cool/Light Colors
  { name: "Lime", hex: "#00FF00", code: "2288 C", rgb: "0, 255, 0" },
  { name: "Lavender", hex: "#E6E6FA", code: "12-0605 TCX", rgb: "230, 230, 250" },
  { name: "Mint", hex: "#98FF98", code: "13-0520 TCX", rgb: "152, 255, 152" },
  { name: "Maroon", hex: "#800000", code: "5035 C", rgb: "128, 0, 0" },

  // Neutrals & Grays
  { name: "Black 6 C", hex: "#000000", code: "Black 6 C", rgb: "0, 0, 0" },
  { name: "Cool Gray 10 C", hex: "#333333", code: "Cool Gray 10 C", rgb: "51, 51, 51" },
  { name: "Cool Gray 5 C", hex: "#999999", code: "Cool Gray 5 C", rgb: "153, 153, 153" },
  { name: "Cool Gray 2 C", hex: "#CCCCCC", code: "Cool Gray 2 C", rgb: "204, 204, 204" },
  { name: "White", hex: "#FFFFFF", code: "White", rgb: "255, 255, 255" },
  { name: "Warm Gray 1 C", hex: "#E5E5E5", code: "Warm Gray 1 C", rgb: "229, 229, 229" },
  { name: "Warm Gray 5 C", hex: "#B5B5AC", code: "Warm Gray 5 C", rgb: "181, 181, 172" },
  { name: "Light Gray", hex: "#D3D3D3", code: "422 C", rgb: "211, 211, 211" },
  { name: "Dark Gray", hex: "#A9A9A9", code: "422 C", rgb: "169, 169, 169" },
];

/**
 * Find closest Pantone color to a given hex color
 * Uses CIE LAB color space distance (deltaE) for accurate matching
 * Returns both the color and the distance value
 */
export function findClosestPantones(hexColor: string, limit = 3): Array<{ color: PantoneColor; distance: number }> {
  const distances: Array<{ color: PantoneColor; distance: number }> = [];

  for (const pantoneColor of PANTONE_COLORS) {
    try {
      const distance = chroma.deltaE(hexColor, pantoneColor.hex);
      if (Number.isFinite(distance)) {
        distances.push({ color: pantoneColor, distance });
      }
    } catch {
      continue;
    }
  }

  return distances.sort((a, b) => a.distance - b.distance).slice(0, Math.max(1, limit));
}

export function findClosestPantone(hexColor: string): { color: PantoneColor; distance: number } {
  const [best] = findClosestPantones(hexColor, 1);
  if (best) {
    return best;
  }
  return { color: PANTONE_COLORS[0], distance: Infinity };
}

function normalizeSlugSource(value: string): string {
  return value.trim().toLowerCase();
}

export function getPantoneSlug(source: string | PantoneColor): string {
  const raw = typeof source === 'string' ? source : source.code || source.name;
  return normalizeSlugSource(raw).replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

export function findPantoneBySlug(slug: string | null | undefined): PantoneColor | null {
  if (!slug) return null;
  const normalized = normalizeSlugSource(slug);
  if (!normalized) return null;
  return (
    PANTONE_COLORS.find(color => {
      const codeSlug = getPantoneSlug(color.code);
      if (codeSlug === normalized) return true;
      const nameSlug = getPantoneSlug(color.name);
      return nameSlug === normalized;
    }) || null
  );
}
