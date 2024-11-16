export interface Word {
  word_id: number;
  word: string;
  phonetic_us: string;
  phonetic_uk: string;
  translation: string;
  pronunciation_us: string;
  pronunciation_uk: string;
  unit_id: number;
  created_at: string;
  updated_at: string;
}

export interface WordFormData {
  word: string;
  meaning: string;
} 