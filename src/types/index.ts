import { BaseHTMLAttributes, ReactNode } from 'react';

export type PropPagesT<PT = any, ST = any> = {
  params: PT;
  searchParams: ST;
};

export type PropBaseT<T = any> = {
  className?: string;
  children?: ReactNode;
  ref?: any;
} & Partial<BaseHTMLAttributes<T>>;

export type OptionDataT = {
  value: string;
  label: string;
  description?: ReactNode;
  tooltip?: string;
  disabled?: boolean;
}
