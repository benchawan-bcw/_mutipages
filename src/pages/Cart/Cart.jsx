import "./Cart.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function Cart({ cart, setCart }) {
  return (
    <div className="cart-container">
      <div className="cart-itemps-container">
        {cart.map((item) => {
          return (
            <Card style={{ width: "13rem" }} key={item.id}>
              <Card.Img variant="top" src={item.thumbnailUrl} />
              <Card.Body>
                <Card.Title>{item.title}</Card.Title>
                <Card.Text>
                  <b>${item.price.toFixed(2)}</b>
                </Card.Text>
                <Button
                  variant="outline-danger"
                  onClick={() => {
                    setCart(cart.filter((c) => c.id !== item.id))
                  }}
                >
                  Remove from Cart
                </Button>
              </Card.Body>
            </Card>
          );
        })}
      </div>
      <h4><b>
      Products:&nbsp;
        <span className="badge bg-danger">{cart.length} items</span>
        &nbsp; - &nbsp;
          Total Price: <span className="badge bg-success">$
        {cart.reduce((prev, cart) => {
          return prev + cart.price
        }, 0).toFixed(2)}</span></b>
      </h4>
      <button className="btn btn-warning">Checkout &nbsp;<span className="bi bi-credit-card"></span></button>
    </div>
  );
}

export default Cart;
