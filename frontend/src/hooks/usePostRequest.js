const usePostRequest = async (apiRoute, data, header) => {
  try {
    const res = await fetch(apiRoute, {
      method: "POST",
      body: JSON.stringify(data),
      headers: header,
    });
    
      const body = await res.json();
      return body;
    } catch (error) {
    return { error };
  }
};

export default usePostRequest;
