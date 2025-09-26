import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Column, TableAction } from "./types";
import Link from "next/link";

interface Props<T> {
  item: T;
  columns: Column<T>[];
  actions: TableAction<T>[];
}

const TableRowItem = <T extends Record<string, unknown>>({
  item,
  columns,
  actions,
}: Props<T>) => {
  return (
    <TableRow>
      {columns.map((col) => (
        <TableCell key={String(col.key)}>
          {col.render ? col.render(item) : String(item[col.key])}
        </TableCell>
      ))}

      {actions.length > 0 && (
        <TableCell className="flex items-center gap-1 justify-end">
          {actions.map((action, idx) => {
            const content = action.icon ?? action.label;

            if (action.href) {
              const href =
                typeof action.href === "function"
                  ? action.href(item)
                  : action.href;

              return (
                <Button
                  key={idx}
                  asChild
                  variant={action.variant ?? "default"}
                  size="icon"
                >
                  <Link href={href} target={action.target ?? "_self"}>
                    {content}
                  </Link>
                </Button>
              );
            }

            return (
              <Button
                key={idx}
                variant={action.variant ?? "default"}
                size="icon"
                onClick={() => action.onClick?.(item)}
                loading={
                  typeof action.loading === "function"
                    ? action.loading(item)
                    : action.loading
                }
              >
                {content}
              </Button>
            );
          })}
        </TableCell>
      )}
    </TableRow>
  );
};

export default TableRowItem;
