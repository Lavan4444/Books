import PropTypes from "prop-types"
import React, { useEffect, useCallback, useRef, useState } from "react"

// Import Scrollbar
import SimpleBar from "simplebar-react"

// MetisMenu
import MetisMenu from "metismenujs"
import withRouter from "components/common/withRouter"
import { Link, useLocation } from "react-router-dom"

//i18n
import { withTranslation } from "react-i18next"
import { Tooltip } from "primereact/tooltip"

const SidebarContent = props => {
  const location = useLocation()
  const ref = useRef()
  const path = location.pathname
  const [draggedItem, setDraggedItem] = useState(null)
  const [dragOverItem, setDragOverItem] = useState(null)
  const [allCollapsed, setAllCollapsed] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  // Initial menu structure
  const [menuItems, setMenuItems] = useState([
    {
      id: 'home',
      title: 'Home',
      icon: 'pi pi-home',
      order: 1,
      route: '/home'
    },
    {
      id: 'items',
      title: 'Items',
      icon: 'pi pi-box',
      order: 2,
      subItems: [
        { id: 'items-list', title: 'Items', route: '/items' }
      ]
    },
    {
      id: 'sales',
      title: 'Sales',
      icon: 'pi pi-shopping-cart',
      order: 3,
      subItems: [
        { id: 'customers', title: 'Customers', route: '/customers' },
        { id: 'quotes', title: 'Quotes', route: '/quotes' },
        { id: 'sales-orders', title: 'Sales Orders', route: '/sales-orders' },
        { id: 'invoices', title: 'Invoices', route: '/invoices' },
        { id: 'recurring-invoices', title: 'Recurring Invoices', route: '/recurring-invoices' },
        { id: 'delivery-challans', title: 'Delivery Challans', route: '/delivery-challans' },
        { id: 'payments-received', title: 'Payments Received', route: '/payments-received' },
        { id: 'credit-notes', title: 'Credit Notes', route: '/credit-notes' }
      ]
    },
    {
      id: 'purchases',
      title: 'Purchases',
      icon: 'pi pi-briefcase',
      order: 4,
      subItems: [
        { id: 'vendors', title: 'Vendors', route: '/vendors' },
        { id: 'expenses', title: 'Expenses', route: '/expenses' },
        { id: 'recurring-expenses', title: 'Recurring Expenses', route: '/recurring-expenses' },
        { id: 'purchase-orders', title: 'Purchase Orders', route: '/purchase-orders' },
        { id: 'bills', title: 'Bills', route: '/bills' },
        { id: 'recurring-bills', title: 'Recurring Bills', route: '/recurring-bills' },
        { id: 'payments-made', title: 'Payments Made', route: '/payments-made' },
        { id: 'vendor-credits', title: 'Vendor Credits', route: '/vendor-credits' }
      ]
    },
    {
      id: 'time-tracking',
      title: 'Time Tracking',
      icon: 'pi pi-clock',
      order: 5,
      subItems: [
        { id: 'projects', title: 'Projects', route: '/projects' },
        { id: 'timesheet', title: 'Timesheet', route: '/timesheet' }
      ]
    },
    {
      id: 'banking',
      title: 'Banking',
      icon: 'pi pi-wallet',
      order: 6,
      route: '/banking'
    },
    {
      id: 'accountant',
      title: 'Accountant',
      icon: 'pi pi-briefcase',
      order: 7,
      subItems: [
        { id: 'manual-journals', title: 'Manual Journals', route: '/manual-journals' },
        { id: 'bulk-update', title: 'Bulk Update', route: '/bulk-update' },
        { id: 'currency-adjustments', title: 'Currency Adjustments', route: '/currency-adjustments' },
        { id: 'chart-of-accounts', title: 'Chart of Accounts', route: '/chart-of-accounts' },
        { id: 'budgets', title: 'Budgets', route: '/budgets' },
        { id: 'transaction-locking', title: 'Transaction Locking', route: '/transaction-locking' }
      ]
    },
    {
      id: 'reports',
      title: 'Reports',
      icon: 'pi pi-chart-line',
      order: 8,
      route: '/reports'
    },
    {
      id: 'documents',
      title: 'Documents',
      icon: 'pi pi-file',
      order: 9,
      route: '/documents'
    },
    {
      id: 'app-divider',
      title: 'APPS',
      isLabel: true,
      order: 9.5,
    },
    {
      id: 'payroll',
      title: 'Payroll',
      icon: 'pi pi-users',
      order: 10,
      route: '/payroll'
    },
    {
      id: 'configure-features',
      title: 'Configure Features',
      icon: 'pi pi-cog',
      order: 11,
      route: '/configure-features'
    }
  ])

  const activateParentDropdown = useCallback(item => {
    item.classList.add("active")
    const parent = item.parentElement
    const parent2El = parent.childNodes[1]

    if (parent2El && parent2El.id !== "side-menu") {
      parent2El.classList.add("mm-show")
    }

    if (parent) {
      parent.classList.add("mm-active")
      const parent2 = parent.parentElement

      if (parent2) {
        parent2.classList.add("mm-show")

        const parent3 = parent2.parentElement
        if (parent3) {
          parent3.classList.add("mm-active")
          parent3.childNodes[0].classList.add("mm-active")
          const parent4 = parent3.parentElement
          if (parent4) {
            parent4.classList.add("mm-show")
            const parent5 = parent4.parentElement
            if (parent5) {
              parent5.classList.add("mm-show")
              parent5.childNodes[0].classList.add("mm-active")
            }
          }
        }
      }
      scrollElement(item)
      return false
    }
    scrollElement(item)
    return false
  }, [])

  const removeActivation = items => {
    for (var i = 0; i < items.length; ++i) {
      var item = items[i]
      const parent = items[i].parentElement

      if (item && item.classList.contains("active")) {
        item.classList.remove("active")
      }
      if (parent) {
        const parent2El =
          parent.childNodes && parent.childNodes.lenght && parent.childNodes[1]
            ? parent.childNodes[1]
            : null
        if (parent2El && parent2El.id !== "side-menu") {
          parent2El.classList.remove("mm-show")
        }

        parent.classList.remove("mm-active")
        const parent2 = parent.parentElement

        if (parent2) {
          parent2.classList.remove("mm-show")

          const parent3 = parent2.parentElement
          if (parent3) {
            parent3.classList.remove("mm-active")
            parent3.childNodes[0].classList.remove("mm-active")

            const parent4 = parent3.parentElement
            if (parent4) {
              parent4.classList.remove("mm-show")
              const parent5 = parent4.parentElement
              if (parent5) {
                parent5.classList.remove("mm-show")
                parent5.childNodes[0].classList.remove("mm-active")
              }
            }
          }
        }
      }
    }
  }

  const activeMenu = useCallback(() => {
    const pathName = location.pathname
    const fullPath = pathName
    let matchingMenuItem = null
    const ul = document.getElementById("side-menu")
    const items = ul.getElementsByTagName("a")
    removeActivation(items)

    for (let i = 0; i < items.length; ++i) {
      if (fullPath === items[i].pathname) {
        matchingMenuItem = items[i]
        break
      }
    }
    if (matchingMenuItem) {
      activateParentDropdown(matchingMenuItem)
    }
  }, [path, activateParentDropdown])

  useEffect(() => {
    ref.current.recalculate()
  }, [])

  useEffect(() => {
    new MetisMenu("#side-menu")
    activeMenu()
  }, [])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
    activeMenu()
  }, [activeMenu])

  function scrollElement(item) {
    if (item) {
      const currentPosition = item.offsetTop
      if (currentPosition > window.innerHeight) {
        ref.current.getScrollElement().scrollTop = currentPosition - 300
      }
    }
  }

  // Drag and Drop Functions
  const handleDragStart = (e, item) => {
    setDraggedItem(item)
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/html', e.target.outerHTML)
    e.target.style.opacity = '0.5'
  }

  const handleDragEnd = (e) => {
    e.target.style.opacity = '1'
    setDraggedItem(null)
    setDragOverItem(null)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDragEnter = (e, item) => {
    e.preventDefault()
    setDragOverItem(item)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    // Only clear dragOverItem if we're leaving the container
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setDragOverItem(null)
    }
  }

  const handleDrop = (e, targetItem) => {
    e.preventDefault()
    
    if (!draggedItem || draggedItem.id === targetItem.id) {
      return
    }

    const newMenuItems = [...menuItems]
    const draggedIndex = newMenuItems.findIndex(item => item.id === draggedItem.id)
    const targetIndex = newMenuItems.findIndex(item => item.id === targetItem.id)

    if (draggedIndex !== -1 && targetIndex !== -1) {
      // Remove dragged item
      const [removed] = newMenuItems.splice(draggedIndex, 1)
      // Insert at target position
      newMenuItems.splice(targetIndex, 0, removed)
      
      // Update order values
      newMenuItems.forEach((item, index) => {
        item.order = index + 1
      })
      
      setMenuItems(newMenuItems)
    }

    setDraggedItem(null)
    setDragOverItem(null)
  }

  // Collapse/Expand all dropdowns
  const handleCollapseAll = () => {
    const menu = document.getElementById("side-menu");
    if (!menu) return;
    const subMenus = menu.querySelectorAll(".sub-menu");
    const parentLis = menu.querySelectorAll("li");

    if (!allCollapsed) {
      // Collapse all
      subMenus.forEach(ul => ul.classList.remove("mm-show"));
      parentLis.forEach(li => li.classList.remove("mm-active"));
    } else {
      // Expand all, but do NOT add mm-active (so text is not bold)
      subMenus.forEach(ul => ul.classList.add("mm-show"));
      parentLis.forEach(li => li.classList.remove("mm-active"));
    }
    setAllCollapsed(!allCollapsed);
  };

  // Render sub-menu items recursively
  const renderSubMenuItems = (items) => {
    return items.map(item => (
      <li key={item.id}>
        {item.disabled ? (
          <span 
            style={{
              color: '#999',
              opacity: '0.6',
              display: 'block',
              textDecoration: 'none',
              padding: '0.4rem 1.5rem 0.4rem 4.5rem',
              fontSize: '13.5px',
            }}
            className={item.title.length > 20 ? "sidebar-ellipsis" : ""}
            title={`${item.title} (Coming Soon)`}
          >
            {props.t(item.title)}
          </span>
        ) : item.route ? (
          <Link to={item.route}>
            <span
              className={item.title.length > 20 ? "sidebar-ellipsis" : ""}
              title={item.title}
            >
              {props.t(item.title)}
            </span>
          </Link>
        ) : (
          <>
            <Link to="/#" className="has-arrow">
              <span
                className={item.title.length > 20 ? "sidebar-ellipsis" : ""}
                title={item.title}
              >
                {props.t(item.title)}
              </span>
            </Link>
            {item.subItems && (
              <ul className="sub-menu" aria-expanded="false">
                {renderSubMenuItems(item.subItems)}
              </ul>
            )}
          </>
        )}
      </li>
    ))
  }

  return (
    <React.Fragment>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <SimpleBar style={{ flex: 1, maxHeight: 'calc(100vh - 120px)' }} ref={ref}>
          <Tooltip target=".sidebar-ellipsis" position="top" />
          {/* Collapse/Expand All Button */}


          

        
          <div id="sidebar-menu">
            <ul className="metismenu list-unstyled" id="side-menu">
              {menuItems.map((menuItem) => (
                <li
                  key={menuItem.id}
                  draggable={!menuItem.isLabel}
                  onDragStart={(e) => !menuItem.isLabel && handleDragStart(e, menuItem)}
                  onDragEnd={handleDragEnd}
                  onDragOver={handleDragOver}
                  onDragEnter={(e) => handleDragEnter(e, menuItem)}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, menuItem)}
                  style={{
                    cursor: menuItem.isLabel ? 'default' : 'move',
                    ...(menuItem.isLabel && {
                      padding: '10px 20px 5px',
                      fontSize: '14px',
                      fontWeight: '600',
                      textTransform: 'uppercase',
                      color: '#75767d',
                      pointerEvents: 'none',
                    }),
                    backgroundColor: dragOverItem?.id === menuItem.id ? 'rgba(0, 122, 217, 0.1)' : 'transparent',
                    borderRadius: '4px',
                    margin: '2px 0',
                    transition: 'all 0.2s ease'
                  }}
                  className={draggedItem?.id === menuItem.id ? 'dragging' : ''}
                >
                  {menuItem.isLabel ? (
                    <span className="menu-label">{props.t(menuItem.title)}</span>
                  ) : menuItem.subItems ? (
                    <>
                      <Link to="/#" className="has-arrow waves-effect">
                        <i className={menuItem.icon}></i>
                        <span
                          className="sidebar-ellipsis"
                          data-pr-tooltip={props.t(menuItem.title)}
                        >
                          {props.t(menuItem.title)}
                        </span>
                      </Link>
                      <ul className="sub-menu" aria-expanded="false">
                        {renderSubMenuItems(menuItem.subItems)}
                      </ul>
                    </>
                  ) : (
                    <Link to={menuItem.route} className="waves-effect">
                      <i className={menuItem.icon}></i>
                      <span
                        className="sidebar-ellipsis"
                        data-pr-tooltip={props.t(menuItem.title)}
                      >
                        {props.t(menuItem.title)}
                      </span>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </SimpleBar>
        
        {/* Fixed User Profile Section */}
        <div className="sidebar-user-profile" style={{
          position: 'sticky',
          bottom: 0,
          background: '#f6f8fc',
          padding: '10px 15px',
          // borderTop: '1px solid rgba(255,255,255,0.1)',
          zIndex: 1000,
        }}>

          <div className="d-flex justify-content-end" style={{ padding: "0px" }}>
            <button
              type="button"
              className="btn btn-sm btn-outline-primary w-100"
              style={{
                border: "1px solid #e6ecf7",
                background: "transparent",
                marginBottom: "3px",
                borderRadius: "4px",
                height: "23px",
              }}
              onClick={handleCollapseAll}
               data-pr-tooltip={allCollapsed ? "Expand All" : "Collapse All"}
    id="collapse-expand-btn"
            >
              {/* {allCollapsed ? "Expand All" : "Collapse All"} */}
              <i style={{ color: '#76777ac7', }} className={`pi ${allCollapsed ? "pi-chevron-down" : "pi-chevron-up"} `}></i>
            </button>
             <Tooltip target="#collapse-expand-btn" position="top" />
          </div>
          
          {/* <div className="user-profile-container">
            <div 
              className="user-profile-header"
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              style={{
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
                padding: '9px',
                borderRadius: '8px',
                transition: 'all 0.3s ease',
                backgroundColor: profileDropdownOpen ? 'rgba(255,255,255,0.1)' : 'transparent'
              }}
            >
              <div className="user-avatar" style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'linear-gradient(90deg, #0e527d, #1a87cb)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '14px',
                marginRight: '12px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
              }}>
                MK
              </div>
              <div className="user-info" style={{ flex: 1, color: 'white' }}>
                <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '2px', color: '#000' }}>
                  Mahesh Kumar
                </div>
                <div style={{ fontSize: '12px', opacity: '0.8', color: '#000' }}>
                  Manager
                </div>
              </div>
              <i className={`pi ${profileDropdownOpen ? 'pi-chevron-up' : 'pi-chevron-down'}`} 
                 style={{ color: '#000', fontSize: '12px' }}></i>
            </div>
            
            {profileDropdownOpen && (
              <div className="profile-dropdown" style={{
                marginTop: '10px',
                background: 'rgba(255,255,255,0.95)',
                borderRadius: '8px',
                padding: '15px',
                boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                animation: 'slideDown 0.3s ease'
              }}>
                <div className="profile-dropdown-header" style={{
                  textAlign: 'center',
                  marginBottom: '15px',
                  paddingBottom: '15px',
                  borderBottom: '1px solid #eee'
                }}>
                  <div className="large-avatar" style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: 'linear-gradient(90deg, #0e527d, #1a87cb)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '20px',
                    margin: '0 auto 10px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                  }}>
                    MK
                  </div>
                  <h6 style={{ margin: '0 0 5px', color: '#333', fontWeight: '600' }}>Mahesh Kumar</h6>
                  <p style={{ margin: '0', color: '#666', fontSize: '12px' }}>mahesh@vdm.com</p>
                </div>
                
                <div className="profile-stats" style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '10px',
                  marginBottom: '15px'
                }}>
                  <div style={{
                    textAlign: 'center',
                    padding: '8px',
                    background: '#f8f9fa',
                    borderRadius: '6px'
                  }}>
                    <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#007ad9' }}>12</div>
                    <div style={{ fontSize: '10px', color: '#666' }}>Active Projects</div>
                  </div>
                  <div style={{
                    textAlign: 'center',
                    padding: '8px',
                    background: '#f8f9fa',
                    borderRadius: '6px'
                  }}>
                    <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#28a745' }}>98%</div>
                    <div style={{ fontSize: '10px', color: '#666' }}>Completion Rate</div>
                  </div>
                </div>
                
                <div className="profile-actions">
                  <Link to="/admin-dashboard?selectedTab=3" style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '8px 12px',
                    marginBottom: '5px',
                    borderRadius: '6px',
                    textDecoration: 'none',
                    color: '#333',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.background = '#f8f9fa'}
                  onMouseLeave={(e) => e.target.style.background = 'transparent'}>
                    <i className="pi pi-user" style={{ marginRight: '8px', color: '#007ad9' }}></i>
                    View Profile
                  </Link>
                  
                  <Link to="/settings" style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '8px 12px',
                    marginBottom: '5px',
                    borderRadius: '6px',
                    textDecoration: 'none',
                    color: '#333',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.background = '#f8f9fa'}
                  onMouseLeave={(e) => e.target.style.background = 'transparent'}>
                    <i className="pi pi-cog" style={{ marginRight: '8px', color: '#6c757d' }}></i>
                    Settings
                  </Link>
                  
                  <div style={{
                    height: '1px',
                    background: '#eee',
                    margin: '10px 0'
                  }}></div>
                  
                  <Link to="/" style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    textDecoration: 'none',
                    color: '#dc3545',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.background = '#fff5f5'}
                  onMouseLeave={(e) => e.target.style.background = 'transparent'}>
                    <i className="pi pi-sign-out" style={{ marginRight: '8px' }}></i>
                    Sign Out
                  </Link>
                </div>
              </div>
            )}
          </div> */}
        </div>
      </div>
      
      <style jsx>{`
        .dragging {
          opacity: 0.5 !important;
        }
        
        li[draggable="true"]:hover {
          background-color: rgba(0, 122, 217, 0.05);
        }
        
        li[draggable="true"] {
          position: relative;
        }
        
        li[draggable="true"]:before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 3px;
          background: transparent;
          transition: background 0.2s ease;
        }
        
        li[draggable="true"]:hover:before {
          background: #007ad9;
        }
        
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
          .user-profile-header{
            background-color: #d3e3fd !important;
          }
        
        .user-profile-header:hover {
          background-color: rgba(255,255,255,0.1) !important;
        }
      `}</style>
    </React.Fragment>
  )
}

SidebarContent.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
}

export default withRouter(withTranslation()(SidebarContent))