var down = document.querySelector('div[class="downbox"]');
var button = document.querySelector("button");
var city = document.querySelector('input[name="cityName"]');

button.addEventListener("click", (e) => {
  e.preventDefault();
  console.log(down.children);
  remove();
  fetch("/", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ cityName: city.value }),
  }).then(async (res) => {
    remove();
    var x = await res.json();
    var t = document.createElement("h3");
    t.innerText = "Temperature in " + x.city + " : " + x.temp + "°C";
    var img = document.createElement("img");
    img.src = x.icon;
    var m = document.createElement("h4");
    m.innerText = "Weather Description: " + x.disc;
    var s = document.createElement("h4");
    s.innerText = "Humidity : " + x.humid;
    var h = document.createElement("h4");
    h.innerText = "Wind Speed : " + x.speed;
    remove();
    down.append(img);
    down.append(t);
    down.append(m);
    down.append(s);
    down.append(h);
  });
});

function remove() {
  for (var z = 0; z < down.children.length; z++) {
    down.children[z].remove();
  }
}
