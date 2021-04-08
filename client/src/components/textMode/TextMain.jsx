import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from '../Header';
import TextMainPosts from './mainPosts/TextMainPosts';
import './TextMain.css';

class TextMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdown: false,
      sortBy: 'popular',
      dataToDisplay: [],
    };
    this.getTopSix = this.getTopSix.bind(this);
    this.showDropdown = this.showDropdown.bind(this);
    this.closeDropdown = this.closeDropdown.bind(this);
  }

  componentDidMount() {
    this.getTopSix();
  }

  getTopSix() {
    const { sortBy } = this.state;

    axios
      .get(`/textmode/${sortBy}`)
      .then(({ data }) => {
        console.log('Data Received By TextMainPosts.jsx : ', data);
        this.setState({
          dataToDisplay: data,
        });
      })
      .catch((err) => {
        console.log('ERROR From TextMainPosts.jsx : ', err);
      });
  }

  showDropdown(e) {
    e.preventDefault();

    this.setState({
      dropdown: true,
    });
  }

  closeDropdown(viewSelect) {
    this.setState({
      dropdown: false,
      sortBy: viewSelect,
    }, () => {
      this.getTopSix();
    });
  }

  render() {
    const { dataToDisplay, dropdown } = this.state;

    return (
      <div className="text-main">
        <Header />
        <div className="text-main-controllers">
          <div className="dropdown">
            <button type="button" className="dropbtn" onClick={this.showDropdown}>DROPDOWN</button>
            {
                dropdown ? (
                  <div className="dropdown-content">
                    <button type="button" className="drop-option" onClick={() => this.closeDropdown('popular')}>MOST VIEW</button>
                    <button type="button" className="drop-option" onClick={() => this.closeDropdown('mostLike')}>MOST LIKE</button>
                    <button type="button" className="drop-option" onClick={() => this.closeDropdown('recent')}>MOST RECENT</button>
                  </div>
                ) : (
                  null
                )
              }
          </div>
          <div className="create-game">
            <Link to="/textmode/create">
              <button id="create-game-btn" type="button">Create Game!</button>
            </Link>
          </div>

        </div>
        <div className="text-main-posts">
          <TextMainPosts data={dataToDisplay} />
        </div>
      </div>
    );
  }
}

export default TextMain;
