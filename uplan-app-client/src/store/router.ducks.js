import querystring from 'querystring';

export const selectors = {
  location: state => state.router.location,
  // Returns object with all query parameters
  query: (state) => {
    // Slice to remove leading ?
    const search = state.router.location.search.slice(1);
    return querystring.parse(search);
  },
};

export default null;
