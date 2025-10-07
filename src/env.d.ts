/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly REACT_APP_AUTH_API_URL: string;
  readonly REACT_APP_ORDER_API_URL: string;
  readonly REACT_APP_PRODUCT_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
