import React, {Component} from 'react';
import Panel from 'react-bootstrap/lib/Panel'
import Button from 'react-bootstrap/lib/Button'
import CustomerDetails from './CustomerDetails'
import axios from 'axios'

export default class Customers extends Component {

  constructor(props) {
    super(props)
    this.state = {
      selectedCustomer: 1
    }
  }

  //function which is called the first time the component loads
  componentDidMount() {
    this.getCustomerData();
  }

  //Function to get the Customer Data from json
  getCustomerData() {
    axios.get('http://localhost:3001/customerList').then(response => {
      this.setState({customerList: response})
    })
  };

  render() {
    if (!this.state.customerList)
      return (<p>Loading data</p>)
    return (<div className="addmargin">
      <div className="col-md-3" data-test="panel_customers">
        {

          this.state.customerList.data.map(customer => <Panel bsStyle="info" key={customer.name} className="centeralign">
            <Panel.Heading>
              <Panel.Title componentClass="h3" data-test= {`panel_customer_name${customer.id}`}>{customer.name}</Panel.Title>
            </Panel.Heading>
            <Panel.Body data-test= {`panel_customer_contact_info${customer.id}`}>
              <p data-test="panel_contact_email">{customer.email}</p>
              <p data-test="panel_contact_phone">{customer.phone}</p>
              <Button bsStyle="info" onClick={() => this.setState({selectedCustomer: customer.id})} data-test={`view-details_button${customer.id}`}>

                Click to View Details

              </Button>

            </Panel.Body>
          </Panel>)
        }
      </div>
      <div className="col-md-6" data-test= "selected_customer">
        <CustomerDetails val={this.state.selectedCustomer}/>
      </div>
    </div>)
  }

}
