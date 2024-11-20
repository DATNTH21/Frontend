export type BaseEntity = {
  id: string;
  createdAt: number;
};

export type Entity<T> = {
  [K in keyof T]: T[K];
} & BaseEntity;

export type User = Entity<{
  _id: string;
  name: string;
  email: string;
  photo: string;
  isVerified: boolean;
}>;
