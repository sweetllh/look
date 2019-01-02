//将图片转换为Base64
export function  getImgToBase64(url,callback){ 
		var canvas = document.createElement('canvas'),
		ctx = canvas.getContext('2d'),
		img = new Image;
		img.crossOrigin = 'Anonymous';
		img.onload = function(){
		    canvas.height = img.height;
		    canvas.width = img.width;
		    ctx.drawImage(img,0,0);
		    var dataURL = canvas.toDataURL('image/png');
		    callback(dataURL);
		    canvas = null;
		};
		img.src = url;
};
	
	//将base64转换为文件
export function  dataURLtoFile(dataurl, filename) { 
        var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, {type:mime});
   };