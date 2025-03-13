import fssaiLogo from '../images/fssai_logo.avif';


const Footer = () => (
    <div className="footer fixed-footer">
        <img src={fssaiLogo} alt="FSSAI Logo" className="fssai-logo" />
        <div>
            <p>FSSAI License No: 12345678901234</p>
            <p>Address: 123 Food Street, Connaught place, New Delhi</p>
        </div>
    </div>
);

export default Footer;