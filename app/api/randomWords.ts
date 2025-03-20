const RANDOM_WORDS_API = 'https://random-word-api.vercel.app/api';

export async function fetchRandomWords(count: number = 5): Promise<string[]> {
  try {
    const response = await fetch(`${RANDOM_WORDS_API}?words=${count}`);
    if (!response.ok) {
      throw new Error('Failed to fetch random words');
    }
    const words = await response.json();
    return words || [];
  } catch (error) {
    console.error(error);
    return [];
  }
}
