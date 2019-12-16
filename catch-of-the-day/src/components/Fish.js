import React, { Component } from "react";
import PropTypes from "prop-types";
import { formatPrice } from "../helpers";

export class Fish extends Component {
    static propTypes = {
        details: PropTypes.shape({
            image: PropTypes.string,
            name: PropTypes.string,
            decription: PropTypes.string,
            status: PropTypes.string,
            price: PropTypes.number
        }),
        addToOrder: PropTypes.func
    };
    handleClick = () => {
        this.props.addToOrder(this.props.index);
    };
    render() {
        const isAvailable = this.props.details.status === "available";

        return (
            <li className="menu-fish">
                <img
                    src={this.props.details.image}
                    alt={this.props.details.name}
                />
                <h3 className="fish-name">
                    {this.props.details.name}
                    <span className="price">
                        {formatPrice(this.props.details.price)}
                    </span>
                </h3>
                <p>{this.props.details.desc}</p>
                <button disabled={!isAvailable} onClick={this.handleClick}>
                    {isAvailable ? "Add to Cart" : "Sold out"}
                </button>
            </li>
        );
    }
}

export default Fish;
