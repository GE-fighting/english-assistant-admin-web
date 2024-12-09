'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { TextbookAPI } from '@/api';
import { toast } from 'sonner';

interface Version {
  id: number;
  name: string;
}

interface Grade {
  id: number;
  name: string;
}

interface Semester {
  id: number;
  name: string;
}

interface AddTextbookModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function AddTextbookModal({ isOpen, onClose, onSuccess }: AddTextbookModalProps) {
  const [versions, setVersions] = useState<Version[]>([]);
  const [grades, setGrades] = useState<Grade[]>([]);
  const [semesters, setSemesters] = useState<Semester[]>([]);
  
  const [selectedVersion, setSelectedVersion] = useState<number>(0);
  const [selectedGrade, setSelectedGrade] = useState<number>(0);
  const [selectedSemester, setSelectedSemester] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [versionsRes, gradesRes, semestersRes] = await Promise.all([
          TextbookAPI.getVersions(),
          TextbookAPI.getGrades(),
          TextbookAPI.getSemesters()
        ]);

        setVersions(versionsRes.data);
        setGrades(gradesRes.data);
        setSemesters(semestersRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('获取数据失败，请稍后重试');
      }
    };

    if (isOpen) {
      fetchData();
    }
  }, [isOpen]);

  const handleConfirm = async () => {
    if (!selectedVersion || !selectedGrade || !selectedSemester) {
      toast.error('请选择所有字段');
      return;
    }

    const versionName = versions.find(v => v.id === selectedVersion)?.name || '';
    const gradeName = grades.find(g => g.id === selectedGrade)?.name || '';
    const semesterName = semesters.find(s => s.id === selectedSemester)?.name || '';

    const textbookName = `${versionName}${gradeName}${semesterName}`;

    setIsSubmitting(true);

    try {
      const response = await TextbookAPI.createTextbook({
        version_id: selectedVersion,
        grade_id: selectedGrade,
        semester_id: selectedSemester,
        name: textbookName
      });

      if (response.code === 200) {
        toast.success('教材添加成功');
        onSuccess();
        onClose();
      } else {
        toast.error(response.message || '添加教材失败');
      }
    } catch (error) {
      console.error('创建教材错误:', error);
      toast.error('创建教材失败，请稍后重试');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-[480px] shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">添加教材</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              教材版本
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              value={selectedVersion}
              onChange={(e) => setSelectedVersion(Number(e.target.value))}
            >
              <option value={0}>请选择教材版本</option>
              {versions.map((version) => (
                <option key={version.id} value={version.id}>
                  {version.name}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              年级
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(Number(e.target.value))}
            >
              <option value={0}>请选择年级</option>
              {grades.map((grade) => (
                <option key={grade.id} value={grade.id}>
                  {grade.name}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              学期
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(Number(e.target.value))}
            >
              <option value={0}>请选择学期</option>
              {semesters.map((semester) => (
                <option key={semester.id} value={semester.id}>
                  {semester.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex justify-end space-x-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            disabled={isSubmitting}
          >
            取消
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            disabled={!selectedVersion || !selectedGrade || !selectedSemester || isSubmitting}
          >
            {isSubmitting ? '提交中...' : '确认'}
          </button>
        </div>
      </div>
    </div>
  );
} 