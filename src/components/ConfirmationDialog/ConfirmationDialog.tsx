import { createPortal } from 'react-dom';
import { useConfirmationDialog } from '@/components/ConfirmationDialog/ConfirmationDialogContext';
import cx from '@/utils/classnames';

interface ConfirmationDialogProps {
  /**
   * `title`: Tiêu đề của hộp thoại.
   */
  title?: string;

  /**
   * `description: Phụ đề/ Mô tả của hộp thoại.
   */
  description?: string;

  /**
   * `classNames`: Tùy chỉnh style của các thành phần của hộp thoại.
   */
  classNames?: Partial<{
    backdrop: string;
    dialog: string;
    header: string;
    body: string;
    title: string;
    description: string;
    buttonGrid: string;
    confirmButton: string;
    cancelButton: string;
  }>;
}

const ConfirmationDialog = ({
  title = 'Bạn chưa chọn câu trả lời',
  description = 'Bạn có muốn bỏ qua câu hỏi này không?',
  classNames: cxs,
}: ConfirmationDialogProps) => {
  const { showConfirmationDialog, onConfirm, onCancel } =
    useConfirmationDialog();

  return showConfirmationDialog
    ? createPortal(
        <div className="relative z-10">
          <div
            aria-hidden
            className={cx('fixed inset-0 bg-black/25', cxs?.backdrop)}
            onClick={onCancel}
          />
          <div className="pointer-events-none fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <div
                className={cx(
                  'pointer-events-auto max-w-md overflow-hidden rounded-2xl bg-white shadow-xl',
                  cxs?.dialog,
                )}
              >
                <div
                  className={cx(
                    'bg-blue-500 p-4 text-center text-white',
                    cxs?.header,
                  )}
                >
                  <h2 className={cx('font-bold uppercase', cxs?.title)}>
                    {title}
                  </h2>
                </div>
                <div className={cx('p-4', cxs?.body)}>
                  <p className={cx('mt-4 text-center', cxs?.description)}>
                    {description}
                  </p>
                  <div
                    className={cx(
                      'mt-4 grid grid-cols-2 items-center gap-2',
                      cxs?.buttonGrid,
                    )}
                  >
                    <button
                      type="button"
                      className={cx(
                        'rounded-xl bg-emerald-500 px-8 py-3 text-white',
                        cxs?.confirmButton,
                      )}
                      onClick={onConfirm}
                    >
                      Confirm
                    </button>
                    <button
                      type="button"
                      className={cx(
                        'rounded-xl bg-rose-500 px-8 py-3 text-white',
                        cxs?.cancelButton,
                      )}
                      onClick={onCancel}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>,
        document.body,
      )
    : null;
};

export default ConfirmationDialog;
export type { ConfirmationDialogProps };
