import {useRouteError} from 'react-router-dom';

export default function ErrorPage(){
    const error = useRouteError();

    return(
        <div className='space-y-8'>
            <h1 className="text-center text-6xl font-extrabold mt-20 text-blue-900">CRM - Clientes</h1>
            <p className='text-center'>Hubo un error.</p>
            <div className='w-full rounded p-12 bg-red-200'>
            <p className='text-center text-red-600'>{error.statusText || error.message}</p>
            </div>
           
        </div>
    )
}