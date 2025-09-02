"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CustomSelectProps } from "./types";

const CustomSelect = ({
  value,
  onChange,
  options,
  placeholder = "اختر",
  dir = "rtl",
  className,
  disabled = false,
}: CustomSelectProps) => {
  return (
    <Select
      value={value}
      onValueChange={onChange}
      dir={dir}
      disabled={disabled}
    >
      <SelectTrigger className={className ?? "w-[180px]"}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((opt) => (
          <SelectItem key={opt.value} value={opt.value}>
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CustomSelect;
