import "./styles/Card.css";

const Card = (props) => {
  return (
    <>
      <div className="box">
        <div className="top">
          <img src={props.url} alt="no img" />
          <span>
            <i className="fas fa-heart"></i>
            <i className="fas fa-exchange-alt"></i>
          </span>
        </div>
        <div className="bottom">
          <h3>{props.name}</h3>
          <p>{props.description}</p>
          <div className="advants">
            <div>
              <span>Bedrooms</span>
              <div>
                <i className="fas fa-th-large"></i>
                <span>{props.bedrooms}</span>
              </div>
            </div>
            <div>
              <span>Bathrooms</span>
              <div>
                <i className="fas fa-shower"></i>
                <span>{props.bathrooms}</span>
              </div>
            </div>
            <div>
              <span>Area</span>
              <div>
                <i className="fas fa-vector-square"></i>
                <span>
                  {props.area}
                  <span>Sq Ft</span>
                </span>
              </div>
            </div>
          </div>
          <div className="price">
            <span>For {props.todo}</span>
            <span>&#8377;{props.price}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
