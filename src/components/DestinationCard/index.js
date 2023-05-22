import './index.css'

const DestinationCard = props => {
  const {itemDetails} = props
  const {name, imageUrl, description} = itemDetails

  return (
    <li className="list-style">
      <img src={imageUrl} alt={name} className="logo" />
      <h1 className="heading">{name}</h1>
      <p className="destination">{description}</p>
    </li>
  )
}

export default DestinationCard
