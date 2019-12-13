import React from "react";
import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";
import sampleFishes from "../sample-fishes";
import Fish from "./Fish";
import base from "../base";

class App extends React.Component {
    state = {
        fishes: {},
        order: {}
    };

    componentDidMount() {
        const localStorageRef = localStorage.getItem(
            this.props.match.params.storeId
        );
        if (localStorageRef) {
            this.setState({ order: JSON.parse(localStorageRef) });
        }
        this.ref = base.syncState(`${this.props.match.params.storeId}/fishes`, {
            context: this,
            state: "fishes"
        });
    }

    componentWillUnmount() {
        base.removeBinding(this.ref);
    }

    componentDidUpdate() {
        localStorage.setItem(
            this.props.match.params.storeId,
            JSON.stringify(this.state.order)
        );
    }

    addFish = fish => {
        const fishes = { ...this.state.fishes };
        fishes[`fish{${Date.now()}`] = fish;
        this.setState({
            fishes: fishes
        });
    };

    updateFish = (key, updatedFish) => {
        const fishes = this.state.fishes;
        fishes[key] = updatedFish;
        this.setState({ fishes });
    };

    loadSampleFishes = () => {
        this.setState({ fishes: sampleFishes });
    };

    addToOrder = key => {
        const order = { ...this.state.order };
        order[key] = order[key] + 1 || 1;
        this.setState({ order });
    };

    render() {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh Seafood Market" />
                    <ul className="fishes">
                        {Object.keys(this.state.fishes).map(key => (
                            <Fish
                                key={key}
                                index={key}
                                details={this.state.fishes[key]}
                                addToOrder={this.addToOrder}
                            />
                        ))}
                    </ul>
                </div>
                <Order fishes={this.state.fishes} order={this.state.order} />
                <Inventory
                    fishes={this.state.fishes}
                    addFish={this.addFish}
                    updateFish={this.updateFish}
                    loadSampleFishes={this.loadSampleFishes}
                />
            </div>
        );
    }
}

export default App;
