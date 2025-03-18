export type SignUpInput = {
  name: string;
  email: string;
  password: string;
};

export type LoginInput = {
  name: string;
  email: string;
  password: string;
};

export type FetchUserDetailsOutput = {
  user: User | null;
};

export type User = {
  id: string;
  email: string;
  name: string;
  thirdPartyLogin: boolean;
  createdAt: string;
  updatedAt: string | undefined;
};
