const useGetRequest = async (apiRoute, header) => {
  try {
    const res = await fetch(apiRoute, { headers: header });
    if (res.ok) {
      const body = await res.json();
      if (body) return body;
      else throw error;
    } else throw error;
  } catch (error) {
    return { error };
  }
};

export default useGetRequest;
