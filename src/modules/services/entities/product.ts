export interface IProduct {
  id: string;
  thumbnail: string;
  name: string;
  features: string[];
  price: number;
  discount: number;
  outOfStock: boolean;
}

export type productImagesType = {
  id: number;
  src: string;
  alt: string;
}[];
export type detailsType = (
  | {
      tag: "h3" | "h6" | "p";
      children: any;
    }
  | {
      tag: "img";
      src: string;
      alt: string;
    }
)[];
export type specificationsType = {
  name: string;
  detail: string;
}[];
export interface IProductDetail extends IProduct {
  images: productImagesType;
  details: detailsType;
  specifications: specificationsType;
}
