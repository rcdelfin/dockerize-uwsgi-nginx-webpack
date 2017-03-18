import React, { PropTypes } from 'react'
import Radium from 'radium'

import baseColors from 'styles/baseColors'

const styles = {
  base: {
    backgroundColor: baseColors.bg1,
    border: `1px solid ${baseColors.bg4}`,
    margin: '5px',
  },
  default: {
    color: baseColors.fg,
  },
  primary: {
    color: baseColors.red0,
  },
}

const BaseButton = Radium(({ style = [], kind = 'default', children, ...props }) => (
  <button style={[ styles.base, styles[kind], ...style ]} {...props} >
    { children }
  </button>
))
BaseButton.propTypes = {
  style: PropTypes.array,
  kind: PropTypes.string,
  children: PropTypes.node,
}

export default BaseButton
