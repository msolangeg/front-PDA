console.log(location.search)     // lee los argumentos pasados a este formulario
var id=location.search.substr(4)  // animal_update.html?id=1
console.log(id)
const { createApp } = Vue
  createApp({
    data() {
      return {
        id:0,
        name:"", 
        weight:"",
        breed:"",
        age:0,
        description:"",
        photo:"",
        // url:'http://127.0.0.1:5000/pets/'+id,  //url de 
        url:`http://solange.pythonanywhere.com/pets/${id}`,
       }  
    },
    methods: {
        fetchData(url) {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    console.log(data)

                    this.id=data.id
                    this.name = data.name
                    this.weight=data.weight
                    this.breed=data.breed
                    this.age=data.age                   
                    this.description=data.description              
                    this.photo=data.photo                   
                })
                .catch(err => {
                    console.error(err);
                    this.error=true              
                })
        },
        update() {
            let pet = {
                name:this.name,
                weight: this.weight,
                breed: this.breed,
                age:this.age,
                description:this.description,
                photo:this.photo
            }
            var options = {
                body: JSON.stringify(pet),
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow'
            }
            fetch(this.url, options)
                .then(function () {
                    alert("Registro modificado")
                    window.location.href = "./animal_update.html"; // navega a animal_update.html          
                })
                .catch(err => {
                    console.error(err);
                    alert("Error al Modificar")
                })      
        }
    },
    created() {
        this.fetchData(this.url)
    },
  }).mount('#app')
