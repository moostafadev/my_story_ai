export type Option = {
  value: string;
  label: string;
};

export type CustomSelectProps = {
  value: string;
  onChange: (val: string) => void;
  options: Option[];
  placeholder?: string;
  dir?: "rtl" | "ltr";
  className?: string;
  disabled?: boolean;
};
