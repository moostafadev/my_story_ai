"use client";

import React from "react";
import { GenericTableProps } from "./types";
import GenericTable from "./CustomTable";

const CustomTable = <T extends { id?: string | number }>({
  data,
  columns,
  actions = [],
  emptyState,
  children,
}: GenericTableProps<T>) => {
  return (
    <div className="flex flex-col bg-primary/80 shadow-sm hover:shadow-md rounded-md overflow-hidden duration-300">
      {children}

      <GenericTable<T>
        data={data}
        columns={columns}
        actions={actions}
        emptyState={emptyState}
      />
    </div>
  );
};

export default CustomTable;
