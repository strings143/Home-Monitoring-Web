// function init1() {
//   const options = {
//     clean: true,
//     connectTimeout: 4000,
//     clientId: 'bulb1',
//     username: 'test',
//     password: 'test',
//   }
//     var client = mqtt.connect("ws://163.23.24.56:9001/mqtt",options);
//     client.publish('dyu/home/state', 'open', { qos: 0, retain: false }, function (error) {
//       if (error) {
//         console.log(error)
//       } else {
//         console.log('Published')
//         client.end()
//       }
//     })
// }
// function init2() {
//   const options = {
//     clean: true,
//     connectTimeout: 4000,
//     clientId: 'bulb2',
//     username: 'test',
//     password: 'test',
//   }
//     var client = mqtt.connect("ws://163.23.24.56:9001/mqtt",options);
//     client.publish('dyu/home/state', 'close', { qos: 0, retain: false }, function (error) {
//       if (error) {
//         console.log(error)
//       } else {
//         console.log('Published')
//         client.end()
//       }
//     })
// }


function check_bulb1() {
  var num = document.getElementById("light1");
  if (num.checked) {
    //document.addEventListener("click",init1, false);
    var temp = document.getElementById("bulb1");
    temp.setAttribute("style", "fill:#FFE153");
    $.ajax({
      type: "POST",
      url: "http://163.23.24.56/api/v1/bulbsave.php",
      data: JSON.stringify({ "state": "open", "bulb": "bulb1" }),
      contentType: "application/json",
      success: function (result) {
        console.log("ok")
      },
      error: function (result, status) {
        console.log("error")
      }
    });
  }
  else {
    //document.addEventListener("click",init2, false);
    var temp = document.getElementById("bulb1");
    temp.setAttribute("style", "fill:currentColor");
    $.ajax({
      type: "POST",
      url: "http://163.23.24.56/api/v1/bulbsave.php",
      data: JSON.stringify({ "state": "close", "bulb": "bulb1" }),
      contentType: "application/json",
      success: function (result) {
        console.log("ok")
      },
      error: function (result, status) {
        console.log("error")
      }
    });
  }
}


function check_bulb2() {
  var num = document.getElementById("light2");
  if (num.checked) {
    var temp = document.getElementById("bulb2");
    temp.setAttribute("style", "fill:#FFE153");
    $.ajax({
      type: "POST",
      url: "http://163.23.24.56/api/v1/bulbsave.php",
      data: JSON.stringify({ "state": "open", "bulb": "bulb2" }),
      contentType: "application/json",
      success: function (result) {
        console.log("ok")
      },
      error: function (result, status) {
        console.log("error")
      }
    });
  }
  else {
    var temp = document.getElementById("bulb2");
    temp.setAttribute("style", "fill:currentColor");
    $.ajax({
      type: "POST",
      url: "http://163.23.24.56/api/v1/bulbsave.php",
      data: JSON.stringify({ "state": "close", "bulb": "bulb2" }),
      contentType: "application/json",
      success: function (result) {
        console.log("ok")
      },
      error: function (result, status) {
        console.log("error")
      }
    });
  }
}
function check_bulb3() {
  var num = document.getElementById("light3");
  if (num.checked) {
    var temp = document.getElementById("bulb3");
    temp.setAttribute("style", "fill:#FFE153");
    $.ajax({
      type: "POST",
      url: "http://163.23.24.56/api/v1/bulbsave.php",
      data: JSON.stringify({ "state": "open", "bulb": "bulb3" }),
      contentType: "application/json",
      success: function (result) {
        console.log("ok")
      },
      error: function (result, status) {
        console.log("error")
      }
    });
  }
  else {
    var temp = document.getElementById("bulb3");
    temp.setAttribute("style", "fill:currentColor");
    $.ajax({
      type: "POST",
      url: "http://163.23.24.56/api/v1/bulbsave.php",
      data: JSON.stringify({ "state": "close", "bulb": "bulb3" }),
      contentType: "application/json",
      success: function (result) {
        console.log("ok")
      },
      error: function (result, status) {
        console.log("error")
      }
    });
  }
}
var temperature=[];
var humidity=[];
var time=[];
function getdata() {
  var dataUrl = "http://163.23.24.56/iot/dht11.php"
  var xhr = new XMLHttpRequest()
  xhr.open('GET', dataUrl, true)
  xhr.send();
  xhr.onload = function () {
    
    var data = JSON.parse(this.responseText);
    temperature.push(data["temperature"]);
    humidity.push(data["humidity"]);
    const datetime = new Date();
    time.push(datetime.toLocaleString());
    if(temperature.length>5){
      temperature.shift();
    }
    if(humidity.length>5){
      humidity.shift();
    }
    if(time.length>5){
      time.shift();
    }
    console.log(time.length);
    console.log(temperature.length);
    console.log(humidity.length);
    var xValues = time;
    new Chart("myChart", {
      type: "line",
      data: {
        labels: xValues,
        datasets: [{
          label: 'Humidity',
          data: humidity,
          borderColor: "#FF9D6F",
          fill: false
        }, {
          label: 'Temperature',
          data: temperature,
          borderColor: "#66B3FF",
          fill: false
        },]
      },
      options: { legend: { title: { display: true, } } }
    });
  }

 
}
setInterval(getdata, 3000);

// function new_chart() {
//   var xValues = [time];
//   new Chart("myChart", {
//     type: "line",
//     data: {
//       labels: xValues,
//       datasets: [{
//         label: 'Humidity',
//         data: [humidity],
//         borderColor: "#FF9D6F",
//         fill: false
//       }, {
//         label: 'Temperature',
//         data: [temperature],
//         borderColor: "#66B3FF",
//         fill: false
//       },]
//     },
//     options: { legend: { title: { display: true, } } }
//   });
// }
// window.setInterval(function () {
//   new_chart(this.ctx).Line(this.data, this.option);
// }, 1000);
//setInterval(draw,3000);

