// src/js/wishlist.mjs
import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export function getWishlist() {
  return getLocalStorage("wishlist") || [];
}

export function addToWishlist(product) {
  let wishlist = getWishlist();
  // Check if product is already in wishlist
  if (!wishlist.some((item) => item.Id === product.Id)) {
    wishlist.push(product);
    setLocalStorage("wishlist", wishlist);
  }
}

export function removeFromWishlist(productId) {
  let wishlist = getWishlist();
  wishlist = wishlist.filter((item) => item.Id !== productId);
  setLocalStorage("wishlist", wishlist);
}