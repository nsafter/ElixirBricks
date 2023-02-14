import "./styles/About.css";
import img1 from "../assets/img2.jpg";
import img2 from "../assets/img3.jpg";
import img3 from "../assets/img4.jpg";
import tick from "../assets/tick.png";
import Navbar from "../components/Navbar";

const About = () => {
  return (
    <>
      <Navbar />
      <div className="about-container">
        <div className="cont-inner-div">
          <center className="animate__animated animate__fadeInUp animate__slow">
            About Us
          </center>
        </div>
      </div>

      <div className="about-second-container">
        <div className="about-innerdiv">
          <img
            src={img1}
            className="img1 animate__animated animate__fadeInLeft animate__slow"
            alt="noimg"
          />
          <p className="about-info-div animate__animated animate__fadeInLeft animate__slow">
            <h5 className="about-div-title">WE PROMISE TO ....</h5>
            Handle all your sales and purchases activities, manage invoices and
            bills, and track payments. MyWorld Inventory also helps you monitor
            packages and shipments to keep your deliveries on time.
            <ul>
              <li>
                <img src={tick} alt="noimg" />
                Low-, mid-and skyscraper apartment suites and cooperatives
              </li>
              <li>
                <img src={tick} alt="noimg" />
                Single-family property holders affiliations (HOAs)
              </li>
              <li>
                <img src={tick} alt="noimg" />
                Vast scale ace arranged networks
              </li>
              <li>
                <img src={tick} alt="noimg" />
                Way of life and dynamic grown-up networks
              </li>
            </ul>
          </p>
        </div>
        <hr />
        <div className="about-innerdiv">
          <p className="about-info-div1 animate__animated animate__fadeInRight animate__slower">
            <h5 className="about-div-title">OUR USP</h5>
            We likewise have an extraordinary aptitude for working with complex
            networks with huge spending plans and offering various enhancements
            to their occupants. Likewise, we oversee business affiliations and
            blended-use advancements, just as multi-family and financial
            specialists claimed rental and REO properties for institutional and
            private value customers.
            <ul>
              <li>
                <img src={tick} alt="noimg" />
                convey excellent administration and arrangements
              </li>
              <li>
                <img src={tick} alt="noimg" />
                upgrade the estimation of each property
              </li>
              <li>
                <img src={tick} alt="noimg" />
                life of each inhabitant is our consideration.
              </li>
            </ul>
          </p>
          <img
            src={img2}
            className="img2 animate__animated animate__fadeInRight animate__slower"
            alt="noimg"
          />
        </div>
        <hr />
        <div className="about-innerdiv">
          <img
            src={img3}
            className="img1 animate__animated animate__fadeInLeft animate__slower"
            alt="noimg"
          />
          <p className="about-info-div animate__animated animate__fadeInLeft animate__slower">
            <h5 className="about-div-title">
              OUR AGENDA AND GOALS FOR NEARFUTURE
            </h5>
            By creating noteworthy contributions, ElixirBricks has increased
            present expectations for quality and administration brilliance. What
            is more, we constantly seek approaches to improve our
            administrations even.
            <ul>
              <li>
                <img src={tick} alt="noimg" />
                keeps a neighborhood nearness wherever we oversee networks
              </li>
              <li>
                <img src={tick} alt="noimg" />
                Comprehend the neighborhood culture
              </li>
              <li>
                <img src={tick} alt="noimg" />
                When you choose to band together with us, the main thing we do
                is tune in.
              </li>
            </ul>
          </p>
        </div>
      </div>
    </>
  );
};

export default About;
