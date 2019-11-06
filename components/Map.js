import React, { Component } from 'react';

const API = 'https://maps.walthamstuff.com/api/index.php/locations';

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      venues: [],
    };
  }
  componentDidMount() {
    fetch(API)
      .then(response => response.json())
      .then(data => this.setState({ venues: data }));
  }

  render() {
    const { venues } = this.state;
    console.log(venues)
    return (
      <section className="Venues">
        <ul className="Venues-list" id="venue-list">
          {venues.map(venue =>
            <li key={venue.id} className="Venues-listItem">
              <a href={`venue.html?id=${venue.id}`} id={`venue-${venue.id}`}>
                <h4>{venue.name}</h4>
                <p className="Venues-listDescription">{venue.description}</p>
              </a>
            </li>
          )}
        </ul>
      </section>
    );
  }
}
  
export default Map