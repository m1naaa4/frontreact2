import React from 'react'

function HeaderLogo() {
    return (
        <div>
            <header className="login-header">
                <a href={`${process.env.REACT_APP_FRONT_URL}`}>
                    <img src="/assets/images/dadupa-brand.svg" alt="Dadupa Connect"/>
                </a>
            </header>
        </div>
    )
}

export default HeaderLogo;
