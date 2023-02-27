/* eslint-disable react/no-danger */
import { Fragment, useState } from 'react';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import { MathJax, MathJaxContext } from 'better-react-mathjax';
import ResizablePanel from '@/components/ResizablePanel';
import cx from '@/utils/classnames';

type ContentType = 'plain' | 'html' | 'image';

interface ContentItem {
  type: ContentType;
  content: string;
}

interface FourChoiceQuestionProps {
  /**
   * `label`: Nhãn câu hỏi. Ví dụ: `Câu 1`.
   */
  label: string;

  /**
   * `difficultyLevel`: Mức độ khó của câu hỏi.
   */
  difficultyLevel: 'Nhận biết' | 'Thông hiểu' | 'Vận dụng' | 'Vận dụng cao';

  /**
   * `question`: Đề bài của câu hỏi.
   */
  question: ContentItem[];

  /**
   * `answers`: Đáp án của câu hỏi.
   */
  answers: Array<
    ContentItem & {
      id: string;
    }
  >;

  /**
   * `hint`: Gợi ý đáp án.
   */
  hint: ContentItem[];

  /**
   * `correctAnswerId`: `id` của đáp án đúng.
   */
  correctAnswerId: string;

  /**
   * `solution`: Lời giải của giáo viên.
   */
  solution: ContentItem[];

  /**
   * `classNames`: Sử dụng trong trường hợp người dùng muốn tùy chỉnh style của các element.
   */
  classNames?: {
    container?: string;
    header?: string;
    label?: string;
    difficultyLevel?: string;
    question?: string;
    answerGrid?: string;
    answerItem?: string;
    answerRadio?: string;
    answerLabel?: string;
    hint?: string;
    hintButton?: string;
    checkResultButton?: string;
    nextButton?: string;
    toggleSolutionButton?: string;
    revisionButton?: string;
    buttonGrid?: string;
    solution?: string;
  };

  /**
   * `onHintClick`: Event handler khi nhấn nút `Gợi ý`
   * @param event
   * @returns
   */
  onHintClick?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => void;

  /**
   * `onNextClick`: Event handler khi nhấn nút `Câu hỏi tiếp theo`
   * @param event @param selected
   * @returns
   */
  onNextClick?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    selected: string | null,
  ) => void;

  /**
   * `onRevisionClick`: Event handler khi nhấn nút `Xem lại lý thuyết`
   * @param event
   * @returns
   */
  onRevisionClick?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => void;

  /**
   * `onCorrectAnswerSelect`: Event handler khi nhấn nút `Kiểm tra` và đáp án đã chọn là đáp án đúng.
   * @returns
   */
  onCorrectAnswerSelect?: () => void;

  /**
   * `onIncorrectAnswerSelect`: Event handler khi nhấn nút `Kiểm tra` và đáp án đã chọn là đáp án sai.
   * @returns
   */
  onIncorrectAnswerSelect?: () => void;

  /**
   * `insertComponent`: Chèn `Component` vào vị trí sau `placeAfter`
   */
  insertComponent?: {
    Component: () => JSX.Element;
    placeAfter:
      | 'header'
      | 'question'
      | 'answers'
      | 'hint'
      | 'result'
      | 'toggleSolutionButton'
      | 'solution';
  };
}

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

