
const debug = { hello: 'world' };
const blob = new Blob(
  [JSON.stringify(debug, null, 2)],
  {type : 'application/json'}
);


const reader = new FileReader();
reader.addEventListener('loadend', function() {
  // reader.result 包含被转化为类型数组 typed array 的 blob
});
reader.readAsArrayBuffer(blob);


const text = await (new Response(blob)).text();
