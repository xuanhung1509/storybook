/* eslint-disable react/no-danger */
import { Fragment, useState } from 'react';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import { MathJax, MathJaxContext } from 'better-react-mathjax';
import ResizablePanel from '@/components/ResizablePanel';
import {
  ConfirmDialog,
  ConfirmDialogProvider,
} from '@/components/ConfirmDialog';
import cx from '@/utils/classnames';
import { FourChoiceQuestionProvider } from './FourChoiceQuestionContext';
import WithInsertedComponent from './WithInsertedComponent';
import NextButton from './NextButton';
import type { ContentItem, FourChoiceQuestionProps } from './types';

const ContentItems = ({ items }: { items: ContentItem[] }) => (
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

const FourChoiceQuestion = ({
  label,
  difficultyLevel,
  commonQuestion,
  question,
  answers,
  hint,
  correctAnswerId,
  solution,
  textContent,
  classNames: cxs,
  onHintClick,
  onNextClick,
  onRevisionClick,
  onCorrectAnswerSelect,
  onIncorrectAnswerSelect,
  insertComponent: InsertComponent,
  ConfirmDialog: ConfirmDialogProps,
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

  // Reset all states to initial
  const reset = () => {
    setShowHint(false);
    setSelected(null);
    setCheckResult(false);
    setShowSolution(true);
  };

  return (
    <ConfirmDialogProvider>
      <FourChoiceQuestionProvider
        value={{
          InsertComponent,
        }}
      >
        <MathJaxContext>
          <div className={cx('w-[90vw] max-w-4xl', cxs?.container)}>
            {/* Header */}
            <WithInsertedComponent currentPosition="header">
              <div
                className={cx(
                  'flex items-center justify-between gap-4',
                  cxs?.header,
                )}
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
            </WithInsertedComponent>

            {/* Common question */}
            <WithInsertedComponent currentPosition="commonQuestion">
              {commonQuestion && (
                <div
                  className={cx(
                    'mt-4 mb-6 rounded border border-slate-300 py-4',
                    cxs?.commonQuestion,
                  )}
                >
                  <div className="max-h-40 overflow-y-auto px-4">
                    <ContentItems items={commonQuestion} />
                  </div>
                </div>
              )}
            </WithInsertedComponent>

            {/* Question */}
            <WithInsertedComponent currentPosition="question">
              <div className={cx('mt-4', cxs?.question)}>
                <ContentItems items={question} />
              </div>
            </WithInsertedComponent>

            {/* Answers */}
            <WithInsertedComponent currentPosition="answers">
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
                      checked={selected === id}
                      value={id}
                      onChange={(e) => {
                        const answer = e.target.value;
                        setSelected(answer);

                        // Mặc định không hiện lời giải nếu học sinh chọn đúng
                        setShowSolution(answer !== correctAnswerId);
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
                      className={cx(
                        'flex cursor-pointer gap-2',
                        cxs?.answerLabel,
                      )}
                    >
                      <span>{`${index}.`}</span>
                      {type === 'plain' && <span>{content}</span>}
                      {type === 'html' && (
                        <MathJax
                          dangerouslySetInnerHTML={{ __html: content }}
                        />
                      )}
                    </label>
                  </div>
                ))}
              </div>
            </WithInsertedComponent>

            {/* Hint */}
            <WithInsertedComponent currentPosition="hint">
              <ResizablePanel
                visible={!checkResult && showHint}
                className={cxs?.hint}
              >
                <div className="pt-4">
                  <div className="rounded border p-4">
                    <ContentItems items={hint} />
                  </div>
                </div>
              </ResizablePanel>
            </WithInsertedComponent>

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
                  {textContent?.hintButton || 'Gợi ý'}
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

                      if (
                        selected === correctAnswerId &&
                        onCorrectAnswerSelect
                      ) {
                        onCorrectAnswerSelect();
                      } else if (
                        selected !== correctAnswerId &&
                        onIncorrectAnswerSelect
                      ) {
                        onIncorrectAnswerSelect();
                      }
                    }}
                  >
                    {textContent?.checkResultButton || 'Kiểm tra'}
                  </button>
                ) : (
                  <NextButton
                    {...{ selected, onNextClick, reset, textContent, cxs }}
                  />
                )}
              </div>
            )}

            {checkResult && (
              <div className="mt-4 flex flex-col items-center">
                {/* Result */}
                <WithInsertedComponent currentPosition="result">
                  <div className="w-full rounded border border-dashed border-red-500 px-8 py-3">
                    <p className="text-center font-bold">
                      <span
                        className={cx(
                          selected === correctAnswerId
                            ? 'text-emerald-500'
                            : 'text-red-500',
                        )}
                      >
                        Bạn đã chọn{' '}
                        {selected === correctAnswerId ? 'đúng' : 'sai'}
                      </span>
                      <span className="px-2 text-emerald-500">|</span>
                      <span className="text-emerald-500">
                        Đáp án đúng:{' '}
                        {
                          indexedAnswers.find(
                            ({ id }) => id === correctAnswerId,
                          )?.index
                        }
                      </span>
                    </p>
                  </div>
                </WithInsertedComponent>

                {/* Toggle solution button */}
                <WithInsertedComponent currentPosition="toggleSolutionButton">
                  <button
                    type="button"
                    className={cx(
                      'mt-4 flex items-center gap-2 rounded-md border bg-emerald-500 px-8 py-2 text-white',
                      cxs?.toggleSolutionButton,
                    )}
                    onClick={() => setShowSolution((prev) => !prev)}
                  >
                    {textContent?.toggleSolutionButton || 'Xem lời giải'}
                    <ChevronRightIcon
                      className={cx(
                        'h-6 w-6 transition-transform',
                        showSolution && 'rotate-90',
                      )}
                    />
                  </button>
                </WithInsertedComponent>

                {/* Solution */}
                <WithInsertedComponent currentPosition="solution">
                  <ResizablePanel
                    visible={showSolution}
                    className={cxs?.solution}
                  >
                    <div className="pt-4">
                      <ContentItems items={solution} />
                    </div>
                  </ResizablePanel>
                </WithInsertedComponent>

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
                    {textContent?.revisionButton || 'Xem lại lý thuyết'}
                  </button>
                  <NextButton
                    {...{ selected, onNextClick, reset, textContent, cxs }}
                  />
                </div>
              </div>
            )}
          </div>
        </MathJaxContext>

        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <ConfirmDialog {...ConfirmDialogProps} />
      </FourChoiceQuestionProvider>
    </ConfirmDialogProvider>
  );
};

export default FourChoiceQuestion;
