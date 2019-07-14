import React, { Fragment, Component } from "react";
import Moment from "react-moment";
import jsonData from "./sample_data.json";
import { ReactComponent as ClockSVG } from "./svg/clock.svg";
import { ReactComponent as CalendarSVG } from "./svg/calendar.svg";
import { ReactComponent as PinSVG } from "./svg/pin.svg";
import { ReactComponent as ToolTipSVG } from "./svg/tooltip.svg";
import { ReactComponent as StarSVG } from "./svg/star.svg";

const placesCount = val => {
  return `+${val.slice(6).length} more`;
};

const hidePlaces = val => {
  return `${val.slice(0, 6).join(", ")}...`;
};

const revealPlaces = val => {
  return val.join(", ");
};

const render4Stars = () => {
  return (
    <span>
      <StarSVG />
      <StarSVG />
      <StarSVG />
      <StarSVG />
    </span>
  );
};

const render4AndAHalfStars = () => {
  return (
    <span className='star-half'>
      <StarSVG />
      <StarSVG />
      <StarSVG />
      <StarSVG />
    </span>
  );
};

const render5Stars = () => {
  return (
    <span>
      <StarSVG />
      <StarSVG />
      <StarSVG />
      <StarSVG />
      <StarSVG />
    </span>
  );
};

const numberWithCommas = val => {
  return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

class App extends Component {
  state = {
    open: {}
  };

  toggleClick(index) {
    this.setState(state => ({
      open: { ...state.open, [index]: !state.open[index] }
    }));
  }

  render() {
    return (
      <Fragment>
        <header>
          <h2>Select a Tour</h2>
          <p>
            <span>3 tours</span> found
          </p>
        </header>
        <div className='cards'>
          {jsonData.results.map(({ tour_name, image, operator,
            date_start, date_end, duration, itinerary, price, rating }, index) => (
            <div className='card' key={index}>
              <div className='card__img'>
                <img className='card__img--main' src={image} alt={tour_name} />
                <img
                  className='card__img--logo'
                  src={operator[0].logo}
                  alt={operator[0].name}
                />
              </div>

              <div className='card__content'>
                <div className='card__title'>{tour_name}</div>
                <div className='card__rating'>
                  {rating === 4
                    ? render4Stars()
                    : rating === 4.5
                    ? render4AndAHalfStars()
                    : rating === 5
                    ? render5Stars()
                    : null}
                </div>
                <div>
                  <span className='p-1'>
                    <CalendarSVG />
                  </span>
                  <Moment format='DD MMM YYYY'>{date_start}</Moment> -{" "}
                  <Moment format='DD MMM YYYY'>{date_end}</Moment>
                </div>

                <div className='card__days'>
                  <span className='p-1'>
                    <ClockSVG />
                  </span>
                  {""}
                  {duration} days
                </div>

                <div className='card__itinerary'>
                  <span className='p-2'>
                    <PinSVG />
                  </span>
                  <span className={this.state.open[index] ? "hide" : "reveal"}>
                    {hidePlaces(itinerary)}
                  </span>
                  <span className={this.state.open[index] ? "reveal" : "hide"}>
                    {revealPlaces(itinerary)}
                  </span>
                  <button
                    onClick={e => this.toggleClick(index)}
                    className='show-tours'
                  >
                    {this.state.open[index] ? "-" : `${placesCount(itinerary)}`}
                  </button>
                </div>

                <hr />

                <div className='card__info'>
                  <div className='tip'>
                    <span>from</span>
                    <ToolTipSVG tabIndex='1' />
                    <div className='tip__modal'>
                      <p>Prices are per person and in Australian Dollars</p>
                    </div>
                    <div className='price'>
                      <span>$</span>
                      {numberWithCommas(price)}
                    </div>
                  </div>
                  <div>
                    <button>view tour</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Fragment>
    );
  }
}

export default App;
