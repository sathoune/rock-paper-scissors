const ajax = ({
  method, 
  url, 
  callback= xhr => console.log(xhr.status), 
  payload,
  contentType,
  errorCallback = xhr => console.log(xhr.status)
}) => {
  const xhr = new XMLHttpRequest()
  xhr.open(method, url)
  if(payload && contentType){
    xhr.setRequestHeader('Content-Type', contentType)
    xhr.setRequestHeader('data', payload)
  }
  xhr.send()
  xhr.onreadystatechange = () => {
    if(xhr.readyState === 4) {
      if(xhr.status === 200) callback(xhr)
      else errorCallback(xhr) 
    }  
  }
}

const contentTypes = [
  'image/x-icon',
  'text/html',
  'text/javascript',
  'application/json',
  'text/css',
  'image/png',
  'image/jpeg',
  'audio/wav',
  'audio/mpeg',
  'image/svg+xml',
  'application/pdf',
  'application/msword',
  'appliaction/vnd.ms-fontobject',
  'aplication/font-sfnt'
 ]