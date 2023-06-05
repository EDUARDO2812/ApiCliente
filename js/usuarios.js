var app = new Vue({
    el: '#app',
    data: 
    {
      url : 'https://cbtis169.net/apiServer/',        
      usuarios:[],
      
      id:0,  // son los campos de la tabla "usuarios" de MySQL
      nombre: '',
      usuario: '',
      clave:'',
            // lógica para visualizar div's de editar y agregar
      verEditar: false,
      verAgregar: false,   
      btnAgregar: true,  
    }, //fin de data

    mounted(){
      console.log("Ejecutando Mounted");                  
      this.verUsuarios()
    }, //fin de mounted
    methods:{
      verUsuarios: async function()
      {       
        let url = this.url+"usuarios"; 
        await axios.get(url).then((response) => {
          const results = response.data;
          this.usuarios=results.usuarios;
          console.log(this.usuarios);        
          console.log("verUSuarios Ejecutado");        
        });
      }, //fin de verUsuarios      

      editarUsuario: async function(id)
      { 
        this.id= id;
        this.btnAgregar=false;
        url=this.url+"usuario/"+id;
        console.log(url);        
        this.verEditar=true;
        console.log("verEditar: ",this.verEditar);        

	      await axios.get(url).then((response) => {
          const results = response.data;
          let edita=results[id];
          this.nombre=edita.nombre;
          this.usuario=edita.usuario;
          this.clave=edita.clave;        
          console.log("Editar Ejecutado", edita);      
        });
      },//fin editarUsuario      

      actualizarUsuario: async function(item)
      {
        this.id=item;
        //let actualiza = JSON.stringify({ "usuario":usuario, "clave":clave, "nombre":nombre });
        //console.log(actualiza);       
        let url=this.url+"actualiza/"+item;
        console.log("axios POST: ",url);

        axios.post(url)
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
      },//fin actualizar

      borrarUsuario: function(item)
      { 
        let url = this.url+"borra/"+item;
        console.log("del URL: ",url);
         axios.post(url).then((response)=>{
          const results = response;
          console.log(results);
          this.verUsuarios();
          this.btnAgregar=true;
        });
      },//fin borrar

      agregarUsuario: function() 
      {
        this.verAgregar=true;
        this.btnAgregar= false;
      },

      cancelaAgregar: function(){
        this.verAgregar=false;
        this.btnAgregar=true;
      }

    } // fin de methods  
}) //fin de new Vue