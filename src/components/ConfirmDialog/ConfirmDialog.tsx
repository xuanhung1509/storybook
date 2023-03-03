import { AnimatePresence, motion } from 'framer-motion';
import { createPortal } from 'react-dom';
import { useConfirmDialog } from '@/components/ConfirmDialog/ConfirmDialogContext';
import cx from '@/utils/classnames';

interface ConfirmDialogProps {
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

const ConfirmDialog = ({
  title = 'Bạn chưa chọn câu trả lời',
  description = 'Bạn có muốn bỏ qua câu hỏi này không?',
  classNames: cxs,
}: ConfirmDialogProps) => {
  const { showDialog, onConfirm, onCancel } = useConfirmDialog();

  return createPortal(
    <AnimatePresence>
      {showDialog && (
        <div className="relative z-10">
          <motion.div
            aria-hidden
            className={cx('fixed inset-0 bg-black/25', cxs?.backdrop)}
            onClick={onCancel}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <div className="pointer-events-none fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <motion.div
                className={cx(
                  'pointer-events-auto max-w-md overflow-hidden rounded-2xl bg-white shadow-xl',
                  cxs?.dialog,
                )}
                initial={{ scale: 0.75, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{
                  scale: 0.75,
                  opacity: 0,
                  transition: { duration: 0.3 },
                }}
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
              </motion.div>
            </div>
          </div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
};

export default ConfirmDialog;
export type { ConfirmDialogProps };
