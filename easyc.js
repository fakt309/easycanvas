//version 1.1 not premium

function EasyC(canvas, objects) {
  this.canvas = null;
  this.objects = [];
  this.resource = [];
  if (canvas) { this.canvas = canvas; }
  if (objects) {
    for (var i = 0; i < objects.length; i++) {
      this.objects[i] = this.cloneObject(objects[i]);
    }
  }
  return this;
}
EasyC.prototype.cloneObject = function(obj) {
  var answer = {};
  for (var i in obj) {
    if (typeof obj[i] == "object") {
      if (Array.isArray(obj[i])) {
        answer[i] = [];
        for (var j = 0; j < obj[i].length; j++) {
          answer[i][j] = obj[i][j];
        }
      } else {
        answer[i] = this.cloneObject(obj[i]);
      }
    } else {
      answer[i] = obj[i];
    }
  }
  return answer;
}
EasyC.prototype.degreeToRadian = function(degree) {
  return (degree/360)*(2*Math.PI);
}
EasyC.prototype.radianToDegree = function(radian) {
  return (radian/(2*Math.PI))*360;
}
EasyC.prototype.loadImage = function(url, success) {
  var img = new Image();
  var resource = this.resource;
  img.onload = function() {
    resource.push(img);
    success(resource.length-1);
  }
  img.src = url;
}
EasyC.prototype.setRelative = function(obj) {
  var relative = { coord: { x: false , y: false } };
  if (obj.hasOwnProperty("relative") && obj.relative == true) {
    relative.coord.x = true;
    relative.coord.y = true;
  }
  if (obj.hasOwnProperty("relative") && obj.relative.hasOwnProperty("coord") && obj.relative.coord == true) {
    relative.coord.x = true;
    relative.coord.y = true;
  }
  if (obj.hasOwnProperty("relative") && obj.relative.hasOwnProperty("coord") && obj.relative.coord.hasOwnProperty("x") && obj.relative.coord.x == true) {
    relative.coord.x = true;
  }
  if (obj.hasOwnProperty("relative") && obj.relative.hasOwnProperty("coord") && obj.relative.coord.hasOwnProperty("y") && obj.relative.coord.y == true) {
    relative.coord.y = true;
  }

  if (obj.type == "circle") {
    relative.radius = false;
    if (obj.hasOwnProperty("relative") && obj.relative == true) {
      relative.radius = "width";
    }
    if (obj.hasOwnProperty("relative") && obj.relative.hasOwnProperty("radius") && obj.relative.radius == true) {
      relative.radius = "width";
    } else if (obj.hasOwnProperty("relative") && obj.relative.hasOwnProperty("radius") && obj.relative.radius == "width") {
      relative.radius = "width";
    } else if (obj.hasOwnProperty("relative") && obj.relative.hasOwnProperty("radius") && obj.relative.radius == "height") {
      relative.radius = "height";
    }
  } else if (obj.type == "shape") {
    relative.size = { width: false, height: false };
    if (obj.hasOwnProperty("relative") && obj.relative == true) {
      relative.size.width = true;
      relative.size.height = true;
    }
    if (obj.hasOwnProperty("relative") && obj.relative.hasOwnProperty("size") && obj.relative.size == true ) {
      relative.size.width = true;
      relative.size.height = true;
    }
    if (obj.hasOwnProperty("relative") && obj.relative.hasOwnProperty("size") && obj.relative.size.hasOwnProperty("width") && obj.relative.size.width == true ) {
      relative.size.width = true;
    }
    if (obj.hasOwnProperty("relative") && obj.relative.hasOwnProperty("size") && obj.relative.size.hasOwnProperty("height") && obj.relative.size.height == true ) {
      relative.size.height = true;
    }
  } else if (obj.type == "triangle") {
    relative.size = { width: false, height: false };
    relative.base = false;
    if (obj.hasOwnProperty("relative") && obj.relative == true) {
      relative.base = "width";
    }
    if (obj.hasOwnProperty("relative") && obj.relative.hasOwnProperty("base") && (obj.relative.base == true || obj.relative.base == "width")) {
      relative.base = "width";
    }
    if (obj.hasOwnProperty("relative") && obj.relative.hasOwnProperty("base") && obj.relative.base == "height") {
      relative.base = "height";
    }
  } else if (obj.type == "rectangle") {
    relative.size = { width: false, height: false };
    if (obj.hasOwnProperty("relative") && obj.relative == true) {
      relative.size.width = true;
      relative.size.height = true;
    }
    if (obj.hasOwnProperty("relative") && obj.relative.hasOwnProperty("size") && obj.relative.size == true) {
      relative.size.width = true;
      relative.size.height = true;
    }
    if (obj.hasOwnProperty("relative") && obj.relative.hasOwnProperty("size") && obj.relative.size.hasOwnProperty("width") && obj.relative.size.width == true) {
      relative.size.width = true;
    }
    if (obj.hasOwnProperty("relative") && obj.relative.hasOwnProperty("size") && obj.relative.size.hasOwnProperty("height") && obj.relative.size.height == true) {
      relative.size.height = true;
    }
  } else if (obj.type == "text") {
    relative.width = false;
    relative.size = false;
    if (obj.hasOwnProperty("relative") && obj.relative == true) {
      relative.width = true;
      relative.size = "width";
    }
    if (obj.hasOwnProperty("relative") && obj.relative.hasOwnProperty("width") && obj.relative.width == true) {
      relative.width = true;
    }
    if (obj.hasOwnProperty("relative") && obj.relative.hasOwnProperty("size") && (obj.relative.size == true || obj.relative.size == "width")) {
      relative.size = "width";
    }
    if (obj.hasOwnProperty("relative") && obj.relative.hasOwnProperty("size") && obj.relative.size == "height") {
      relative.size = "height";
    }
  } else if (obj.type == "image") {
    relative.size = { width: false, height: false };
    relative.crop = { coord: { x: false, y: false }, size: { width: false, height: false } };
    if (obj.hasOwnProperty("relative") && obj.relative == true) {
      relative.size.width = true;
      relative.size.height = true;
      relative.crop.coord.x = true;
      relative.crop.coord.y = true;
      relative.crop.size.width = true;
      relative.crop.size.height = true;
    }
    if (obj.hasOwnProperty("relative") && obj.relative.hasOwnProperty("size") && obj.relative.size == true) {
      relative.size.width = true;
      relative.size.height = true;
    }
    if (obj.hasOwnProperty("relative") && obj.relative.hasOwnProperty("size") && obj.relative.size.hasOwnProperty("width") && obj.relative.size.width == true) {
      relative.size.width = true;
    }
    if (obj.hasOwnProperty("relative") && obj.relative.hasOwnProperty("size") && obj.relative.size.hasOwnProperty("height") && obj.relative.size.height == true) {
      relative.size.height = true;
    }
    if (obj.hasOwnProperty("relative") && obj.relative.hasOwnProperty("crop") && obj.relative.crop == true) {
      relative.crop.coord.x = true;
      relative.crop.coord.y = true;
      relative.crop.size.width = true;
      relative.crop.size.height = true;
    }
    if (obj.hasOwnProperty("relative") && obj.relative.hasOwnProperty("crop") && obj.relative.crop.hasOwnProperty("coord") && obj.relative.crop.coord == true) {
      relative.crop.coord.x = true;
      relative.crop.coord.y = true;
    }
    if (obj.hasOwnProperty("relative") && obj.relative.hasOwnProperty("crop") && obj.relative.crop.hasOwnProperty("coord") && obj.relative.crop.coord.hasOwnProperty("x") && obj.relative.crop.coord.x == true) {
      relative.crop.coord.x = true;
    }
    if (obj.hasOwnProperty("relative") && obj.relative.hasOwnProperty("crop") && obj.relative.crop.hasOwnProperty("coord") && obj.relative.crop.coord.hasOwnProperty("y") && obj.relative.crop.coord.y == true) {
      relative.crop.coord.y = true;
    }
    if (obj.hasOwnProperty("relative") && obj.relative.hasOwnProperty("crop") && obj.relative.crop.hasOwnProperty("size") && obj.relative.crop.size == true) {
      relative.crop.size.width = true;
      relative.crop.size.height = true;
    }
    if (obj.hasOwnProperty("relative") && obj.relative.hasOwnProperty("crop") && obj.relative.crop.hasOwnProperty("size") && obj.relative.crop.size.hasOwnProperty("width") && obj.relative.crop.size.width == true) {
      relative.crop.size.width = true;
    }
    if (obj.hasOwnProperty("relative") && obj.relative.hasOwnProperty("crop") && obj.relative.crop.hasOwnProperty("size") && obj.relative.crop.size.hasOwnProperty("height") && obj.relative.crop.size.height == true) {
      relative.crop.size.height = true;
    }
  }
  obj.relative = relative;
}
EasyC.prototype.draw = function(success, i, sorted) {
  if (!sorted) { sorted = this.getSortedIndexes() }
  if (!i) { i = 0; }
  if (i >= this.objects.length) {
    if (success) { success(); }
    return true;
  }

  var ctx = this.canvas.getContext('2d');
  var obj = this.objects[sorted[i]];

  this.setRelative(obj);

  if (obj.type == "triangle" && !obj.corners) {
    var base = obj.base;
    if (obj.relative.base == "width") {
      base *= this.canvas.clientWidth;
    } else if (obj.relative.base == "height") {
      base *= this.canvas.clientHeight;
    }
    obj.corners = [
      [
        -(Math.sin(obj.angleRight/2)/(Math.sin(Math.PI-(obj.angleLeft/2)-(obj.angleRight/2))/base))*Math.cos(obj.angleLeft/2),
        (Math.sin(obj.angleRight/2)/(Math.sin(Math.PI-(obj.angleLeft/2)-(obj.angleRight/2))/base))*Math.sin(obj.angleLeft/2)
      ], [
        (Math.sin(obj.angleLeft/2)/(Math.sin(Math.PI-(obj.angleLeft/2)-(obj.angleRight/2))/base))*Math.cos(obj.angleRight/2),
        (Math.sin(obj.angleLeft/2)/(Math.sin(Math.PI-(obj.angleLeft/2)-(obj.angleRight/2))/base))*Math.sin(obj.angleRight/2)
      ]
    ];
    obj.corners.push([
      obj.corners[0][0]+(Math.sin(obj.angleRight)/(Math.sin(Math.PI-obj.angleLeft-obj.angleRight)/base))*Math.cos(obj.angleLeft),
      obj.corners[0][1]-(Math.sin(obj.angleRight)/(Math.sin(Math.PI-obj.angleLeft-obj.angleRight)/base))*Math.sin(obj.angleLeft)
    ]);
    var size = this.getSizeFromPoints(obj.corners);
    obj.width = size[0];
    obj.height = size[1];
    for (var j = 0; j < obj.corners.length; j++) {
      obj.corners[j][0] = obj.corners[j][0]/(obj.width/2);
      obj.corners[j][1] = obj.corners[j][1]/(obj.height/2);
    }
  } else if (obj.type == "rectangle" && !obj.corners) {
    obj.corners = [[-1, -1], [1, -1], [1, 1], [-1, 1]];
  }

  var coord = { x: 0, y: 0 };
  if (obj.x) { coord.x = obj.x; }
  if (obj.y) { coord.y = obj.y; }
  if (obj.relative.coord.x == true) { coord.x *= this.canvas.clientWidth; }
  if (obj.relative.coord.y == true) { coord.y *= this.canvas.clientHeight; }
  var scale = [1, 1];
  if (obj.scale) {
    if (typeof obj.scale == "number") {
      scale[0] = obj.scale;
      scale[1] = obj.scale;
    } else if (Array.isArray(obj.scale)) {
      scale = obj.scale;
    }
  }
  var rotate = 0;
  if (obj.rotate) { rotate = obj.rotate; }
  var opacity = 1;
  if (obj.opacity) { opacity = obj.opacity; }

  // ++ loadImage
  if (obj.fill && obj.fill.substr(0, 3) == "url") {
    var tmp = this;
    var data = obj.fill.slice(4, -1).split(/[ ]*,[ ]*/g);
    this.loadImage(data[0], function(id) {
      obj.fill = "res("+id;
      for (var j = 1; j < 4; j++) {
        var val = "";
        if (j == 1) { val = "0"; }
        else if (j == 2) { val = "1"; }
        else if (j == 3) { val = "no-repeat"; }
        if (data[j]) { val = data[j]; }
        obj.fill += ", "+val;
      }
      obj.fill += ")";
      tmp.draw(success, i, sorted);
    });
    return true;
  }
  if (obj.stroke && obj.stroke.fill.substr(0, 3) == "url") {
    var tmp = this;
    var data = obj.stroke.fill.slice(4, -1).split(/[ ]*,[ ]*/g);
    this.loadImage(data[0], function(id) {
      obj.stroke.fill = "res("+id;
      for (var j = 1; j < 4; j++) {
        var val = "";
        if (j == 1) { val = "0"; }
        else if (j == 2) { val = "1"; }
        else if (j == 3) { val = "no-repeat"; }
        if (data[j]) { val = data[j]; }
        obj.stroke.fill += ", "+val;
      }
      obj.stroke.fill += ")";
      tmp.draw(success, i, sorted);
    });
    return true;
  }
  if (obj.type == "image" && obj.src.substr(0, 3) != "res") {
    var tmp = this;
    this.loadImage(obj.src, function(id) {
      obj.src = "res("+id+")";
      tmp.draw(success, i, sorted);
    });
    return true;
  }
  // -- loadImage

  // ++ loadFont
    if (obj.font && obj.font.substr(0, 3) == "url") {
      var tmp = this;
      var data = obj.font.slice(4, -1).split(/[ ]*,[ ]*/g);
      var url = data[0].split("/");
      var nameFont = url[url.length-1].split(".")[0];
      var f = new FontFace(nameFont, "url("+url.join("/")+")");
      f.load().then(function(ff) {
        document.fonts.add(ff);
        obj.font = nameFont;
        tmp.draw(success, i, sorted);
      });
      return false;
    }
  // -- loadFont

  var fill = false;
  if (obj.fill) { fill = this.getFill(obj); }
  var stroke = false;
  if (obj.stroke && obj.stroke.fill) {
    stroke = {};
    stroke.fill = this.getFill(obj, true);
    if (obj.stroke.thick) {
      stroke.thick = obj.stroke.thick;
    } else {
      stroke.thick = 1;
    }
  }

  ctx.save();
  ctx.globalCompositeOperation = "source-over";
  ctx.translate(coord.x, coord.y);
  ctx.rotate(rotate);
  ctx.scale(scale[0], scale[1]);
  ctx.globalAlpha = opacity;

  if (obj.type == "circle") {

    var radius = obj.radius;
    if (obj.relative.radius == "width") {
      radius *= this.canvas.clientWidth;
    } else if (obj.relative.radius == "height") {
      radius *= this.canvas.clientHeight;
    }
    var segment = [0, 2*Math.PI];
    if (obj.segment) {
      segment = obj.segment;
    }
    ctx.beginPath();
    ctx.arc(0, 0, radius, segment[0], segment[1]);
    ctx.closePath();

  } else if (obj.type == "shape" || obj.type == "triangle" || obj.type == "rectangle") {

    this.drawShape(obj);

  } else if (obj.type == "text") {

    var font = obj.font;
    var align = obj.align;
    var size = obj.size;
    if (obj.relative.size == "width") {
      size *= this.canvas.clientWidth;
    } else if (obj.relative.size == "height") {
      size *= this.canvas.clientHeight;
    }

    ctx.textAlign = align;
    ctx.font = size+"px "+font;
    ctx.textBaseline = "middle";

  } else if (obj.type == "image") {

    var img = this.resource[parseInt(obj.src.slice(4, -1))];
    var width = null;
    var height = null;
    if (obj.width) {
      width = obj.width;
      if (obj.relative.size.width == true) { width *= this.canvas.clientWidth; }
    }
    if (obj.height) {
      height = obj.height;
      if (obj.relative.size.height == true) { height *= this.canvas.clientHeight; }
    }
    if (width == null && height == null) {
      width = img.naturalWidth;
      height = img.naturalHeight;
    } else if (width == null) {
      width = height*(img.naturalWidth/img.naturalHeight);
    } else if (height == null) {
      height = width/(img.naturalWidth/img.naturalHeight);
    }
    var crop = [0, 0, img.naturalWidth, img.naturalHeight];
    if (obj.crop) {
      crop = obj.crop;
      if (obj.relative.crop.coord.x == true) { crop[0] *= img.naturalWidth; }
      if (obj.relative.crop.coord.y == true) { crop[1] *= img.naturalHeight; }
      if (obj.relative.crop.size.width == true) { crop[2] *= img.naturalWidth; }
      if (obj.relative.crop.size.height == true) { crop[3] *= img.naturalHeight; }
    }

    ctx.drawImage(this.resource[parseInt(obj.src.slice(4, -1))], crop[0], crop[1], crop[2], crop[3], -width/2, -height/2, width, height);

  }

  if (fill != false) {
    ctx.fillStyle = fill;
    if (obj.type == "text") {
      var width = 200;
      if (obj.width) {
        width = obj.width;
        if (obj.relative.width == true) { width *= this.canvas.clientWidth; }
      }
      var size = obj.size;
      if (obj.relative.size == "width") {
        size *= this.canvas.clientWidth;
      } else if (obj.relative.size == "height") {
        size *= this.canvas.clientHeight;
      }
      var value = obj.value.split("\n");
      for (var j = 0; j < value.length; j++) {
        ctx.fillText(value[j], 0, j*size, width);
      }
    } else {
      ctx.fill();
    }
  }
  if (stroke != false) {
    ctx.strokeStyle = stroke.fill;
    ctx.lineWidth  = stroke.thick;
    if (obj.type == "text") {
      var width = 200;
      var align = obj.align;
      if (obj.width) {
        width = obj.width;
        if (obj.relative.width == true) { width *= this.canvas.clientWidth; }
      }
      var size = obj.size;
      if (obj.relative.size == "width") {
        size *= this.canvas.clientWidth;
      } else if (obj.relative.size == "height") {
        size *= this.canvas.clientHeight;
      }
      var value = obj.value.split("\n");
      for (var j = 0; j < value.length; j++) {
        ctx.strokeText(value[j], 0, j*size, width);
      }
    } else {
      ctx.stroke();
    }
  }
  ctx.restore();

  this.draw(success, ++i, sorted);
}
EasyC.prototype.getFill = function(obj, stroke) {
  var answer = false;
  var fill = obj.fill;
  if (stroke) { fill = obj.stroke.fill; }
  var ctx = this.canvas.getContext("2d");

  if (fill.substr(0, 1) == "#") {
    answer = fill;
  } else if (fill.substr(0, 4) == "grad") {
    var data = fill.slice(5, -1).split(/[ ]*,[ ]*/g);
    var size = this.getSize(obj);
    var radiusBounding = Math.sqrt(Math.pow(size[0], 2)+Math.pow(size[1], 2))/2;
    if (data[0] == "linear") {
      var angle = parseFloat(this.degreeToRadian(data[1]));
      answer = ctx.createLinearGradient(-radiusBounding*Math.cos(angle), -radiusBounding*Math.sin(angle), radiusBounding*Math.cos(angle), radiusBounding*Math.sin(angle));
      for (var i = 2; i < data.length; i+=2) {
        answer.addColorStop(parseFloat(data[i]), data[i+1]);
      }
    } else if (data[0] == "radial") {
      answer = ctx.createRadialGradient(0, 0, 1, 0, 0, radiusBounding);
      for (var i = 1; i < data.length; i+=2) {
        answer.addColorStop(parseFloat(data[i]), data[i+1]);
      }
    }
  } else if (fill.substr(0, 3) == "res") {
    var data = fill.slice(4, -1).split(/[ ]*,[ ]*/g);
    var repeat = data[3];
    answer = ctx.createPattern(this.resource[parseInt(data[0])], repeat);
    var img = this.resource[parseInt(data[0])];
    var translate = data[1].split("/");
    var scale = data[2].split("/");
    var size = this.getSize(obj);
    if (scale.length == 1) {
      scale = [parseFloat(scale[0]), parseFloat(scale[0])];
    } else if (scale.length == 2) {
      scale = [parseFloat(scale[0]), parseFloat(scale[1])];
    }
    if (translate.length == 1) {
      translate = [(parseFloat(translate[0])*size[0])/scale[0]-img.naturalWidth/2, (parseFloat(translate[0])*size[1])/scale[1]-img.naturalHeight/2];
    } else if (translate.length == 2) {
      translate = [(parseFloat(translate[0])*size[0])/scale[0]-img.naturalWidth/2, (parseFloat(translate[1])*size[1])/scale[1]-img.naturalHeight/2];
    }

    var matrix = new DOMMatrix();
    answer.setTransform(matrix.scale(scale[0], scale[1]).translate(translate[0], translate[1]));
  }
  return answer;
}
EasyC.prototype.getSize = function(obj) {
  if (obj.type == "circle") {
    var radius = obj.radius;
    if (obj.relative.radius == "width") {
      radius *= this.canvas.clientWidth;
    } else if (obj.relative.radius == "height") {
      radius *= this.canvas.clientHeight;
    }
    return [2*radius, 2*radius];
  } else if (obj.type == "shape" || obj.type == "triangle" || obj.type == "rectangle") {
    var width = obj.width;
    var height = obj.height;
    if (obj.relative.size.width == true) { width *= this.canvas.clientWidth; }
    if (obj.relative.size.height == true) { height *= this.canvas.clientHeight; }
    return [width, height];
  } else if (obj.type == "text") {
    var width = obj.width;
    var height = obj.size;
    if (obj.relative.width == true) { width *= this.canvas.clientWidth; }
    if (obj.relative.size == "width") {
      height *= this.canvas.clientWidth;
    } else if (obj.relative.size == "width") {
      height *= this.canvas.clientHeight;
    }
    return [width, height];
  }
}
EasyC.prototype.getSizeFromPoints = function(points) {
  var intervalX = [null, null];
  var intervalY = [null, null];
  for (var i = 0; i < points.length; i++) {
    if (intervalX[0] == null || points[i][0] < intervalX[0]) { intervalX[0] = points[i][0]; }
    if (intervalX[1] == null || points[i][0] > intervalX[1]) { intervalX[1] = points[i][0]; }
    if (intervalY[0] == null || points[i][1] < intervalY[0]) { intervalY[0] = points[i][1]; }
    if (intervalY[1] == null || points[i][1] > intervalY[1]) { intervalY[1] = points[i][1]; }
  }
  return [intervalX[1]-intervalX[0], intervalY[1]-intervalY[0]];
}
EasyC.prototype.drawShape = function(obj) {
  var ctx = this.canvas.getContext("2d");

  var width = obj.width;
  var height = obj.height;
  if (obj.relative.size.width == true) { width *= this.canvas.clientWidth; }
  if (obj.relative.size.height == true) { height *= this.canvas.clientHeight; }

  ctx.beginPath();
  for (var i = 0; i < obj.corners.length; i++) {
    var corner = [obj.corners[i][0]*width/2, obj.corners[i][1]*height/2];
    if (i == 0) {
      ctx.moveTo(corner[0], corner[1]);
    } else {
      ctx.lineTo(corner[0], corner[1]);
    }
  }
  ctx.closePath();
}
EasyC.prototype.getSortedIndexes = function() {
  var answer = [];
  var objects = this.objects;

  for (var i = 0; i < objects.length; i++) {
    if (!objects[i].z) { objects[i].z = 0; }
    answer[i] = i;
  }

  for (var i = 0; i < objects.length-1; i++) {
    for (var j = 0; j < objects.length-1-i; j++) {
      if (objects[answer[j]].z > objects[answer[j+1]].z) {
        var tmp = answer[j];
        answer[j] = answer[j+1];
        answer[j+1] = tmp;
      }
    }
  }

  return answer;
}
