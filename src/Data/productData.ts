export const dummyProducts = [
    {
      id: "1", // Unique ID for the product
      name: "Basic White T-Shirt",
      unit_price: 15.99,
      metadata: [
        { color: "White", size: "S", quantity: 50 },
        { color: "White", size: "M", quantity: 30 },
        { color: "White", size: "L", quantity: 20 }
      ],
      description: "A comfortable white T-shirt made from 100% cotton. Perfect for everyday wear.",
      category: ["Clothing"], // Replaced with string array
      sub_category: ["T-Shirts", "Casual"], // Replaced with string array
      images_path: ["images/white_tshirt_s.jpg", "images/white_tshirt_m.jpg", "images/white_tshirt_l.jpg"]
    },
    {
      id: "2",
      name: "Denim Jacket",
      unit_price: 59.99,
      metadata: [
        { color: "Blue", size: "M", quantity: 15 },
        { color: "Blue", size: "L", quantity: 10 }
      ],
      description: "A classic blue denim jacket that never goes out of style. Features two chest pockets and a button closure.",
      category: ["Clothing"],
      sub_category: ["Jackets", "Denim"],
      images_path: ["images/denim_jacket_m.jpg", "images/denim_jacket_l.jpg"]
    },
    {
      id: "3",
      name: "Black Leather Jacket",
      unit_price: 149.99,
      metadata: [
        { color: "Black", size: "M", quantity: 5 },
        { color: "Black", size: "L", quantity: 3 },
        { color: "Black", size: "XL", quantity: 2 }
      ],
      description: "High-quality black leather jacket. Features a zip-up front and side pockets.",
      category: ["Clothing"],
      sub_category: ["Jackets", "Leather"],
      images_path: ["images/leather_jacket_m.jpg", "images/leather_jacket_l.jpg", "images/leather_jacket_xl.jpg"]
    },
    {
      id: "4",
      name: "Slim Fit Jeans",
      unit_price: 39.99,
      metadata: [
        { color: "Dark Blue", size: "32", quantity: 25 },
        { color: "Dark Blue", size: "34", quantity: 30 },
        { color: "Dark Blue", size: "36", quantity: 15 }
      ],
      description: "Comfortable slim fit jeans made from stretchable denim. Available in dark blue wash.",
      category: ["Clothing"],
      sub_category: ["Pants", "Jeans"],
      images_path: ["images/slim_fit_jeans_32.jpg", "images/slim_fit_jeans_34.jpg", "images/slim_fit_jeans_36.jpg"]
    },
    {
      id: "5",
      name: "Plaid Flannel Shirt",
      unit_price: 24.99,
      metadata: [
        { color: "Red", size: "S", quantity: 20 },
        { color: "Red", size: "M", quantity: 18 },
        { color: "Red", size: "L", quantity: 10 }
      ],
      description: "Soft and cozy plaid flannel shirt in red. Perfect for layering in cooler weather.",
      category: ["Clothing"],
      sub_category: ["Shirts", "Flannel"],
      images_path: ["images/plaid_flannel_shirt_s.jpg", "images/plaid_flannel_shirt_m.jpg", "images/plaid_flannel_shirt_l.jpg"]
    }
  ];
  