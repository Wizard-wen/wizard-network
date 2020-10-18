

export class FileReaderUtil {

}

const reader = new FileReader()
reader.readAsDataURL(input.files[0]) // input.files[0]为第一个文件
reader.onload = ()=>{
  const img = new Image()
  //
  img.src = reader.result
  console.log(reader.readyState)
  console.log(reader.error)
  //
  reader.abort();
  reader.readAsArrayBuffer();
  reader.readAsDataURL();
  reader.readAsText();

  document.body.appendChild(img)  // reader.result为获取结果
}

reader.onabort = () => {

}
