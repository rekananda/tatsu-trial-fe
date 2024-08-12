export const SortOptions = ['listPrice', 'updatedAt'] as const;
export const SortDirection = ['asc', 'desc'] as const;

export interface AuthenticatedDataT {
  access_token: string;
  user: UserDataT;
}

export interface UserDataT {
  id: string;
  email: string;
  name: string;
  solanaWalletAddress: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface MagicEdenPaginationT {
  offset?: number;
  limit?: number;
  sort?: typeof SortOptions[number];
  sort_direction?: typeof SortDirection[number];
}
