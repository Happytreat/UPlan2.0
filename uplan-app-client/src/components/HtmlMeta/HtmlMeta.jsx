import React from 'react';
import PropTypes from 'prop-types';

import { Helmet } from 'react-helmet';

/*
 * https://github.com/nfl/react-helmet/issues/373
 * Uncaught RangeError: Maximum call stack size exceeded · Issue #373 · nfl/react-helmet · GitHub
 */
const HtmlMeta = ({ subtitle, children, description }) => {
  const title = `${subtitle} · ${DEF_NAME}`;
  return (
    <React.Fragment>
      <Helmet
        title={title}
        meta={[
          {
            name: 'description',
            content: description,
          },
        ]}
      >
        {/*  <title>{title}</title> */}
        {/*  <meta name="description" content={description} /> */}
      </Helmet>
      {children}
    </React.Fragment>
  );
};

HtmlMeta.propTypes = {
  subtitle: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  description: PropTypes.string,
};

HtmlMeta.defaultProps = {
  description: '',
};


export default HtmlMeta;
