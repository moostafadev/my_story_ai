interface DialogTitle {
  text: string;
  className?: string;
}

interface DialogDescription {
  text: string;
  className?: string;
}

export interface DialogProps {
  title?: DialogTitle;
  description?: DialogDescription;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
  trigger?: React.ReactNode;
  className?: string;
}
