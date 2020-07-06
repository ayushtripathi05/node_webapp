console.log("Client side javascript is loading")




const weatherform = document.querySelector("form")

const search = document.querySelector("input")

const messageone = document.querySelector("#message-1")
const messagetwo = document.querySelector("message-2")

//messageone.textContent='from javascript'

weatherform.addEventListener('submit', (e) => {

    e.preventDefault()

    messageone.textContent = "loading..."
   // messagetwo.textContent=""
    

    const location = search.value

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                console.log(data.error)
                messageone.textContent = data.error
            }
            else {

                messageone.textContent = data.location + " " + data.forecast.location +" "+ data.forecast.temperature + " Degree Celsius " + data.forecast.description[0]
               // messagetwo.textContent = data.forecast.temperature + " " + data.forecast.description[0]
                console.log(data.location)
                console.log(data.forecast)
            }
        })
    })



})