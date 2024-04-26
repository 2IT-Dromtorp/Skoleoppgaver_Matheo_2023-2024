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