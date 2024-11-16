import axios from 'axios';
import { Word } from '@/types/word';

export const WordAPI = {
  async getWordsByUnit(unitId: number) {
    const response = await axios.get(`/api/words?unit_id=${unitId}`);
    return response.data;
  },

  async createWord(word: Partial<Word>) {
    const response = await axios.post('/api/words', word);
    return response.data;
  },

  async deleteWord(wordId: number) {
    const response = await axios.delete(`/api/words/${wordId}`);
    return response.data;
  }
}; 