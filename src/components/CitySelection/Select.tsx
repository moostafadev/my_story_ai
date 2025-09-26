"use client";

import React from "react";
import { CustomSelect } from "../custom/select";
import { useLocale } from "next-intl";

export interface ICity {
  nameAr: string;
  nameEn: string;
  price: number;
  currency: string;
}

interface IProps {
  data: ICity[];
  value: string;
  onChange: (value: string) => void;
}

const SelectCities = ({ data, onChange, value }: IProps) => {
  const locale = useLocale();
  return (
    <CustomSelect
      options={data.map((item) => ({
        label: locale === "ar" ? item.nameAr : item.nameEn,
        value: locale === "ar" ? item.nameAr : item.nameEn,
      }))}
      onChange={onChange}
      value={value}
      dir={locale === "ar" ? "rtl" : "ltr"}
      placeholder={locale === "ar" ? "اختر المحافظة" : "Select City"}
    />
  );
};

export default SelectCities;
