import { create } from "zustand";
import { persist } from "zustand/middleware";
import { cartItem } from "../interfaces/Product";
import { produce } from "immer";
//import Product from "../interfaces/Product";
import cart from "../pages/cart/Cart.tsx";

interface CartStore {
  user_id: string;
  cart: cartItem[];
  selectedCartItem : cartItem[];
  itemCount: number;
  totalPrice: number;
  addProductToCart: (cart_item: cartItem) => void;
  removeProductFromCart: (productId: string) => void;
  increaseProductQuantity: (cart_item: cartItem) => void;
  decreaseProductQuantity: (cart_item: cartItem) => void;
  addFromCart: (cartItem: cartItem) => void;
  calculateTotal: () => void;
  cancelPay: () => void;
  clearCart: () => void;
  clearSelectedCartItem: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      user_id: "it22322708", /* 66f69ac2dd07888082ea1d4c 66d196a444e126395cbed7d1 */
      cart: [],
      selectedCartItem: [],
      itemCount: 0,
      totalPrice: 0,

      setUserId: (newUserId: string) => set(() => ({ user_id: newUserId })),

      addProductToCart: (cart_item: cartItem) =>
        set(
          produce((state: CartStore) => {
            const existingProductIndex = state.cart.findIndex(
              (item) => item.product._id === cart_item.product._id && item.color == cart_item.color && item.size == cart_item.size
            );
              console.log(cart_item)
            if (existingProductIndex > -1) {

                const matchingMeta = cart_item.product.metadata.find(
                    (meta) => meta.color === cart_item.color && meta.size === cart_item.size
                )

                if(matchingMeta && matchingMeta.quantity > state.cart[existingProductIndex].quantity){
                    console.log(state.cart)
                    state.cart[existingProductIndex].quantity += 1;
                    state.itemCount += 1;
                }

                /*state.cart[existingProductIndex].quantity += 1;
                    console.log(cart)*/

            } else {
              state.cart.push(cart_item);
              console.log(cart)
            }

            state.itemCount += 1;
          })
        ),
      
      addFromCart: (cart_item: cartItem) =>
        set(
          produce((state: CartStore) => {

            localStorage.removeItem('selectedCartItem');

            console.log(cart_item);

            // Add the item to the selectedCartItem array
            state.selectedCartItem.push(cart_item);
      
            // Update the cart state by filtering out the item
            state.cart = state.cart.filter(
              (item) => item.product._id !== cart_item.product._id || item.color !== cart_item.color || item.size !== cart_item.size
            );
            
            //console.log(state.selectedCartItem); // For debugging

          })
        ),

      cancelPay: () => 
        set(
          produce((state: CartStore) => {
            state.cart.push(...state.selectedCartItem);
            state.selectedCartItem = [];
          })
      ),  

      removeProductFromCart: (productId) =>
        set(
          produce((state: CartStore) => {
            const existingItemIndex = state.cart.findIndex(
              (item) => item.product._id === productId
            );

            if (existingItemIndex > -1) {
              state.cart.splice(existingItemIndex, 1);
              state.itemCount -= 1;
            }
          })
        ),

      increaseProductQuantity: (cart_item: cartItem) =>
        set(
          produce((state: CartStore) => {
            const existingItemIndex = state.cart.findIndex(
              (item) =>
                        item.product._id === cart_item.product._id
                        && item.color == cart_item.color
                        && item.size == cart_item.size
            );


            if (existingItemIndex > -1) {

                const matchingMeta = cart_item.product.metadata.find(
                    (meta) => meta.color === cart_item.color && meta.size === cart_item.size
                )

                if(matchingMeta && matchingMeta.quantity > state.cart[existingItemIndex].quantity){
                    console.log(state.cart)
                    state.cart[existingItemIndex].quantity += 1;
                    state.itemCount += 1;
                }

                /*if(matchingMeta && matchingMeta.quantity > state.cart[existingItemIndex].quantity){
                    console.log(state.cart)
                    state.cart[existingItemIndex].quantity += 1;
                    state.itemCount += 1;
                }*/
            }
          })
        ),

      decreaseProductQuantity: (cart_item: cartItem) =>
        set(
            produce((state: CartStore) => {
                const existingItemIndex = state.cart.findIndex(
                    (item) => item.product._id === cart_item.product._id && item.color == cart_item.color && item.size == cart_item.size
                );

                if (existingItemIndex > -1) {
                    console.log(state.cart)
                    if(state.cart[existingItemIndex].quantity > 1){
                        state.cart[existingItemIndex].quantity -= 1;
                        state.itemCount -= 1;
                    }
                    else{
                        state.cart.splice(existingItemIndex, 1);
                        state.itemCount -= 1;
                    }
                }
            })
        ),

      calculateTotal: () =>
        set(
          produce((state: CartStore) => {
            state.totalPrice = state.cart.reduce((total, item) => {
              return total + item.product.unit_price * item.quantity;
            }, 0);
          })
        ),

      clearCart: () =>
        set(
          produce((state: CartStore) => {
            state.cart = [];
            state.itemCount = 0;
            state.totalPrice = 0;
          })
        ),

      clearSelectedCartItem: () =>
          set(
              produce((state: CartStore) => {
                  state.selectedCartItem = [];
              })
          ),

    }),
    {
      name: "cart-storage",
    }
  )
);
