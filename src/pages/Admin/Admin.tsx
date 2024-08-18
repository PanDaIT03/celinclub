import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { findAllRetailVisit } from 'state/reducers/retailVisit';
import { RootState, useAppDispatch } from 'state/store';

function Admin() {
  const dispatch = useAppDispatch();

  const { data: retailVisits } = useSelector(
    (state: RootState) => state.retailVisit,
  );

  useEffect(() => {
    dispatch(findAllRetailVisit({}));
  }, []);

  console.log(retailVisits);

  return <></>;
}

export default Admin;
