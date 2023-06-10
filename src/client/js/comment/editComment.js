const onClickShowEditComment = (data) => {
  const outerDiv = document.getElementById(`${data}_edit_div`);
  if (outerDiv.style.visibility === "visible") {
    return;
  }
  outerDiv.style.visibility = "visible";
};

const onClickEditHideComment = (data) => {
  const outerDiv = document.getElementById(`${data}_edit_div`);
  document.getElementById(`${data}_text`).vale = "";
  outerDiv.style.visibility = "hidden";
};

const onClickEditComment = async (data) => {
  const outerDiv = document.getElementById(`${data}_edit_div`);
  const inputText = document.getElementById(`${data}_edit_input`);
  const mainText = document.getElementById(`${data}_text`);

  try {
    const url = `/api/comment/${data}/edit`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: inputText.value,
      }),
    });
    mainText.innerText = inputText.value;
    outerDiv.style.visibility = "hidden";
  } catch (error) {
    console.log(error);
  }
};

const onClickDeleteComment = async (data) => {
  const [contentId, commentId] = data.split("&");
  try {
    const url = `/api/comment/delete/playground`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        isDel: commentId,
        contentIds: [contentId],
      }),
    });
    const { message } = await response.json();

    if (message === "ok") {
      const deleteDiv = document.getElementById(`${commentId}_comment_div`);
      deleteDiv.style.display = "none";
    }
  } catch (error) {
    console.log(error);
  }
};
