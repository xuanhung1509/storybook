/* eslint-disable no-nested-ternary */
/* eslint-disable no-alert */
/* eslint-disable no-console */
/* eslint-disable import/no-named-default */
import { useState } from 'react';
import FourChoiceQuestion from '@/components/FourChoiceQuestion';
import type { FourChoiceQuestionProps } from '@/components/FourChoiceQuestion';
import rawData from './data.json';

const data = rawData.map(
  (item, index) =>
    ({
      label: `Question ${index + 1}`,
      difficultyLevel:
        item.difficult_degree === 1
          ? 'Nhận biết'
          : item.difficult_degree === 2
          ? 'Thông hiểu'
          : item.difficult_degree === 3
          ? 'Vận dụng'
          : 'Vận dụng cao',
      question: item.question.content,
      answers: item.question.answers.map(({ id, text }) => ({
        id,
        type: text[0].type,
        content: text[0].content,
      })),
      hint: item.solution_suggesstion,
      correctAnswerId: item.question.answers.find(({ correct }) => correct)?.id,
      solution: item.solution_detail,
    } as FourChoiceQuestionProps),
);

const App = () => {
  const [selectedAnswers, setSelectedAnswers] = useState<Array<string | null>>(
    [],
  );
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const {
    label,
    difficultyLevel,
    commonQuestion,
    question,
    answers,
    hint,
    correctAnswerId,
    solution,
  } = data[currentQuestion];

  const handleNextClick: FourChoiceQuestionProps['onNextClick'] = (
    _event,
    selected,
  ) => {
    setCurrentQuestion((prev) => {
      if (prev < data.length - 1) {
        return prev + 1;
      }
      return 0;
    });
    setSelectedAnswers((prev) => [...prev, selected]);
  };

  const handleReviewClick = () => alert('Xem lại lý thuyết');

  return (
    <div className="container mx-auto flex min-h-[80vh] flex-col items-center gap-8 py-8 px-4">
      <FourChoiceQuestion
        {...{
          label,
          difficultyLevel,
          commonQuestion,
          question,
          answers,
          hint,
          solution,
        }}
        mode="user-review"
        correctAnswerId={String(correctAnswerId)}
        selectedAnswerId="3"
        onNextClick={handleNextClick}
        onReviewClick={handleReviewClick}
      />

      {selectedAnswers.length > 0 && (
        <section>
          <h2 className="text-center">Selected Answers:</h2>
          <pre className="mt-4">
            <code>
              <ul className="flex items-center gap-2">
                <span>[</span>
                {selectedAnswers.map((answer, index) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <li key={index}>
                    {String(answer)}
                    {index < selectedAnswers.length - 1 && ','}
                  </li>
                ))}
                <span>]</span>
              </ul>
            </code>
          </pre>
        </section>
      )}
    </div>
  );
};
export default App;
