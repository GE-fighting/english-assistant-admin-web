'use client';

import { Sheet, SheetContent } from "@/components/ui/sheet";
import { TextbookHeader } from './TextbookHeader';
import { TextbookInfo } from './TextbookInfo';
import { UnitsList } from './UnitsList';
import { useTextbookDetail } from '@/hooks/useTextbookDetail';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { ErrorDisplay } from '@/components/ui/ErrorDisplay';

interface TextbookDetailDrawerProps {
  textbookId: number | null;
  isOpen: boolean;
  onClose: () => void;
}

export const TextbookDetailDrawer = ({ 
  textbookId, 
  isOpen, 
  onClose 
}: TextbookDetailDrawerProps) => {
  const { textbook, isLoading, error } = useTextbookDetail(textbookId?.toString() || '');

  const handleAddUnit = () => {
    // TODO: Implement add unit functionality
    console.log('Add unit clicked');
  };

  const handleViewWords = (unitId: number) => {
    // TODO: Implement view words functionality
    console.log('View words clicked for unit:', unitId);
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-[90%] sm:w-[540px] md:w-[720px]">
        <div className="h-full overflow-y-auto">
          {isLoading && <LoadingSpinner />}
          {error && <ErrorDisplay error={error} />}
          
          {textbook && (
            <div className="space-y-6">
              <TextbookHeader name={textbook.name} onClose={onClose} />
              <div className="space-y-6">
                <TextbookInfo textbook={textbook} />
                <UnitsList 
                  units={textbook.units}
                  onAddUnit={handleAddUnit}
                  onViewWords={handleViewWords}
                />
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}; 