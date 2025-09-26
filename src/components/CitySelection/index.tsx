"use client";

import React, { useEffect, useState } from "react";
import SelectCities, { ICity } from "./Select";
import { fetchCities } from "./city.action";

const CitySelection = ({
  onChange,
  value,
}: {
  onChange: (value: string) => void;
  value: string;
}) => {
  const [cities, setCities] = useState<ICity[]>([]);

  useEffect(() => {
    const loadCities = async () => {
      try {
        const citiesData = await fetchCities();
        setCities(citiesData);
      } catch (error) {
        console.error("Failed to load cities", error);
      }
    };

    loadCities();
  }, []);

  return <SelectCities data={cities} onChange={onChange} value={value} />;
};

export default CitySelection;
