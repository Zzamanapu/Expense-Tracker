export type ExpenseType = "income" | "expense";

export interface Expense {
  id: number;
  description: string;
  amount: number;
  category: string;
  date: string;
  type: ExpenseType;
}
