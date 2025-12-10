import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '@/hooks/useTheme';
import { AnimatePresence, motion } from 'framer-motion';

// NavLink 组件定义
function NavLink({ href, icon, text }: { href: string; icon: string; text: string }) {
  return (
    <Link 
      to={href} 
      className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
    >
      <i className={`fa-solid fa-${icon}`}></i>
      <span>{text}</span>
    </Link>
  );
}

// MobileNavLink 组件定义
function MobileNavLink({ href, icon, text, onClick }: { href: string; icon: string; text: string; onClick: () => void }) {
  return (
    <Link 
      to={href} 
      className="flex items-center space-x-3 px-3 py-3 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
      onClick={onClick}
    >
      <i className={`fa-solid fa-${icon}`}></i>
      <span>{text}</span>
    </Link>
  );
}

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-lg bg-white/80 dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <i className="fa-solid fa-globe text-blue-600 dark:text-blue-400 text-2xl"></i>
              <span className="font-bold text-xl text-gray-900 dark:text-white">钢铁雄心4玩家指南</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <NavLink href="/" icon="home" text="首页" />
            <NavLink href="/resources" icon="database" text="资源" />
            <NavLink href="/guides" icon="book" text="攻略" />
            <NavLink href="/community" icon="users" text="社区" />
          </div>
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={toggleTheme} 
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
              aria-label={theme === 'light' ? '切换到暗色模式' : '切换到亮色模式'}
            >
              {theme === 'light' ? (
                <i className="fa-solid fa-moon"></i>
              ) : (
                <i className="fa-solid fa-sun"></i>
              )}
            </button>
            
            <button 
              className="md:hidden p-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              onClick={toggleMenu}
              aria-label={isMenuOpen ? '关闭菜单' : '打开菜单'}
            >
              {isMenuOpen ? (
                <i className="fa-solid fa-times"></i>
              ) : (
                <i className="fa-solid fa-bars"></i>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* 移动端菜单 */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-gray-200 dark:border-gray-800 overflow-hidden"
          >
            <div className="px-4 py-2 space-y-1">
              <MobileNavLink href="/" icon="home" text="首页" onClick={() => setIsMenuOpen(false)} />
              <MobileNavLink href="/resources" icon="database" text="资源" onClick={() => setIsMenuOpen(false)} />
              <MobileNavLink href="/guides" icon="book" text="攻略" onClick={() => setIsMenuOpen(false)} />
              <MobileNavLink href="/community" icon="users" text="社区" onClick={() => setIsMenuOpen(false)} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}