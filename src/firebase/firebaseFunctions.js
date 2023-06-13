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
} from "firebase/firestore";
import { app } from "./config";

const db = getFirestore(app);

const playgroundRef = collection(db, "playground"); // 자유게시판
const infoShareRef = collection(db, "infoShare"); // 정보게시판
const secretgroundRef = collection(db, "secretground"); // 비밀게시판
const marketgroundRef = collection(db, "marketground"); // 장터게시판

// create
const createData = async (refAddressString, createDataList, ownerObject) => {
  const splitRef = refAddressString.split("/");
  const refNameString = splitRef[splitRef.length - 1];
  const newDataOwnName = `${refNameString}_${new Date().getTime()}`;
  // 데이터 형성은 스위치문으로 게시글, 댓글, 답글 분리해서 생성.
  let newDataFormat;
  switch (refNameString) {
    case 1:
      var [title, main, imgUrlList] = createDataList;
      newDataFormat = {
        commentsCount: 0,
        createAt: Timestamp.fromDate(new Date()),
        likedUserList: [],
        title,
        main,
        contentId: newDataOwnName,
        onwer: ownerObject,
        imgUrlList,
        contentReference: refAddressString,
      };
      break;
    case 2:
      var [main] = createDataList;
      newDataFormat = {
        onwer: ownerObject,
        replyCount: 0,
        createAt: Timestamp.fromDate(new Date()),
        main,
        commentId: newDataOwnName,
        commentReference: refAddressString,
      };
      break;
    case 3:
      var [main] = createDataList;
      newDataFormat = {
        onwer: ownerObject,
        createAt: Timestamp.fromDate(new Date()),
        main,
        replytId: newDataOwnName,
        replyReference: refAddressString,
      };
      break;
  }

  return newDataFormat;
};

// read
const getData = async (dataOwnId, refNameString) => {
  const documentSnapshot = await getDoc(doc(db, refNameString, dataOwnId));
  const data = documentSnapshot.data();

  return data;
};

const getDatesFirst = async (refNameString, orderByString, limit) => {
  const ref = db.collection(refNameString);
  let q;
  if (limit) {
    q = query(ref, orderBy(orderByString), limit(limit));
  } else {
    q = query(ref, orderBy(orderByString));
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

const getDatesTheOthers = async (
  refNameString,
  orderByString,
  lastSnapShot,
  limit
) => {
  const ref = db.collection(refNameString);
  let q;
  if (limit) {
    q = query(
      ref,
      orderBy(orderByString),
      startAfter(lastSnapShot),
      limit(limit)
    );
  } else {
    q = query(ref, orderBy(orderByString), startAfter(lastSnapShot));
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

// delete
