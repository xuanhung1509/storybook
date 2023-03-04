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
  title: 'Library/FourChoiceQuestion',
  component: FourChoiceQuestion,
  argTypes: {
    difficultyLevel: {
      options: ['Nhận biết', 'Thông hiểu', 'Vận dụng', 'Vận dụng cao'],
      control: { type: 'radio' },
    },
  },
} as ComponentMeta<typeof FourChoiceQuestion>;

const Template: ComponentStory<typeof FourChoiceQuestion> = (args) => {
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

  const handleNextClick = () =>
    setCurrentQuestion((prev) => {
      if (prev < data.length - 1) {
        return prev + 1;
      }
      return 0;
    });

  return (
    <div className="container mx-auto flex min-h-[80vh] flex-col items-center gap-8 py-8 px-4">
      <FourChoiceQuestion
        {...args}
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
      />
    </div>
  );
};

export const Default = Template.bind({});

export const EventHandlers = Template.bind({});
EventHandlers.argTypes = {
  onHintClick: { action: 'onHintClick' },
  onNextClick: { action: 'onNextClick' },
  onReviewClick: { action: 'onReviewClick' },
  onCorrectAnswerSelect: { action: 'onCorrectAnswerSelect' },
  onIncorrectAnswerSelect: { action: 'onIncorrectAnswerSelect' },
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
InsertComponent.argTypes = {};
InsertComponent.args = {
  insertComponent: {
    Component: () => (
      <h2 className="font-serif text-2xl font-bold">Inserted Component</h2>
    ),
    placeAfter: 'header',
  },
};
