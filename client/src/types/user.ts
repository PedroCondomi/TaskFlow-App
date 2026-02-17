export type User = {
  _id: string;
  name: string;
  email: string;
  role: "user" | "admin";
};

export type UserPreview = {
  _id: string;
  name: string;
  email: string;
};
