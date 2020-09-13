window.addEventListener("load", function() {

  let long;
  let lat;

  const timezone_display = document.querySelector(".location-timezone");
  const temperatureDegree_display = document.querySelector(".temperature-degree");
  const temperatureDescription_display = document.querySelector(".temperature-description");
  const temperatureSection = document.querySelector(".temperature");
  const temperatureSpan = document.querySelector(".temperature span");

  if (navigator.geolocation) {

    navigator.geolocation.getCurrentPosition(position => {

      //console.log(position);

      long = position.coords.longitude;
      lat = position.coords.latitude;

      const proxy = "https://cors-anywhere.herokuapp.com/";
      const api = `${proxy}https://api.darksky.net/forecast/70887f7504a8df4688a961f872746128/${lat},${long}`

      fetch(api)
        .then(response => {

        return response.json();

      })

      .then(data => {

          console.log(data);
          const timezone = data.timezone;
          let temperature = data.currently.temperature;
          const summary = data.currently.summary;

          const icon = data.currently.icon;
          //const {temperature, summary} = data.currently;

          // setting dom elements to api data
          timezone_display.innerHTML = timezone;
          temperatureDegree_display.innerHTML = temperature;
          temperatureDescription_display.innerHTML = summary;

          let farenheight = Math.round((temperature * 1.8) + 32, 3);

          // setting icon to icon returned from api
          setIcons(icon, document.querySelector(".icon"));

          // change from C to F when clicked
          temperatureSection.addEventListener("click", function() {

            if (temperatureSpan.innerHTML == "F") {

              temperatureSpan.innerHTML = "C";
              temperatureDegree_display.innerHTML = temperature;

            } else if (temperatureSpan.innerHTML == "C") {

              temperatureSpan.innerHTML = "F";
              temperatureDegree_display.innerHTML = farenheight;

            }

          })

      });

    });



  }

    function setIcons(icon, iconId) {

      const skycons = new Skycons({color: "white"});
      const currentIcon = icon.replace(/-/g, "_").toUpperCase();
      skycons.play();
      return skycons.set(iconId, Skycons[currentIcon]);
      //skycons.add(document.getElementById("icon2"), Skycons.RAIN);
      // same thing, first arg takes html element that's being set, second arg takes Skycons(fixed icon id from api)

    }

});
