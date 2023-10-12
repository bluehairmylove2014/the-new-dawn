import { z } from "zod";

const getProductResponseSchema = z.object({
  id: z.string(),
  thumbnail: z.string(),
  name: z.string(),
  features: z.array(z.string()),
  price: z.number(),
  discount: z.number(),
  outOfStock: z.boolean(),
  images: z.array(
    z.object({
      id: z.number(),
      src: z.string(),
      alt: z.string(),
    })
  ),
  details: z.array(
    z.object({
      tag: z.string(),
      children: z.any().optional(),
      src: z.string().optional(),
      alt: z.string().optional(),
    })
  ),
  specifications: z.array(
    z.object({
      name: z.string(),
      detail: z.string(),
    })
  ),
});

export { getProductResponseSchema };
