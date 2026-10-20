import React, {createContext,useContext,useEffect,useMemo,useState} from 'react';
const StoreContext=createContext(null);
export function StoreProvider({children}){
 const [cart,setCart]=useState(()=>JSON.parse(localStorage.getItem('hudie-cart')||'[]'));
 const [wishlist,setWishlist]=useState(()=>JSON.parse(localStorage.getItem('hudie-wishlist')||'[]'));
 useEffect(()=>localStorage.setItem('hudie-cart',JSON.stringify(cart)),[cart]);
 useEffect(()=>localStorage.setItem('hudie-wishlist',JSON.stringify(wishlist)),[wishlist]);
 const addToCart=(product,size,color,qty=1)=>setCart(old=>{const key=`${product.id}-${size}-${color}`;const found=old.find(x=>x.key===key);return found?old.map(x=>x.key===key?{...x,qty:x.qty+qty}:{...x}):[...old,{key,id:product.id,name:product.name,price:product.price,image:product.image,size,color,qty}]});
 const updateQty=(key,qty)=>setCart(old=>qty<1?old.filter(x=>x.key!==key):old.map(x=>x.key===key?{...x,qty}:x));
 const removeFromCart=key=>setCart(old=>old.filter(x=>x.key!==key));
 const toggleWishlist=id=>setWishlist(old=>old.includes(id)?old.filter(x=>x!==id):[...old,id]);
 const value=useMemo(()=>({cart,wishlist,addToCart,updateQty,removeFromCart,toggleWishlist,cartCount:cart.reduce((n,x)=>n+x.qty,0),subtotal:cart.reduce((n,x)=>n+x.price*x.qty,0)}),[cart,wishlist]);
 return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}
export const useStore=()=>useContext(StoreContext);
