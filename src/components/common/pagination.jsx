import React, { Component } from 'react';
import _ from 'lodash';

const Pagination = (props) => {
  const { itemsCount, pageSize } = props;
  const pagesCount = itemsCount / pageSize;
  const pages = _.range(1, pagesCount + 1);
  console.log(pages);
  return (
    <nav>
      <ul className="pagination">
        {pages.map(page => <li key={page} className="page-item"><a href="" className="page-link">{page}</a></li>)}

      </ul>
    </nav>
  );
}

export default Pagination;