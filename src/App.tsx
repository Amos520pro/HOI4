// 404页面组件
function NotFound() {
  return (
    <div className="min-h-screen py-16 flex flex-col items-center justify-center text-center">
      <div className="w-24 h-24 mb-6 text-gray-400">
        <i className="fa-solid fa-map-location-dot text-6xl"></i>
      </div>
      <h1 className="text-4xl font-bold mb-4">页面未找到</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-md">
        抱歉，您访问的页面不存在或已被移动。
      </p>
      <a
        href="/"
        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all"
      >
        返回首页
      </a>
    </div>
  );
}

import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import Resources from "@/pages/Resources";
import Guides from "@/pages/Guides";
import Community from "@/pages/Community";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AnimatePresence } from 'framer-motion';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <Routes>
            <Route key="home" path="/" element={<Home />} />
            <Route key="resources" path="/resources" element={<Resources />} />
            <Route key="guides" path="/guides" element={<Guides />} />
            <Route key="community" path="/community" element={<Community />} />
            <Route key="not-found" path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </main>
      
      <Footer />
    </div>
  );
}
