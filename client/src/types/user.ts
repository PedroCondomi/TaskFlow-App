export type User = {
  _id: string;
  name: string;
  email: string;
  role: "user" | "admin";
};
