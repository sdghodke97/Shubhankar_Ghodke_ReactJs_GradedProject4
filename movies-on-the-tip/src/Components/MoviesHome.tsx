import React, { useState } from 'react';

import MoviesListView from './MoviesListView';
import NavMenu from './NavMenu';

type Props = {
  activeKey: string,
  setActiveKey: (key: string) => void
}
const MovieHome = ({ activeKey, setActiveKey }: Props) => {

  const [searchValue, setSearchValue] = useState<string | null>(null);
  return (
    <>
       <h4 className='my-3'>Movies On The Tip</h4>  
      <NavMenu activeKey={activeKey} setActiveKey={setActiveKey} setSearchValue={setSearchValue}></NavMenu>
     
      <MoviesListView activeKey={activeKey} searchValue={searchValue}></MoviesListView>
    </>
  );
}

export default MovieHome;