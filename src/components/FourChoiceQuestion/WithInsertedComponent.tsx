import { useFourChoiceQuestionContext } from './FourChoiceQuestionContext';
import type { InsertComponentAfter } from './types';

interface WithInsertedComponentProps {
  currentPosition: InsertComponentAfter;
  children: React.ReactNode;
}

const WithInsertedComponent = ({
  currentPosition,
  children,
}: WithInsertedComponentProps) => {
  const { InsertComponent } = useFourChoiceQuestionContext();

  return (
    <>
      {children}
      {InsertComponent && InsertComponent.placeAfter === currentPosition && (
        <InsertComponent.Component />
      )}
    </>
  );
};

export default WithInsertedComponent;
