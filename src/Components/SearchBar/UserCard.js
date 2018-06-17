import React,{Component} from 'react'
import { Image, Row, Col  } from 'react-bootstrap';
import Icon from '@material-ui/core/Icon/Icon';

class UserCard extends Component {
    state={
        openContacts:false
    }
    goToMaps=()=>{
        const { coordinates} = this.props.user
        window.open(`https://www.google.com/maps/?q=`+coordinates[0]+`,`+coordinates[1],'_newtab');
    }
    render(){
        const { firstName, lastName, photo, mobile, email,aboutMe, address, city } = this.props.user
        return (
        <div className="card" >
            <div className="card-body" style={{backgroundColor:'rgb(75, 187, 231)',borderRadius:0.5}}>
            <center><h3 style={{color: '#111'}}> {firstName + "" + lastName }</h3></center>
            <font style={{color:'#030303'}}>
            <Row> 
                <Col md-offset={2} md={5}> 
                    <Row> 
                        <Col md={12}> 
                            <Icon color="primary"> description</Icon>  {aboutMe}
                        </Col>
                    </Row> 
                    <Row> 
                        <Col md={12}> 
                            <Icon  color="primary"> email</Icon> {email}
                        </Col>
                    </Row> 
                    <Row> 
                        <Col md={12}> 
                            <Icon  color="primary"> call</Icon> {mobile}
                        </Col> 
                    </Row> 
                </Col>
                <Col md={5}>
                    <Image src={photo} width="200" height="200"/>
                </Col>
            </Row> 
            <Row>
            <Col md-offset={2} md={9}>
                <Icon onClick={this.goToMaps} color="primary"> location_on </Icon> {address + " " + city}
            </Col> 
            <Col md-offset={2} md={4}>
                click Icon to open on maps
            </Col>
            </Row>
            </font>
        </div>
        </div>
      
    )
    }
}

export default UserCard