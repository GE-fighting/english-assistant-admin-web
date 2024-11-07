export interface Word {
  id: number;
  word: string;
  phonetic: string;
  translation: string;
  unit_id: number;
  created_at: string;
  updated_at: string;
}

export interface WordFormData {
  word: string;
  meaning: string;
} 