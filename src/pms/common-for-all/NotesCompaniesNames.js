import React, { useState, useRef, useEffect, useMemo } from "react"
import { Card, CardBody, Col, Container, Row, DropdownToggle, DropdownItem, DropdownMenu, } from "reactstrap";
import { CascadeSelect } from 'primereact/cascadeselect';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Calendar } from 'primereact/calendar';
import { InputTextarea } from 'primereact/inputtextarea';
import { Chips } from 'primereact/chips';
import { Checkbox } from 'primereact/checkbox';
import { MultiSelect } from 'primereact/multiselect';



const NotesCompanies1 = () => {


    // link jobs 

    const [visibleLinkJob, setVisibleLinkJob] = useState(false);
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const [valueNotes, setValueNotes] = useState(['Tech Corp']);
    const [popchecked, setPopchecked] = useState(false)
    
    // Private state variables
    const [privateDrop, setPrivateDrop] = useState(false)
    const [PrivetDropdown, setPrivetDropdown] = useState([])
    const PrivetDropdownValues = [
        { name: "Mahesh", code: "mahesh" },
        { name: "Lavan", code: "lavan" },
        { name: "Vinay", code: "vinay" },
        { name: "Vasanth", code: "vasanth" },
    ]
    
    const handlePopupCheckbox = e => {
        setPopchecked(e.checked)
    }

    const [candidateName, setCandidateName] = useState("Anupam Diridhar, John Doe, Amith, Sagar");
    const [currentDateTime, setCurrentDateTime] = useState(new Date());
    const [userId, setUserId] = useState("Anupam, John, Amith");
    const [subject, setSubject] = useState("");
    const [notes, setNotes] = useState("");

    const [selectedJobs, setSelectedJobs] = useState([]);
    const [jobs] = useState([
        { id: "Varun Digital Media", title: "www.varundigitalmedia.com", },
        { id: "Innovate Solutions", title: "www.innovatesolutions.com", },
        { id: "Green Ventures", title: "www.greenventures.com", },
        { id: "Future Tech", title: "www.futuretech.com", },
        { id: "Healthify Solutions", title: "www.healthifysolutions.com",},
    ]);

    const [searchText, setSearchText] = useState('');
    const [jobDetailsVisible, setJobDetailsVisible] = useState(false);
    const [selectedJobTitles, setSelectedJobTitles] = useState('');

    const handleIconClick = () => {
        setJobDetailsVisible(true);
    };

    // const handleSave = () => {
    //     const selectedJobTitles = selectedJobs.map((job) => job.title).join(', ');
    //     setSelectedJobTitles(selectedJobTitles);
    //     setJobDetailsVisible(false);
    // };


    // const handleSave = () => {
    //     const selectedJobTitles = selectedJobs
    //         .map((job) => `${job.id}, ${job.title}`) // Format each job as "id - title"
    //         .join(', '); // Join them into a single string
        
    //     setSelectedJobTitles(selectedJobTitles);
    //     setJobDetailsVisible(false);
    // };

    const handleSave = () => {
        if (selectedJobs.length > 0) { // Ensure there's a selected job
            const selectedJob = selectedJobs[0]; // Get the first selected job
            const selectedJobTitle = `${selectedJob.id}, ${selectedJob.title}`;
            setSelectedJobTitles(selectedJobTitle);
            setJobDetailsVisible(false);
        }
    };
    
    

    
    const handleRefresh = () => {
        setSelectedJobs([]);
        setSearchText('');
    };

    const filteredJobs = jobs.filter(
        (job) =>
            job.title.toLowerCase().includes(searchText.toLowerCase()) ||
            job.contact.toLowerCase().includes(searchText.toLowerCase()) ||
            job.id.toString().includes(searchText)
    );

    // link jobs 

    return (
        <React.Fragment>

                <button
                    type="button"
                    className="btn btn-secondary icons-btn me-1"
                    //  onClick: () => setVisibleLinkJob(true)
                    onClick={() => setVisibleLinkJob(true)}
                  >
                    <i class="pi pi-file"></i>
                  </button>         
           
            <Dialog header={"Note - Varun Digital Media, www.varundigitalmedia.com"} visible={visibleLinkJob} onHide={() => setVisibleLinkJob(false)}
                style={{ width: '50vw' }} breakpoints={{ '960px': '75vw', '641px': '100vw' }} className="link-candidates">
                <Row>
                <Col lg={6}>
                        <div className="field">
                            <label htmlFor="candidate" className="block mb-0">
                                Type
                            </label>
                            <InputText
                                id="candidate"
                                value="Note"
                                readOnly
                                className="w-full"
                                placeholder="Note"
                                disabled
                            />
                        </div>
                    </Col>
                   

                    <Col lg={6}>
                        <div className="field">
                            <label htmlFor="currentDateTime" className="block mb-0">
                                Date
                            </label>
                            <Calendar
                                id="currentDateTime"
                                value={currentDateTime}
                                onChange={(e) => setCurrentDateTime(e.value)} // Update state on change
                                showTime
                                showIcon
                                dateFormat="dd/mm/yy" // Customize the date format
                                hourFormat="12" // Use 12-hour time format (or "12" for AM/PM)
                                readOnlyInput
                                className="w-full"
                            />
                        </div>
                    </Col>

                    {/* <Col lg={12}>
                        <div className="field">
                            <label htmlFor="candidate" className="block mb-0">
                                Candidates
                            </label>
                            <InputText
                                id="candidate"
                                value={candidateName}
                                readOnly
                                className="w-full"
                                disabled
                            />
                        </div>
                    </Col> */}

                    <Col lg={12}>
                        <div className="field">
                            <label htmlFor="job" className="block mb-0">Companies</label>
                            <div className="d-flex align-items-center" style={{ position: 'relative' }}>
                                <InputText
                                    id="job"
                                    value={selectedJobTitles}
                                    onChange={(e) => setSelectedJobTitles(e.target.value)}
                                    placeholder="Varun Digital Media, www.varundigitalmedia.com"
                                    className="w-full"
                                    style={{ paddingRight: '2rem' }} 
                                    disabled
                                />
                                {/* <i
                                    className="pi pi-chevron-down"
                                    onClick={handleIconClick}
                                    style={{
                                        position: 'absolute',
                                        right: '10px',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        cursor: 'pointer'
                                    }}
                                ></i> */}
                            </div>
                            <Dialog
                                header="Companies Details"
                                visible={jobDetailsVisible}
                                onHide={() => setJobDetailsVisible(false)}
                                style={{ width: '40vw' }}
                                breakpoints={{ '960px': '75vw', '641px': '100vw' }}
                                className="cand-details"
                            >
                                {/* Search Bar */}
                                <Row>
                                    <Col lg={12}>
                                        <div className="p-inputgroup mb-3" style={{ position: 'relative' }}>
                                            <InputText
                                                placeholder="Search Jobs"
                                                value={searchText}
                                                onInput={(e) => setSearchText(e.target.value)}
                                                style={{ paddingRight: '2rem' }} // Space for the icon
                                            />
                                            <i
                                                className="pi pi-search"
                                                style={{
                                                    position: 'absolute',
                                                    right: '10px',
                                                    top: '49%',
                                                    transform: 'translateY(-50%)',
                                                }}
                                            ></i>
                                        </div>
                                    </Col>
                                </Row>

                                {/* DataTable */}
                                <DataTable
                                    value={filteredJobs}
                                    paginator
                                    rows={5}
                                    selection={selectedJobs}
                                    onSelectionChange={(e) => setSelectedJobs(e.value)}
                                    dataKey="id"
                                    rowsPerPageOptions={[5, 10, 25]}
                                    size="small" // Set size to small
                                >
                                    <Column selectionMode="multiple" style={{ width: '3em' }} />
                                    <Column field="id" header="Companies ID" />
                                    <Column field="title" header="Companies Title" />
                                    <Column field="contact" header="Contact" />
                                </DataTable>

                                {/* Actions */}
                                <div className="d-flex  mt-3">
                                    {/* <Button label="Save" icon="pi pi-save" onClick={handleSave} />
                                                    <Button label="Refresh" icon="pi pi-refresh" onClick={handleRefresh} className="p-button-secondary" /> */}
                                    <button type="button" class="btn btn-primary me-2 btn-main" onClick={handleSave}>Save</button>
                                    <button type="button" class="btn btn-primary btn-main" onClick={handleRefresh}>Refresh</button>
                                </div>
                            </Dialog>
                        </div>
                    </Col>
                </Row>
                <Row>
                    {/* <Col lg={6}>
                        <div className="field">
                            <label htmlFor="currentDateTime" className="block mb-0">
                                Date
                            </label>
                            <Calendar
                                id="currentDateTime"
                                value={currentDateTime}
                                onChange={(e) => setCurrentDateTime(e.value)} // Update state on change
                                showTime
                                showIcon
                                dateFormat="dd/mm/yy" // Customize the date format
                                hourFormat="12" // Use 12-hour time format (or "12" for AM/PM)
                                readOnlyInput
                                className="w-full"
                            />
                        </div>
                    </Col> */}

                    <Col lg={12}>
                        <div className="field">
                            <label htmlFor="notes" className="block mb-0">
                                Notes
                            </label>
                            <InputTextarea
                                id="notes"
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)} // Update the state on input change
                                rows={3} // Number of visible rows
                                cols={20} // Number of visible columns
                                className="w-full"
                                placeholder="Enter your notes here..."
                                autoResize // Automatically adjusts height as content grows
                            />
                        </div>
                    </Col>
                    
                </Row>
                <Row className="align-items-center">
                <Col lg={2}>
                         <div className="d-flex align-items-center">
                                <Checkbox
                                  inputId="privateCheckbox"
                                  checked={privateDrop}
                                  onChange={(e) => setPrivateDrop(e.checked)}
                                />
                                <label htmlFor="privateCheckbox" className="ms-2 mt-2">
                                  Private
                                </label>
                              </div>
                    </Col>
                    <Col lg={6}>
                        {privateDrop && (
                            <div className="field notes-chip">
                                <label htmlFor="userId" className="block mb-0">
                                    User Id's
                                </label>
                                <MultiSelect
                                    value={PrivetDropdown}
                                    onChange={(e) => setPrivetDropdown(e.value)}
                                    options={PrivetDropdownValues}
                                    optionLabel="name"
                                    display="comma"
                                    placeholder="Select User Id's"
                                    maxSelectedLabels={8}
                                    className="w-full"
                                />
                            </div>
                        )}
                    </Col>

                   

                    
                </Row>

                <Row>

                <Col lg={12}>
                        <div className="d-flex justify-content-end">
                            <button type="button" class="btn btn-primary me-2 btn-main" onClick={() => setVisibleLinkJob(false)}>Add Note</button>
                        </div>
                    </Col>
                </Row>
               
               
            </Dialog>


        </React.Fragment>
    );
};



export default NotesCompanies1;
