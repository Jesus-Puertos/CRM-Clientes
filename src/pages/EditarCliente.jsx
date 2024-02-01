import {Form, useNavigate, useLoaderData, useActionData, redirect} from 'react-router-dom';
import { obtenerCliente } from "../data/clientes"
import Formulario from "../components/Formulario"
import {actualizarCliente } from "../data/clientes"
import Error from '../components/Error';

export async function loader({params}) {
 const cliente = await   obtenerCliente(params.clienteId)
 // Si el cliente no existe
  if(Object.values(cliente).length === 0) {
    throw new Response('',
      {
        status: 404,
        statusText: 'El cliente no fue encontrado'
      }
    )
  }
 return cliente;
}


export async function action({request,params}){
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

    //Actualizar datos
    await actualizarCliente(params.clienteId, datos);

    return redirect('/');
}


const EditarCliente = () => {

    const navigate = useNavigate();
    const cliente = useLoaderData();
    const errores = useActionData();

  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Editar Cliente</h1>    
      <p className="mt-3">Puedes modificar los datos de un cliente.</p>

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
        <Formulario cliente={cliente}/>
          <input type="submit"
          className="p-3 mt-5 w-full text-white uppercase font-bold hover:bg-blue-900 bg-blue-800 rounded" value={"Guardar Cambios"}
          />
        </Form>
        </div>
     
  </> 
  )
}

export default EditarCliente