import React from 'react';

export type ExpenseType = "income" | "expense";

export interface Expense {
  id: number;
  description: string;
  amount: number;
  category: string;
  date: string;
  type: ExpenseType;
}

export type ToastVariant = "success" | "error" | "info";

export interface ToastType {
  id: number;
  message: string;
  type: ToastVariant;
}

export type FilterType = "all" | "expense" | "income";

// Component Prop Interfaces
export interface SummaryCardProps {
  totalIncome: number;
  totalExpense: number;
  balance: number;
}

export interface ToastProps {
  Toast: ToastType[];
  RemoveToast: (id: number) => void;
}

export interface FilterProps {
  filter: FilterType;
  setFilter: React.Dispatch<React.SetStateAction<FilterType>>;
}

export interface ExpensesListProps {
  filterExpenses: Expense[];
  handleEdit: (expense: Expense) => void;
  handleDelete: (id: number) => void;
}

export interface AddExpensesFormProps {
  formData: {
    description: string;
    amount: string;
    category: string;
    date: string;
    type: ExpenseType;
  };
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  editingId: number | null;
  setEditingId: React.Dispatch<React.SetStateAction<number | null>>;
  expenses: Expense[];
  setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>;
  showToast: (message: string, type: ToastVariant) => void;
}

export interface FormErrors {
  description?: string;
  amount?: string;
  category?: string;
  date?: string;
}