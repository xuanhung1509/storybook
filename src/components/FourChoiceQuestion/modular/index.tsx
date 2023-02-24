/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-danger */
import { Fragment, useState } from 'react';
import { MathJax, MathJaxContext } from 'better-react-mathjax';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import createSafeContext from '@/helpers/createSafeContext';
import cx from '@/utils/classnames';

type ContentType = 'plain' | 'html' | 'image';

interface ContentItem {
  type: ContentType;
  content: string;
}

interface FourChoiceQuestionProps {
  label: string;
  difficultyLevel: 'Nhận biết' | 'Thông hiểu' | 'Vận dụng' | 'Vận dụng cao';
  question: ContentItem[];
  answers: Array<
    ContentItem & {
      id: string;
    }
  >;
  hint: ContentItem[];
  correctAnswerId: string;
  solution: ContentItem[];
  render: ({
    selected,
    checkResult,
  }: {
    selected: string | null;
    checkResult: boolean;
  }) => JSX.Element;
}

type FourChoiceQuestionContextValue = Omit<
  FourChoiceQuestionProps,
  'answers' | 'children' | 'render'
> & {
  indexedAnswers: Array<
    ContentItem & {
      id: string;
      index?: string;
    }
  >;
  showHint: boolean;
  selected: string | null;
  checkResult: boolean;
  showSolution: boolean;
  setSelected: React.Dispatch<React.SetStateAction<string | null>>;
  setShowHint: React.Dispatch<React.SetStateAction<boolean>>;
  setCheckResult: React.Dispatch<React.SetStateAction<boolean>>;
  setShowSolution: React.Dispatch<React.SetStateAction<boolean>>;
};

type HTMLDivElementProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

type HTMLSpanElementProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLSpanElement>,
  HTMLSpanElement
>;

type HTMLHeadingElementProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
>;

type HTMLButtonElementProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

type HTMLParagraphElementProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLParagraphElement>,
  HTMLParagraphElement
>;

const variants: Variants = {
  hidden: { height: 0, opacity: 0 },
  visible: { height: 'auto', opacity: 1 },
};

const renderContentItems = (items: ContentItem[], className?: string) => (
  <div className={cx('flex flex-col gap-4', className)}>
    {items.map((item) => (
      <Fragment key={item.content}>
        {item.type === 'plain' && <p>{item.content}</p>}
        {item.type === 'html' && (
          <MathJax dangerouslySetInnerHTML={{ __html: item.content }} />
        )}
        {item.type === 'image' && (
          <img src={item.content} alt="" className="rounded" />
        )}
      </Fragment>
    ))}
  </div>
);

const [FourChoiceQuestionProvider, useFourChoiceQuestionContext] =
  createSafeContext<FourChoiceQuestionContextValue>();

const Header = ({
  className,
  children,
  ...otherProps
}: HTMLDivElementProps) => (
  <div
    className={cx('flex items-center justify-between gap-4', className)}
    {...otherProps}
  >
    {children}
  </div>
);

const Label = ({ className, ...otherProps }: HTMLHeadingElementProps) => {
  const { label } = useFourChoiceQuestionContext();
  return (
    <h2 className={cx('font-bold', className)} {...otherProps}>
      {label}
    </h2>
  );
};

const DifficultyLevel = ({
  className,
  ...otherProps
}: HTMLSpanElementProps) => {
  const { difficultyLevel } = useFourChoiceQuestionContext();
  return (
    <span
      className={cx(
        'rounded-tl-3xl rounded-br-3xl bg-blue-500 px-5 py-1 text-white',
        className,
      )}
      {...otherProps}
    >
      {difficultyLevel}
    </span>
  );
};

const Question = ({ className }: { className?: string }) => {
  const { question } = useFourChoiceQuestionContext();
  return <>{renderContentItems(question, className)}</>;
};

const AnswerGrid = ({ className, children }: HTMLDivElementProps) => (
  <div
    className={cx(
      'mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4',
      className,
    )}
  >
    {children}
  </div>
);

const AnswerItem = ({ className }: HTMLDivElementProps) => {
  const { indexedAnswers, checkResult, setSelected } =
    useFourChoiceQuestionContext();
  return (
    <>
      {indexedAnswers.map(({ id, type, content, index }) => (
        <div
          key={id}
          className={cx(
            'relative flex cursor-pointer items-center gap-2 px-4 py-2',
            className,
          )}
        >
          <input
            type="radio"
            name="answer-radio"
            id={id}
            className="peer absolute inset-0 z-10 opacity-0"
            disabled={checkResult}
            value={id}
            onChange={(e) => setSelected(e.target.value)}
          />
          <div
            className={cx(
              'h-4 w-4 rounded-full border border-slate-300 bg-slate-100 peer-checked:bg-blue-500',
            )}
          />
          <label htmlFor={id} className={cx('flex cursor-pointer gap-2')}>
            <span>{`${index}.`}</span>
            {type === 'plain' && <span>{content}</span>}
            {type === 'html' && (
              <MathJax dangerouslySetInnerHTML={{ __html: content }} />
            )}
          </label>
        </div>
      ))}
    </>
  );
};

