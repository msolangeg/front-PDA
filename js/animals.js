const { createApp } = Vue
  createApp({
    data() {
      return {
        pets:[],
        //url:'http://localhost:5000/pets', 
   // si el backend esta corriendo local  usar localhost 5000(si no lo subieron a pythonanywhere)
        url:'http://127.0.0.1:5000/pets',   // si ya lo subieron a pythonanywhere
        error:false,
        cargando:true,

        /*atributos para el guardar los valores del formulario // objetoq ue guarda datos de la variable V-model*/
        id:0,
        name:"", 
        weight:"",
        breed:"",
        age:0,
        description:"",
        photo:""
    }  
    },
    methods: {
        fetchData(url) {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    this.pets = data;
                    this.cargando=false
                })
                .catch(err => {
                    console.error(err);
                    this.error=true              
                })
        },

        eliminar(id) {
            const url = this.url+'/' + id;
            var options = {
                method: 'DELETE',
            }
            fetch(url, options) // En este objeto option se le indica el método que va a utilizar
                .then(res => res.text()) // or res.json()
                .then(res => {
			 alert('Registro Eliminado')
                    location.reload(); // recarga el json luego de eliminado el registro
                })
        },

        submit(){
            let pet = {
                name:this.name,
                weight: this.weight,
                breed: this.breed,
                age:this.age,
                description:this.description,
                photo:this.photo
            }
            var options = {
                body:JSON.stringify(pet),
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow'
            }
            fetch(this.url, options)
                .then(function () {
                    alert("Registro grabado")
                    window.location.href = "./animals.html";  // recarga animals.html
                })
                .catch(err => {
                    console.error(err);
                    alert("Error al Grabar")  // puedo mostrar el error tambien
                })      
        }
    },
    created() {
        this.fetchData(this.url)
    },
  }).mount('#app')
