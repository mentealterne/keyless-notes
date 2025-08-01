export type Note = {
  id: string | undefined;
  heading: string;
  text: string;
  lastUpdated: Date;
  createdAt?: Date;
};
