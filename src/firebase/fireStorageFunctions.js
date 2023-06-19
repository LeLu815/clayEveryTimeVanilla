import { ref, uploadBytes } from "firebase/storage";
import { storage } from "./config.js";

// create
export const uploadImg = async (refString, files) => {
  const splitRef = refString.split("/");
  const refNameString = splitRef[splitRef.length - 1].split("_")[0];
  const imgNameList = [];
  for (let file of files) {
    const metadata = {
      contentType: file.mimetype,
    };
    const newRefString = `${refString}/${refNameString}Img_${new Date().getTime()}`;
    const spaceRef = ref(storage, newRefString);
    imgNameList.push(spaceRef);
    console.log(spaceRef.url);
    console.log(spaceRef.path);
    await uploadBytes(spaceRef, file.buffer, metadata);
  }
  return imgNameList;
};

// read

// update

// delete
