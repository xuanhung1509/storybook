/* eslint-disable no-nested-ternary */
/* eslint-disable no-alert */
/* eslint-disable no-console */
/* eslint-disable import/no-named-default */
import { useState } from 'react';
import FourChoiceQuestion from '@/components/FourChoiceQuestion/intergrated';
import type { FourChoiceQuestionProps } from '@/components/FourChoiceQuestion/intergrated';
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

  const handleNextClick = () => setCurrentQuestion((prev) => prev + 1);
  const handleRevisionClick = () => alert('Xem lại lý thuyết');

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
          correctAnswerId,
          solution,
        }}
        onNextClick={handleNextClick}
        onRevisionClick={handleRevisionClick}
      />
    </div>
  );
};
export default App;
