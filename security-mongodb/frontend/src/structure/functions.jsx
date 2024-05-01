export async function GetFetch(url, navigate){
    const accessToken = localStorage.getItem("accessToken");
    const response = await fetch(url,{
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    if(response.status===401&&navigate) return navigate("/log-in");
    if(response.status===403&&navigate) return navigate("/");
    return response;
}

export async function PostFetch(url, body, navigate){

  const accessToken = localStorage.getItem("accessToken");
  const response = await fetch(url, {
      method: "POST",
      headers:{
          "Content-Type":"application/json",
          'Authorization': `Bearer ${accessToken}`	
      },
      body:JSON.parse(body)
  });

  if(response.status===401&&navigate) return navigate("/log-in");
  if(response.status===403&&navigate) return navigate("/");
  return response;
}

export async function PutFetch(url, body, navigate){
  const accessToken = localStorage.getItem("accessToken");
  const response = await fetch(url,{
    method:"PUT",
    headers: {
      'Authorization': `Bearer ${accessToken}`
    },
    body:JSON.stringify(JSON.parse(JSON.parse(body)))
  });

  if(response.status===401&&navigate) return navigate("/log-in");
  if(response.status===403&&navigate) return navigate("/");
  return response;
}