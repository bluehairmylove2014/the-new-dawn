export interface IProduct {
  id: string;
  image: string;
  name: string;
  features: string[];
  price: number;
  discount: number;
  outOfStock: boolean;
}

export interface IProductDetail extends IProduct {
  rating: number;
  reviews: number;
  images: {
    id: number;
    src: string;
    alt: string;
  }[];
}
