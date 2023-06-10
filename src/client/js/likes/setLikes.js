const onClickAddContentLike = async (data) => {
  const url = `/api/content/playground/${data}/like`;
  const response = await fetch(url, {});
};
