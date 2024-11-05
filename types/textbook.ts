export interface TextbookVersion {
  id: number;
  name: string;
  createdAt: Date;
}

export interface Grade {
  id: number;
  name: string;
  createdAt: Date;
}

export interface Semester {
  id: number;
  name: string;
  createdAt: Date;
}

export interface Textbook {
  id: number;
  versionId: number;
  gradeId: number;
  semesterId: number;
  createdAt: Date;
  // Joined fields
  version?: TextbookVersion;
  grade?: Grade;
  semester?: Semester;
}

export interface Unit {
  id: number;
  name: string;
  textbookId: number;
  sequenceNumber: number;
  createdAt: Date;
}

export interface Word {
  id: number;
  word: string;
  createdAt: Date;
}

export interface WordUnitMapping {
  id: number;
  wordId: number;
  unitId: number;
  meaning: string;
  createdAt: Date;
  word?: Word;
  unit?: Unit;
} 