const Hint = ({ className }: { className?: string }) => {
  const { hint, checkResult, showHint } = useFourChoiceQuestionContext();
  return (
    <AnimatePresence>
      {!checkResult && showHint && (
        <motion.div
          className={cx('overflow-hidden')}
          variants={variants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <div className="pt-4">
            <div className="rounded border p-4">
              {renderContentItems(hint, className)}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const HintButton = ({
  className,
  onClick,
  ...otherProps
}: HTMLButtonElementProps) => {
  const { setShowHint } = useFourChoiceQuestionContext();
  return (
    <button
      type="button"
      className={cx(
        'h-full rounded-md border border-emerald-500 px-4 py-2',
        className,
      )}
      onClick={(e) => {
        setShowHint((prev) => !prev);
        if (onClick) onClick(e);
      }}
      {...otherProps}
    >
      Gợi ý
    </button>
  );
};

const CheckResultButton = ({
  className,
  onClick,
  ...otherProps
}: HTMLButtonElementProps) => {
  const { setCheckResult } = useFourChoiceQuestionContext();
  return (
    <button
      type="button"
      className={cx(
        'h-full rounded-md border bg-emerald-500 px-4 py-2 text-white',
        className,
      )}
      onClick={(e) => {
        setCheckResult(true);
        if (onClick) onClick(e);
      }}
      {...otherProps}
    >
      Kiểm tra
    </button>
  );
};

const NextButton = ({ className, ...otherProps }: HTMLButtonElementProps) => (
  <button
    type="button"
    className={cx(
      'h-full rounded-md border bg-emerald-500 px-4 py-2 text-white',
      className,
    )}
    {...otherProps}
  >
    Câu hỏi tiếp theo
  </button>
);

const Result = ({ className, ...otherProps }: HTMLParagraphElementProps) => {
  const { selected, correctAnswerId, indexedAnswers } =
    useFourChoiceQuestionContext();
  return (
    <div className="w-full rounded border border-dashed border-red-500 px-8 py-3">
      <p className={cx('text-center font-bold', className)} {...otherProps}>
        <span
          className={cx(
            selected === correctAnswerId ? 'text-emerald-500' : 'text-red-500',
          )}
        >
          Bạn đã chọn {selected === correctAnswerId ? 'đúng' : 'sai'}
        </span>
        <span className="px-2 text-emerald-500">|</span>
        <span className="text-emerald-500">
          Đáp án đúng:{' '}
          {indexedAnswers.find(({ id }) => id === correctAnswerId)?.index}
        </span>
      </p>
    </div>
  );
};

const ToggleSolutionButton = ({
  className,
  onClick,
  ...otherProps
}: HTMLButtonElementProps) => {
  const { setShowSolution } = useFourChoiceQuestionContext();
  return (
    <button
      type="button"
      className={cx(
        'mt-4 rounded-md border bg-emerald-500 px-8 py-2 text-white',
        className,
      )}
      onClick={(e) => {
        setShowSolution((prev) => !prev);
        if (onClick) onClick(e);
      }}
      {...otherProps}
    >
      Xem lời giải &nbsp;&gt;
    </button>
  );
};

const Solution = ({ className }: { className?: string }) => {
  const { showSolution, solution } = useFourChoiceQuestionContext();
  return (
    <AnimatePresence>
      {showSolution && (
        <motion.div
          className={cx('overflow-hidden')}
          variants={variants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <div className="pt-4">{renderContentItems(solution, className)}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const RevisionButton = ({
  className,
  ...otherProps
}: HTMLButtonElementProps) => (
  <button
    type="button"
    className={cx(
      'h-full rounded-md border border-emerald-500 px-4 py-2',
      className,
    )}
    {...otherProps}
  >
    Xem lại lý thuyết
  </button>
);

const FourChoiceQuestion = ({
  label,
  difficultyLevel,
  question,
  answers,
  hint,
  correctAnswerId,
  solution,
  render,
}: FourChoiceQuestionProps) => {
  const [showHint, setShowHint] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [checkResult, setCheckResult] = useState(false);
  const [showSolution, setShowSolution] = useState(true);

  const renderAnswerIndex = (index: number) => {
    const indexMap = [
      {
        input: 0,
        output: 'A',
      },
      {
        input: 1,
        output: 'B',
      },
      {
        input: 2,
        output: 'C',
      },
      {
        input: 3,
        output: 'D',
      },
    ];

    return indexMap.find(({ input }) => input === index)?.output;
  };
  const indexedAnswers = answers.map((answer, index) => ({
    ...answer,
    index: renderAnswerIndex(index),
  }));

  return (
    <FourChoiceQuestionProvider
      value={{
        label,
        difficultyLevel,
        question,
        indexedAnswers,
        hint,
        correctAnswerId,
        solution,
        showHint,
        selected,
        checkResult,
        showSolution,
        setSelected,
        setShowHint,
        setCheckResult,
        setShowSolution,
      }}
    >
      <MathJaxContext>
        <div className={cx('w-[90vw] max-w-4xl')}>
          {render({ selected, checkResult })}
        </div>
      </MathJaxContext>
    </FourChoiceQuestionProvider>
  );
};

export type { FourChoiceQuestionProps };
export default Object.assign(FourChoiceQuestion, {
  Header,
  Label,
  DifficultyLevel,
  Question,
  AnswerGrid,
  AnswerItem,
  Hint,
  HintButton,
  CheckResultButton,
  NextButton,
  Result,
  ToggleSolutionButton,
  Solution,
  RevisionButton,
});
