import { create } from "zustand";
import {IProduct,cartItem} from "../interface/IProduct";
 

interface cartStore {
    cart : cartItem[],
    itemCount : number,
    addProductToCart : (product: IProduct) => void,
    removeProductFromCart : (productId: string) => void,
    clearCart : () => void,
}

export const useCartStore = create<cartStore>((set) => ({
    cart: [],
    itemCount: 0,

    addProductToCart: (product) => set((state) => {

        const existingItemIndex = state.cart.findIndex(
            (item) => item.product.id === product.id
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
                (item) => item.product.id === productId
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