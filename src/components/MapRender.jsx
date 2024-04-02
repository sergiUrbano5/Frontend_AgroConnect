import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Map, marker, tileLayer } from 'leaflet';
import "../../public/css/Map.css"

const RenderMap = forwardRef(({devices}, ref) =>{
    const [map, setMap] = useState();
    const mapInit = useRef(false);
    const initMap = () => {
        map && tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
    }
    const addMarkers = () => {
        devices.map((location) =>
            marker([location.latitude, location.length])
                .addTo(map)
                .bindPopup(
                    `<b>${location.alias}</b><br>Location: LAT: ${location.latitude}, LNG: ${location.length}`
                )
        );
    };
    const setMapView = (elemento) => {
        map.setView([elemento.latitude, elemento.length], 15)

    }
    var popup = L.popup();
    let latlng
    function onMapClick(e) {
        latlng = e.latlng;
        popup
            .setLatLng(latlng)
            .setContent(`<p>Latitut: ${latlng.lat} <br> Longitut: ${latlng.lng}</p> <br> <button id="btnMapAdd" class="bg-slate-500 rounded-lg p-2 text-white">Nou Aparell</button>`)
            .openOn(map);

        const btnMapAdd = document.getElementById('btnMapAdd');
        if (btnMapAdd) {
            btnMapAdd.addEventListener('click', renderForm);
        }
    }
    function renderForm() {
        console.log(latlng)
        document.getElementById("popupContainer")?.classList.remove("hidden");
        document.getElementById("latitude").value = latlng.lat
        document.getElementById("length").value = latlng.lng
    }
    map?.addEventListener('click', onMapClick);

    useEffect(() => {
        if (!mapInit.current) {
            // Damos por inicializado el mapa
            mapInit.current = true;
            // Asignamos el contenedor del mapa
            setMap(
                new Map('map', {
                    center: [40.413270, -3.659635], // Centramos en Madrid
                    zoom: 6,
                }).setView([40.413270, -3.659635]) // Madrid
            )
        }
        if (map) {
            initMap();
            addMarkers();
        }
    }, [mapInit, map]);

    useImperativeHandle(ref, () => ({
        setMapView: setMapView
    }));

    return(
        <div id="map" className="z-0 mt-20">

        </div>
    )
})
export default RenderMap;