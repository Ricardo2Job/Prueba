// src/vista/Footer.js
import React, { useEffect, useState } from 'react';
import './StyleFooter.css'; // Estilos del footer

const Footer = () => {
    const [isAtBottom, setIsAtBottom] = useState(false);

    // Verificar si el usuario está al final de la página
    const handleScroll = () => {
        const bottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight;
        setIsAtBottom(bottom);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        // Limpiar el evento al desmontar el componente
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className={`footer ${isAtBottom ? 'visible' : 'hidden'}`}>
            <p>© 2024 Mi Biblioteca. Todos los derechos reservados.</p>
        </div>
    );
};

export default Footer;
