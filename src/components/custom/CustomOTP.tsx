"use client";

import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

interface OTPInputProps {
  length?: number;
  pattern?: string;
  value: string;
  onChange: (val: string) => void;
  id?: string;
}

export function OTPInput({
  length = 6,
  pattern = REGEXP_ONLY_DIGITS_AND_CHARS,
  value,
  onChange,
  id,
}: OTPInputProps) {
  return (
    <InputOTP
      maxLength={length}
      pattern={pattern}
      value={value}
      onChange={onChange}
      dir="ltr"
      id={id}
      className="w-fit"
    >
      <InputOTPGroup dir="ltr">
        {Array.from({ length }).map((_, index) => (
          <InputOTPSlot key={index} index={index} />
        ))}
      </InputOTPGroup>
    </InputOTP>
  );
}
