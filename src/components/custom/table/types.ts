import { ReactNode } from "react";

export interface Column<T> {
  key: keyof T;
  label: string;
  render?: (item: T) => ReactNode;
}

export interface TableAction<T> {
  label: string;
  icon?: ReactNode;
  variant?: "default" | "secondary" | "destructive" | "outline";
  onClick?: (item: T) => void;
  href?: string;
  loading?: boolean;
}

export interface GenericTableProps<T> {
  data: T[];
  columns: Column<T>[];
  actions?: TableAction<T>[];
  emptyState?: ReactNode;
  children?: ReactNode;
}
