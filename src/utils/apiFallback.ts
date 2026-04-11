import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";

const INTERNET_IMAGES = [
  "https://images.pexels.com/photos/6311392/pexels-photo-6311392.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "https://images.pexels.com/photos/7691128/pexels-photo-7691128.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "https://images.pexels.com/photos/9776191/pexels-photo-9776191.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "https://images.pexels.com/photos/6347888/pexels-photo-6347888.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "https://images.pexels.com/photos/6311610/pexels-photo-6311610.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "https://images.pexels.com/photos/6764010/pexels-photo-6764010.jpeg?auto=compress&cs=tinysrgb&w=1200"
];

const DUMMY_CATEGORIES = [
  { _id: "cat-1", name: "Women" },
  { _id: "cat-2", name: "Men" },
  { _id: "cat-3", name: "Accessories" }
];

const DUMMY_SUB_CATEGORIES = [
  { _id: "sub-1", name: "Dresses" },
  { _id: "sub-2", name: "Tops" },
  { _id: "sub-3", name: "Bottoms" }
];

const DUMMY_PRODUCTS = [
  {
    _id: "prod-1",
    name: "Urban Linen Dress",
    unit_price: 12990,
    metadata: [
      { _id: "m-1", color: "Beige", size: "M", quantity: 12 },
      { _id: "m-2", color: "Black", size: "L", quantity: 9 }
    ],
    description: "Soft linen dress for daily comfort.",
    category: ["cat-1"],
    sub_category: ["sub-1"],
    images_path: [INTERNET_IMAGES[0], INTERNET_IMAGES[1]],
    date: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    _id: "prod-2",
    name: "Classic Cotton Tee",
    unit_price: 5990,
    metadata: [
      { _id: "m-3", color: "White", size: "S", quantity: 24 },
      { _id: "m-4", color: "Navy", size: "M", quantity: 20 }
    ],
    description: "Breathable everyday t-shirt.",
    category: ["cat-2"],
    sub_category: ["sub-2"],
    images_path: [INTERNET_IMAGES[2], INTERNET_IMAGES[3]],
    date: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    _id: "prod-3",
    name: "Tailored Shorts",
    unit_price: 7490,
    metadata: [
      { _id: "m-5", color: "Olive", size: "M", quantity: 11 },
      { _id: "m-6", color: "Stone", size: "L", quantity: 7 }
    ],
    description: "Smart shorts with modern fit.",
    category: ["cat-1"],
    sub_category: ["sub-3"],
    images_path: [INTERNET_IMAGES[4], INTERNET_IMAGES[5]],
    date: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

const DUMMY_REVIEWS = [
  {
    _id: "rev-1",
    title: "Great quality",
    description: "Fabric quality is better than expected.",
    rating: 5,
    date: new Date().toISOString(),
    status: "solved",
    user: { fname: "Nima" },
    images_path: [INTERNET_IMAGES[0], INTERNET_IMAGES[2]]
  },
  {
    _id: "rev-2",
    title: "Nice fit",
    description: "True to size and very comfortable.",
    rating: 4,
    date: new Date().toISOString(),
    status: "pending",
    user: { fname: "Ravi" },
    images_path: [INTERNET_IMAGES[3]]
  }
];

const DUMMY_FAQS = [
  {
    _id: "faq-1",
    full_name: "Alex Doe",
    question: "How long does shipping take?",
    status: "answered",
    answer: "Delivery usually takes 3-5 business days.",
    category: "Shipping"
  },
  {
    _id: "faq-2",
    full_name: "Sam Lee",
    question: "Can I return sale items?",
    status: "pending",
    category: "Returns"
  }
];

const DUMMY_ORDERS = [
  {
    _id: "ord-1",
    user_id: "user-1",
    orderProducts: [
      {
        product_id: DUMMY_PRODUCTS[0],
        quantity: 1,
        color: "Beige",
        size: "M"
      }
    ],
    purchase_date: new Date().toISOString(),
    billing_address: "21 Palm Street",
    total_price: 12990,
    order_status: "processing"
  },
  {
    _id: "ord-2",
    user_id: "user-1",
    orderProducts: [
      {
        product_id: DUMMY_PRODUCTS[1],
        quantity: 2,
        color: "White",
        size: "S"
      }
    ],
    purchase_date: new Date().toISOString(),
    billing_address: "21 Palm Street",
    total_price: 11980,
    order_status: "pre-confirmed"
  }
];

const DUMMY_PRICE_SUGGESTIONS = [
  {
    product_id: DUMMY_PRODUCTS[0]._id,
    product_name: DUMMY_PRODUCTS[0].name,
    current_price: DUMMY_PRODUCTS[0].unit_price,
    suggested_price: DUMMY_PRODUCTS[0].unit_price - 500,
    stock_status: "good",
    date_suggested: new Date().toISOString()
  }
];

const DUMMY_USERS = [
  {
    _id: "user-1",
    fname: "Alex",
    lname: "Morgan",
    email: "alex@example.com",
    phoneNumber: ["+94 71 000 0000"],
    address: [{ province: "Western", state: "Colombo", district: "Colombo", postal_code: "10100" }],
    createdAt: new Date().toISOString()
  }
];

let lastMutationAlertAt = 0;

const shouldTreatAsRead = (method: string, url: string) => {
  if (method === "get" || method === "head") {
    return true;
  }

  if (method === "post" && url.includes("products-by-ids")) {
    return true;
  }

  return false;
};

const showMutationAlert = (url: string, method: string) => {
  const now = Date.now();
  if (now - lastMutationAlertAt < 1200) {
    return;
  }

  lastMutationAlertAt = now;
  window.alert(
    `Backend ${method.toUpperCase()} failed for ${url}. Operation was not completed. Please try again later.`
  );
};

const toJsonResponse = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json"
    }
  });

