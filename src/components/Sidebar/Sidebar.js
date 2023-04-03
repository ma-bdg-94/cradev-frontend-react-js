import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Button } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import s from "./Sidebar.module.scss";
import LinksGroup from "./LinksGroup/LinksGroup.js";
import { changeActiveSidebarItem } from "../../redux-store/slices/navigation.slice";
import cn from "classnames";

const Sidebar = (props) => {

  // const {
  //   activeItem = '',
  //   ...restProps
  // } = props;

  const dispatch = useDispatch()

  const sidebarOpened = useSelector(({ navigation }) => navigation.sidebarOpened)
  const activeItem = useSelector(({ navigation }) => navigation.activeItem)

  const [burgerSidebarOpen, setBurgerSidebarOpen] = useState(false)

  useEffect(() => {
    if (sidebarOpened) {
      setBurgerSidebarOpen(true)
    } else {
      setTimeout(() => {
        setBurgerSidebarOpen(false)
      }, 0);
    }
  }, [sidebarOpened])

  return (
    <nav className={cn(s.root, { [s.sidebarOpen]: burgerSidebarOpen })} >
      <header className={s.logo}>
        <span className={s.pretitle}>C</span>
        <span className={s.title}>Cradev</span>
      </header>
      <ul className={s.nav}>
        <LinksGroup
          onActiveSidebarItemChange={activeItem => dispatch(changeActiveSidebarItem(activeItem))}
          activeItem={activeItem}
          header="Dashboard"
          isHeader
          iconName={<i className={'eva eva-home-outline'} />}
          link="/template/dashboard"
          index="dashboard"
        />
        <h5 className={s.navTitle}>Application</h5>
        <LinksGroup
          onActiveSidebarItemChange={activeItem => dispatch(changeActiveSidebarItem(activeItem))}
          activeItem={activeItem}
          header="Projects"
          isHeader
          iconName={<i className={'eva eva-grid-outline'} />}
          link="/template/typography"
          index="typography"
        />
        <LinksGroup
          onActiveSidebarItemChange={activeItem => dispatch(changeActiveSidebarItem(activeItem))}
          activeItem={activeItem}
          header="Clients"
          isHeader
          iconName={<i className={'eva eva-briefcase-outline'} />}
          link="/template/tables"
          index="tables"
        />
        <LinksGroup
          onActiveSidebarItemChange={activeItem => dispatch(changeActiveSidebarItem(activeItem))}
          activeItem={activeItem}
          header="Notifications"
          isHeader
          iconName={<i className={'eva eva-bell-outline'} />}
          link="/template/notifications"
          index="notifications"
        />
        <h5 className={s.navTitle}>Activity Timesheet</h5>
        <LinksGroup
          onActiveSidebarItemChange={activeItem => dispatch(changeActiveSidebarItem(activeItem))}
          activeItem={activeItem}
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

export default withRouter(Sidebar);
