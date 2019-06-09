import React from 'react'
import { Link } from 'react-router-dom';
import './Menu.css';

class Menu extends React.Component {
    render() {
        
        return (
            <div id="menu">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <Link className="navbar-brand nav-link" to="/store">La bodega</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <Link className="nav-link" to="/store"><i className="fas fa-th"></i><span className="ml-3">Productos</span></Link>
                            </li>
                            <li className="nav-item active">
                                <Link className="nav-link" to="/cart"><i className="fas fa-shopping-cart"></i><span id="badgeCart" className="badge badge-danger">{this.props.cart}</span><span className="ml-3">Carrito</span></Link>
                            </li>
                            <li className="nav-item active">
                                <a className="nav-link" href="/" onClick={this.props.functionLogOut}><i className="fas fa-sign-out-alt"></i><span className="ml-3">Salir</span></a>
                            </li>
                        </ul>
                        <h4>Bienvenido, {this.props.sessionParams.name}</h4>
                    </div>
                </nav>
            </div>
        )
    }

    componentDidUpdate(){
        let valor = document.getElementById("badgeCart").innerHTML;

        if(valor === "0" || valor === ""){
            document.getElementById("badgeCart").style.display = "none";
        }else{
            document.getElementById("badgeCart").style.display = "inline-block";
        }
    }
}

export default Menu;