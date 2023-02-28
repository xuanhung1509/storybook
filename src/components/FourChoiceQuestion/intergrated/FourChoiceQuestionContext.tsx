import createSafeContext from '@/helpers/createSafeContext';
import type { FourChoiceQuestionProps } from './types';

interface FourChoiceQuestionContextValue {
  InsertComponent: FourChoiceQuestionProps['insertComponent'];
}

const [FourChoiceQuestionProvider, useFourChoiceQuestionContext] =
  createSafeContext<FourChoiceQuestionContextValue>();

export { FourChoiceQuestionProvider, useFourChoiceQuestionContext };
