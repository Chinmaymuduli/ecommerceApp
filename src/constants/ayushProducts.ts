import { AYUSH_1, AYUSH_2, AYUSH_3, AYUSH_4, AYUSH_5, AYUSH_6 } from "assets";
import { HomeProductType } from "types";

const ayushProduct: HomeProductType[] = [
    { id: 1, name: "Mahua Laddu", discount: 300, img: AYUSH_1, currentPrice: 250, offer: "20% OFF" },
    { id: 2, name: "Jyotishmati Oil", discount: 599, img: AYUSH_2, currentPrice: 499, offer: "20% OFF" },
    { id: 3, name: "Nirgundi Oil", discount: 599, img: AYUSH_3, currentPrice: 499, offer: "New" },
    { id: 4, name: "Mahua Laddu", discount: 300, img: AYUSH_1, currentPrice: 250, offer: "20% OFF" },
    { id: 5, name: "Jyotishmati Oil", discount: 599, img: AYUSH_5, currentPrice: 499, offer: "20% OFF" },
    { id: 6, name: "Nirgundi Oil", discount: 599, img: AYUSH_6, currentPrice: 499, offer: "New" },
]
export default ayushProduct;