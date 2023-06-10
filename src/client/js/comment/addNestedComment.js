const makeNestedCommentElement = (
  commentId,
  nestedId,
  username,
  imgUrl,
  text,
  appendTag
) => {
  const outerDiv = document.createElement("div");
  const userDiv = document.createElement("div");
  const contentDiv = document.createElement("div");
  const deleteDiv = document.createElement("div");

  const imgSpan = document.createElement("span");
  const userSpan = document.createElement("span");
  const textSpan = document.createElement("span");

  const deleteBtn = document.createElement("button");

  outerDiv.setAttribute("id", `${nestedId}_nested_comment`);

  imgSpan.innerText = imgUrl;
  userSpan.innerText = username;
  textSpan.innerText = text;

  deleteBtn.setAttribute(
    "onclick",
    `onClickDeleteNestedComment('${commentId}&${nestedId}')`
  );
  deleteBtn.innerText = "삭제";

  userDiv.append(imgSpan);
  userDiv.append(userSpan);
  contentDiv.append(textSpan);
  deleteDiv.append(deleteBtn);

  outerDiv.append(userDiv);
  outerDiv.append(contentDiv);
  outerDiv.append(deleteDiv);

  appendTag.append(outerDiv);
};

const onClickShowNestedComment = (data) => {
  const outerDiv = document.getElementById(`${data}_nested_div`);
  if (outerDiv.style.visibility === "visible") {
    return;
  }
  outerDiv.style.visibility = "visible";
};

const onClickNestedComment = async (data) => {
  const [contentId, commentId] = data.split("&");
  const outerDiv = document.getElementById(`${commentId}_nested_div`);
  const inputText = document.getElementById(`${commentId}_nested_input`);
  const nestedSection = document.getElementById(`${commentId}_nested_section`);

  if (inputText.value === "") {
    return;
  }
  try {
    const url = `/api/nestedComment/add/${data}`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: inputText.value,
        contentId,
        commentId,
      }),
    });
    outerDiv.style.visibility = "hidden";

    const { id, username, imgUrl, nestedCommentText, message } =
      await response.json();
    if (message === "bad") {
      return;
    }

    makeNestedCommentElement(
      commentId,
      id,
      username,
      imgUrl,
      nestedCommentText,
      nestedSection
    );
  } catch (error) {
    console.log(error);
  }
};

const onClickNestedHideComment = (data) => {
  const outerDiv = document.getElementById(`${data}_nested_div`);
  document.getElementById(`${data}_nested_input`).value = "";
  outerDiv.style.visibility = "hidden";
};

const onClickDeleteNestedComment = async (data) => {
  const [commentId, nestedCommentId] = data.split("&");
  const outerDiv = document.getElementById(`${nestedCommentId}_nested_comment`);
  const url = `/api/nestedComment/delete/${nestedCommentId}`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      commentId,
    }),
  });
  const { message } = await response.json();
  console.log(message);
  if (message === "ok") {
    outerDiv.remove();
  }
};
