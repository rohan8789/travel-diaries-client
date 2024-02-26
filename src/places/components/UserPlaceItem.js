import React, {useState, useContext} from 'react'
import Map, {NavigationControl, Marker} from 'react-map-gl';
import maplibregl from 'maplibre-gl'
import "maplibre-gl/dist/maplibre-gl.css";

import Modal from '../../shared/components/UIElements/Modal';
import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/FormElements/Button';
import { AuthContext } from '../../shared/context/auth-context';

import './place.css'

const UserPlaceItem = (props) => {
  const auth = useContext(AuthContext);
  console.log(auth);
  const [showMap, setShowMap] = useState(false);
  const [show, setShow] = useState(false);

  const confirmDelete = () =>{
    console.log('deleting...');
    setShow(!show);
  }
  console.log(props);
  return (
    <>
      {showMap && (
        <Modal header={props.address}
          footer={
            <Button className="btn-shared close-btn" onClick={() => setShowMap(false)}>
              Close
            </Button>
          }
        >
          <div className="map-container">
            <Map mapLib={maplibregl}
              initialViewState={{
                latitude: 30.7057121,
                longitude: 76.7983604,
                zoom: 14,
              }}
              style={{ width: "200%", height: "170%" }}
              mapStyle="https://api.maptiler.com/maps/streets/style.json?key=y3GcPY2EUHpHx380p0CN"
            >
              <NavigationControl position="top-left" />
              <Marker latitude={30.7057121} longitude={76.7983604}/>
            </Map>
          </div>
        </Modal>
      )}

      {show &&(
        <Modal
          className="delete-overlay"
          header="Are you Sure You want to delete this Post"
          footer={ <>
              <Button className="btn-shared close-btn" onClick={confirmDelete}>
                Delete
              </Button>
              <Button className="btn-shared close-btn" onClick={() => setShow(false)}>
                Cancel
              </Button>
          </>}
        />
      )}

      <li className="li-item li-items">
        <Card className="extended">
          <div className="image-div">
            <img src={props.image} alt="" className="image-class" />
          </div>
          <div className="card-content">
            <h1>{props.title}</h1>
            <p>{props.Description}</p>
          </div>
          <div className="btn-div">
            <Button id="btn-1" className="btn-shared" onClick={() => setShowMap(true)}>
              View Map
            </Button>
            {auth.isLoggedIn && <>
              <Button id="btn-2" className="btn-shared" to={`/places/${props.placeId}`}>
                Edit
              </Button>
              <Button id="btn-3" className="btn-shared" onClick={() => setShow(true)}>
                Delete
              </Button>
            </>
            }
          </div>
        </Card>
      </li>
    </>
  );
}

export default UserPlaceItem