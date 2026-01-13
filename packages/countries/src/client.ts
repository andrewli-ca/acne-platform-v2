import { BaseRestClient } from '@acme/http-client';

import type { Country } from './types';

/**
 * REST Countries API Client
 */
export class CountriesClient extends BaseRestClient {
  constructor() {
    super('https://restcountries.com/v3.1');
  }

  /**
   * Fetch all countries or a limited number
   * @param limit - Optional limit for number of countries to return
   * @returns Array of countries
   */
  async getCountries(limit?: number): Promise<Country[]> {
    const fields = 'name,flags,capital,region,population,languages,cca2,cca3';
    const data = await this.get<Country[]>(`/all?fields=${fields}`);

    // Apply client-side limit if specified
    return limit ? data.slice(0, limit) : data;
  }

  /**
   * Fetch a specific country by name
   * @param name - Country name (common or official)
   * @returns Country data
   */
  async getCountryByName(name: string): Promise<Country> {
    const fields = 'name,flags,capital,region,population,languages,cca2,cca3';
    const data = await this.get<Country[]>(
      `/name/${encodeURIComponent(name)}?fields=${fields}&fullText=false`
    );

    if (data.length === 0) {
      throw new Error(`Country not found: ${name}`);
    }

    return data[0];
  }
}

/**
 * Default countries client instance
 */
export const countriesClient = new CountriesClient();
