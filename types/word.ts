export interface Word {
  word_id: string;
  word: string;
  phonetic_us: string;
  phonetic_uk: string;
  meaning: string;
  pronunciation_us: string;
  pronunciation_uk: string;
  created_at: string;
  updated_at: string;
  example: string;
}

export interface UnitWord extends Word {
  id: number;
  unit_id: number;
}

export interface WordFormData {
  word: string;
  meaning: string;
  phonetic_us: string;
  phonetic_uk: string;
  pronunciation_us: string;
  pronunciation_uk: string;
  example: string;
} 