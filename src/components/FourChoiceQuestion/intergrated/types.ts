type ContentType = 'plain' | 'html' | 'image';

interface ContentItem {
  type: ContentType;
  content: string;
}

type InsertComponentAfter =
  | 'header'
  | 'commonQuestion'
  | 'question'
  | 'answers'
  | 'hint'
  | 'result'
  | 'toggleSolutionButton'
  | 'solution';

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
   * `commonQuestion`: Sử dụng trong trường hợp câu hỏi có đề bài chung.
   */
  commonQuestion?: ContentItem[];

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
    commonQuestion?: string;
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
    placeAfter: InsertComponentAfter;
  };
}

export type { ContentItem, InsertComponentAfter, FourChoiceQuestionProps };
