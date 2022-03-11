interface CreateAlertConfirmProps {
  title: string;
  onConfirm: () => void;
  onCancel?: () => void;
}

const useAlert = () => {
  const createAlertConfirm = ({
    title,
    onConfirm,
    onCancel,
  }: CreateAlertConfirmProps) => {
    if (confirm(title)) {
      onConfirm();
    } else {
      onCancel && onCancel();
    }
  };

  return {
    createAlertConfirm,
  };
};

export { useAlert };
