import React from 'react'
import config from '../../Config'

function HeaderLogo() {
    return (
        <div>
            <header className="login-header">
                <a href={config.urls.front}>
                    <img src="/assets/images/dadupa-brand.svg" alt="Dadupa Connect"/>
                </a>
            </header>
        </div>
    )
}

export default HeaderLogo;
