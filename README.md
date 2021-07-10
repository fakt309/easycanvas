# easycanvas

## Quick start

Quick start and documentation: [gaidadei.ru/easycanvas](https://gaidadei.ru/easycanvas)  
Download: [gaidadei.ru/easycanvas/download](https://gaidadei.ru/easycanvas/download)

Download the file easyc.js and use this code:

    <canvas id="canvas"></canvas>
    
    <script src="easyc.js"></script>
    
    <script>
      var canvas = document.getElementById("canvas");

      var sheet = new EasyC(canvas, [{
        type: "image",
        x: 100,
        y: 100,
        src: "2.png"
      }]);
      sheet.draw();
    </script>

## Very easy way to draw

Just add a simple object and the library will draw it (for example: "circle", "triangle", "rectangle", "shape", "text", "image").  

    { type: "image", x: 200, y: 200, src: "2.png"}
    { type: "text", value: "Hello, world!", x: 200, y: 200, size: 26,font: "url(ShareTechMono.ttf)",fill: "#ff0000" }

![load image and fonts canvas html](https://i.ibb.co/XsxPkYT/1.png)

## You can load images and fonts very easily, just provide the url.

    src: "2.png"  
    font: "url(ShareTechMono.ttf)"

![load image and fonts canvas html](https://i.ibb.co/XsxPkYT/1.png)


## You can set relative and absolute coordinate object.

    relative: false
  
![load image and fonts canvas html](https://i.ibb.co/9hMzRwB/1.png)

    relative: true 
  
![load image and fonts canvas html](https://i.ibb.co/4pGrq0x/2.png)
