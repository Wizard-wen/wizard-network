

 export class Upload {

   // 生成文件 hash（web-worker）
   calculateHash(fileChunkList) {
     return new Promise(resolve => {
       // 添加 worker 属性
       this.container.worker = new Worker("/hash.js");
       this.container.worker.postMessage({ fileChunkList });
       this.container.worker.onmessage = e => {
         const { percentage, hash } = e.data;
         this.hashPercentage = percentage;
         if (hash) {
           resolve(hash);
         }
       };
     });
   }

   async handleUpload() {
     if (!this.container.file) return;
     const fileChunkList = this.createFileChunk(this.container.file);
          this.container.hash = await this.calculateHash(fileChunkList);
     this.data = fileChunkList.map(({ file }, index) => ({
       fileHash: this.container.hash,
       chunk: file,
       hash: this.container.file.name + "-" + index, // 文件名 + 数组下标
       percentage:0
   }));
     await this.uploadChunks();
   }
 }


