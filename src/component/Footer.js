export default function Footer() {
    return (
        <div className="container-fluid mt-5">
            <footer className="footer p-3 d-flex flex-column flex-sm-row align-items-center justify-content-between">
                <div>
                    <img 
                        src="/img/CatwikiLogo.svg" 
                        className="footer-logo" 
                    />
                </div>
                <p className="text-white">© create by 
                    <a 
                        href="https://github.com/SonHoang2" 
                        className="footer__link mx-2"
                        target='_blank'
                    >
                        SonHoang2
                    </a>
                </p>
            </footer>
        </div>
    )
}