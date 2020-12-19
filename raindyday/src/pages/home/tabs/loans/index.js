import { useState } from 'react'
import { Button, Modal, Form } from 'react-bootstrap'
import PlacesAutocomplete from 'react-places-autocomplete';

let example_data = [
    {
        type: 'Congress',
        name: 'Congress Bill',
        link: '#'
    },
    {
        type: 'Fancy',
        name: 'Some Fancy Bill 2',
        link: '#'
    },
]

function Bill(props) {
    return (
        <tr>
            <td>{props.type}</td>
            <td>{props.name}</td>
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

function handleSubmit() {
    /* Data is captured but not fully validated or parsed */
    var workers = document.getElementById("numWorkers").value;
    var location = document.getElementById("location").value;
    var annualRevenue = document.getElementById("annualRevenue").value;
}

function EditModal() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [search, setSearch] = useState("");
    const handleChange = (searchString) => setSearch(searchString);

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
                <Form.Label>Location</Form.Label>
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
                  <Button variant="primary" type="submit" onClick={handleSubmit}>
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
    const [bills, setBills] = useState(example_data)

    return (
        <div>
            <div className="row">
                <h4>Your Information</h4>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <EditModal></EditModal>
            </div>
            <div className="row">
                <Pill># of workers: {30}</Pill>
                <Pill>Location: {'LA, CA'}</Pill>
                <Pill>Revenue: {'100k annually'}</Pill>
            </div>

            <table className="table table-bordered">
                <thead>
                    <th scope="col">Type</th>
                    <th scope="col">Name</th>
                    <th scope="col">Link to translate</th>
                </thead>
                <tbody>
                    {bills.map((b) => {
                        return (
                            <Bill
                                type={b.type}
                                name={b.name}
                                link={b.link}
                            />
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default Loans
