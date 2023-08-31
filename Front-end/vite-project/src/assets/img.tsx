const asset = {
  get logo() {
    return new URL("./images/logo.png", import.meta.url).href;
  },

  get imgContentLogin() {
    return new URL("./images/hero-devices-login.png", import.meta.url).href;
  },

  get notFound() {
    return new URL("./images/NotFound404H.webp", import.meta.url).href;
  },

  get productCard() {
    return {
      get anh1() {
        return new URL("./images/product-1.jpg", import.meta.url).href;
      },
      get anh2() {
        return new URL("./images/product-2.jpg", import.meta.url).href;
      },
      get anh3() {
        return new URL("./images/product-3.jpg", import.meta.url).href;
      },
      get anh4() {
        return new URL("./images/product-7.jpg", import.meta.url).href;
      },
      get anh5() {
        return new URL("./images/product-8.jpg", import.meta.url).href;
      },
      get anh6() {
        return new URL("./images/product-9.jpg", import.meta.url).href;
      },
    };
  },
};
export default asset;
