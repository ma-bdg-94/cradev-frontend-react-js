import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import s from "./Sidebar.module.scss";
import LinksGroup from "./LinksGroup/LinksGroup.js";
import { changeActiveSidebarItem } from "../../redux-store/actions/navigation.js";
import cn from "classnames";

const Sidebar = (props) => {

  const {
    activeItem = '',
    ...restProps
  } = props;

  const [burgerSidebarOpen, setBurgerSidebarOpen] = useState(false)

  useEffect(() => {
    if (props.sidebarOpened) {
      setBurgerSidebarOpen(true)
    } else {
      setTimeout(() => {
        setBurgerSidebarOpen(false)
      }, 0);
    }
  }, [props.sidebarOpened])

  return (
    <nav className={cn(s.root, { [s.sidebarOpen]: burgerSidebarOpen })} >
      <header className={s.logo}>
        <span className={s.pretitle}>C</span>
        <span className={s.title}>Cradev</span>
      </header>
      <ul className={s.nav}>
        <LinksGroup
          onActiveSidebarItemChange={activeItem => props.dispatch(changeActiveSidebarItem(activeItem))}
          activeItem={props.activeItem}
          header="Dashboard"
          isHeader
          iconName={<i className={'eva eva-home-outline'} />}
          link="/template/dashboard"
          index="dashboard"
        />
        <h5 className={s.navTitle}>Application</h5>
        <LinksGroup
          onActiveSidebarItemChange={activeItem => props.dispatch(changeActiveSidebarItem(activeItem))}
          activeItem={props.activeItem}
          header="Projects"
          isHeader
          iconName={<i className={'eva eva-grid-outline'} />}
          link="/template/typography"
          index="typography"
        />
        <LinksGroup
          onActiveSidebarItemChange={activeItem => props.dispatch(changeActiveSidebarItem(activeItem))}
          activeItem={props.activeItem}
          header="Clients"
          isHeader
          iconName={<i className={'eva eva-briefcase-outline'} />}
          link="/template/tables"
          index="tables"
        />
        <LinksGroup
          onActiveSidebarItemChange={activeItem => props.dispatch(changeActiveSidebarItem(activeItem))}
          activeItem={props.activeItem}
          header="Notifications"
          isHeader
          iconName={<i className={'eva eva-bell-outline'} />}
          link="/template/notifications"
          index="notifications"
        />
        <h5 className={s.navTitle}>Activity Timesheet</h5>
        <LinksGroup
          onActiveSidebarItemChange={activeItem => props.dispatch(changeActiveSidebarItem(activeItem))}
          activeItem={props.activeItem}
          header="Activity Report"
          isHeader
          iconName={<i className={'eva eva-calendar-outline'} />}
          link="/template/notifications"
          index="notifications"
        />
      </ul>
    </nav>
  );
}

Sidebar.propTypes = {
  sidebarOpened: PropTypes.bool,
  dispatch: PropTypes.func.isRequired,
  activeItem: PropTypes.string,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
}

function mapStateToProps(store) {
  return {
    sidebarOpened: store.navigation.sidebarOpened,
    activeItem: store.navigation.activeItem,
  };
}

export default withRouter(connect(mapStateToProps)(Sidebar));
