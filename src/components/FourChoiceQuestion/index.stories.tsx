import { ComponentMeta, ComponentStory } from '@storybook/react';
import FourChoiceQuestion from './intergrated';
import type { FourChoiceQuestionProps } from './intergrated';

const data: FourChoiceQuestionProps = {
  label: 'Câu 1',
  difficultyLevel: 'Thông hiểu',
  question: [
    {
      type: 'html',
      content:
        '<p>Để b&oacute;ng đ&egrave;n loại \\(120V - 60W\\)s&aacute;ng b&igrave;nh thường ở mạng điện c&oacute; hiệu điện thế l&agrave; $220V$, người ta phải mắc nối tiếp với b&oacute;ng đ&egrave;n một điện trở c&oacute; gi&aacute; trị:</p>',
    },
  ],
  answers: [
    {
      id: 'answer-a',
      type: 'html',
      content: '<p>\\(R = 100\\Omega \\)</p>',
    },
    {
      id: 'answer-b',
      type: 'html',
      content: '<p>\\(R = 150\\Omega \\)</p>',
    },
    {
      id: 'answer-c',
      type: 'html',
      content: '<p>\\(R = 200\\Omega \\)</p>',
    },
    {
      id: 'answer-d',
      type: 'html',
      content: '<p>\\(R = 250\\Omega \\)</p>',
    },
  ],
  hint: [
    {
      type: 'html',
      content:
        '<p>+ Đọc c&aacute;c th&ocirc;ng số tr&ecirc;n dụng cụ ti&ecirc;u thụ điện</p>\n<p>+ Sử dụng biểu thức t&iacute;nh c&ocirc;ng suất: \\(P = UI\\)</p>\n<p>+ Sử dụng biểu thức định luật &Ocirc;m: \\(I = \\dfrac{U}{R}\\)</p>',
    },
  ],
  correctAnswerId: 'answer-c',
  solution: [
    {
      type: 'html',
      content:
        '<p>Ta c&oacute;:</p>\n<p>- B&oacute;ng đ&egrave;n loại \\(120V - 60W\\) s&aacute;ng b&igrave;nh thường th&igrave; hiệu điện thế giữa hai đầu b&oacute;ng đ&egrave;n l&agrave; \\(120V\\), cường độ d&ograve;ng điện qua b&oacute;ng đ&egrave;n l&agrave; \\(I = \\dfrac{P}{U} = \\dfrac{{60}}{{120}} = 0,5A\\)</p>\n<p>- Để b&oacute;ng đ&egrave;n s&aacute;ng b&igrave;nh thường ở mạng điện c&oacute; hiệu điện thế l&agrave; \\(220V\\), người ta phải mắc nối tiếp với b&oacute;ng đ&egrave;n một điện trở sao cho hiệu điện thế giữa hai đầu điện trở l&agrave; \\({U_R} = 220 - 120 = 100V\\)</p>\n<p>=&gt; Điện trở cần mắc nối tiếp c&oacute; gi&aacute; trị l&agrave;: \\(R = \\dfrac{{{U_R}}}{I} = \\dfrac{{100}}{{0,5}} = 200\\Omega \\)</p>',
    },
  ],
};

const {
  label,
  difficultyLevel,
  question,
  answers,
  hint,
  correctAnswerId,
  solution,
} = data;

export default {
  title: 'Library/FourChoiceQuestion',
  component: FourChoiceQuestion,
  args: {
    label,
    difficultyLevel,
    question,
    answers,
    hint,
    correctAnswerId,
    solution,
  },
  argTypes: {
    difficultyLevel: {
      options: ['Nhận biết', 'Thông hiểu', 'Vận dụng', 'Vận dụng cao'],
      control: { type: 'radio' },
    },
  },
} as ComponentMeta<typeof FourChoiceQuestion>;

const Template: ComponentStory<typeof FourChoiceQuestion> = (args) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <FourChoiceQuestion {...args} />
);

export const Default = Template.bind({});

export const EventHandlers = Template.bind({});
EventHandlers.argTypes = {
  onHintClick: { action: 'onHintClick' },
  onNextClick: { action: 'onNextClick' },
  onRevisionClick: { action: 'onRevisionClick' },
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
    revisionButton: 'revisionButton',
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
