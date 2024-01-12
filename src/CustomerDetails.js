import React, {Component} from 'react';
import Panel from 'react-bootstrap/lib/Panel'
import axios from 'axios'

//This Component is a child Component of Customers Component
export default class CustomerDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  //Function which is called when the component loads for the first time
  componentDidMount() {
    this.getCustomerDetails(this.props.val)
  }

  //Function which is called whenver the component is updated
  componentDidUpdate(prevProps) {

    //get Customer Details only if props has changed
    if (this.props.val !== prevProps.val) {
      this.getCustomerDetails(this.props.val)
    }
  }

  //Function to Load the customerdetails data from json.
  getCustomerDetails(id) {
    axios.get('http://localhost:3001/customers/' + id).then(response => {
      this.setState({customerDetails: response})
    })
  };

  render() {
    if (!this.state.customerDetails)
      return (<p>Loading Data</p>)
    return (<div className="customerdetails">
      <Panel bsStyle="info" className="centeralign">
        <Panel.Heading>
          <Panel.Title componentClass="h3" data-test="customer_name_header">{this.state.customerDetails.data.name}</Panel.Title>
        </Panel.Heading>
        <Panel.Body data-test="customer_details">
          <p data-test="customer_details_name">Name : {this.state.customerDetails.data.name}</p>
          <p data-test="customer_details_email">Email : {this.state.customerDetails.data.email}</p>
          <p data-test="customer_details_phone">Phone : {this.state.customerDetails.data.phone}</p>
          <p data-test="customer_details_city">City : {this.state.customerDetails.data.city}</p>
          <p data-test="customer_details_state">State : {this.state.customerDetails.data.state}</p>
          <p data-test="customer_details_country">Country : {this.state.customerDetails.data.country}</p>
          <p data-test="customer_details_organization">Organization : {this.state.customerDetails.data.organization}</p>
          <p data-test="customer_details_job-profile">Job Profile : {this.state.customerDetails.data.jobProfile}</p>
          <p data-test="customer_details_additional-info">Additional Info : {this.state.customerDetails.data.additionalInfo}</p>
        </Panel.Body>
      </Panel>
    </div>)
  }
}
