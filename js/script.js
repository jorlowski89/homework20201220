const city = document.getElementById("city")
const image = document.getElementById("image")

city.addEventListener("change", seratch)

function seratch() {
    fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city.value}&appid=98ee54c145acb90659769be4d19dbfba`)
        .then((resp) => resp.json())
        .then((data) => {
            if (image.children.length == 0) {
                for (i = 0; i < data.list.length; i++) {
                    if (i % 8 == 0) {
                        const temp = (data.list[i].main.temp) - 273.15
                        let img = ""
                        if (temp >= 10) {
                            img = "sunny"
                        } else if (temp > 0 && temp < 10) {
                            img = "cloud"
                        } else if (temp <= 0) {
                            img = "snow"
                        }
                        let elementLi = document.createElement("ul");
                        elementLi.innerHTML = `<li>${city.value}: ${data.list[i].dt_txt.slice(0, 10)}, ${temp.toFixed(1)} °C</li> <img src="css/${img}.png" alt="${img}">`;
                        image.appendChild(elementLi);
                    }
                }
            } else if (image.children.length != 0) {
                document.getElementById("image").innerHTML = '';
                if (image.children.length == 0) {
                    for (i = 0; i < data.list.length; i++) {
                        if (i % 8 == 0) {
                            const temp = (data.list[i].main.temp) - 273.15
                            let img = ""
                            if (temp >= 10) {
                                img = "sunny"
                            } else if (temp > 0 && temp < 10) {
                                img = "cloud"
                            } else if (temp <= 0) {
                                img = "snow"
                            }
                            let elementLi = document.createElement("ul");
                            elementLi.innerHTML = `<li>${city.value}: ${data.list[i].dt_txt.slice(0, 10)}, ${temp.toFixed(1)} °C</li> <img src="css/${img}.png" alt="${img}">`;
                            image.appendChild(elementLi);
                            console.log(data.list[i].dt_txt.slice(0, 10));
                        }
                    }
                }
            }
        })
        .catch(() => {
            if (city.value == false) {
                alert(`Uzupełnij pole: "Wpisz miasto"`)
            } else {
                alert(`Wystąpił nieoczekiwany błąd.`)
            }
        })
}