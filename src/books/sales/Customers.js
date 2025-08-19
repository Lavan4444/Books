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
      <div className="page-content" style={{marginTop: "0px"}}>
        <Container fluid className="p-0">
          <div className="header  p-3" style={{borderBottom: '1px solid #eee'}}>
            <div className="d-flex justify-content-between gap-2">
                 <Button
                label="All Customers"
                icon="pi pi-chevron-down"
                iconPos="right"
                className="p-button-text"
                severity="secondary"
              />
              <div className="d-flex justify-content-end">
                 <Button
                icon="pi pi-plus"
                className="p-button-text me-2"
                severity="secondary"
                label="New" 
              />

               <Button
                icon="pi pi-ellipsis-v"
                className="p-button-text"
                severity="secondary" 
              />

              </div>
             
            </div>
          </div>
          
          <div className="text-center" style={{ display: "flex",
          marginTop: "60px",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
  }}>
            <h1 className="mb-2" style={{ fontSize: '24px', fontWeight: '600' }}>Business is no fun without people.</h1>
            <p className="text-muted mb-4" style={{ fontSize: '16px' }}>Create and manage your contacts, all in one place.</p>
            <Button
              label="CREATE NEW CUSTOMER"
              className="p-button mb-4"
              style={{ 
                background: 'var(--bgactive-color);',
                border: 'none',
                padding: '0.75rem 1.5rem',
                fontSize: '14px',
                fontWeight: '600',
              }}
              onClick={() => setShowNewCustomerDialog(true)}
            />
            <div className="text-center mb-5">
              <a 
                href="#"
                className="text-primary font-medium"
                style={{ textDecoration: 'none', fontSize: '14px' }}
                onClick={(e) => {
                  e.preventDefault();
                  setImportDialog(true);
                }}
              >
                Click here to import customers from file
              </a>
              <div className="mt-3 d-flex align-items-center justify-content-center gap-2">
                <span className="text-muted" style={{ fontSize: '14px' }}>or using</span>
                <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48'%3E%3Cpath fill='%234285F4' d='M24 42.3c10.2 0 18.3-8.1 18.3-18.3S34.2 5.7 24 5.7 5.7 13.8 5.7 24s8.1 18.3 18.3 18.3z'/%3E%3Cpath fill='%23fff' d='M24 11.3c3.6 0 6.7 1.2 9.2 3.5l-4.4 4.4C27.2 17.8 25.7 17.3 24 17.3c-4.3 0-7.9 2.9-9.2 6.8-0.3 0.9-0.5 1.9-0.5 2.9s0.2 2 0.5 2.9c1.3 3.9 4.9 6.8 9.2 6.8 2.8 0 5.1-0.9 6.8-2.4 1.3-1.2 2.1-2.8 2.4-4.7h-9.2v-5.7h15.5c0.2 1.1 0.3 2.2 0.3 3.4 0 4.7-1.7 8.7-4.7 11.4C32.4 40.8 28.5 42.3 24 42.3c-10.2 0-18.3-8.1-18.3-18.3S13.8 5.7 24 5.7z'/%3E%3C/svg%3E" 
                  alt="Google" 
                  style={{ width: '24px', height: '24px', cursor: 'pointer' }}
                />
                <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48'%3E%3Cpath fill='%230078D4' d='M44 24c0 11.044-8.956 20-20 20S4 35.044 4 24 12.956 4 24 4s20 8.956 20 20z'/%3E%3Cpath fill='%23fff' d='M29.639 16.316h-4.653v4.653h4.653v-4.653zm-11.316 0h-4.653v4.653h4.653v-4.653zm16.042 4.653h-4.653v4.653h4.653v-4.653zm-16.042 0h-4.653v4.653h4.653v-4.653zm-4.726 9.379h4.653v-4.653h-4.653v4.653z'/%3E%3C/svg%3E"
                  alt="Microsoft" 
                  style={{ width: '24px', height: '24px', cursor: 'pointer' }}
                />
                <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48'%3E%3Cpath fill='%23D92B2F' d='M24 4C12.954 4 4 12.954 4 24s8.954 20 20 20 20-8.954 20-20S35.046 4 24 4z'/%3E%3Cpath fill='%23fff' d='M24 12.5c-6.25 0-11.5 5.25-11.5 11.5S17.75 35.5 24 35.5s11.5-5.25 11.5-11.5S30.25 12.5 24 12.5zm0 18c-3.59 0-6.5-2.91-6.5-6.5S20.41 17.5 24 17.5s6.5 2.91 6.5 6.5-2.91 6.5-6.5 6.5z'/%3E%3C/svg%3E"
                  alt="Zoho" 
                  style={{ width: '24px', height: '24px', cursor: 'pointer' }}
                />
              </div>
            </div>

             <div style={{ 
                width: '100%',
                backgroundColor: '#f8f9fa',
                padding: '40px 0',
                marginTop: '100px',
                marginBottom: '60px',
                borderTop: '1px solid #eee'
             }}>
                <Container>
                  <img 
                    src="https://d31g2a6snus4ly.cloudfront.net/zbooks/assets/images/1x/zb-contacts-workflow-34a6a3a8d5.png"
                    alt="Zoho" 
                    style={{ 
                      width: '100%', 
                      height: 'auto',
                      maxWidth: '500px',
                      margin: '0 auto',
                      display: 'block',
                      marginTop: '40px'
                    }}
                  />
                </Container>
             </div>

          </div>

         
          {/* Customer list will go here */}
          
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Customers;
