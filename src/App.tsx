/* eslint-disable import/no-named-default */
import { default as FourChoiceQuestionIntergrated } from '@/components/FourChoiceQuestion/intergrated';
import { default as M } from '@/components/FourChoiceQuestion/modular';
import type { FourChoiceQuestionProps } from '@/components/FourChoiceQuestion/intergrated';

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

const Intergrated = () => (
  <FourChoiceQuestionIntergrated
    {...{
      label,
      difficultyLevel,
      question,
      answers,
      hint,
      correctAnswerId,
      solution,
    }}
    onHintClick={() => console.log('hint clicked')}
    onNextClick={(_, selected) => {
      if (selected !== null) {
        console.log('next question');
      } else {
        console.log('skip current question');
      }
    }}
    onRevisionClick={() => console.log('revision clicked')}
    onCorrectAnswerSelect={() => alert('Ban da chon dung')}
    onIncorrectAnswerSelect={() => alert('Chua dung nhe ban oi')}
    insertComponent={{
      // eslint-disable-next-line react/no-unstable-nested-components
      Component: () => (
        <h2 className="font-serif text-2xl font-bold">Hello World</h2>
      ),
      placeAfter: 'hint',
    }}
  />
);

const Modular = () => (
  <M
    {...{
      label,
      difficultyLevel,
      question,
      answers,
      hint,
      correctAnswerId,
      solution,
    }}
    render={({ selected, checkResult }) => (
      <>
        <M.Header>
          <M.Label />
          <M.DifficultyLevel />
        </M.Header>
        <M.Question />
        <M.AnswerGrid>
          <M.AnswerItem />
        </M.AnswerGrid>
        <M.Hint />

        {!checkResult && (
          <div className="mt-4 grid w-full grid-cols-2 items-center gap-4 bg-white">
            <M.HintButton />
            {selected ? <M.CheckResultButton /> : <M.NextButton />}
          </div>
        )}
        {checkResult && (
          <div className="mt-4 flex flex-col items-center">
            <M.Result />
            <M.ToggleSolutionButton />
            <M.Solution />
            <div className="mt-4 grid w-full grid-cols-2 items-center gap-4 bg-white">
              <M.RevisionButton />
              <M.NextButton />
            </div>
          </div>
        )}
      </>
    )}
  />
);

type Mode = 'intergrated' | 'modular';
// eslint-disable-next-line prefer-const
let mode: Mode = 'modular';

const App = () => (
  <div className="container mx-auto flex min-h-[80vh] flex-col items-center py-8 px-4">
    {mode === 'intergrated' ? <Intergrated /> : <Modular />}
  </div>
);
export default App;
