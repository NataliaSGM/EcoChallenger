import React, { Component } from 'react';
import { Button, Container, Card, ListGroup } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from 'react-redux';
import { randomChallenge } from '../randomChallenge';


import {
  Challenge,
  setChallenge,
  acceptChallenge,
  addToChallengesList,
  deleteChallenge,
  addOwnChallenge,
} from '../actions';

interface AppProps {
  challenge: Challenge;
  challengesList: Challenge[];
  setChallenge: (challenge: Challenge) => void;
  acceptChallenge: () => void;
  addToChallengesList: (challenge: Challenge) => void;
  deleteChallenge: (challenge: Challenge) => void;
  addOwnChallenge: (challenge: Challenge) => void
}

interface AppState {
  ownChallenge: Challenge
}

class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props)
    this.state = {
      ownChallenge: {
        text: '', 
      }      
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

  addOwnChallenge = (event: any) => {    
    const ownChallengeText = event.target.value;
    const ownChallenge: Challenge = {
    text: ownChallengeText,
      };
   this.setState({
    ownChallenge,
  });
  }
  
  deleteChallenge = (challenge: Challenge) => {
    this.props.deleteChallenge(challenge);
  };

  render() {
    return (
      <Container className="d-flex justify-content-center">
        <div className="d-flex mx-auto my-5" >              
                <Card className='text-center' style={{ width: '18rem', height: '30rem' }}>
                  <Card.Body className='text-center' style={{backgroundColor:'#AED581'}}>
                    <Card.Title>EcoChallenger</Card.Title>
                    <Card.Text>
                    {this.props.challenge.text}
                    </Card.Text>        
                  </Card.Body>
                  <Card className='text-center mt-2' style={{ width: '18rem', height: '15rem' }}>
                  <Card.Body className='text-center' style={{backgroundColor:'#AED581'}}>
                    <Card.Title>Set your own challenge</Card.Title>
                    <Card.Text>
                    <Form>
                      <Form.Group className="mb-3 my-4" controlId="exampleForm.ControlInput1"  >
                        <Form.Control as= "textarea" rows={4} value={this.state.ownChallenge.text}/>
                      </Form.Group>   
                    </Form>              
                    </Card.Text>        
                  </Card.Body>
                  <Button onClick={this.addOwnChallenge}>Add</Button>
                  </Card>       
                </Card>              
                  <div className='justify-content-md-end my-5'>    
                    <Button className='mx-2 my-5' variant='secondary' onClick={this.generateNewChallenge}>Change</Button>
                    <Button onClick={this.acceptChallenge}>Accept</Button>
                  </div>
                  


              </div>                  
                <div className="d-flex mx-auto my-5">
                  <div style={{ width: '28rem' }}>
                    <h2 className='text-center'>Your Challenges</h2>
                    <h6 className='text-center text-muted'>Check your achievements</h6>
                    <ListGroup>
                      {this.props.challengesList.map((challenge) => (
                        <ListGroup.Item style={{backgroundColor: '#FFCC80' }}>
                          {challenge.text}
                          <Form.Check className="my-2 text-muted" type="checkbox" id="checkbox" label="challenge completed" />
                          <Button
                            variant="outline-primary text-muted"
                            onClick={() => this.props.deleteChallenge(challenge)}
                            
                          >
                            Delete
                          </Button>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>                             
                  </div>
                  
                </div>
      </Container>
    );
  }
}

const mapStateToProps = (state: any) => ({
  challenge: state.challenge,
  challengesList: state.challengesList,
});

export default connect(mapStateToProps, {
  setChallenge,
  acceptChallenge,
  addToChallengesList,
  deleteChallenge,
  addOwnChallenge
})(App);
