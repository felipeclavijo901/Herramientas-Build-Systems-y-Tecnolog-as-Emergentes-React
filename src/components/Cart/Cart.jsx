import React from 'react';
import {
    BrowserRouter as Router, Route,
    Redirect
} from 'react-router-dom';
import './Cart.css';

class Cart extends React.Component {

    render() {

        if (this.props.cart.quantity > 0) {
            return (
                <div id="cart">
                    <h3>Carrito de compras</h3>
                    <hr />
                    <div className="row container">
                        <div className="col-sm-12 col-md-6">
                            {this.props.cart.products.map((product) => (
                                <div key={product.name} className="card mb-3">
                                    <div className="row no-gutters">
                                        <div className="col-md-4">
                                            <img src={"/assets/img/" + product.imageName} className="card-img" alt="..." />
                                        </div>
                                        <div className="col-md-8">
                                            <div className="card-body">
                                                <h5 className="card-title">{product.name}</h5>
                                                <p><small className="text-muted font-weight-bold">Unidades: {product.quantity}</small></p>
                                                <p><small className="text-muted font-weight-bold">Subtotal: ${product.quantity * product.price}</small></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="col-sm-12 col-md-6">
                            <h3>Total: ${this.props.cart.total}</h3>
                            <button type="button" onClick={this.cancel} className="btn btn-outline-dark">Cancelar</button>
                            <button type="button" onClick={this.pay} className="btn btn-outline-dark">Pagar</button>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <Route exact render={() => <Redirect to="/store" />} />
            );
        }
    }

    cancel = () => {
        this.props.cleanCart();
        this.props.cleanProducts();
    }

    pay = () => {
        this.props.setProducts();
    }
}

export default Cart;