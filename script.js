const elementList = [];

const retrieveElements = () => {
    elementList.push(document.querySelector(".h1"))
    elementList.push(document.querySelector(".height"))
    elementList.push(document.querySelector(".gender"))
    elementList.push(document.querySelector(".year"))
    elementList.push(document.querySelector(".home"))
    return elementList;
}

const retrieveData = async () => {
    try {
    elementList.forEach(element => element.innerHTML = "");
    let randomNum = Math.floor(Math.random() * 100);
    console.log(randomNum);
    let fetched = await fetch(`https://swapi.dev/api/people/${randomNum}/`);
    let data = await fetched.json();
    url2 = data["homeworld"]
    let fetched2 = await fetch(url2);
    let data2 = await fetched2.json();
    display(data, data2);
    }
    catch {
        displayError();
    }
}

const display = (data, data2) => {
    let loading = document.querySelector(".loading");
    loading.classList.remove("display");
    retrieveElements();
    setTimeout(function(){
        loading.classList.add("display");
        elementList[0].innerHTML = data["name"];
        elementList[1].innerHTML = "Height: " + data["height"];
        elementList[2].innerHTML = "Gender: " + data["gender"];
        elementList[3].innerHTML = "Birth Year: " + data["birth_year"];
        elementList[4].innerHTML = "Home World: " + data2["name"];
        }, 800);
}

const displayError = () => {
    let h1 = document.querySelector("h1");
    h1.innerHTML = "Oh no! That person isn't available."
}

let button = document.querySelector("button");
button.addEventListener("click", retrieveData);

