export const FILTER_OPTS = {
  product: {
    types: {
      "FACE": {
        "Foundation": { code: "FD", comingSoon: true },
        "Highlighter": { code: "HL", comingSoon: true },
        "Primer": { code: "PR", comingSoon: true },
        "Concealer": { code: "CL", comingSoon: true },
        "Setting Spray and Pray": { code: "ST", comingSoon: true },
        "Tinted Moisturiser": { code: "TM", comingSoon: true },
        "BB & CC Cream": { code: "BC", comingSoon: true },
      },
      "EYE": {
        "Eyeshadow": { code: "EY" },
        "Eyebrow": { code: "EB", comingSoon: true },
        "Eyeliner": { code: "EL", comingSoon: true },
        "Palettes": { code: "PL", comingSoon: true }, 
        "False Lashes": { code: "FL", comingSoon: true },
        "Mascara": { code: "MA", comingSoon: true },
        "Primer": { code: "PR", comingSoon: true },
        "Under-Eye Concealer": { code: "UE", comingSoon: true },
      },
      "LIP": {
        "Lipstick": { code: "LI", comingSoon: true },
        "Lip Gloss": { code: "LG", comingSoon: true },
        "Liquid Lipstick": { code: "LL", comingSoon: true },
        "Lip Stain Lip Plumper": { code: "LP", comingSoon: true },
        "Lip Balm & Treatment": { code: "LB", comingSoon: true },
        "Lip Stain": { code: "LS", comingSoon: true },
      },
      "CHEEK": {
        "Cheek Blush": { code: "CB", comingSoon: true },
        "Bronzer": { code: "BR", comingSoon: true },
      }
    },
    tags: {
      "SKINTONE": {
        "Fair": { code: "SK-FA", comingSoon: true },
        "Medium": { code: "SK-ME", comingSoon: true },
        "Deep": { code: "SK-DP", comingSoon: true },
        "Deep-Dark": { code: "SK-DD", comingSoon: true },
        "Olive": { code: "SK-OL", comingSoon: true },
      },
      "FORM": {
        "Pressed Powder": { code: "FM-PP", comingSoon: true },
        "Loose Powder": { code: "FM-LP", comingSoon: true },
        "Stick": { code: "FM-ST", comingSoon: true },
        "Gloss": { code: "FM-GL", comingSoon: true },
        "Liquid": { code: "FM-LI", comingSoon: true },
        "Balm": { code: "FM-BA", comingSoon: true },
        "Cream": { code: "FM-CR", comingSoon: true },
        "Stain": { code: "FM-ST", comingSoon: true },
        "Pencil": { code: "FM-PE", comingSoon: true },
        "Glitter": { code: "FM-GL", comingSoon: true },
        "Oil": { code: "FM-OI", comingSoon: true },
        "Gel": { code: "FM-GE", comingSoon: true },
      },
      "FINNISH": {
        "Matte": { code: "FI-MA", comingSoon: true },
        "Shimmer": { code: "FI-SH", comingSoon: true },
        "Metallic": { code: "FI-ME", comingSoon: true },
        "Glitter": { code: "FI-GT", comingSoon: true },
        "Natural": { code: "FI-NA", comingSoon: true },
        "Duo Chrome": { code: "FI-DC", comingSoon: true },
        "Satin": { code: "FI-SA", comingSoon: true },
        "Illuminating": { code: "FI-IL", comingSoon: true },
        "Neon": { code: "FI-NE", comingSoon: true },
        "Pearlescent": { code: "FI-PE", comingSoon: true },
        "Sheer": { code: "FI-SH", comingSoon: true },
        "Cream-Matte": { code: "FI-CM", comingSoon: true },
        "Glaze": { code: "FI-GZ", comingSoon: true },
        "Creme": { code: "FI-CR", comingSoon: true },
      },
      "PREFERENCE": {
        "Clean Ingredients": { code: "PR-CI", comingSoon: true },
        "Cruelty Free": { code: "PR-CF", comingSoon: true },
        "Vegan": { code: "PR-VG", comingSoon: true },
        "Fragrance-Free": { code: "PR-FR", comingSoon: true },
        "Gluten-Free": { code: "PR-GF", comingSoon: true },
        "Mineral": { code: "PR-MN", comingSoon: true },
        "Oil Free": { code: "PR-OF", comingSoon: true },
        "Paraben Free": { code: "PR-PF", comingSoon: true },
        "Silicone Free": { code: "PR-SF", comingSoon: true },
        "Sulfate Free": { code: "PR-SF", comingSoon: true },
        "Alcohol Free": { code: "PR-AF", comingSoon: true },
      }
    }
  },
  creator: {
    tags: {
      "SKINTONE": {
        "Fair": { code: "SK-FA", comingSoon: true },
        "Medium": { code: "SK-ME", comingSoon: true },
        "Deep": { code: "SK-DP", comingSoon: true },
        "Deep-Dark": { code: "SK-DD", comingSoon: true },
        "Olive": { code: "SK-OL", comingSoon: true },
      },
      "SKINTTYPE" : {
        "Well Balanced": { code: "ST-WB", comingSoon: true },
        "Dry": { code: "ST-DR", comingSoon: true },
        "Oily": { code: "ST-OI", comingSoon: true },
        "Combination": { code: "ST-CB", comingSoon: true },
      },
      "UNDERTONE": {
        "Warm": { code: "UT-WM", comingSoon: true },
        "Cool": { code: "UT-CL", comingSoon: true },
        "Neutral": { code: "UT-NT", comingSoon: true },
      },
      "EYE COLOUR": {
        "Blue": { code: "EC-BL", comingSoon: true },
        "Brown": { code: "EC-BR", comingSoon: true },
        "Green": { code: "EC-GR", comingSoon: true },
        "Hazel": { code: "EC-HZ", comingSoon: true },
        "Grey": { code: "EC-GR", comingSoon: true },
      },
      "EYE SHAPE": {
        "Round Eyes": { code: "ES-RE", comingSoon: true },
        "Monolids": { code: "ES-MO", comingSoon: true },
        "Down-turned": { code: "ES-DT", comingSoon: true },
        "Hooded Eyes": { code: "ES-HD", comingSoon: true },
        "Almond Eyes": { code: "ES-AL", comingSoon: true },
      },
      "HAIR COLOUR": {
        "Brown": { code: "HC-BR", comingSoon: true },
        "Blonde": { code: "HC-BL", comingSoon: true },
        "Auburn": { code: "HC-AU", comingSoon: true },
        "Red": { code: "HC-RE", comingSoon: true },
        "Black": { code: "HC-BL", comingSoon: true },
        "Grey": { code: "HC-GY", comingSoon: true },
      },
      "HAIR TYPE": {
        "Straight (Type 1) ": { code: "HT-ST", comingSoon: true },
        "Wavy (Type 2)": { code: "HT-WV", comingSoon: true },
        "Curly (Type 3)": { code: "HT-CL", comingSoon: true },
        "Kinky/Coily (Type 4)": { code: "HT-KI", comingSoon: true },
      }
    }
  }
};

export const SORT_OPTS = {
  products: [
    "Brand Name",
    "Product Name",
    "Price"
  ]
};

export const LOCALES_MAP = {
  'en-US': {
    name: 'English (US)',
    currencyCode: 'USD',
    currencySymbol: '$',
    img: {
      src: '/flag-en-us.svg',
      alt: 'US Flag',
    },
  },
  'en-GB': {
    name: 'English (GB)',
    currencyCode: 'GBP',
    currencySymbol: '£',
    img: {
      src: '/flag-en-gb.png',
      alt: 'British Flag',
    },
  },
};

export const SCORE_HEADINGS = [
  "Formulation", 
  "Blendability", 
  "Pigmentation", 
  "Longevity", 
  "Coverage", 
  "Value"
];