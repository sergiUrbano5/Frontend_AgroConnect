import React, { useState, useRef } from 'react';

export function SignupForm() {
    const alertRef = useRef(null);
    const loadingRef = useRef(null);
    const [name, setName] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        loadingRef.current.classList.remove('hidden')
        alertRef.current.classList.add('hidden');
        try {

            const response = await fetch('http://127.0.0.1:8000/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, name }),
            });
            if (response.status === 200) {
                const json = await response.json();
                const data = json[0]
                console.log(data)

                if (data.status_code === 200) {
                    window.location.replace('/login')
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
            setPassword("")
        }
    };

    return (
        <>

            <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
                <div id='alert' ref={alertRef} className='hidden animate-fade-in p-1 bg-red-200 rounded-lg w-auto text-red-900 text-center'>
                </div>
                <label htmlFor="name" className="block py-6">
                    Nom complet
                </label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Nom, Cognom"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    required
                />
                <label htmlFor="email" className="block py-6">
                    Correu Electrónic
                </label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="example@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    required
                />
                <label htmlFor="password" className="block py-6">
                    Contrasenya
                </label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    required
                />
                <button
                    type="submit"
                    className="my-6 flex items-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" ref={loadingRef} className="hidden animate-spin icon icon-tabler icon-tabler-loader-2 h-6 w-6 me-3" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M12 3a9 9 0 1 0 9 9" />
                    </svg>
                    <p>Registrarme</p>

                </button>
            </form>
        </>

    );
}
