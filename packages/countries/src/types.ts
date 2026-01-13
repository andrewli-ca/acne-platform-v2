/**
 * Country name variants
 */
export interface CountryName {
  common: string;
  official: string;
}

/**
 * Country flag URLs and metadata
 */
export interface CountryFlags {
  png: string;
  svg: string;
  alt?: string;
}

/**
 * Country data from REST Countries API
 */
export interface Country {
  name: CountryName;
  flags: CountryFlags;
  capital?: string[];
  region: string;
  population: number;
  languages?: Record<string, string>;
  cca2: string; // ISO 3166-1 alpha-2 code
  cca3: string; // ISO 3166-1 alpha-3 code
}
