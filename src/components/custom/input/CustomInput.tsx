"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import {
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import { CustomInputProps } from "./types";
import { ControllerRenderProps, FieldValues, Path } from "react-hook-form";
import { useLocale, useTranslations } from "next-intl";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ZodTypeAny, ZodObject } from "zod";
import { Label } from "@/components/ui/label";

function isFieldRequired(
  schema: ZodObject<Record<string, ZodTypeAny>>,
  fieldName: string
): boolean {
  try {
    const shape = schema.shape;
    const field = shape?.[fieldName] as ZodTypeAny | undefined;

    if (!field) return false;

    if (field.isOptional?.()) return false;

    if (field.isNullable?.()) return false;

    return true;
  } catch {
    return false;
  }
}

type CustomInputComponent = <T extends FieldValues = FieldValues>(
  props: CustomInputProps<T> & {
    ref?: React.Ref<HTMLInputElement>;
    schema?: ZodObject<Record<string, ZodTypeAny>>;
  }
) => React.ReactElement | null;

const CustomInputInner = React.memo(
  React.forwardRef(function CustomInputInner<T extends FieldValues>(
    {
      label,
      description,
      control,
      name,
      className,
      placeholder,
      schema,
      ...props
    }: CustomInputProps<T>,
    ref: React.Ref<HTMLInputElement>
  ) {
    const t = useTranslations("");
    const locale = useLocale();
    const isRTL = locale === "ar";

    const [showPassword, setShowPassword] = React.useState(false);
    const [localValue, setLocalValue] = React.useState("");

    const isPasswordField = React.useMemo(
      () =>
        name?.toString().toLowerCase().includes("password") ||
        props.type === "password",
      [name, props.type]
    );

    const isRequired = React.useMemo(
      () =>
        schema && name
          ? isFieldRequired(schema, name.toString())
          : !!props.required,
      [schema, name, props.required]
    );

    const togglePasswordVisibility = React.useCallback(() => {
      setShowPassword((prev) => !prev);
    }, []);

    const renderInput = React.useCallback(
      (fieldProps?: ControllerRenderProps<T, Path<T>>) => (
        <div className="relative">
          <Input
            {...fieldProps}
            {...props}
            type={
              isPasswordField
                ? showPassword
                  ? "text"
                  : "password"
                : props.type
            }
            className={cn(
              className,
              isPasswordField ? (isRTL ? "pl-10" : "pr-10") : ""
            )}
            placeholder={placeholder ? t(placeholder) : ""}
            value={fieldProps?.value ?? props.value ?? localValue}
            onChange={(e) => {
              fieldProps?.onChange?.(e);
              props.onChange?.(e);
              setLocalValue(e.target.value);
            }}
            ref={(el) => {
              fieldProps?.ref?.(el);
              if (typeof ref === "function") {
                ref(el);
              } else if (ref) {
                (
                  ref as React.MutableRefObject<HTMLInputElement | null>
                ).current = el;
              }
            }}
          />
          {isPasswordField && (fieldProps?.value || localValue) && (
            <Button
              type="button"
              onClick={togglePasswordVisibility}
              className={cn("absolute top-0", isRTL ? "left-0" : "right-0")}
              tabIndex={-1}
              variant="ghost"
              size="icon"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </Button>
          )}
        </div>
      ),
      [
        props,
        isPasswordField,
        showPassword,
        className,
        isRTL,
        t,
        placeholder,
        localValue,
        ref,
        togglePasswordVisibility,
      ]
    );

    if (control && name) {
      return (
        <FormField
          control={control}
          name={name}
          render={({ field }) => (
            <FormItem className="w-full">
              {label && (
                <FormLabel>
                  {t(label)}
                  {isRequired && <span className="text-red-500"> *</span>}
                </FormLabel>
              )}
              <FormControl>{renderInput(field)}</FormControl>
              {description && (
                <FormDescription>{t(description)}</FormDescription>
              )}
              <FormMessage />
            </FormItem>
          )}
        />
      );
    }

    return (
      <>
        {label && (
          <Label>
            {t(label)}
            {isRequired && <span className="text-red-500"> *</span>}
          </Label>
        )}
        {renderInput()}
      </>
    );
  })
);

CustomInputInner.displayName = "CustomInput";

const CustomInput = CustomInputInner as CustomInputComponent;

export default CustomInput;
