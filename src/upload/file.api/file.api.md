# File API

## Blob 

Blob 对象表示一个不可变、原始数据的类文件对象。

它的数据可以按文本或二进制的格式进行读取，也可以转换成 ReadableStream 来用于数据操作。 

Blob 表示的不一定是JavaScript原生格式的数据。File 接口基于Blob，继承了 blob 的功能并将其扩展使其支持用户系统上的文件。

要从其他非blob对象和数据构造一个 Blob，请使用 Blob() 构造函数。

要创建一个 blob 数据的子集 blob，请使用 slice() 方法。

要获取用户文件系统上的文件对应的 Blob 对象，请参阅 File 文档。

接受 Blob 对象的API也被列在 File 文档中。

Blob.size
Blob.type

Blob.slice([start[, end[, contentType]]])
返回一个新的 Blob 对象，包含了源 Blob 对象中指定范围内的数据。
Blob.stream()
返回一个能读取blob内容的 ReadableStream。
Blob.text()
返回一个promise且包含blob所有内容的UTF-8格式的 USVString。
Blob.arrayBuffer()
返回一个promise且包含blob所有内容的二进制格式的 ArrayBuffer 

## File 
File是特殊类型的Blob
1. input FileList
2. 拖放操作生成的 DataTransfer
3. HTMLCanvasElement 上执行 mozGetAsFile()

File.lastModified 只读
返回当前 File 对象所引用文件最后修改时间，自 UNIX 时间起始值（1970年1月1日 00:00:00 UTC）以来的毫秒数
File.name 只读
返回当前 File 对象所引用文件的名字。
File.size 只读
返回文件的大小。
File.type 只读
返回文件的 多用途互联网邮件扩展类型（MIME Type）

File.slice 继承自 Blob

## FileList

FileList.item(index);

## FileReader

FileReader继承自EventTarget，可以通过addEventListener方法使用。

对象允许Web应用程序异步读取存储在用户计算机上的文件（或原始数据缓冲区）的内容。

使用 File 或 Blob 对象指定要读取的文件或数据。

FileReader仅用于以安全的方式从用户（远程）系统读取文件内容，它不能用于从文件系统中按路径名简单地读取文件。 

要在JavaScript中按路径名读取文件，应使用标准Ajax解决方案进行服务器端文件读取，如果读取跨域，则使用CORS权限。

此特性在 Web Worker 中可用。
