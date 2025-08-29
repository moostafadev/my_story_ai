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
}

export function OTPInput({
  length = 6,
  pattern = REGEXP_ONLY_DIGITS_AND_CHARS,
  value,
  onChange,
}: OTPInputProps) {
  return (
    <InputOTP
      maxLength={length}
      pattern={pattern}
      value={value}
      onChange={onChange}
      dir="ltr"
    >
      <InputOTPGroup dir="ltr">
        {Array.from({ length }).map((_, index) => (
          <InputOTPSlot key={index} index={index} />
        ))}
      </InputOTPGroup>
    </InputOTP>
  );
}
