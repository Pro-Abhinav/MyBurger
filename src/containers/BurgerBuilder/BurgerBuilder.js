import React, {Component} from 'react'

import Aux from '../../hoc/_Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 3.0,
    bacon: 1.0,
    meat: 4.0
}

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasable: false
    }

    updatePurchaseState() {
        const ingredients = {
            ...this.state.ingredients
        };
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        this.setState({purchasable: sum>0})
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updateCount = oldCount+1;
        const updateIngredients = {
            ...this.state.ingredients
        };
        updateIngredients[type] = updateCount;
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + INGREDIENT_PRICES[type];
        this.setState({totalPrice: newPrice, ingredients: updateIngredients})
        this.updatePurchaseState();

    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if(oldCount<=0){
            return;
        }
        const updateCount = oldCount-1;
        const updateIngredients = {
            ...this.state.ingredients
        };
        updateIngredients[type] = updateCount;
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - INGREDIENT_PRICES[type];
        this.setState({totalPrice: newPrice, ingredients: updateIngredients})
        this.updatePurchaseState();
    }

    render(){
        const disabledInfo = {
            ...this.state.ingredients
        };
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        return (
            <Aux>
                <Modal>
                    <OrderSummary ingredients= {this.state.ingredients} />
                </Modal>
                <Burger ingredients= {this.state.ingredients}/>
                <BuildControls 
                    ingredientAdded = {this.addIngredientHandler}
                    ingredientRemoved = {this.removeIngredientHandler}
                    disabled = {disabledInfo} 
                    purchasable = {this.state.purchasable}
                    price = {this.state.totalPrice} />
            </Aux>
        )
    }
}

export default BurgerBuilder;