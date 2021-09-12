import PropTypes from 'prop-types'
import Button from './Button'

const Header = ({ title, showAdd, onToggleShowAdd }) => {
  return (
    <header className='header'>
      <h1>{title}</h1>
      <Button
        color={showAdd ? 'red' : 'green'}
        text={showAdd ? 'Discard' : 'Add'}
        onClick={onToggleShowAdd}
      />
    </header>
  )
}

Header.defaultProps = {
  title: 'Default Title',
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
}

// CSS in JS
// const headingStyle = {
//   color: 'red',
//   backgroundColor: 'black'
// }

export default Header
