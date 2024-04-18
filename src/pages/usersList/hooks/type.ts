export interface Data {
  id: string;
  first: string;
  username: string;
  name: string;
  thumbnail: string;
}

export type Order = "asc" | "desc";

export interface HeadCell {
  id: keyof Data;
  label: string;
}
