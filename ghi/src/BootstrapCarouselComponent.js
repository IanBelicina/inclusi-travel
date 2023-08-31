import React from "react";

import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

class BootstrapCarouselComponent extends React.Component {
  render() {
    return (
      <div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12"></div>
          </div>
          <div className="row">
            <div className="col-12">
              <Carousel>
                <Carousel.Item>
                  <img
                    className="d-block w-100 rounded-carousel-image"
                    src="https://images.pexels.com/photos/3791664/pexels-photo-3791664.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="First slide"
                  />
                  <Carousel.Caption>
                    <div className="transparent-background">
                      <h3 className="carousel-text">Empower Every Journey</h3>
                      <p className="carousel-text">Empowering independence.</p>
                    </div>
                  </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item>
                  <img
                    className="d-block w-100 rounded-carousel-image"
                    src="https://images.pexels.com/photos/8415981/pexels-photo-8415981.jpeg"
                    alt="Second slide"
                  />

                  <Carousel.Caption>
                    <div className="transparent-background">
                      <h3 className="carousel-text">Navigate Without Limits</h3>
                      <p className="carousel-text">
                        The world remains accessible.
                      </p>
                    </div>
                  </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item>
                  <img
                    className="d-block w-100 rounded-carousel-image"
                    src="https://images.pexels.com/photos/8327520/pexels-photo-8327520.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    alt="Third slide"
                  />
                  <Carousel.Caption>
                    <div className="transparent-background">
                      <h3 className="carousel-text">
                        Beyond Barriers, Together
                      </h3>
                      <p className="carousel-text">
                        Collaborate together to put your mind at ease
                      </p>
                    </div>
                  </Carousel.Caption>
                </Carousel.Item>
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default BootstrapCarouselComponent;
