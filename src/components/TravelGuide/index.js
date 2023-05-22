import {Component} from 'react'

import Loader from 'react-loader-spinner'

import DestinationCard from '../DestinationCard'

import './index.css'

class TravelGuide extends Component {
  state = {
    isLoading: true,
    data: [],
  }

  componentDidMount() {
    this.getDestinationDetails()
  }

  getDestinationDetails = async () => {
    this.setState({isLoading: true})
    const apiUrl = 'https://apis.ccbp.in/tg/packages'
    const options = {
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.packages.map(eachDestination => ({
        id: eachDestination.id,
        name: eachDestination.name,
        imageUrl: eachDestination.image_url,
        description: eachDestination.description,
      }))
      this.setState({
        data: updatedData,
        isLoading: false,
      })
    }
  }

  renderLoadingView = () => (
    <div data-testid="loader">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderSuccessView = () => {
    const {data} = this.state
    return (
      <div className="container">
        <h1 className="heading">Travel Guide</h1>
        <hr className="line" />
        <ul className="packages-list">
          {data.map(eachItem => (
            <DestinationCard key={eachItem.id} itemDetails={eachItem} />
          ))}
        </ul>
      </div>
    )
  }

  render() {
    const {isLoading} = this.state
    return (
      <div className="app-container">
        {isLoading ? this.renderLoadingView() : this.renderSuccessView()}
      </div>
    )
  }
}

export default TravelGuide
