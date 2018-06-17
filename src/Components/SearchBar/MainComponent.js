import React , { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Form, FormControl, Col, ListGroup } from 'react-bootstrap'
import { changeText,fetchUsers,callSearchByName,callSuggestionByName } from '../../Actions'
import Icon from '@material-ui/core/Icon'
import Button from '@material-ui/core/Button/Button';
import { SuggestionList } from './SuggestionList';
import UserCard  from './UserCard'
import ListItem from '@material-ui/core/ListItem/ListItem';
import Divider from '@material-ui/core/Divider/Divider';

class MainComponent extends Component{
    componentWillMount(){
        this.props.fetchUsers()
    }
    state={
        showCard:false,
        selectedUser:{}
    }
    handleChange = (e)=>{
        this.props.callSuggestionByName(e.target.value)
    }
    onSearch = () =>{
        this.setState({showCard:false,selectedUser:{}})
        this.props.callSearchByName(this.props.queryText)
    }
    renderUsers = () =>{
        if(this.props.users !== undefined && this.props.users && this.props.users.length > 0){
            return this.props.users.map( (item,index) => {
                    return (
                        <div key={item._id} onClick={this.onClickSuggestion.bind(this,item._source)} >
                            <center><Divider/></center>
                            <ListItem className="li">
                                {item._source.firstName + " " + item._source.lastName}
                            </ListItem>
                        </div>
                    )
            })
        }
    }
    render(){
        return (
            <div>
                <Row>
                    <Col md={2}>
                    <div style={{backgroundColor:'rgb(75, 187, 231)'}}>
                        <center><h3> Users </h3></center>
                        <ListGroup componentClass="ul">       
                            {this.renderUsers()}
                        </ListGroup>
                    </div>
                    </Col>
                    <Col md={4}>
                        <Row>
                            <Col>
                                <Form>
                                    <FormControl   
                                    type="text"
                                    value={this.props.queryText}
                                    placeholder="People Near ME"
                                    onChange={this.handleChange} />
                                </Form>
                            </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <ListGroup componentClass="ul">       
                                        {this.renderSuggestions()}
                                    </ListGroup>
                                </Col>
                            </Row>
                    </Col>
                    <Col md={1}>
                        <Button onClick={this.search}>
                            <Icon color="action">
                                search
                            </Icon>
                        </Button>
                    </Col>
                    <Col md={4} >
                        {this.renderUserCard()}
                    </Col>
                </Row>
            </div>
            )
    }
    renderUserCard = () =>{
        if(this.state.showCard){
            return (
                <UserCard user={this.state.selectedUser} />
            )
        }else{
            return(
                <h4 style={{color:'#000'}}>Click on a User to view details</h4>
            )
        }
    }
    onClickSuggestion = (user) =>{
      this.setState({showCard:!this.showCard,selectedUser:user})
    }
    renderSuggestions =()=>{
        if(this.props.suggestions !== undefined && this.props.suggestions && this.props.suggestions.length > 0){
            return this.props.suggestions.map((item) => {
                return item.options.map((option,id) => {
                    return(
                        <SuggestionList key={option._id} onClickSuggestion={this.onClickSuggestion.bind(this,option._source)} suggestion={option._source}/>
                    )
                })
            })
        }
    }    
}

const mapStateToProps = state => {
    return {...state.app}
}

export default connect(mapStateToProps,{changeText, fetchUsers,callSearchByName,callSuggestionByName})(MainComponent)