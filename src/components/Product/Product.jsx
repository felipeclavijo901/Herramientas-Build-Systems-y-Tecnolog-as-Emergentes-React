import React from 'react'
import { Link } from 'react-router-dom';
import './Product.css'

class Product extends React.Component {
    render() {
        return (
            <div key={this.props.name} className="product card col-sm-12 col-md-4" style={{ "width": "18rem" }}>
                <img src={"/assets/img/" + this.props.imageName} className="card-img-top" alt="" />
                <div className="card-body">
                    <h5 className="card-title font-weight-bold">{this.props.name}</h5>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item"><span className="font-weight-bolder">Precio: ${this.props.price}</span> </li>
                    <li className="list-group-item"><span className="font-weight-bolder">Unidades disponibles: {this.props.quantity}</span> </li>
                    <li className="buttons font-weight-bolder d-flex flex-row justify-content-between">
                        <Link to={"/products/" + this.props.name} className="btn btn-primary">Ver más</Link>
                        <div className="d-flex align-content-center">
                            <button className="btn btn-warning text-white" onClick={this.addToCart}>Añadir</button>
                            <input type="number" min="0" onKeyUp={this.validate} max={this.props.quantity} className="w-20" defaultValue="1"  style={{"height": "100%"}}/>
                        </div>
                    </li>
                </ul>
            </div>
        );
    }

    validate = (event) => {
        let quantity = event.target.value;
        if(quantity > this.props.quantity){
            event.target.value = this.props.quantity;
        }

        if(quantity < 0){
            event.target.value = 0;
        }
    }

    addToCart = (event) => {
        let quantity = event.target.nextSibling.value;
        let product = this.props.name;
        let result = this.props.quantity - quantity;

        this.props.addToCart(product, quantity);

        if(result === 0){
            event.target.disabled = true;
            event.target.nextSibling.value = 0;
        }
    }
}

export default Product;