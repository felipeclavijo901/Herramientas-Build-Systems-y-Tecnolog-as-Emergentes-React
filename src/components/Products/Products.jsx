import React from 'react'
import { Link } from 'react-router-dom';

class Products extends React.Component {

    render() {
        let product = this.props.searchProduct(this.props.match.params.product);

        if (product !== "") {

            return (
                <div>
                    <h3>{product.name}</h3>
                    <hr/>
                    <div className="card mb-3" style={{ "maxWidth": "100%" }}>
                        <div className="row no-gutters">
                            <div className="col-md-6 border border-dark">
                                <img src={"/assets/img/" + product.imageName} className="card-img" alt="..." />
                            </div>
                            <div className="col-md-6">
                                <div className="card-body">
                                    <h5 className="card-title">Precio: ${product.price}</h5>
                                    <h5 className="card-title">Unidades disponibles: {product.quantity}</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Link to="/store" className="btn btn-secondary btn-lg">Atrás</Link>
                </div>
            );
        } else {
            return (
                <div>
                    Paila
                </div>
            );
        }

    }
}

export default Products;