import { create } from "zustand";
import {cartItem} from "../interfaces/Product";
import Product from "../interfaces/Product";

interface cartStore {
    cart : cartItem[],
    itemCount : number,
    addProductToCart : (product: Product) => void,
    removeProductFromCart : (productId: string) => void,
    clearCart : () => void,
}

export const useCartStore = create<cartStore>((set) => ({
    cart: [],
    itemCount: 0,

    addProductToCart: (product) => set((state) => {

        const existingItemIndex = state.cart.findIndex(
            (item) => item.product._id === product._id
        );

        if(existingItemIndex > -1) {
            const updatedCart = [...state.cart];
            updatedCart[existingItemIndex].quantity += 1;

            return {
                cart: updatedCart,
                itemCount: state.itemCount + 1
            }

        }
        else {

            return {
                cart : [...state.cart, {product: product, quantity: 1}],
                itemCount: state.itemCount + 1
            }

            

        }
    }),


    removeProductFromCart: (productId) => {
        set((state) => {
            const existingItemIndex = state.cart.findIndex(
                (item) => item.product._id === productId
            );
            
            if (existingItemIndex > -1) {
                const updatedCart = [...state.cart];
    
                if (updatedCart[existingItemIndex].quantity > 1) {
                    // Decrement quantity
                    updatedCart[existingItemIndex].quantity -= 1;
                    return {
                        cart: updatedCart,
                        itemCount: state.itemCount - 1
                    };
                } else {
                    // Remove item from cart
                    updatedCart.splice(existingItemIndex, 1);
                    return {
                        cart: updatedCart,
                        itemCount: state.itemCount - 1
                    };
                }
            }
    
            // Return state unchanged if productId not found
            return state;
        });
    },
    
    clearCart: () => {
        set({ cart: [], itemCount: 0 });
    },
}))