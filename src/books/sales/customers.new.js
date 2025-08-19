import React, { useState, useEffect, useRef } from "react";
import { Col, Container, Row } from "reactstrap";
import { Card } from 'primereact/card';
import { Dropdown } from 'primereact/dropdown';
import { FilterMatchMode } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { useNavigate, Link } from 'react-router-dom';
import { Sidebar } from 'primereact/sidebar';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { Editor } from 'primereact/editor';
import { TabView, TabPanel } from 'primereact/tabview';
import { Badge } from "primereact/badge";

const Customers = () => {
  const navigate = useNavigate();

  // State for new customer dialog and import dialog
  const [showNewCustomerDialog, setShowNewCustomerDialog] = useState(false);
  const [importDialog, setImportDialog] = useState(false);
  const [globalFilter, setGlobalFilter] = useState('');
  const [customers, setCustomers] = useState([]);
  
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <div className="header d-flex justify-content-between align-items-center mb-4">
            <div>
              <Dropdown 
                value="All Customers"
                options={["All Customers", "Active", "Inactive"]}
                className="border-0"
              />
            </div>
            <div className="d-flex gap-2">
              <Button
                icon="pi pi-plus"
                className="p-button-text" 
                severity="primary"
                onClick={() => setShowNewCustomerDialog(true)}
              />
              <Button
                icon="pi pi-ellipsis-v"
                className="p-button-text"
                severity="secondary" 
              />
            </div>
          </div>
          
          <div className="intro mb-5">
            <h2>Business is no fun without people.</h2>
            <p className="text-muted">Create and manage your contacts, all in one place.</p>
            <Button
              label="CREATE NEW CUSTOMER"
              severity="primary" 
              onClick={() => setShowNewCustomerDialog(true)}
              className="mb-3"
            />
            <div>
              <span 
                className="text-primary cursor-pointer" 
                onClick={() => setImportDialog(true)}
              >
                Click here to import customers from file
              </span>
              <div className="mt-2">
                <span className="text-muted">or using</span>
                <Button label="Google" className="p-button-text p-button-plain mx-2" />
                <Button label="Microsoft" className="p-button-text p-button-plain" />
                <Button label="Zoho" className="p-button-text p-button-plain mx-2" />
              </div>
            </div>
          </div>
          
          <h5 className="mb-3">Types of contacts</h5>
          <div className="grid">
            <div className="col-12 md:col-6">
              <Card className="h-full">
                <div className="flex flex-column align-items-center text-center gap-3">
                  <i className="pi pi-users text-4xl text-primary"></i>
                  <h5 className="mb-0">Customers</h5>
                  <div className="flex flex-column gap-2 w-full">
                    <Button 
                      label="CONTACT PERSON 1" 
                      className="p-button-text text-secondary"
                      severity="secondary"
                    />
                    <Button 
                      label="CONTACT PERSON 2" 
                      className="p-button-text text-secondary"
                      severity="secondary"
                    />
                    <Button 
                      label="CONTACT PERSON 3" 
                      className="p-button-text text-secondary"
                      severity="secondary"
                    />
                  </div>
                </div>
              </Card>
            </div>
            <div className="col-12 md:col-6">
              <Card className="h-full">
                <div className="flex flex-column align-items-center text-center gap-3">
                  <i className="pi pi-building text-4xl text-primary"></i>
                  <h5 className="mb-0">Vendors</h5>
                  <div className="flex flex-column gap-2 w-full">
                    <Button 
                      label="CONTACT PERSON 1" 
                      className="p-button-text text-secondary"
                      severity="secondary"
                    />
                    <Button 
                      label="CONTACT PERSON 2" 
                      className="p-button-text text-secondary"
                      severity="secondary"
                    />
                    <Button 
                      label="CONTACT PERSON 3" 
                      className="p-button-text text-secondary"
                      severity="secondary"
                    />
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Customer list will go here */}
          
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Customers;
