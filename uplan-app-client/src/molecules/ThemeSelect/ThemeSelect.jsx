import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'

import { themes } from '../../theme/globalStyle';

const ThemePicker = styled(Button)`
  margin-top: 8px;
  border-color: ${props => props.theme.secondary};
  background-color: ${props => props.theme.secondary};
  &:hover{
    background-color: ${props => props.theme.secondary};
    border-color: ${props => props.theme.primary};
  }
`;

class ThemeSelect extends React.Component {
  state = {
    theme: 0
  };

  changeTheme = (e) => {
    const newTheme = (this.state.theme + 1) % themes.length;
    this.setState({ theme: newTheme });
    this.props.handleThemeChange(themes[newTheme]);
  };

  render() {
    return <ThemePicker onClick={this.changeTheme}><i className="	fa fa-eyedropper"></i></ThemePicker>
  }
}

ThemeSelect.propTypes = {
  handleThemeChange: PropTypes.func.isRequired
};

export default ThemeSelect;
