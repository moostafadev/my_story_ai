import { Control, FieldValues, Path } from "react-hook-form";

export interface CustomInputProps<T extends FieldValues = FieldValues> {
  label?: string;
  description?: string;
  placeholder?: string;
  className?: string;
  type?: string;
  control?: Control<T>;
  name?: Path<T>;
  required?: boolean;
}
