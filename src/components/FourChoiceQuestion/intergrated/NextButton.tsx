import cx from '@/utils/classnames';
import type { FourChoiceQuestionProps } from './types';

type NextButtonProps = Pick<FourChoiceQuestionProps, 'onNextClick'> & {
  selected: string | null;
  cxs: FourChoiceQuestionProps['classNames'];
};

const NextButton = ({ selected, onNextClick, cxs }: NextButtonProps) => (
  <button
    type="button"
    className={cx(
      'h-full rounded-md border bg-emerald-500 px-4 py-2 text-white',
      cxs?.nextButton,
      'next-button',
    )}
    onClick={(event) => {
      if (onNextClick) onNextClick(event, selected);
    }}
  >
    Câu hỏi tiếp theo
  </button>
);

export default NextButton;