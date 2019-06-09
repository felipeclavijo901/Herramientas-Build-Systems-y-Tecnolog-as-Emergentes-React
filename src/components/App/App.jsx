import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from 'react-router-dom';
import request from 'superagent'
import './App.css';
import Menu from '../Menu/Menu.jsx'
import Store from '../Store/Store.jsx'
import Cart from '../Cart/Cart.jsx'
import Products from '../Products/Products.jsx'
import Footer from '../Footer/Footer.jsx'

class App extends React.Component {

    constructor() {
        super();

        this.state = {
            products: [],
            productsFilter: [],
            Session: "",
            cart: {
                quantity: 0,
                products: [

                ],
                total: 0,
            }
        }
    }

    componentWillMount() {
        this.setState({ Session: JSON.parse(sessionStorage.getItem("Session")) });

        //Get products
        this.getProducts();
    }

    render() {

        //Validate Login
        if (!this.validateLogin()) {
            return (
                <Route exact render={() => <Redirect to="/" />} />
            )
        }

        return (
            <Router>
                <div className="container h-100">
                    <Menu functionLogOut={this.functionLogOut} sessionParams={this.state.Session} cart={this.state.cart.quantity} />
                    <div className="main bg-light">
                        <Switch>
                            <Route path='/store' component={Store} >
                                <Store productsParams={this.state.productsFilter} validateImage={this.validateImage} searchProducts={this.searchProducts} addToCart={this.addToCart} />
                            </Route>
                            <Route path="/cart" component={Cart} >
                                <Cart cart={this.state.cart} cleanProducts={this.getProducts} cleanCart={this.cleanCart} setProducts={this.setProducts}/>
                            </Route>
                            <Route path="/products/:product" render={
                                (props) =>  <Products products={this.state.productsFilter} searchProduct={this.searchProduct} {...props}/>
                            }/>
                        </Switch>
                    </div>
                    <Footer />
                </div>
            </Router>
        );
    }

    functionLogOut = () => {
        sessionStorage.removeItem("Session");
        this.props.history.push('/');
    }

    validateLogin() {

        if (sessionStorage.getItem("Session") == null)
            return false;

        return true;
    }

    getProducts = () => {
        request.get('https://la-bodega-55cba.firebaseio.com/products.json?')
            .then(req => {

                let products = this.orderObject(req.body, "name");

                this.setState({ products: products });
                this.setState({ productsFilter: products });
            });
    }

    searchProducts = (text) => {

        let result = [];

        this.state.products.forEach((product) => {

            if (this.cleanText(product.name).indexOf(this.cleanText(text)) !== -1) {
                result.push(product);
                return true;
            } else {
                return false;
            }

        });

        this.setState({ productsFilter: result });
    }

    cleanText = (function(text) {

        var from = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç",
            to = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc",
            mapping = {}

        for (var i = 0, j = from.length; i < j; i++){
            mapping[from.charAt(i)] = to.charAt(i);
        }
            

        return function (str) {
            var ret = [];
            for (var i = 0, j = str.length; i < j; i++) {
                var c = str.charAt(i);
                if (mapping.hasOwnProperty(str.charAt(i))){
                    ret.push(mapping[c]);
                }
                else{
                    ret.push(c);
                }
            }
            return ret.join('').toLowerCase();

        }
    })()

    addToCart = (product, quantity) => {
        
        if(quantity > 0){
            product = this.searchProduct(product);
            if(product !== ""){

                let productCart = this.searchProduct(product.name, this.state.cart.products);
                if(productCart !== ""){

                    productCart.quantity ++;
                    this.state.cart.total += (product.price * quantity)

                    this.setState({cart: this.state.cart});

                }else{
                    
                    let localCart = this.state.cart;
                    localCart.quantity++;
                    localCart.total += (product.price * quantity)
                    localCart.products.push({
                        name: product.name,
                        imageName: product.imageName,
                        price: product.price,
                        quantity: quantity
                    });
                    localCart.products = this.orderObject(localCart.products, "name");
                    this.setState({cart: localCart});
                }
                
                this.modifyQuantity(product, quantity, "minus");

            }
        }
    }

    searchProduct = (productToSearch, haystack = this.state.products, callBack = ()=>{}) => {
        let productFind = ""
        haystack.forEach((product) => {

            if (product.name.indexOf(productToSearch) !== -1) {
                productFind = product;
                return true;
            } else {
                return false;
            }

        });

        callBack(productFind);

        return productFind;
    }

    modifyQuantity = (product, quantity, type = "pluss") => {

        if(type === "minus"){
            product.quantity -= quantity;
        }else{
            product.quantity += quantity;
        }

    }

    cleanCart = () => {
        this.setState({
            "cart": {
                quantity: 0,
                products: [

                ],
                total: 0,
            }
        });
    }

    setProducts = () => {
        request.put('https://la-bodega-55cba.firebaseio.com/products.json')
            .set('Content-Type', 'application/json')
            .send(JSON.stringify(this.state.products))
            .end((err, res) => {
                if (err) throw err;
                this.cleanCart();
                this.getProducts();
            });
    }

    orderObject = (object, parameter) => {
        let result = object.sort((a, b) => {
            if (a[parameter] > b[parameter]) {
                return 1;
            }
            if (a[parameter] < b[parameter]) {
                return -1;
            }
            // a must be equal to b
            return 0;
        });
        
        return result;
    }
}

export default App;