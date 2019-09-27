const ajax = (
  method, 
  endpoint, 
  callback= xhr => console.log(xhr.status), 
  errorCallback = (xhr) => console.log(xhr.status)) => {
  const xhr = new XMLHttpRequest()
  xhr.open(method, endpoint)
  xhr.send()
  xhr.onreadystatechange = () => {
    if(xhr.readyState === 4) {
      if(xhr.status === 200) callback(xhr)
      else errorCallback(xhr) 
    }  
  }
}