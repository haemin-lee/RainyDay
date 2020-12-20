import { useState, useEffect } from 'react'
import { Button, Modal, Form } from 'react-bootstrap'
import PlacesAutocomplete from 'react-places-autocomplete';
import get_client from '../../../../api/finastra'

function Bill(props) {
    return (
        <tr>
            <td>{props.title}</td>
            <td>{props.type}</td>
            <td>{props.city}</td>
            <td><a href={props.link}>Translation</a></td>
        </tr>
    )
}

function Pill(props) {
    return (
        <div className="d-flex ml-3 mr-3">
            <div className="loan-pill">{props.children}</div>
        </div>
    )
}

function EditModal(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [search, setSearch] = useState("");
    const handleChange = (searchString) => setSearch(searchString);

    function handleSubmit(e) {
      const location = document.getElementById("location").value;
      props.workers[1](Number(document.getElementById("numWorkers").value));
      props.location[1](location);
      props.annualRevenue[1](Number(document.getElementById("annualRevenue").value));

      //fetch new data
      async function get_data() {
        const client = get_client(); 

        // Parse for zip code
        var indices = [];
        var i = 0;
        while (indices.length != 2) {
          if (location[i] == ",") indices.push(i);
          i++;
        }
        const zip = location.substring(indices[0]+5, indices[1]);
        const d = await client.loans.get_loans(zip);
        props.data[1](d["data"]["hit"]);
      }
      get_data()

      e.preventDefault();
      handleClose();
    }

    return (
        <div>
          <Button variant="primary" onClick={handleShow}>
            Edit
          </Button>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Edit your information</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                  <Form.Group controlId="formNumWorkers">
                    <Form.Label>Number of workers</Form.Label>
                    <Form.Control placeholder="Enter number" type="number" id="numWorkers"/>
                  </Form.Group>

                <Form.Group> 
                <Form.Label>City (search by zip code)</Form.Label>
                <PlacesAutocomplete
                    value={search}
                    onChange={handleChange}
                  >
                    {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                      <div>
                        <input
                          {...getInputProps({
                            placeholder: 'Search Places ...',
                            className: 'location-search-input',
                            id: 'location'
                          })}
                        />
                        <div className="autocomplete-dropdown-container">
                          {loading && <div>Loading...</div>}
                          {suggestions.map(suggestion => {
                            const className = suggestion.active
                              ? 'suggestion-item--active'
                              : 'suggestion-item';
                            // inline style for demonstration purpose
                            const style = suggestion.active
                              ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                              : { backgroundColor: '#ffffff', cursor: 'pointer' };
                            return (
                              <div
                                {...getSuggestionItemProps(suggestion, {
                                  className,
                                  style,
                                })}
                              >
                                <span>{suggestion.description}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                </PlacesAutocomplete>
                </Form.Group>

                  <Form.Group controlId="formAnnualRevenue">
                    <Form.Label>Annual Revenue</Form.Label>
                    <Form.Control placeholder="Enter annual revenue" type="number" id="annualRevenue"/>
                  </Form.Group>
                  <Button variant="primary" type="submit" onClick={(e) => handleSubmit(e)}>
                    Submit
                  </Button>
                </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      );
}

function Loans() {
    const [data, setData] = useState([])

    const [workers, setWorkers] = useState(0);
    const [location, setLocation] = useState("San Bruno, CA");
    const [annualRevenue, setAnnualRevenue] = useState(0);
    useEffect(() => {
      async function get_data() {
        const client = get_client(); 
        // hi los angeles :)
        const d = await client.loans.get_loans(90089);
        setData(d["data"]["hit"]);
      }
      get_data()
    }, [])
    

    return (
        <div>
            <div className="row">
                <h4>Your Information</h4>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <EditModal workers={[workers, setWorkers]} location={[location, setLocation]} annualRevenue={[annualRevenue, setAnnualRevenue]} data={[data, setData]}></EditModal>
            </div>
            <div className="row">
                <Pill># of workers: {workers}</Pill>
                <Pill>Location: {location}</Pill>
                <Pill>Revenue: ${annualRevenue}</Pill>
            </div>

            <table className="table table-bordered">
                <thead>
                    <th scope="col">Name</th>
                    <th scope="col">Type</th>
                    <th scope="col">City</th>
                    <th scope="col">Translate</th>
                </thead>
                <tbody>
                    {data.map((b) => {
                        return (
                            <Bill
                                title={b.fields.title}
                                type={b.fields.office_type}
                                city={b.fields.location_city}
                                link={"#"}
                            />
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default Loans
