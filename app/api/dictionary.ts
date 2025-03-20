import { WordDetails } from '../types/dictionary';

const API_URL = 'https://api.dictionaryapi.dev/api/v2/entries/en';

export async function fetchWordDetails(word: string): Promise<WordDetails | null> {
  try {
    const response = await fetch(`${API_URL}/${word}`);
    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();

    if (!Array.isArray(data) || data.length === 0) {
      throw new Error('No data found');
    }

    return data[0];
  } catch (error) {
    //console.error('Error fetching word details:', error);
    return null;
  }
}
