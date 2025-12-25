export type NavCategory = 'formatter' | 'minify' | 'generators' | 'converters' | 'security' | 'codecs'

export interface NavItem {
  label: string
  labelId: string
  path: string
  category: NavCategory
  icon?: string
}

export interface NavConfig {
  [key: string]: {
    [key: string]: string
  }
}

export const navItems: NavItem[] = [
  // Formatter
  {
    label: 'Formatter',
    labelId: 'navFormatter',
    path: '/formatter',
    category: 'formatter',
    icon: '📄'
  },
  // Minify
  {
    label: 'Minify',
    labelId: 'navMinify',
    path: '/minify',
    category: 'minify',
    icon: '🔪'
  },
  // Generators
  {
    label: 'UUID',
    labelId: 'navUuid',
    path: '/generator/uuid',
    category: 'generators',
    icon: '🔑'
  },
  {
    label: 'Lorem Ipsum',
    labelId: 'navLorem',
    path: '/generator/lorem',
    category: 'generators',
    icon: '📝'
  },
  {
    label: 'Hash',
    labelId: 'navHash',
    path: '/generator/hash',
    category: 'generators',
    icon: '#️⃣'
  },
  {
    label: 'Case Converter',
    labelId: 'navCase',
    path: '/converter/case',
    category: 'converters',
    icon: '🔤'
  },
  {
    label: 'Regex Tester',
    labelId: 'navRegex',
    path: '/converter/regex',
    category: 'converters',
    icon: '🧪'
  },
  // Converters
  {
    label: 'Epoch',
    labelId: 'navEpoch',
    path: '/converter/epoch',
    category: 'converters',
    icon: '⏱️'
  },
  {
    label: 'URL Encoder',
    labelId: 'navUrl',
    path: '/converter/url',
    category: 'converters',
    icon: '🔗'
  },
  {
    label: 'Pantone Converter',
    labelId: 'navPantone',
    path: '/pantone',
    category: 'converters',
    icon: '🎨'
  },
  {
    label: 'Pantone to HEX',
    labelId: 'navPantoneCatalog',
    path: '/pantone/pantone-to-hex',
    category: 'converters',
    icon: '🗂️'
  },
  // Codecs
  {
    label: 'Encode',
    labelId: 'navEncode',
    path: '/encode',
    category: 'codecs',
    icon: '🔐'
  },
  {
    label: 'Decode',
    labelId: 'navDecode',
    path: '/decode',
    category: 'codecs',
    icon: '🔓'
  },
  // Security
  {
    label: 'Security',
    labelId: 'navJwt',
    path: '/security',
    category: 'security',
    icon: '🛡️'
  }
]

export const categoriesOrder: NavCategory[] = ['formatter', 'minify', 'generators', 'converters', 'security', 'codecs']

export const categoryLabels: Record<NavCategory, string> = {
  formatter: 'Formatter',
  minify: 'Minify',
  generators: 'Generators',
  converters: 'Converters',
  security: 'Security',
  codecs: 'Codecs'
}

export function getItemsByCategory(category: NavCategory): NavItem[] {
  return navItems.filter(item => item.category === category)
}

export function getCategories(): NavCategory[] {
  const categories = new Set<NavCategory>()
  navItems.forEach(item => categories.add(item.category))
  return categoriesOrder.filter(cat => categories.has(cat))
}
