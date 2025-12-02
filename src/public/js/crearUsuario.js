const url = "http://localhost:3000/api/usuarios"
let crearUsuario_form = document.getElementById("login-form");

crearUsuario_form.addEventListener("submit", async event => {
    event.preventDefault();

    let formData = new FormData(event.target); 
    let data = Object.fromEntries(formData.entries());
    enviarUsuario(data);
})

async function enviarUsuario(data) {
    console.table(data)

    try {
        let response = await fetch(url,{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
                
        let resultado = await response.json();

        if(response.ok){
            alert(resultado.message);
            console.log("todo ok");
        }
        else{
            alert(resultado.message);
        }

    } catch (error) {
        console.error("Error al enviar los datos: ", error);
        alert("Error al procesar la solicitud");
        
    }
    
}