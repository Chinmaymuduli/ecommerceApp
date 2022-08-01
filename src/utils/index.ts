import { CartItemType } from "types"

export const getPrice = (catchArray: CartItemType[]) => {
    const totalProductPriceWithDiscount = catchArray?.reduce((acc, curr) => {
        // return acc + (curr?.weight?.currentPrice || 0) * curr?.quantity
        return acc + (curr?.product?.salePrice || 0) * curr?.quantity
    }, 0)
    // const TotalProductPriceWithoutDiscount = catchArray?.reduce((acc, curr) => {
    //     return +(
    //         acc +
    //         (curr?.weight?.currentPrice || 0) *
    //         curr?.quantity *
    //         (100 / (100- (curr?.weight?.discount || 0)) )
    //     ).toFixed(2)
    // }, 0)
    const TotalProductPriceWithoutDiscount = catchArray?.reduce((acc, curr) => {
        return +(
            acc +
            (curr?.product?.salePrice || 0) *
            curr?.quantity *
            (100 / (100 - (((curr?.product?.mrp - curr?.product.salePrice) / curr?.product?.mrp) * 100 || 0)))
        ).toFixed(2)
    }, 0)
    const totalDiscountAmount =
        +(TotalProductPriceWithoutDiscount - totalProductPriceWithDiscount).toFixed(2)
    const deliveryCharge = 0
    // const deliveryCharge = 50
    const sumTotalPriceCustomerWillPay =
        totalProductPriceWithDiscount + deliveryCharge


    return {
        totalProductPriceWithDiscount,
        TotalProductPriceWithoutDiscount,
        totalDiscountAmount,
        sumTotalPriceCustomerWillPay,
        deliveryCharge,
    }
}

