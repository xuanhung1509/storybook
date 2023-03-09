/* eslint-disable no-alert */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-nested-ternary */
import { useState } from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import FourChoiceQuestion from './FourChoiceQuestion';
import type { FourChoiceQuestionProps } from './types';
import rawData from '../../data.json';

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

export default {
  title: 'Playground/Four-choice Question',
  component: FourChoiceQuestion,
} as ComponentMeta<typeof FourChoiceQuestion>;

const Template: ComponentStory<typeof FourChoiceQuestion> = ({
  mode = 'client-grade',
  selectedAnswerId = '3',
  ...otherProps
}: any) => {
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
    setSelectedAnswers((prev) => [...prev, selected]);
    setCurrentQuestion((prev) => {
      if (prev < data.length - 1) {
        return prev + 1;
      }
      return 0;
    });
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
          mode,
          selectedAnswerId,
        }}
        {...otherProps}
        correctAnswerId={String(correctAnswerId)}
        onNextClick={handleNextClick}
        onReviewClick={handleReviewClick}
      />

      {mode === 'server-grade' && selectedAnswers.length > 0 && (
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

export const Default = Template.bind({});

export const TextContent = Template.bind({});
TextContent.args = {
  textContent: {
    hintButton: 'hintButton',
    checkResultButton: 'checkResultButton',
    nextButton: 'nextButton',
    toggleSolutionButton: 'toggleSolutionButton',
    reviewButton: 'reviewButton',
  },
};

export const ClassNames = Template.bind({});
ClassNames.args = {
  classNames: {
    container: 'container',
    header: 'header',
    label: 'label',
    difficultyLevel: 'difficultyLevel',
    commonQuestion: 'commonQuestion',
    question: 'question',
    answerGrid: 'answerGrid',
    answerItem: 'answerItem',
    answerRadio: 'answerRadio',
    answerLabel: 'answerLabel',
    hint: 'hint',
    hintButton: 'hintButton',
    checkResultButton: 'checkResultButton',
    nextButton: 'nextButton',
    toggleSolutionButton: 'toggleSolutionButton',
    reviewButton: 'reviewButton',
    buttonGrid: 'buttonGrid',
    solution: 'solution',
  },
};

export const InsertComponent = Template.bind({});
InsertComponent.args = {
  insertComponent: {
    Component: () => (
      <h2 className="font-serif text-2xl font-bold">Inserted Component</h2>
    ),
    placeAfter: 'header',
  },
};

export const ConfirmDialog = Template.bind({});
ConfirmDialog.args = {
  ConfirmDialog: {
    textContent: {
      title: 'Tiêu đề hộp thoại',
      description: 'Phụ đề hộp thoại',
      confirmButton: 'confirmButton',
      cancelButton: 'cancelButton',
    },
    classNames: {
      backdrop: 'backdrop',
      dialog: 'dialog',
      header: 'header',
      body: 'body',
      title: 'title',
      description: 'description',
      buttonGrid: 'buttonGrid',
      confirmButton: 'confirmButton',
      cancelButton: 'cancelButton',
    },
  },
};

export const ServerGradeMode = Template.bind({});
ServerGradeMode.args = {
  mode: 'server-grade',
};

export const AdminPreviewMode = Template.bind({});
AdminPreviewMode.args = {
  mode: 'admin-preview',
};

export const UserReviewMode = Template.bind({});
UserReviewMode.args = {
  mode: 'user-review',
};
