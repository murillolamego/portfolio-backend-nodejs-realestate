interface ICreatePropertyDTO {
  name: string;
  description: string;
  rent?: number;
  sale?: number;
  available?: boolean;
  categories?: number[];
  features?: number[];
}
export { ICreatePropertyDTO };
