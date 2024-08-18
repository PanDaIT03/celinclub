import queryString from 'query-string';
import { useLocation, useNavigate } from 'react-router-dom';

function updateQueryStringParameter(search: string, newParams: any) {
  const searchObj = queryString.parse(search);

  return queryString.stringify(
    { ...searchObj, ...newParams },
    { skipEmptyString: true, skipNull: true },
  );
}

export const HocChangePagination = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return (page: number, pageSize?: number | undefined) => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    navigate(
      {
        pathname: location.pathname,
        search: updateQueryStringParameter(location.search, {
          page: page,
          page_size: pageSize,
        }),
      },
      { state: location?.state },
    );
  };
};