const FourChoiceQuestion = ({
  label,
  difficultyLevel,
  question,
  answers,
  hint,
  correctAnswerId,
  solution,
  classNames: cxs,
  onHintClick,
  onNextClick,
  onRevisionClick,
  onCorrectAnswerSelect,
  onIncorrectAnswerSelect,
  insertComponent: InsertComponent,
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

  const renderContentItems = (items: ContentItem[]) => (
    <div className="flex flex-col gap-4">
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

  return (
    <MathJaxContext>
      <div className={cx('w-[90vw] max-w-4xl', cxs?.container)}>
        {/* Header */}
        <div
          className={cx('flex items-center justify-between gap-4', cxs?.header)}
        >
          <h2 className={cx('font-bold', cxs?.label)}>{label}</h2>
          <span
            className={cx(
              'rounded-tl-3xl rounded-br-3xl bg-blue-500 px-5 py-1 text-white',
              cxs?.difficultyLevel,
            )}
          >
            {difficultyLevel}
          </span>
        </div>

        {InsertComponent && InsertComponent.placeAfter === 'header' && (
          <InsertComponent.Component />
        )}

        {/* Question */}
        <div className={cx('mt-4', cxs?.question)}>
          {renderContentItems(question)}
        </div>

        {InsertComponent && InsertComponent.placeAfter === 'question' && (
          <InsertComponent.Component />
        )}

        {/* Answers */}
        <div
          className={cx(
            'mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4',
            cxs?.answerGrid,
          )}
        >
          {indexedAnswers.map(({ id, type, content, index }) => (
            <div
              key={id}
              className={cx(
                'relative flex items-center gap-2 px-4 py-2',
                cxs?.answerItem,
              )}
            >
              <input
                type="radio"
                name="answer-radio"
                id={id}
                className="peer absolute top-0 left-0 z-10 h-full w-full cursor-pointer opacity-0"
                disabled={checkResult}
                value={id}
                onChange={(e) => {
                  const answer = e.target.value;
                  setSelected(answer);
                  setShowSolution(!(answer === correctAnswerId));
                }}
              />
              <div
                className={cx(
                  'h-4 w-4 cursor-move rounded-full border border-slate-300 bg-slate-100 peer-checked:bg-blue-500',
                  cxs?.answerRadio,
                )}
              />
              <label
                htmlFor={id}
                className={cx('flex cursor-pointer gap-2', cxs?.answerLabel)}
              >
                <span>{`${index}.`}</span>
                {type === 'plain' && <span>{content}</span>}
                {type === 'html' && (
                  <MathJax dangerouslySetInnerHTML={{ __html: content }} />
                )}
              </label>
            </div>
          ))}
        </div>

        {InsertComponent && InsertComponent.placeAfter === 'answers' && (
          <InsertComponent.Component />
        )}

        {/* Hint */}
        <ResizablePanel
          visible={!checkResult && showHint}
          className={cxs?.hint}
        >
          <div className="pt-4">
            <div className="rounded border p-4">{renderContentItems(hint)}</div>
          </div>
        </ResizablePanel>

        {InsertComponent && InsertComponent.placeAfter === 'hint' && (
          <InsertComponent.Component />
        )}

        {/* Hint & Check result/ Next buttons */}
        {!checkResult && (
          <div
            className={cx(
              'mt-4 grid grid-cols-2 items-center gap-4 bg-white',
              cxs?.buttonGrid,
            )}
          >
            <button
              type="button"
              className={cx(
                'h-full rounded-md border border-emerald-500 px-4 py-2',
                cxs?.hintButton,
              )}
              onClick={(event) => {
                setShowHint((prev) => !prev);

                if (onHintClick) onHintClick(event);
              }}
            >
              Gợi ý
            </button>
            {selected ? (
              <button
                type="button"
                className={cx(
                  'h-full rounded-md border bg-emerald-500 px-4 py-2 text-white',
                  cxs?.checkResultButton,
                )}
                onClick={() => {
                  setCheckResult(true);

                  if (selected === correctAnswerId && onCorrectAnswerSelect) {
                    onCorrectAnswerSelect();
                  } else if (
                    selected !== correctAnswerId &&
                    onIncorrectAnswerSelect
                  ) {
                    onIncorrectAnswerSelect();
                  }
                }}
              >
                Kiểm tra
              </button>
            ) : (
              <NextButton {...{ selected, onNextClick, cxs }} />
            )}
          </div>
        )}

        {checkResult && (
          <div className="mt-4 flex flex-col items-center">
            {/* Result */}
            <div className="w-full rounded border border-dashed border-red-500 px-8 py-3">
              <p className="text-center font-bold">
                <span
                  className={cx(
                    selected === correctAnswerId
                      ? 'text-emerald-500'
                      : 'text-red-500',
                  )}
                >
                  Bạn đã chọn {selected === correctAnswerId ? 'đúng' : 'sai'}
                </span>
                <span className="px-2 text-emerald-500">|</span>
                <span className="text-emerald-500">
                  Đáp án đúng:{' '}
                  {
                    indexedAnswers.find(({ id }) => id === correctAnswerId)
                      ?.index
                  }
                </span>
              </p>
            </div>

            {InsertComponent && InsertComponent.placeAfter === 'result' && (
              <InsertComponent.Component />
            )}

            {/* Toggle solution button */}
            <button
              type="button"
              className={cx(
                'mt-4 flex items-center gap-2 rounded-md border bg-emerald-500 px-8 py-2 text-white',
                cxs?.toggleSolutionButton,
              )}
              onClick={() => setShowSolution((prev) => !prev)}
            >
              Xem lời giải
              <ChevronRightIcon
                className={cx(
                  'h-6 w-6 transition-transform',
                  showSolution && 'rotate-90',
                )}
              />
            </button>

            {InsertComponent &&
              InsertComponent.placeAfter === 'toggleSolutionButton' && (
                <InsertComponent.Component />
              )}

            {/* Solution */}
            <ResizablePanel visible={showSolution} className={cxs?.solution}>
              <div className="pt-4">{renderContentItems(solution)}</div>
            </ResizablePanel>

            {InsertComponent && InsertComponent.placeAfter === 'solution' && (
              <InsertComponent.Component />
            )}

            {/* Revision & Next buttons */}
            <div
              className={cx(
                'mt-4 grid w-full grid-cols-2 items-center gap-4 bg-white',
                cxs?.buttonGrid,
              )}
            >
              <button
                type="button"
                className={cx(
                  'h-full rounded-md border border-emerald-500 px-4 py-2',
                  cxs?.revisionButton,
                )}
                onClick={(event) => {
                  if (onRevisionClick) onRevisionClick(event);
                }}
              >
                Xem lại lý thuyết
              </button>
              <NextButton {...{ selected, onNextClick, cxs }} />
            </div>
          </div>
        )}
      </div>
    </MathJaxContext>
  );
};

export type { FourChoiceQuestionProps };
export default FourChoiceQuestion;
