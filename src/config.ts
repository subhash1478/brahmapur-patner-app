export let Config:any={
    API_ENDPOINT:'http://139.59.12.86:3001/api',
    SAIL_ENDPOINT:'http://139.59.12.86:1337/api',
    //API_ENDPOINT:'http://localhost:3001/api/',
    SOCKET_ENDPOINT:'http://139.59.12.86:3001/',
    //SOCKET_ENDPOINT:'http://localhost:3001/',
    MAP:'https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyBDt-n9oOzxwirbXz7u0sIZmd9Zhc1LSV8',
    LOCATION:JSON.parse(localStorage.getItem('location')),
    USER:JSON.parse(localStorage.getItem('userdetails'))
}
