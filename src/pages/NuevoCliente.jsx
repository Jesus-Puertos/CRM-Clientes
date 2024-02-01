import { useNavigate, Form, useActionData, redirect} from "react-router-dom"
import Formulario from "../components/Formulario"
import Error from "../components/Error";
import { agregarCliente } from "../data/clientes";

export async function action({request}){
    const formData = await request.formData();

    const datos = Object.fromEntries(formData);

    const email = formData.get('email')

    //Validacion de datos
    const errores = [];
    if(Object.values(datos).includes('')){
        errores.push('Todos los campos son obligatorios');
    }

    //Validar email que tenga el formato correcto
    let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");
        
    if(!regex.test(email)){
      errores.push('El email no es valido');
    }


    //Si hay errores
    if(Object.keys(errores).length){
      return errores;
    }

    //Enviar datos
    await agregarCliente(datos);

    return redirect('/');
}

const NuevoCliente = () => {
  const errores = useActionData();
  const navigate = useNavigate();

  return (
      <>
        <h1 className="font-black text-4xl text-blue-900">Nuevo Cliente</h1>    
        <p className="mt-3">Llena todos los campos para registrar un nuevo cliente.</p>

        <div className="flex justify-end mt-5">
          <button
            className="bg-blue-800 text-white font-bold py-1 uppercase rounded text-xs w-28 hover:bg-blue-900"
            onClick={()=> navigate(-1)}
          >Volver
          </button>
        </div>

        <div className="bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-4">

          {errores?.length && errores.map((error, i)=>(
            <Error key={i}>{error}</Error>
          ))}

          <Form
           method="POST"
           noValidate
           >
          <Formulario/>
            <input type="submit"
            className="p-3 mt-5 w-full text-white uppercase font-bold hover:bg-blue-900 bg-blue-800 rounded"
            />
          </Form>
          </div>
         
      </> 

)
}

export default NuevoCliente