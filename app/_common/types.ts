export type User = {
  name: {
    first: string;
    last: string;
  };
  email: string;
  picture: { large: string };
};

export type Error = {
  message: string;
};
