import { configure, mount } from 'enzyme'
import PropTypes from 'prop-types'

import Adapter from 'enzyme-adapter-react-16'

const App = ({ name }) => <h2>{name}</h2>

App.propTypes = {
  name: PropTypes.string
}

configure({ adapter: new Adapter() })

it('teste 1', () => {
  const props = { name: 'Fulaninho' }
  const app = mount(<App {...props} />)
  expect(app.find('h2')).toHaveLength(1)
})