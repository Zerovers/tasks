import React from 'react';
import './index.css';
import { withRouter } from 'react-router-dom';
import TaskList from '../../components/taskList/taskList';
import SortData from '../../components/sort/sortData';
import Pagination from '../../components/pagination/pagination';

const MainPage = props => (
  <div className="task-content">
    <div className="sort-content">
      <SortData />
    </div>
    <TaskList admin={props.admin} history={props.history} />
    <Pagination />
  </div>
);
const HomePageRoute = withRouter(MainPage);
export default HomePageRoute;
