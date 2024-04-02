export async function GetFetch(url){
    const accessToken = localStorage.getItem("accessToken");
    const response = await fetch(url,{
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });
    return response;
  }