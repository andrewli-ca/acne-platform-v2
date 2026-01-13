import { BaseRestClient } from '@acme/http-client';

import type { Pokemon, PokemonListResponse } from './types';

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
