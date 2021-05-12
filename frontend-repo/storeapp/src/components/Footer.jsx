import React from 'react'
import '../css/footer.css'
const Footer = () => {
    const date = new Date().getFullYear();

    return (
        <div className='footer'>
            <footer >
                <p>&copy;AEMT_{date}</p>
            </footer>
        </div>
    );
};

export default Footer;