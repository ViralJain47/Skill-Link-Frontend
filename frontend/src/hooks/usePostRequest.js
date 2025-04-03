const usePostRequest = async (apiRoute, data, header) => {
  try {
    const res = await fetch(apiRoute, {
      method: "POST",
      body: JSON.stringify(data),
      headers: header,
    });
    if (res.ok) {
      const body = await res.json();
      if (body) {
        return body;
      } else throw error;
    } else throw error;
  } catch (error) {
    return { error };
  }
};

export default usePostRequest;
