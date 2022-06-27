import { CartItemType } from "types"

export const getPrice = (catchArray: CartItemType[]) => {
    const totalProductPriceWithDiscount = catchArray?.reduce((acc, curr) => {
        return acc + (curr?.weight?.currentPrice || 0) * curr?.quantity
    }, 0)
    // const TotalProductPriceWithoutDiscount = catchArray?.reduce((acc, curr) => {
    //     return (
    //         acc +
    //         (curr?.weight?.currentPrice || 0) *
    //         curr?.quantity *
    //         (1 + (curr?.weight?.discount || 0) / 100)
    //     )
    // }, 0)
    const TotalProductPriceWithoutDiscount = catchArray?.reduce((acc, curr) => {
        return +(
            acc +
            (curr?.weight?.currentPrice || 0) *
            curr?.quantity *
            (100 / (100 - (curr?.weight?.discount || 0)))
        ).toFixed(2)
    }, 0)
    // console.log("first", TotalProductPriceWithoutDiscount)
    const totalDiscountAmount =
        +(TotalProductPriceWithoutDiscount - totalProductPriceWithDiscount).toFixed(2)
    const deliveryCharge = 0
    // const deliveryCharge = 50
    const sumTotalPriceCustomerWillPay =
        totalProductPriceWithDiscount + deliveryCharge

    // if coupon


    return {
        totalProductPriceWithDiscount,
        TotalProductPriceWithoutDiscount,
        totalDiscountAmount,
        sumTotalPriceCustomerWillPay,
        deliveryCharge,
    }
}