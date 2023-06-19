import { getAuth } from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  getDocs,
  Timestamp,
  collection,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { app } from "./config.js";

const db = getFirestore(app);
// const playgroundRef = collection(db, "playground"); // 자유게시판
// const infoShareRef = collection(db, "infoShare"); // 정보게시판
// const secretgroundRef = collection(db, "secretground"); // 비밀게시판
// const marketgroundRef = collection(db, "marketground"); // 장터게시판

// ref setting Function
const makeFirebase_Ref_Doc = (refAddressString) => {
  const splitRef = refAddressString.split("/");
  const tempList = [...splitRef].filter((txt) => txt !== "");

  const refNameString = tempList[tempList.length - 1];
  const collectionList = [];

  for (let i = 0; i < tempList.length; i += 2) {
    if (i === 0) {
      const myCollection = collection(db, tempList[i]);
      collectionList.push(myCollection);
    } else {
      const temperDoc = doc(
        collectionList[collectionList.length - 1],
        tempList[i - 1]
      );
      const myCollection = collection(temperDoc, tempList[i]);
      collectionList.push(myCollection);
    }
  }
  const refCollection = collectionList.pop();
  return [refNameString, refCollection];
};

// create
export const createData = async (
  refAddressString,
  createDataList,
  ownerObject
) => {
  const splitRef = refAddressString.split("/");
  // ref 주소와 collection
  const [refNameString, refCollection] = makeFirebase_Ref_Doc(refAddressString);

  // 데이터 형성은 스위치문으로 게시글, 댓글, 답글 분리해서 생성.
  let newDataFormat;

  switch (splitRef.length) {
    case 3:
      var [title, main, imgUrlList] = createDataList;
      newDataFormat = {
        commentsCount: 0,
        createdAt: Timestamp.fromDate(new Date()),
        likedUserList: [],
        title,
        main,
        contentId: refNameString,
        owner: ownerObject,
        imgUrlList,
        docString: refAddressString,
      };
      break;
    case 5:
      var [main] = createDataList;
      newDataFormat = {
        owner: ownerObject,
        replyCount: 0,
        createdAt: Timestamp.fromDate(new Date()),
        main,
        commentId: refNameString,
        docString: refAddressString,
      };
      break;
    case 7:
      var [main] = createDataList;
      newDataFormat = {
        owner: ownerObject,
        createdAt: Timestamp.fromDate(new Date()),
        main,
        replytId: refNameString,
        docString: refAddressString,
      };
      break;
  }
  await setDoc(doc(refCollection, refNameString), newDataFormat);

  if (splitRef.length >= 5) {
    const temperList = [...splitRef];
    temperList.splice(temperList.length - 2);
    const beforeRefString = `/${temperList
      .filter((txt) => txt !== "")
      .join("/")}`;
    const [dataNameString, refCollection] =
      makeFirebase_Ref_Doc(beforeRefString);
    const newRefAddressDoc = doc(refCollection, dataNameString);
    switch (splitRef.length) {
      case 5:
        const newRefAddressDoc = doc(refCollection, dataNameString);
        var documentSnapshot = await getDoc(newRefAddressDoc);
        var data = documentSnapshot.data();
        data.commentsCount += 1;
        await updateDoc(newRefAddressDoc, data);
        break;
      case 7:
        var documentSnapshot = await getDoc(newRefAddressDoc);
        var data = documentSnapshot.data();
        data.replyCount += 1;
        await updateDoc(newRefAddressDoc, data);
        break;
    }
  }

  return newDataFormat;
};

// read
export const getData = async (dataOwnId, refAddressString) => {
  const [refNameString, refCollection] = makeFirebase_Ref_Doc(refAddressString);
  const documentSnapshot = await getDoc(doc(refCollection, refNameString));
  const data = documentSnapshot.data();

  return data;
};

export const getDatasFirst = async (
  refAddressString,
  orderByString,
  limitNum
) => {
  const [refNameString, refCollection] = makeFirebase_Ref_Doc(refAddressString);
  let q;
  if (limitNum) {
    q = query(refCollection, orderBy(orderByString), limit(limitNum));
  } else {
    q = query(refCollection, orderBy(orderByString));
  }
  const documentSnapshots = await getDocs(q);

  const dataList = [];
  documentSnapshots.forEach((doc) => {
    const data = doc.data();
    dataList.push(data);
  });

  const lastSnapShot =
    documentSnapshots.docs[documentSnapshots.docs.length - 1];

  return {
    dataList,
    lastSnapShot,
  };
};

export const getDatasTheOthers = async (
  refAddressString,
  orderByString,
  lastSnapShot,
  limit
) => {
  const [refNameString, refCollection] = makeFirebase_Ref_Doc(refAddressString);
  let q;
  if (limit) {
    q = query(
      refCollection,
      orderBy(orderByString),
      startAfter(lastSnapShot),
      limit(limit)
    );
  } else {
    q = query(refCollection, orderBy(orderByString), startAfter(lastSnapShot));
  }
  const documentSnapshots = await getDocs(q);

  const dataList = [];
  documentSnapshots.forEach((doc) => {
    const data = doc.data();
    dataList.push(data);
  });

  const newLastSnapShot =
    documentSnapshots.docs[documentSnapshots.docs.length - 1];

  return {
    dataList,
    newLastSnapShot,
  };
};

// update
export const updataData = async (refAddressString, updateDataObject) => {
  const [refNameString, refCollection] = makeFirebase_Ref_Doc(refAddressString);
  await updateDoc(doc(refCollection, refNameString), updateDataObject);
};

// delete
export const deleteData = async (refAddressString) => {
  const [refNameString, refCollection] = makeFirebase_Ref_Doc(refAddressString);
  await deleteDoc(doc(refNameString, refCollection));
};
