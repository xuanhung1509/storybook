import { useFourChoiceQuestionContext } from './FourChoiceQuestionContext';
import type { InsertComponentAfter } from './types';

interface InsertedComponentWrapperProps {
  position: InsertComponentAfter;
  children: React.ReactNode;
}

const InsertedComponentWrapper = ({
  position,
  children,
}: InsertedComponentWrapperProps) => {
  const { InsertComponent } = useFourChoiceQuestionContext();

  return (
    <>
      {children}
      {InsertComponent && InsertComponent.placeAfter === position && (
        <InsertComponent.Component />
      )}
    </>
  );
};

export default InsertedComponentWrapper;