const findProductsByIds = (payload?: unknown) => {
  const body = payload as { productIds?: string[] } | undefined;
  const ids = body?.productIds ?? [];

  if (!ids.length) {
    return DUMMY_PRODUCTS;
  }

  return DUMMY_PRODUCTS.filter((item) => ids.includes(item._id));
};

const getFallbackPayload = (url: string, method: string, requestData?: unknown) => {
  const lowerUrl = url.toLowerCase();

  if (lowerUrl.includes("/api/products-by-ids")) {
    return findProductsByIds(requestData);
  }

  if (lowerUrl.endsWith("/product") || lowerUrl.includes("/product?")) {
    return { data: DUMMY_PRODUCTS };
  }

  if (lowerUrl.includes("/product/") && method === "get") {
    return DUMMY_PRODUCTS[0];
  }

  if (lowerUrl.includes("/category")) {
    return { data: DUMMY_CATEGORIES };
  }

  if (lowerUrl.includes("/subcategory") || lowerUrl.includes("/subcategory")) {
    return { data: DUMMY_SUB_CATEGORIES };
  }

  if (lowerUrl.includes("/reviews/") && method === "get") {
    return DUMMY_REVIEWS[0];
  }

  if (lowerUrl.includes("/reviews")) {
    return DUMMY_REVIEWS;
  }

  if (lowerUrl.includes("/faqs/") && method === "get") {
    return { data: DUMMY_FAQS.find((faq) => lowerUrl.includes(faq._id)) ?? DUMMY_FAQS[0] };
  }

  if (lowerUrl.includes("/faqs")) {
    return { data: DUMMY_FAQS };
  }

  if (lowerUrl.includes("/order/getordersbypage")) {
    return { orders: DUMMY_ORDERS, totalPages: 1 };
  }

  if (lowerUrl.includes("/order/get-orders-on-year")) {
    return DUMMY_ORDERS;
  }

  if (lowerUrl.includes("/order/getoneorder")) {
    return DUMMY_ORDERS[0];
  }

  if (lowerUrl.includes("/order/getallorders")) {
    return DUMMY_ORDERS;
  }

  if (lowerUrl.includes("/order/get-pending-order")) {
    return DUMMY_ORDERS.filter((order) => order.order_status === "pre-confirmed");
  }

  if (lowerUrl.includes("/api/top-selling-products")) {
    return { productIds: DUMMY_PRODUCTS.map((product) => product._id) };
  }

  if (lowerUrl.includes("/api/trending-products")) {
    return DUMMY_PRODUCTS.map((product, index) => ({
      product_id: product._id,
      _id: product._id,
      name: product.name,
      color: product.metadata[0]?.color ?? "Black",
      size: product.metadata[0]?.size ?? "M",
      category: { name: DUMMY_CATEGORIES[index % DUMMY_CATEGORIES.length].name },
      unit_price: product.unit_price,
      description: product.description,
      images_path: product.images_path,
      total_sales: 100 - index * 10
    }));
  }

  if (lowerUrl.includes("/api/price-suggestions")) {
    return DUMMY_PRICE_SUGGESTIONS;
  }

  if (lowerUrl.includes("/api/sales-forecasting") || lowerUrl.includes("/api/sales_forecast")) {
    return DUMMY_PRODUCTS.map((product, index) => ({
      product_id: product._id,
      predicted_sales: 50 + index * 15
    }));
  }

  if (lowerUrl.includes("/api/product_growth")) {
    return DUMMY_PRODUCTS.map((product, index) => ({
      product_id: product._id,
      sales_growth: 8 - index * 2
    }));
  }

  if (lowerUrl.includes("/api/negative_growth_products")) {
    return [
      {
        product_id: DUMMY_PRODUCTS[2]._id,
        size: DUMMY_PRODUCTS[2].metadata[0].size,
        color: DUMMY_PRODUCTS[2].metadata[0].color,
        sales_growth: -4.5,
        predicted_growth: -2.1
      }
    ];
  }

  if (lowerUrl.includes("/api/users")) {
    return DUMMY_USERS;
  }

  if (lowerUrl.includes("/api/recommendations")) {
    return DUMMY_PRODUCTS.map((product) => ({ _id: product._id }));
  }

  if (lowerUrl.includes("/api/profile")) {
    return DUMMY_USERS[0];
  }

  return null;
};

