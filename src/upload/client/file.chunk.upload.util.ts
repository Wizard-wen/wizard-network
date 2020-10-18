/**
 *
 */

import axios from 'axios';

export class FileChunkUploadUtil {
  private size = 10 * 1024 * 1024;
  static data = [];
  private readonly file: File;

  constructor(file: File, size: number) {
    this.file = file;
    this.size = size;
  }

  // 生成文件切片
  createFileChunk(file: File, size = this.size) {
    const fileChunkList = [];
    let current = 0;
    while (current < file.size) {
      fileChunkList.push({
        file: file.slice(current, current + size)
      });
      current += size;
    }
    return fileChunkList;
  }

  // 上传切片
  async uploadChunks() {
    const requestList = FileChunkUploadUtil.data
      .map(({chunk, hash}) => {
        const formData = new FormData();
        formData.append('chunk', chunk);
        formData.append('hash', hash);
        formData.append('filename', this.file.name);
        return {formData};
      })
      .map(async ({formData}) =>
        axios({
          url: 'http://localhost:3000',
          data: formData
        })
      );
    // 并发切片
    await Promise.all(requestList);
    // 前端主动通知服务端合并切片
    await this.mergeRequest();
  }

  async handleUpload() {
    if (!this.file) return;
    const fileChunkList = this.createFileChunk(this.file);
    FileChunkUploadUtil.data = fileChunkList.map(({ file }, index) => ({
      chunk: file,
      // 文件名 + 数组下标
      hash: this.file.name + '-' + index
    }));
    await this.uploadChunks();
  }

  async mergeRequest() {
    await axios({
      url: 'http://localhost:3000/merge',
      headers: {
        'content-type': 'application/json'
      },
      data: JSON.stringify({
        filename: this.file.name
      })
    });
  }

  updateSize(oFiles: FileList) {
    let nBytes = 0,
      nFiles = oFiles.length;
    for (let nFileId = 0; nFileId < nFiles; nFileId++) {
      nBytes += oFiles[nFileId].size;
    }
    let sOutput = nBytes + " bytes";
    // optional code for multiples approximation
    const aMultiples = ["KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"];
    for (let nMultiple = 0, nApprox = nBytes / 1024; nApprox > 1; nApprox /= 1024, nMultiple++) {
      sOutput = nApprox.toFixed(3) + " " + aMultiples[nMultiple] + " (" + nBytes + " bytes)";
    }
    return {
      nFiles,
      sOutput
    }
  }
}
