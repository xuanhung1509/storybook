import { useConfirmDialog } from '@/components/ConfirmDialog';
import cx from '@/utils/classnames';
import type { FourChoiceQuestionProps } from './types';

type NextButtonProps = Pick<
  FourChoiceQuestionProps,
  'mode' | 'onNextClick' | 'textContent'
> & {
  reset: () => void;
  selected: string | null;
  cxs: FourChoiceQuestionProps['classNames'];
};

const NextButton = ({
  mode,
  selected,
  textContent,
  cxs,
  onNextClick,
  reset,
}: NextButtonProps) => {
  const { confirm } = useConfirmDialog();

  const handleClick = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    if (
      mode === 'user-review' ||
      selected ||
      (!selected && (await confirm()))
    ) {
      onNextClick(event, selected);
      reset();
    }
  };

  return (
    <button
      type="button"
      className={cx(
        'h-full rounded-md border bg-emerald-500 px-4 py-2 text-white',
        cxs?.nextButton,
        'next-button',
      )}
      onClick={handleClick}
    >
      {textContent?.nextButton || 'Câu hỏi tiếp theo'}
    </button>
  );
};

export default NextButton;
