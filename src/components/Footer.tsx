// SocialLink 组件定义
function SocialLink({ icon, label }: { icon: string; label: string }) {
  return (
    <a 
      href="#" 
      className="p-2 rounded-full bg-gray-800 dark:bg-gray-700 text-white hover:bg-blue-600 transition-colors duration-200"
      aria-label={label}
    >
      <i className={`fa-brands fa-${icon}`}></i>
    </a>
  );
}

import { useTheme } from '@/hooks/useTheme';

export default function Footer() {
  const { isDark } = useTheme();
  
  return (
    <footer className={`py-8 border-t ${isDark ? 'border-gray-800 bg-gray-900 text-gray-300' : 'border-gray-200 bg-gray-50 text-gray-600'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">关于我们</h3>
            <p className="text-sm">
              本站为《钢铁雄心4》玩家提供游戏资源导航、攻略索引和社区交流平台。
              我们致力于为玩家创造更好的游戏体验。
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">快速链接</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="hover:text-blue-500 transition-colors">首页</a></li>
              <li><a href="/resources" className="hover:text-blue-500 transition-colors">资源中心</a></li>
              <li><a href="/guides" className="hover:text-blue-500 transition-colors">游戏攻略</a></li>
              <li><a href="/community" className="hover:text-blue-500 transition-colors">社区交流</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">关注我们</h3>
            <div className="flex space-x-4">
              <SocialLink icon="discord" label="Discord" />
              <SocialLink icon="twitter" label="Twitter" />
              <SocialLink icon="youtube" label="YouTube" />
              <SocialLink icon="reddit" label="Reddit" />
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-700 dark:border-gray-800 text-center text-sm">
          <p>© {new Date().getFullYear()} 钢铁雄心4玩家指南. 本站仅提供导航服务，不提供游戏下载。</p>
          <p className="mt-2">所有商标和版权归其各自所有者所有。</p>
        </div>
      </div>
    </footer>
  );
}