"use client";

export interface Portfolio {
  id: string;
  tags: Tag[];
  name: string;
  description: string;
  cashBalance: number;
  totalBalance: number;
  currency: string;
  interestRate: number;
  payoutFrequency: number;
  firstInterestPayoutDate: string;
  nbOfPositions: number;
  nbOfRules: number;
}

export interface Asset {
  //À compléter
  portfolioId: string;
  name: string;
}

export interface Widget {
  //À faire
}

export interface Tag {
  //À compléter
  id: number;
  color: string;
  name: string;
}

export interface Account {
  //À compléter
  username: string;
  email: string;
}
