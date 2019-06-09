import React from 'react';
import './Store.css';
import Product from '../Product/Product.jsx'

class Store extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            products: {}
        }
    }

    render() {

        return (
            <div id="store">
                <div className="d-flex flex-row justify-content-between">
                    <h3>Catálogo de productos</h3>
                    <form className="form my-2 my-lg-0">
                        <strong>¿Qué estás buscando?</strong>
                        <input className="form-control mr-sm-2" onChange={this.search} type="search" placeholder="Buscar producto" aria-label="Search" />
                    </form>
                </div>
                <hr/>
                <div className="container row">
                    {this.props.productsParams.map((product) => (
                        <Product key={product.name} imageName={product.imageName} name={product.name} price={product.price} quantity={product.quantity} addToCart={this.props.addToCart}/>
                    ))}
                </div>
            </div>
        );
    }

    search = (event) => {

        this.props.searchProducts(event.target.value);

    }
}

export default Store;