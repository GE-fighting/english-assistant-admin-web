import axios from 'axios';
import { 
  Textbook, TextbookVersion, Grade, 
  Semester, Unit, Word, WordUnitMapping 
} from '@/types/textbook';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
});

export const textbookApi = {
  // Versions
  getVersions: () => api.get<TextbookVersion[]>('/textbook-versions'),
  
  // Grades
  getGrades: () => api.get<Grade[]>('/grades'),
  
  // Semesters
  getSemesters: () => api.get<Semester[]>('/semesters'),
  
  // Textbooks
  getTextbooks: (params?: {
    versionId?: number;
    gradeId?: number;
    semesterId?: number;
  }) => api.get<Textbook[]>('/textbooks', { params }),
  
  createTextbook: (data: {
    versionId: number;
    gradeId: number;
    semesterId: number;
  }) => api.post<Textbook>('/textbooks', data),
  
  // Units
  getUnits: (textbookId: number) => 
    api.get<Unit[]>(`/textbooks/${textbookId}/units`),
    
  createUnit: (textbookId: number, data: {
    name: string;
    sequenceNumber: number;
  }) => api.post<Unit>(`/textbooks/${textbookId}/units`, data),
};

export const wordApi = {
  getWords: (unitId: number) => 
    api.get<WordUnitMapping[]>(`/units/${unitId}/words`),
    
  addWordToUnit: (unitId: number, data: {
    wordId: number;
    meaning: string;
  }) => api.post<WordUnitMapping>(`/units/${unitId}/words`, data),
}; 