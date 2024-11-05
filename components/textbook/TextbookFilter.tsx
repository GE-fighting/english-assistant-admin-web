import React from 'react';
import { TextbookVersion, Grade, Semester } from '@/types/textbook';

interface TextbookFilterProps {
  versions: TextbookVersion[];
  grades: Grade[];
  semesters: Semester[];
  filters: {
    versionId?: number;
    gradeId?: number;
    semesterId?: number;
  };
  onFilterChange: (filters: {
    versionId?: number;
    gradeId?: number;
    semesterId?: number;
  }) => void;
}

export default function TextbookFilter({
  versions,
  grades,
  semesters,
  filters,
  onFilterChange,
}: TextbookFilterProps): JSX.Element {
  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <select
          className="border rounded p-2"
          value={filters.versionId || ''}
          onChange={(e) => onFilterChange({
            ...filters,
            versionId: e.target.value ? Number(e.target.value) : undefined
          })}
        >
          <option value="">选择版本</option>
          {versions.map((version) => (
            <option key={version.id} value={version.id}>
              {version.name}
            </option>
          ))}
        </select>

        <select
          className="border rounded p-2"
          value={filters.gradeId || ''}
          onChange={(e) => onFilterChange({
            ...filters,
            gradeId: e.target.value ? Number(e.target.value) : undefined
          })}
        >
          <option value="">选择年级</option>
          {grades.map((grade) => (
            <option key={grade.id} value={grade.id}>
              {grade.name}
            </option>
          ))}
        </select>

        <select
          className="border rounded p-2"
          value={filters.semesterId || ''}
          onChange={(e) => onFilterChange({
            ...filters,
            semesterId: e.target.value ? Number(e.target.value) : undefined
          })}
        >
          <option value="">选择学期</option>
          {semesters.map((semester) => (
            <option key={semester.id} value={semester.id}>
              {semester.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
} 