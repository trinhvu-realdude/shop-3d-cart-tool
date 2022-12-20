import "./Footer.css"

function Footer() {
    return (
        <footer className="footer">
            <div className="divider"></div>
            <div className="footer-container">
                <div className="social-list">
                    <div>
                        <a href="https://www.facebook.com/trinhvu.realdude/" target="_blank" rel="noreferrer">
                            <i className="fa fa-facebook"></i>
                        </a>
                    </div>
                    <div>
                        <a href="https://www.instagram.com/vu.dang.trinh/" target="_blank" rel="noreferrer">
                            <i className="fa fa-instagram"></i>
                        </a>
                    </div>
                    <div>
                        <a href="https://github.com/trinhvu-realdude/" target="_blank" rel="noreferrer">
                            <i className="fa fa-github"></i>
                        </a>
                    </div>
                    <div>
                        <a href="https://www.linkedin.com/in/trinh-vu-359a32237/" target="_blank" rel="noreferrer">
                            <i className="fa fa-linkedin"></i>
                        </a>
                    </div>
                </div>
                <div className="content-list">
                    <ul>
                        <li><a href="/#">About us</a></li>
                        <li><a href="/#">Contact</a></li>
                        <li><a href="/#">Terms of Use</a></li>
                        <li><a href="/#">Privacy Policy</a></li>
                    </ul>
                </div>
                <div className="copyright">
                    <p>
                        <a href="/">WallpaperParadise</a> © 2022 - Wallpapers are for personal use only.
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;