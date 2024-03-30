import './itemComponent.css'
import { useNavigate } from 'react-router-dom';

export default function ItemComponent({ tool, serialNumber, url }) {
  const navigate = useNavigate();

  return (
    <button className="itemcomponent-main" onClick={() => navigate(`/item/${serialNumber}`)}>
      <h1>
        {tool}
      </h1>
      <h2>
        {serialNumber}
      </h2>
    </button>
  );
}