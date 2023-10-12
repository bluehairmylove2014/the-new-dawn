"use client";
import { productImagesType } from "@/modules/services/entities";
import "./styles.scss";
import Image from "next/image";
import { useState } from "react";
import { CommonButton } from "@/components/atoms/CommonButton/CommonButton";

const maxListElement = 4;
const ProductGallery = ({ images }: { images: productImagesType | null }) => {
  const [selectedImage, setSelectedImage] = useState<number>(0);
  console.log("RECEIVE IMAGE: ", images);
  return (
    <div className="product-gallery">
      {Array.isArray(images) ? (
        <>
          <div className="gallery__main">
            <div className="control-button__left">
              <CommonButton
                style="square"
                onClick={() => {
                  if (selectedImage - 1 >= 0) {
                    setSelectedImage(selectedImage - 1);
                  } else {
                    setSelectedImage(images.length - 1);
                  }
                }}
              >
                <i className="fi fi-br-angle-small-left"></i>
              </CommonButton>
            </div>
            <div className="control-button__right">
              <CommonButton
                style="square"
                onClick={() => {
                  if (selectedImage + 1 < images.length) {
                    setSelectedImage(selectedImage + 1);
                  } else {
                    setSelectedImage(0);
                  }
                }}
              >
                <i className="fi fi-br-angle-small-right"></i>
              </CommonButton>
            </div>
            <Image
              src={images[selectedImage].src}
              alt={images[selectedImage].alt}
              fill
            />
          </div>
          <div className="gallery__list">
            {images.map((im, index) => {
              if (index + 1 > maxListElement) {
                return <></>;
              } else {
                return (
                  <button
                    key={im.id}
                    onClick={() => setSelectedImage(index)}
                    className={selectedImage === index ? "active" : ""}
                  >
                    <Image src={im.src} alt={im.alt} fill />
                  </button>
                );
              }
            })}
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ProductGallery;
