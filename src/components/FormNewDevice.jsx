import React, { useState, useRef } from 'react';

export function CreateDeviceForm() {
    const alertRef = useRef(null);
    const loadingRef = useRef(null);
    const [alias, setAlias] = useState("")
    const [description, setDescription] = useState("");
    const [deveui, setDeveui] = useState("");
    const [latitude, setLatitude] = useState("");
    const [length, setLength] = useState("");


    const handleSubmit = async (event) => {
        event.preventDefault();
        loadingRef.current.classList.remove('hidden')
        alertRef.current.classList.add('hidden');
        const jwt = document.cookie.split('=')[1]
        console.log("jwt: ", jwt)
        try {

            const response = await fetch('http://127.0.0.1:8000/createDevice', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ alias, description, deveui: deveui, latitude, length, jwt }),
            });
            if (response.status === 200) {
                const json = await response.json();
                const data = json[0]
                console.log(data)

                if (data.status_code === 200) {
                    window.location.replace('/dashboard')
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

    return (
        <>

            <form onSubmit={handleSubmit} className="max-w-sm mx-auto text-black">
                <div id='alert' ref={alertRef} className='hidden animate-fade-in p-1 bg-red-200 rounded-lg w-auto text-red-900 text-center'>
                </div>
                <label htmlFor="alias" className="block py-2">
                    Nom de l'aparell
                </label>
                <input
                    type="text"
                    name="alias"
                    id="alias"
                    placeholder=""
                    value={alias}
                    onChange={(e) => setAlias(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    required
                />
                <label htmlFor="description" className="block py-2">
                Descripció:
                </label>
                <textarea
                    type="text"
                    name="description"
                    id="description"
                    placeholder=""
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    required
                ></textarea>
                <label htmlFor="deveui" className="block py-2">
                    DEVEUI
                </label>
                <input
                    type="text"
                    name="deveui"
                    id="deveui"
                    value={deveui}
                    onChange={(e) => setDeveui(e.target.value)}
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
                            name="latitude"
                            id="latitude"
                            placeholder=""
                            value={latitude}
                            onChange={(e) => setLatitude(e.target.value)}
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
                            name="length"
                            id="length"
                            placeholder=""
                            value={length}
                            onChange={(e) => setLength(e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            required
                        />
                    </div>

                </div>
                <button
                    type="submit"
                    className="my-6 flex items-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" ref={loadingRef} className="hidden animate-spin icon icon-tabler icon-tabler-loader-2 h-6 w-6 me-3" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M12 3a9 9 0 1 0 9 9" />
                    </svg>
                    <p>Crear</p>

                </button>
            </form>
        </>

    );
}