import { useNavigate, Form, redirect } from "react-router-dom";
import { eliminarCliente } from "../data/clientes";

export async function  action({params}){
    await eliminarCliente(params.clienteId);
    return redirect('/');
}

const Cliente = ({cliente}) => {
    const Navigate = useNavigate();

    const {nombre, empresa, email, telefono, id} = cliente;
  return (
    <tr className="border-b">
        <td className="p-6">
            <p className="font-bold space-y-2">{nombre}</p>
            <p>{empresa}</p>
        </td>
        <td className="p-6">
            <p className="text-gray-600">
                <span className="text-gray-800 uppercase font-bold">Email: </span>{email}
            </p>
            <p className="text-gray-600">
                <span className="text-gray-800 uppercase font-bold">Tel: </span>{telefono}
            </p>
        </td>
        <td className="p-6 flex items-center justify-center gap-3">
            <button type="button" className="bg-blue-300 p-3 rounded text-blue-600 hover:text-blue-700 font-bold text-xs uppercase"
            onClick={() => Navigate(`/clientes/${id}/editar`)}
            >Editar</button>

            <Form method="post" 
            action={`/clientes/${id}/eliminar`}
            onSubmit={(e)=> {
                if(!confirm('¿Deseas eliminar este cliente?')){
                    e.preventDefault();
                }
            }}
            >
                 <button type="submit" className=" bg-red-300 p-3 rounded text-red-600 hover:text-red-700 font-bold text-xs uppercase">Eliminar</button>
            </Form>
           
        </td>
    </tr>
  )
}

export default Cliente