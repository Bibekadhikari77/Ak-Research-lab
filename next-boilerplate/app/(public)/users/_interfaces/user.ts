export type User = {
  id: number;
  name: string;
  email: string;
};

export type CreateUserInput = {
  name: string;
  email: string;
};

export type UpdateUserInput = {
  name: string;
  email: string;
};
