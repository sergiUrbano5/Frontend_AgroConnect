
import React, { useState, useRef } from 'react';
import RenderMap from './MapRender';

export const Devices = ({ devices }) => {
    const [favoritos, setFavoritos] = useState([]);
    const [elementoEditado, setElementoEditado] = useState(null);
    const alertRef = useRef(null);
    const loadingRef = useRef(null);
    const renderMapRef = useRef(null);

    const handleSetMapView = (elemento) => {
        if (renderMapRef.current) {
            renderMapRef.current.setMapView(elemento);
        }
    };
    //Devices
    if (!Array.isArray(devices)) {
        devices = [devices]
    }

    devices.sort((a, b) => (a.favourite === b.favourite ? 0 : a.favourite ? -1 : 1));

    const toggleFavorito = async (elemento) => {
        const device_id = elemento.id
        try {

            const response = await fetch('http://127.0.0.1:8000/favDevice', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ device_id }),
            });
            if (response.status === 200) {
                const json = await response.json();
                const data = json[0]
                console.log(data)

                if (data.status_code === 200) {
                    window.location.reload()

                }
                else if (data.status_code === 404) {
                    alertRef.current.textContent = data.body
                    alertRef.current.classList.remove('hidden');
                    return
                }

            }
            alertRef.current.textContent = "S'ha produit un error, torni a provar"
            alertRef.current.classList.remove('hidden');

        } catch (error) {
            alertRef.current.textContent = "S'ha produit un error, torni a provar"
            alertRef.current.classList.remove('hidden');
        } finally {
            loadingRef.current.classList.add('hidden')
        }
    };

    const handleEditar = (elemento) => {
        setElementoEditado(elemento);
    };

    const handleGuardar = async (event) => {
        event.preventDefault();
        loadingRef.current.classList.remove('hidden')
        alertRef.current.classList.add('hidden');
        try {

            const response = await fetch('http://127.0.0.1:8000/updateDevice', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...elementoEditado }),
            });
            if (response.status === 200) {
                const json = await response.json();
                const data = json[0]

                if (data.status_code === 200) {
                    window.location.reload()
                }
                else if (data.status_code === 404) {
                    alertRef.current.textContent = data.body
                    alertRef.current.classList.remove('hidden');
                    return
                }

            }
            alertRef.current.textContent = "S'ha produit un error, torni a provar"
            alertRef.current.classList.remove('hidden');

        } catch (error) {
            alertRef.current.textContent = "S'ha produit un error, torni a provar"
            alertRef.current.classList.remove('hidden');
        } finally {
            loadingRef.current.classList.add('hidden')
        }
    };

    const handleEliminar = async (elemento) => {
       
        console.log(elemento)
        const device_id = elemento.id
       
        try {

            const response = await fetch('http://127.0.0.1:8000/delDevice', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ device_id }),
            });
            if (response.status === 200) {
                const json = await response.json();
                const data = json[0]

                if (data.status_code === 200) {
                    window.location.reload()
                }
                else if (data.status_code === 404) {
                   
                    return
                }

            }

        } catch (error) {

        } finally {

        }
    };

    return (
        <>
            <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
                <table className='w-full text-sm text-left rtl:text-right text-gray-500'>
                    <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
                        <tr>
                            <th scope='col' className='px-6 py-3'>Nom</th>
                            <th scope='col' className='px-6 py-3'>Descripció</th>
                            <th scope='col' className='px-6 py-3'>DEVEUI</th>
                            <th scope='col' className='px-6 py-3'>Latitut</th>
                            <th scope='col' className='px-6 py-3'>Longitut</th>
                            <th scope='col' className='px-6 py-3'></th>
                        </tr>
                    </thead>
                    <tbody>
                        {devices.map((elemento, index) => (
                            <tr className='bg-white border-b hover:bg-gray-50' key={index} onClick={() => handleSetMapView(elemento)}>
                                <th scope="row" className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap'>{elemento.alias}</th>
                                <td className="px-6 py-4">{elemento.description}</td>
                                <td className="px-6 py-4">{elemento.deveui}</td>
                                <td className="px-6 py-4">{elemento.latitude}</td>
                                <td className="px-6 py-4">{elemento.length}</td>
                                <td className='px-6 py-4 text-center'>
                                    <button className='px-6' onClick={() => toggleFavorito(elemento)}>
                                        {
                                            elemento.favourite == false &&
                                            <svg id='star' xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-star-filled text-gray-600 opacity-15  hover:text-yellow-400 hover:opacity-100" width="34" height="34" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                <path d="M8.243 7.34l-6.38 .925l-.113 .023a1 1 0 0 0 -.44 1.684l4.622 4.499l-1.09 6.355l-.013 .11a1 1 0 0 0 1.464 .944l5.706 -3l5.693 3l.1 .046a1 1 0 0 0 1.352 -1.1l-1.091 -6.355l4.624 -4.5l.078 -.085a1 1 0 0 0 -.633 -1.62l-6.38 -.926l-2.852 -5.78a1 1 0 0 0 -1.794 0l-2.853 5.78z" strokeWidth="0" fill="currentColor" />
                                            </svg>
                                        }
                                        {
                                            elemento.favourite == true &&
                                            <svg id='star' xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-star-filled hover:text-gray-600 hover:opacity-15  text-yellow-400 opacity-100" width="34" height="34" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                <path d="M8.243 7.34l-6.38 .925l-.113 .023a1 1 0 0 0 -.44 1.684l4.622 4.499l-1.09 6.355l-.013 .11a1 1 0 0 0 1.464 .944l5.706 -3l5.693 3l.1 .046a1 1 0 0 0 1.352 -1.1l-1.091 -6.355l4.624 -4.5l.078 -.085a1 1 0 0 0 -.633 -1.62l-6.38 -.926l-2.852 -5.78a1 1 0 0 0 -1.794 0l-2.853 5.78z" strokeWidth="0" fill="currentColor" />
                                            </svg>
                                        }

                                    </button>
                                    <button onClick={() => handleEditar(elemento)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-edit hover:opacity-30 text-blue-500" width="34" height="34" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                            <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
                                            <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
                                            <path d="M16 5l3 3" />
                                        </svg>
                                    </button>
                                    <button className='px-6' onClick={() => handleEliminar(elemento)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-trash-x-filled hover:opacity-30" width="34" height="34" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ff2825" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                            <path d="M20 6a1 1 0 0 1 .117 1.993l-.117 .007h-.081l-.919 11a3 3 0 0 1 -2.824 2.995l-.176 .005h-8c-1.598 0 -2.904 -1.249 -2.992 -2.75l-.005 -.167l-.923 -11.083h-.08a1 1 0 0 1 -.117 -1.993l.117 -.007h16zm-9.489 5.14a1 1 0 0 0 -1.218 1.567l1.292 1.293l-1.292 1.293l-.083 .094a1 1 0 0 0 1.497 1.32l1.293 -1.292l1.293 1.292l.094 .083a1 1 0 0 0 1.32 -1.497l-1.292 -1.293l1.292 -1.293l.083 -.094a1 1 0 0 0 -1.497 -1.32l-1.293 1.292l-1.293 -1.292l-.094 -.083z" strokeWidth="0" fill="#ff2825" />
                                            <path d="M14 2a2 2 0 0 1 2 2a1 1 0 0 1 -1.993 .117l-.007 -.117h-4l-.007 .117a1 1 0 0 1 -1.993 -.117a2 2 0 0 1 1.85 -1.995l.15 -.005h4z" strokeWidth="0" fill="#ff2825" />
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {elementoEditado && (
                <div className="popup fixed top-0 left-0 right-0 bottom-0 flex z-50 items-center justify-center">
                    <div className="popup-inner bg-blue-50 p-6 rounded shadow-lg">
                        <h2 className='text-lg font-semibold mb-4 text-black'>Editar Aparell</h2>
                        <form className='max-w-sm mx-auto text-black' onSubmit={handleGuardar}>
                            <div id='alert' ref={alertRef} className='hidden animate-fade-in p-1 bg-red-200 rounded-lg w-auto text-red-900 text-center'>
                            </div>
                            <label className="block py-2">
                                Nom de l'aparell:
                                <input
                                    type="text"
                                    value={elementoEditado.alias}
                                    onChange={(event) =>
                                        setElementoEditado({ ...elementoEditado, alias: event.target.value })
                                    }
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    required
                                />
                            </label>
                            <label className="block py-2">
                                Descripció:
                                <textarea
                                    value={elementoEditado.description}
                                    onChange={(event) =>
                                        setElementoEditado({ ...elementoEditado, description: event.target.value })
                                    }
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    required
                                />
                            </label>
                            <label htmlFor="deveui" className="block py-2">
                                DEVEUI
                            </label>
                            <input
                                type="text"
                                value={elementoEditado.deveui}
                                onChange={(event) =>
                                    setElementoEditado({ ...elementoEditado, deveui: event.target.value })
                                }
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                required
                            />
                            <div className='grid grid-cols-2 gap-4'>
                                <div>
                                    <label htmlFor="latitude" className="block py-2">
                                        Latitut
                                    </label>
                                    <input
                                        type="text"
                                        value={elementoEditado.latitude}
                                        onChange={(event) =>
                                            setElementoEditado({ ...elementoEditado, latitude: event.target.value })
                                        }
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="length" className="block py-2">
                                        Longitut
                                    </label>
                                    <input
                                        type="text"
                                        value={elementoEditado.length}
                                        onChange={(event) =>
                                            setElementoEditado({ ...elementoEditado, length: event.target.value })
                                        }
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        required
                                    />
                                </div>

                            </div>
                            <div className='flex'>
                                <div className='me-8'>
                                    <button
                                        type="submit"
                                        className="my-6 flex items-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" ref={loadingRef} className="hidden animate-spin icon icon-tabler icon-tabler-loader-2 h-6 w-6 me-3" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                            <path d="M12 3a9 9 0 1 0 9 9" />
                                        </svg>
                                        <p>Guardar</p>

                                    </button>
                                </div>
                                <div>
                                    <button className='my-6 flex items-center text-white bg-gray-700 hover:bg-gray-400 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center' onClick={() => setElementoEditado(null)}>Cancelar</button>

                                </div>

                            </div>
                        </form>
                    </div>
                </div>
            )}
            <RenderMap ref={renderMapRef} devices={devices} />
        </>
    );
};