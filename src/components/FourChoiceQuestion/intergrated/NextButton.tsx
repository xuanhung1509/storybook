import cx from '@/utils/classnames';
import type { FourChoiceQuestionProps } from './types';

type NextButtonProps = Pick<FourChoiceQuestionProps, 'onNextClick'> & {
  reset: () => void;
  selected: string | null;
  cxs: FourChoiceQuestionProps['classNames'];
};

const NextButton = ({ selected, onNextClick, reset, cxs }: NextButtonProps) => (
  <button
    type="button"
    className={cx(
      'h-full rounded-md border bg-emerald-500 px-4 py-2 text-white',
      cxs?.nextButton,
      'next-button',
    )}
    onClick={(event) => {
      // eslint-disable-next-line no-alert
      if (selected || (!selected && window.confirm('Are you sure?'))) {
        onNextClick(event, selected);
        reset();
      }
    }}
  >
    Câu hỏi tiếp theo
  </button>
);

export default NextButton;
