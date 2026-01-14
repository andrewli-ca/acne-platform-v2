/**
 * Pokemon type information
 */
export interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

/**
 * Pokemon ability information
 */
export interface PokemonAbility {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

/**
 * Pokemon sprite images
 */
export interface PokemonSprites {
  front_default: string | null;
  other?: {
    'official-artwork'?: {
      front_default: string | null;
    };
  };
}

/**
 * Pokemon data from PokeAPI
 */
export interface Pokemon {
  id: number;
  name: string;
  height: number; // in decimeters
  weight: number; // in hectograms
  sprites: PokemonSprites;
  types: PokemonType[];
  abilities: PokemonAbility[];
}

/**
 * Pokemon list response from PokeAPI
 */
export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<{
    name: string;
    url: string;
  }>;
}

/**
 * Paginated Pokemon response for infinite scrolling
 */
export interface PaginatedPokemonResponse {
  pokemon: Pokemon[];
  nextOffset: number | null;
  totalCount: number;
}

/**
 * Berry firmness information
 */
export interface BerryFirmness {
  name: string;
  url: string;
}

/**
 * Berry flavor information
 */
export interface BerryFlavor {
  potency: number;
  flavor: {
    name: string;
    url: string;
  };
}

/**
 * Berry data from PokeAPI
 */
export interface Berry {
  id: number;
  name: string;
  growth_time: number; // hours to grow
  max_harvest: number; // maximum number of berries per harvest
  natural_gift_power: number; // power when used as Natural Gift
  size: number; // size in millimeters
  smoothness: number; // smoothness value
  soil_dryness: number; // soil dryness value
  firmness: BerryFirmness;
  flavors: BerryFlavor[];
  item: {
    name: string;
    url: string;
  };
}

/**
 * Berry list response from PokeAPI
 */
export interface BerryListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<{
    name: string;
    url: string;
  }>;
}
