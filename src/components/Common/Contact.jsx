export default function Contact() {

    document.title = "Contact Us";

    return (
        <div className="content-container">
            <div className="footer-component">
                <div>
                    <img src="https://wallpaperaccess.com/contact.jpg" alt="" />
                </div>
                <div>
                    <h2>We'd love to hear from you!</h2>
                    <p>
                        Using the following online form you can contact us to <strong>suggest new wallpapers</strong> for our collection or <strong>share ideas</strong> about how to improve this website. Thanks for all your suggestions and contributions!.
                    </p>
                    <form className="form-contact">
                        <input type="text" placeholder="Your name"/>
                        <input type="email" placeholder="Your e-mail"/>
                        <textarea name="" id="" style={{height:"80px"}} placeholder="Your message"></textarea>
                        <button style={{
                            cursor: "pointer",
                            width: "100px",
                            height: "30px",
                            textAlign: "center",
                        }}>
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
