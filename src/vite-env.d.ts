/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL_PROD: string;
  readonly VITE_API_URL_DEV: string;
  readonly VITE_ENV: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
