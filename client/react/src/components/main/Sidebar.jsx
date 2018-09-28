import React from 'react'
import Sidebar from 'react-sidebar'
import { Button } from '@material-ui/core'
import { Row, Container } from 'reactstrap'
import { Colors } from '../../helpers/themes';

const styles = {
  menuButtons: {
    width: '200px'
  },
  title: {
    textAlign: 'center',
    fontSize: '20px',
    color: Colors.AppGreenDark
  }
}

const Content = () => (
  <Container>
    <div style={styles.title}>
      <span style={styles.title}>
        Salas Educacionais
      </span>
    </div>
    <Row>
      <Button style={styles.menuButtons} color='primary'>Questões</Button>
    </Row>
    <Row>
      <Button style={styles.menuButtons} color='primary'>Perguntas</Button>
    </Row>
  </Container>
)

class SidebarComponent extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Sidebar
        sidebar={<Content />}
        open={this.props.isOpen}
        onSetOpen={(open) => this.props.onSetSidebarOpen(open)}
        styles={{ sidebar: { background: 'white' } }}
      >
        <div></div>
      </Sidebar>
    )
  }
}

export default SidebarComponent