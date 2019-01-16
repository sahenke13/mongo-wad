import Header from './components/NavBar/Header'
import Footer from './components/Footer/Footer'
import React, {Component} from 'react'

class Layout extends Component {
    render() {
        return (
            <div>
                <Header />
                {this.props.children}
                <Footer />
            </div>
        )
    }
}
export default Layout;
