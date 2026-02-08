import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from '@tailwindcss/vite'
import { crx } from "@crxjs/vite-plugin";
import manifest from "./manifest.json";

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react(),
		tailwindcss(),
		crx({ manifest }),
	],
	server: {
		port: 5173,       // 포트를 5173으로 고정
		strictPort: true, // 5173이 사용 중이면, 다른 포트로 안 넘어가고 에러를 띄움 (확인하기 편함)
		hmr: {
			port: 5173,     // WebSocket(HMR) 포트도 5173으로 고정
		},
	},
});
