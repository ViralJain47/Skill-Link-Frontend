const usePostData = async (apiRoute, setData, postData) => {
  const res = await fetch(apiRoute, {method: "POST", body: JSON.stringify(postData), headers: {
    'Content-Type': 'application/json'
  },});
  const body = await res.json();
  setData(body.message);
  return res.status;
}

export default usePostData;