import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button, Container, Card, ListGroup, Row, Col } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from 'react-redux';
import { randomChallenge } from '../randomChallenge';
import '../styles/App.css';


import {
  Challenge,
  setChallenge,
  acceptChallenge,
  addToChallengesList,
  deleteChallenge,
  addOwnChallenge,
  fetchJoke
} from '../actions';

interface AppProps {
  challenge: Challenge;
  challengesList: Challenge[];
  setChallenge: Function;
  acceptChallenge: Function;
  addToChallengesList: Function;
  deleteChallenge: Function;
  addOwnChallenge: Function;
  fetchJoke: Function;
  joke: string
}

interface AppState {
  ownChallenge: Challenge;
  isOpen: boolean;
  isCheckBoxChecked: boolean;
  joke: string;
}

class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props)
    this.state = {
      ownChallenge: {
        text: '', 
      }, 
      isOpen: false,  
      isCheckBoxChecked: false,
      joke: '',      
    }
  }
  componentDidMount() {
    this.props.setChallenge(randomChallenge());      
  }

  generateNewChallenge = () => {
    this.props.setChallenge(randomChallenge());
  };

  acceptChallenge = () => {
    this.props.acceptChallenge();
    this.props.addToChallengesList(this.props.challenge);
    this.generateNewChallenge()
  };

  addOwnChallenge = (event: React.ChangeEvent<HTMLTextAreaElement>) => {    
    const ownChallengeText = event.target.value;
    this.setState(prevState => ({
      ownChallenge: {
        ...prevState.ownChallenge,
        text: ownChallengeText,
      }
    }));
    
  }
  
  deleteChallenge = (challenge: Challenge) => {
    this.props.deleteChallenge(challenge);
  };

  handleCheckboxChange = (event: any) => {
    this.setState({isCheckBoxChecked: event.target.checked}, () => {
      if (this.state.isCheckBoxChecked) {
        this.props.fetchJoke();
        this.setState({isOpen: true});        
      }
    });
  }

  renderJokeWindow = () => {  
    
    return (
      <div> 
        <Modal show={this.state.isOpen} onHide={() => this.setState({isOpen: false})}>
          <Modal.Header closeButton>
            <Modal.Title>Congratulations! you get a joke:</Modal.Title>
          </Modal.Header>
          <Modal.Body>{this.props.joke}</Modal.Body>
          <Modal.Footer>
            <Button 
            variant="secondary" 
            onClick={() =>  this.setState({isOpen: false})}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>    
      </div>
    ); 

  }   
  
  render() {
    return (
      <Container className="d-flex justify-content-center">        
        {this.state.isOpen ? this.renderJokeWindow() : null}  
        <Row>   
        <Col className='firstCol' xs={12} lg={6}>
          <Container className="d-flex mx-auto my-5" > 
                <Container className='text-center'>
                  <Card className='text-center' style={{ width: '100%' }}>
                  <Card.Body className='challenge' style={{backgroundColor:'#5F9EA0', width: '100%', height: '10rem'}}>
                    <Card.Title>EcoChallenger</Card.Title>                  
                    <Card.Text>
                    {this.props.challenge.text}
                    </Card.Text>        
                  </Card.Body>
                    <Container>    
                      <Button className='mx-2 my-1' 
                      variant='secondary' 
                      onClick={this.generateNewChallenge}>Change</Button>
                      <Button onClick={this.acceptChallenge}>Accept</Button>
                    
                    </Container>  
                  </Card>
                  <Card className='text-center mt-2' style={{ width: '100%', height: '15rem' }}>
                  <Card.Body className='text-center' style={{backgroundColor:'#5F9EA0'}}>
                    <Card.Title>Set your own challenge</Card.Title>                    
                    <Form>
                      <Form.Group className="mb-3 my-4" controlId="exampleForm.ControlInput1"  >
                        <Form.Control 
                        as= "textarea" 
                        rows={4} 
                        value={this.state.ownChallenge.text}
                        onChange={this.addOwnChallenge}
                        />
                      </Form.Group>  
                     </Form> 
                  </Card.Body>
                  <Button onClick={() => {
                    this.props.addToChallengesList(this.state.ownChallenge);
                    this.setState({
                      ownChallenge: {
                        ...this.state.ownChallenge,
                        text: ''
                      }
                    });
                  }}>Add</Button>
                  </Card>                          
                </Container>             
                
               </Container>
              </Col> 
              <Col className='secondCol' xs={12}  lg={6}>
                <Container className="d-flex justify-content-center">                
                <Container className="d-flex mx-auto my-5">
                  <Container>
                    <Container className='text-center bg-dark-subtle'>
                      <h2 >Your Challenges</h2>
                      <p>Check your achievements and get a reward</p>
                    </Container>
                    <ListGroup >
                      {this.props.challengesList.map((challenge, index) => (
                        <ListGroup.Item key={index} style={{backgroundColor: '#F5DEB3'}}>
                          {challenge.text}
                          <Form.Check 
                          className="my-2 text-muted" 
                          type="checkbox" 
                          id={`checkbox-${index}`} 
                          label="challenge completed"                          
                          onChange={this.handleCheckboxChange} />
                          <Button
                            variant="outline-primary text-muted"
                            onClick={() => this.props.deleteChallenge(challenge)}                            
                          >
                            Delete
                          </Button>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>                             
                  </Container>                  
                </Container>                
                </Container>
                </Col>
                </Row>  
      </Container>
    );
  }
}

const mapStateToProps = (state: any) => ({
  challenge: state.challenge,
  challengesList: state.challengesList,
  ownChallenge: state.ownChallenge,
  joke: state.joke
});

export default connect(mapStateToProps, {
  setChallenge,
  acceptChallenge,
  addToChallengesList,
  deleteChallenge,
  addOwnChallenge, 
  fetchJoke
})(App);
