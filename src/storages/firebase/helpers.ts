import { storage } from "./index";
import { ref, getDownloadURL } from "firebase/storage";

export const getImageUrl = (path: string): Promise<string> => {
  return new Promise((resolve) => {
    getDownloadURL(ref(storage, path))
      .then((url) => resolve(url))
      .catch((err) => console.error(err));
  });
};
export const getListImageUrl = (pathList: string[]): Promise<string[]> => {
  return new Promise((resolve) => {
    const promises = pathList.map((path) => getDownloadURL(ref(storage, path)));
    Promise.all(promises)
      .then((urls) => resolve(urls))
      .catch((err) => console.error(err));
  });
};
