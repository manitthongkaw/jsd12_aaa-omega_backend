export const addToCart = async (req, res) => {
  const { productNumber, quantity } = req.body;
  const { userNumber } = req.user;

  try {
    let cart = await Cart.findOne({ userNumber });

    if (cart) {
      // เช็กว่ามีสินค้าเดิมอยู่แล้วไหม ถ้ามีให้เพิ่มจำนวน
      const itemIndex = cart.items.findIndex(i => i.productNumber === productNumber);
      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ productNumber, quantity });
      }
    } else {
      // ถ้ายังไม่มีตะกร้า ให้สร้างใหม่
      cart = new Cart({ userNumber, items: [{ productNumber, quantity }] });
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};