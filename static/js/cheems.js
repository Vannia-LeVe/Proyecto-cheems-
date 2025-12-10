document.addEventListener('DOMContentLoaded', ()=> {


    //se inicializa el contador 
    document.getElementById("btn-save").addEventListener("click", saveWinner);

    document.getElementById("btn-save").addEventListener("click",saveWinner);
    document.getElementById("btn-reset").addEventListener("click", resetGame);

    let intentos = 0; 
    let randomNumber= Math.floor(Math.random() * 14  ) + 1 ;
    //TODO eliminar antes de publicar el juego
    console.log('Número aleatorio :', randomNumber);

    const imagenes = document.querySelectorAll('.cheems-card img');
    const clickCards= new Set();


    imagenes.forEach((img, index)=>{
        const id=index + 1;
        img.dataset.id = id;
        //GUARDA LAS IMAGENES ORIGINALES
        img.dataset.original = img.src;

        img.addEventListener('click', ()=>{
            if(!clickCards.has(id)){
             clickCards.add(id);

            if(id==randomNumber){
                img.src=window.IMG_BAD

                    imagenes.forEach((img) =>{
                        if (img.dataset.id != randomNumber){
                            img.src=window.IMG_OK;
                        }
                    })
                //alert('perdiste, intenta de nuevo');

            } else {
                img.src=window.IMG_OK;
                
                if (clickCards.size === 14){
                    const modal= new bootstrap.Modal(document.getElementById('modal-winner'));
                    modal.show();
                    //alert('Ganaste, felicidades');

                }
            }}
        })
    })

    function saveWinner(){
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const phrase = document.getElementById("phrase").value.trim();

        if(!name || !email){
            alert("Por favor, completa los campos obligatorios.");
            return;
        }

        fetch("/winner", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
       },
            body: JSON.stringify({
                name: name,
                 email: email, 
                 phrase: phrase,
                 intentos:intentos //AQUI NOMAS ES PONER LA VARIABLE INTENTOS PARA QUE SE GUARDE EN LA BASE DE DATOS.
            })
        })
        .then(response => {
            if(response.ok){
                return response.json();
            }else Promise.reject();
        })
        .then(result =>{
            if (result.success){
            alert("¡Datos guardados correctamente! Gracias por participar.");
            intentos = 0;
            document.getElementById('contador-intentos').textContent = intentos;

            
        } else {
            alert("Hubo un error al guardar tus datos. Por favor, intenta mas tarde.");
        }
        })
        }

    function resetGame(){
        clickCards.clear();
        imagenes.forEach(img => {
            img.src = img.dataset.original || img.src;
        });
        randomNumber = Math.floor(Math.random() * 14) + 1;
        console.log('Nuevo numero aleatorio :', randomNumber);
        intentos++;
        console.log('Numero de Intentos: ', intentos);
        document.getElementById('contador-intentos').textContent = intentos;

    }
});           
