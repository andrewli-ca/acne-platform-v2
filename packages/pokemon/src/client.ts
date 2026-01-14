import { BaseRestClient } from '@acme/http-client';

import type { PaginatedPokemonResponse, Pokemon, PokemonListResponse } from './types';

/**
 * PokeAPI Client
 */
export class PokemonClient extends BaseRestClient {
  constructor() {
    super('https://pokeapi.co/api/v2');
  }

  /**
   * Fetch a list of Pokemon with detailed information
   * @param limit - Number of Pokemon to fetch (default: 20)
   * @returns Array of Pokemon with full details
   */
  async getPokemons(limit: number = 20): Promise<Pokemon[]> {
    // Fetch list of Pokemon URLs
    const listData = await this.get<PokemonListResponse>(`/pokemon?limit=${limit}`);

    // Fetch detailed data for each Pokemon
    const pokemonPromises = listData.results.map((p) =>
      this.get<Pokemon>(p.url.replace('https://pokeapi.co/api/v2', '')),
    );

    return Promise.all(pokemonPromises);
  }

  /**
   * Fetch a paginated list of Pokemon with detailed information
   * @param limit - Number of Pokemon to fetch per page (default: 20)
   * @param offset - Starting offset for pagination (default: 0)
   * @returns Paginated Pokemon response with data and pagination info
   */
  async getPokemonsPaginated(
    limit: number = 20,
    offset: number = 0,
  ): Promise<PaginatedPokemonResponse> {
    // Fetch list of Pokemon URLs with pagination
    const listData = await this.get<PokemonListResponse>(
      `/pokemon?limit=${limit}&offset=${offset}`,
    );

    // Fetch detailed data for each Pokemon
    const pokemonPromises = listData.results.map((p) =>
      this.get<Pokemon>(p.url.replace('https://pokeapi.co/api/v2', '')),
    );

    const pokemon = await Promise.all(pokemonPromises);

    // Calculate next offset from the `next` URL or return null if no more pages
    const nextOffset = listData.next ? offset + limit : null;

    return { pokemon, nextOffset, totalCount: listData.count };
  }

  /**
   * Fetch a specific Pokemon by ID
   * @param id - Pokemon ID number
   * @returns Pokemon data
   */
  async getPokemonById(id: number): Promise<Pokemon> {
    return this.get<Pokemon>(`/pokemon/${id}`);
  }

  /**
   * Fetch a specific Pokemon by name
   * @param name - Pokemon name
   * @returns Pokemon data
   */
  async getPokemonByName(name: string): Promise<Pokemon> {
    return this.get<Pokemon>(`/pokemon/${name.toLowerCase()}`);
  }
}

/**
 * Default Pokemon client instance
 */
export const pokemonClient = new PokemonClient();
