import type { ConfirmDialogProps } from '@/components/ConfirmDialog/ConfirmDialog';

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

interface ClientGradeMode {
  /**
   * `mode`: Các chế độ hoạt động của câu hỏi: `"client-grade"` | `"server-grade"` | `"admin-preview"` | `"user-review"`
   * - `"client-grade"`:
   *    - Việc kiểm tra đáp án đúng được thực hiện phía client.
   *    - Yêu cầu prop `correctAnswerId`.
   */
  mode: 'client-grade';

  /**
   * `correctAnswerId`: `id` của đáp án đúng.
   */
  correctAnswerId: string;

  // EXCLUDE
  selectedAnswerId?: never;
}

interface ServerGradeMode {
  /**
   * `mode`: Các chế độ hoạt động của câu hỏi: `"client-grade"` | `"server-grade"` | `"admin-preview"` | `"user-review"`
   * - `"server-grade"`:
   *    - Việc kiểm tra đáp án đúng được thực hiện phía server.
   *    - Đáp án người dùng đã chọn được trả ra trong function `onNextClick`.
   */
  mode: 'server-grade';

  // EXCLUDE
  correctAnswerId?: never;
  selectedAnswerId?: never;
}

interface AdminPreviewMode {
  /**
   * `mode`: Các chế độ hoạt động của câu hỏi: `"client-grade"` | `"server-grade"` | `"admin-preview"` | `"user-review"`
   * - `"admin-preview"`:
   *    - Sử dụng cho nhập liệu nội dung.
   *    - Đáp án đúng được đánh dấu. Gợi ý và lời giải được hiển thị mặc định.
   *    - Yêu cầu prop `correctAnswerId`.
   */
  mode: 'admin-preview';

  /**
   * `correctAnswerId`: `id` của đáp án đúng.
   */
  correctAnswerId: string;

  // EXCLUDE
  selectedAnswerId?: never;
}

interface UserReviewMode {
  /**
   * `mode`: Các chế độ hoạt động của câu hỏi: `"client-grade"` | `"server-grade"` | `"admin-preview"` | `"user-review"`
   * - `"user-review"`:
   *    - Sử dụng trong trường hợp cho học sinh xem lại đáp án.
   *    - Học sinh được phép xem đáp án đã chọn, đáp án đúng, lời giải và chuyển câu tiếp theo.
   *    - Yêu cầu prop `correctAnswerId`, `selectedAnswerId`.
   */
  mode: 'user-review';

  /**
   * `correctAnswerId`: `id` của đáp án đúng.
   */
  correctAnswerId: string;

  /**
   *  `selectedAnswerId`: Đáp án học sinh đã chọn (trong chế độ xem lại).
   */
  selectedAnswerId: string;
}

interface FourChoiceQuestionWithoutModeProps {
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
   * `solution`: Lời giải của giáo viên.
   */
  solution: ContentItem[];

  /** `textContent`: Tùy chỉnh text của các thành phần của Component. */
  textContent?: Partial<{
    hintButton: string;
    checkResultButton: string;
    nextButton: string;
    toggleSolutionButton: string;
    reviewButton: string;
  }>;

  /**
   * `classNames`: Tùy chỉnh style của các thành phần của Component.
   */
  classNames?: Partial<{
    container: string;
    header: string;
    label: string;
    difficultyLevel: string;
    commonQuestion: string;
    question: string;
    answerGrid: string;
    answerItem: string;
    answerRadio: string;
    answerLabel: string;
    hint: string;
    hintButton: string;
    checkResultButton: string;
    nextButton: string;
    toggleSolutionButton: string;
    reviewButton: string;
    buttonGrid: string;
    solution: string;
  }>;

  /**
   * `onHintClick`: Event handler khi nhấn nút `Gợi ý`
   */
  onHintClick?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => void;

  /**
   * `onNextClick`: Event handler khi nhấn nút `Câu hỏi tiếp theo`
   */
  onNextClick: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    selected: string | null,
  ) => void;

  /**
   * `onReviewClick`: Event handler khi nhấn nút `Xem lại lý thuyết`
   */
  onReviewClick?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => void;

  /**
   * `onCorrectAnswerSelect`: Event handler khi nhấn nút `Kiểm tra` và đáp án đã chọn là đáp án đúng.
   */
  onCorrectAnswerSelect?: () => void;

  /**
   * `onIncorrectAnswerSelect`: Event handler khi nhấn nút `Kiểm tra` và đáp án đã chọn là đáp án sai.
   */
  onIncorrectAnswerSelect?: () => void;

  /**
   * `insertComponent`: Chèn `Component` vào vị trí sau `placeAfter`
   */
  insertComponent?: {
    Component: () => JSX.Element;
    placeAfter: InsertComponentAfter;
  };

  /**
   * `ConfirmDialog`: Tùy chỉnh hộp thoại confirm.
   */
  ConfirmDialog?: ConfirmDialogProps;
}

type FourChoiceQuestionProps = FourChoiceQuestionWithoutModeProps &
  (ClientGradeMode | ServerGradeMode | AdminPreviewMode | UserReviewMode);

export type { ContentItem, InsertComponentAfter, FourChoiceQuestionProps };