const buildAxiosFallbackResponse = (
  config: InternalAxiosRequestConfig,
  data: unknown
): AxiosResponse => ({
  data,
  status: 200,
  statusText: "OK",
  headers: {},
  config
});

export const installGlobalApiFallbacks = () => {
  const win = window as Window & { __apiFallbackInstalled?: boolean };
  if (win.__apiFallbackInstalled) {
    return;
  }

  win.__apiFallbackInstalled = true;

  const originalFetch = window.fetch.bind(window);
  window.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = typeof input === "string" ? input : input.toString();
    const method = (init?.method ?? "GET").toLowerCase();

    try {
      const response = await originalFetch(input, init);

      if (!response.ok) {
        if (shouldTreatAsRead(method, url)) {
          const payload = getFallbackPayload(url, method, init?.body);
          if (payload !== null) {
            return toJsonResponse(payload);
          }
        }

        if (["post", "put", "patch", "delete"].includes(method) && !shouldTreatAsRead(method, url)) {
          showMutationAlert(url, method);
        }
      }

      return response;
    } catch (error) {
      if (shouldTreatAsRead(method, url)) {
        const payload = getFallbackPayload(url, method, init?.body);
        if (payload !== null) {
          return toJsonResponse(payload);
        }
      }

      if (["post", "put", "patch", "delete"].includes(method) && !shouldTreatAsRead(method, url)) {
        showMutationAlert(url, method);
        return toJsonResponse({ message: "Backend unavailable. Request failed." }, 503);
      }

      throw error;
    }
  };

  axios.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      const config = error.config;
      const method = (config?.method ?? "get").toLowerCase();
      const url = config?.url ?? "";

      if (config && shouldTreatAsRead(method, url)) {
        const payload = getFallbackPayload(url, method, config.data);
        if (payload !== null) {
          return Promise.resolve(buildAxiosFallbackResponse(config, payload));
        }
      }

      if (["post", "put", "patch", "delete"].includes(method) && !shouldTreatAsRead(method, url)) {
        showMutationAlert(url, method);
      }

      return Promise.reject(error);
    }
  );
};
