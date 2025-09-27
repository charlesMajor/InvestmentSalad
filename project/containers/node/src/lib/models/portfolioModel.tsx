export type Portfolio = {
  id: string;
  tags: string[];
  name: string;
  description: string;
  cashBalance: number;
  currency: string;
  cashInterestRate: number;
  interestPaymentFrequencyPerYear: number;
  initialInterestPaymentDate: string | null;
};
