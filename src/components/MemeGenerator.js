import React, { Component } from 'react'

class MemeGenerator extends Component {
  constructor() {
    super()
    this.state = {
      topText: "",
      bottomText: "",
      randomImg: "http://i.imgflip.com/1bij.jpg",
      allMemeImgs: []
    }
  // Bind our methods to the class.
  this.handleChange = this.handleChange.bind(this)
  this.handleSubmit = this.handleSubmit.bind(this)
  }

  // Method that will run when our site has finished loading.
  componentDidMount() {
    // Petition to the API.
    fetch('https://api.imgflip.com/get_memes')
    // Turn the response into a .json.
      .then(response => response.json())
      // From response .data get all the memes.
      .then(response => {
        const { memes } = response.data
        // Set the state property of allMemeImgs to the data from the petition.
        this.setState({ allMemeImgs: memes })
    })
  }

  // Handle the change in our form. Controlled form.
  handleChange(event) {
    const { name, value } = event.target
    this.setState({ [name]: value })
  }

  // When the form is submit, get a random image from allMemeImgs and set the state property of randomImg
  // to this new value.
  handleSubmit(event) {
    event.preventDefault()
    const randomNumber = Math.floor(Math.random() * this.state.allMemeImgs.length)
    this.setState({
      randomImg: this.state.allMemeImgs[randomNumber].url
    })
  }

  render() {
    return (
      <div>
        <form className="meme-form" onSubmit={this.handleSubmit}>
          <input 
            type="text"
            name="topText" 
            placeholder="Top text"
            value={this.state.topText} 
            onChange={this.handleChange} 
          />
          <input 
            type="text" 
            name="bottomText"
            placeholder="Bottom text"
            value={this.state.bottomText} 
            onChange={this.handleChange} 
          />
          <button>Gen</button>
        </form>
        <div className="meme">
          <img src={this.state.randomImg} alt="" />
          <h2 className="top">{this.state.topText}</h2>
          <h2 className="bottom">{this.state.bottomText}</h2>
        </div>
      </div>
    )
  }
}

export default MemeGenerator