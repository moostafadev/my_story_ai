import React from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { GenericTableProps } from "./types";
import TableRowItem from "./TableRowItem";
import Image from "next/image";

const GenericTable = <T extends { id?: string | number }>({
  data,
  columns,
  actions = [],
  emptyState,
}: GenericTableProps<T>) => {
  if (!data.length) {
    return (
      emptyState ?? (
        <div className="flex flex-col items-center justify-center gap-2 p-6 text-muted-foreground bg-background">
          <Image
            src="/no_data.svg"
            alt="لا توجد بيانات"
            width={120}
            height={120}
          />
          <p className="text-sm sm:text-base">لا توجد بيانات</p>
        </div>
      )
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((col) => (
            <TableHead key={String(col.key)}>{col.label}</TableHead>
          ))}
          {actions.length > 0 && (
            <TableHead className="text-end">تحكم</TableHead>
          )}
        </TableRow>
      </TableHeader>

      <TableBody>
        {data.map((item, idx) => (
          <TableRowItem<T>
            key={item.id ?? idx}
            item={item}
            columns={columns}
            actions={actions}
          />
        ))}
      </TableBody>
    </Table>
  );
};

export default GenericTable;
