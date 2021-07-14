# easycanvas

## Quick start

**Documentation: [gaidadei.ru/easycanvas](https://gaidadei.ru/easycanvas)**  
**Download: [gaidadei.ru/easycanvas/easyc.zip](https://gaidadei.ru/easycanvas/easyc.zip)** 

Buy premium: [gaidadei.ru/easycanvas/premium](https://gaidadei.ru/easycanvas/easyc.zip) *(Absolutely no different from the free version, but you have the right to change the file name to "easyc.premium.js")*

Download the file easyc.js and use this code:

    <canvas id="canvas"></canvas>
    
    <script src="easyc.js"></script>
    
    <script>
      var canvas = document.getElementById("canvas");

      var sheet = new EasyC(canvas, [{
        type: "circle",
        radius: 50,
        x: 100,
        y: 100,
        fill: "#000"
      }]);
      sheet.draw();
    </script>

## Very easy way to draw

Just add a simple object and the library will draw it (for example: "circle", "triangle", "rectangle", "shape", "text", "image").  

    new EasyC(canvas, [
    {
      type: "circle",
      x: 100,
      y: 100,
      radius: 50,
      fill: "#999"
    }, {
      type: "triangle",
      x: 100,
      y: 100,
      angleLeft: 1.5*Math.PI/4,
      angleRight: 1*Math.PI/4,
      base: 150,
      fill: "#999"
    }, {
      type: "rectangle",
      x: 100,
      y: 100,
      width: 100,
      height: 100,
      fill: "#999"
    }, {
      type: "shape",
      x: 100,
      y: 100,
      width: 100,
      height: 100,
      corners: [
        [-1, -1],
        [0, -0.5],
        [0.2, -0.7],
        [0.4, -0.1],
        [-0.2, 1],
        [-0.8, 0.4]
      ],
      fill: "#999"
    }, {
      type: "text",
      x: 100,
      y: 100,
      value: "Hello, world\nSecond stroke\nThird stroke",
      font: "Arial",
      size: 36,
      align: "left",
      fill: "#999"
    }, {
      type: "image",
      x: 280,
      y: 260,
      width: 150,
      src: "2.png",
      scale: [1, 1]
    }]).draw();

![draw canvas html](https://user-images.githubusercontent.com/43887554/125615412-21fdc42f-17ed-40fb-a940-dd1d80d66762.png)
![draw canvas html](https://user-images.githubusercontent.com/43887554/125615465-a95febf2-c976-4d8c-b38f-3396014d40a0.png)
![draw canvas html](https://user-images.githubusercontent.com/43887554/125615503-a1f0bf9c-b14e-49b2-bd22-86023b420cbe.png)
![draw canvas html](https://user-images.githubusercontent.com/43887554/125615575-71c3bf0d-f508-4f25-beb7-fa7ae0924d57.png)
![draw canvas html](https://user-images.githubusercontent.com/43887554/125615619-85c50752-ebbe-4f1c-b107-d4e499abc2aa.png)
![draw canvas html](https://user-images.githubusercontent.com/43887554/125615651-4fc5216b-06a6-4289-8490-8fa07d6cce72.png)



## You can load images and fonts very easily, just provide the url.

    src: "2.png"  
    font: "url(ShareTechMono.ttf)"
    fill: "url(2.png), 0, 0.2, repeat"

![draw canvas html image](https://user-images.githubusercontent.com/43887554/125616462-9eb5518e-1b05-4396-8a09-ea44b4261739.png)


## Very easy make gradient

    fill: "grad(linear, 45, 0 #0000ff, 1, #00ff00)"
    fill: "grad(radial, 0, #0000ff, 1, #00ff00)"

![gradien canvas html](https://user-images.githubusercontent.com/43887554/125616673-38a35d0e-34e9-4747-9852-8462ba92669b.png)


## You can set relative and absolute coordinate object.

    relative: false
  
![relative ccord canvas html](https://user-images.githubusercontent.com/43887554/125616735-00e77de6-dc27-45ba-8efb-6f39a9230449.png)

    relative: true 
  
![relative ccord canvas html](https://user-images.githubusercontent.com/43887554/125616781-0d529ae8-304b-4921-8ca7-46c5cb08a210.png)

