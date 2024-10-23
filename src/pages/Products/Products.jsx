import "./Products.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function products({ products, cart, setCart }) {
  return (
    <div className="products-container">
      <div className="products-itemps-container">
        {products.map((products) => {
          return (
            <Card style={{ width: "13rem" }} key={products.id}>
              <Card.Img variant="top" src={products.thumbnailUrl} />
              <Card.Body>
                <Card.Title>{products.title}</Card.Title>
                <Card.Text>
                  <b>${products.price.toFixed(2)}</b>
                </Card.Text>
                {cart.find((cart) => cart.id === products.id) ? (
                  <span className="badge bg-secondary">Product added</span>
                ) : (
                  <Button
                    variant="outline-primary"
                    onClick={() => setCart([...cart, products])}
                  >
                    Add to Cart
                  </Button>
                )}
              </Card.Body>
            </Card>
          );
        })}
      </div>
      
    </div>
  );
}

export default products;
