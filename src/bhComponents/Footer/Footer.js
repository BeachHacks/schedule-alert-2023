import "./Footer.css"

const Footer = () => {
    return ( 
    <footer>
        <div className = "social">
            <a href="https://www.instagram.com/beachhackscsulb/" target="blank"><i className="fab fa-instagram"></i></a>&nbsp;&nbsp;
            <a href="https://twitter.com/beachhackscsulb" target="blank"><i className="fab fa-twitter"></i></a>&nbsp;&nbsp;
            <a href="https://www.linkedin.com/company/beachhacks/" target="blank"><i className="fab fa-linkedin"></i></a>
        </div>
        <hr className="footer-divider" />   
        <div className="footer-bottom">
            <h3>Made by Team BeachHacks</h3>
        </div>
    </footer>);
};

export default Footer;