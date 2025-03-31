const useFetchData = async(apiRoute, token) =>{
  try {
    
    const res = await fetch(apiRoute, {headers: {Authorization: `Bearer ${token}`}})
    const body = await res.json();
    if(res.ok) {
      return body;
    }else {
      return false;
    }
  } catch (error) {
    return error;
  }
}

export default useFetchData;