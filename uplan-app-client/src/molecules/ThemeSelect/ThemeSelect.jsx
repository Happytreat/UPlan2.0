import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'

const ThemePicker = styled(Button)`
  margin-top: 8px;
  border-color: ${props => props.theme.secondary};
  background-color: ${props => props.theme.secondary};
  &:hover{
    background-color: ${props => props.theme.secondary};
    border-color: ${props => props.theme.primary};
  }
`;

const colors = ['blueTheme', 'pinkTheme'];

class ThemeSelect extends React.Component {
  state = {
    theme: 0
  };

  alternateTheme = (e) => {
    const newTheme = 1 - this.state.theme;
    this.setState({ theme: newTheme });
    this.props.handleThemeChange(colors[newTheme]);
  };

  render() {
    return <ThemePicker onClick={this.alternateTheme}><i className="	fa fa-eyedropper"></i></ThemePicker>
  }
}

ThemeSelect.propTypes = {
  handleThemeChange: PropTypes.func.isRequired
};

export default ThemeSelect;
