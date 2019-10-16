
function  upload(file) {
      

        this._file = file;
        this._fileSize = file.size > 1024
            ? file.size / 1024  > 1024
            ? file.size / (1024 * 1024) > 1024
            ? (file.size / (1024 * 1024 * 1024)).toFixed(2) + 'GB'
            : (file.size / (1024 * 1024)).toFixed(2) + 'MB'
            : (file.size / 1024).toFixed(2) + 'KB'
            : (file.size).toFixed(2) + 'B';
        this._type = file.name.match(/\.\w+$/) ;

        this._eachSize = 1024*1000;
        this._totalSize = file.size;

        this._chunks = Math.ceil(this._totalSize / this._eachSize);
        this._chunk = 0 ;
        this._allchunk = 0;
        this._randName = Math.random().toString(36).substr(2)+(new Date()).getTime()+navigator.appName+Math.random().toString(36).substr(2);

        this._randName = this._randName.replace(/\s+/g,"");    

      this.uploadfile = function(times){
          var file = this._file;
          var isLastChunk = (this._chunk == (this._chunks - 1) ? 1 : 0);
          if (times === 1 && isLastChunk === 1) {
              this._chunk = 0;
              isLastChunk = 0;
          }
          var blobFrom = this._chunk * this._eachSize;// 分段开始
          var blobTo = (this._chunk + 1) * this._eachSize > this._file.size ? this._file.size : (this._chunk + 1) * this._eachSize;
          var percent = (100 * blobTo / this._file.size).toFixed(1); // 已上传的百分比
          var timeout = 5000 ; 
          let fd = new FormData();
          fd.append('theFile',  file.slice(blobFrom, blobTo)); // 分好段的文件
          fd.append('fileName', this._randName+file.name); // 文件名
          fd.append('totalSize', file.size); // 文件总大小
          fd.append('isLastChunk', isLastChunk); // 是否为末段
          fd.append('isFirstUpload', times === 1 ? 1 : 0); // 是否是第一段（第一次上传）

          axios(this._api, {
            method: "post",
            credentials: 'include',
            data:fd,
          })
           
          .then(result => {
          	
          	var rs = result.data;
          	 
          	
            // 上传成功
            if (rs.status === 200) {
                if(typeof this._chunkCallBack === "function")
                {
                  this._chunkCallBack(rs);
                }
                // 已经上传完毕
                if (this._chunk === (this._chunks - 1)) {
                 
                    if(typeof this._finishCallBack === "function")
                    {
                      this._finishCallBack(rs);
                    }
                } else {
                    ++this._chunk
                    this.uploadfile(false);
                     
                }
            }
            else if (rs.status != 200) {
            	
            	if(this._ErrorCallBack)  this._ErrorCallBack(rs);
            	
            	console.log(rs);
                
            }
          });
          
          
          return this;

      }

      this.setChunkCallBack= function($func){
        this._chunkCallBack = $func;
        return this;
      }

      this.setFinishCallBack=function($func){
        this._finishCallBack = $func;
        return this;
      }

      this.setErrorCallBack=function($func){
        this._ErrorCallBack = $func;
        return this;
      }

      this.setApi=function($api){
        this._api = $api;
        return this;
      }

      this.startUpload=function(){
         return this.uploadfile(1);
      }

}
   
 


