import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '@/hooks/useTheme';
import { toast } from 'sonner';

export default function SteamRedirect() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const [countdown, setCountdown] = useState(5);
  
  // 从URL查询参数中获取目标URL和新闻标题
  const targetUrl = new URLSearchParams(location.search).get('url') || '';
  const newsTitle = new URLSearchParams(location.search).get('title') || 'Steam新闻';
  
  // 处理继续访问按钮点击
  const handleContinue = () => {
    if (targetUrl) {
      window.open(targetUrl, '_blank');
      toast('正在打开Steam页面...请确保您的网络环境支持访问');
    }
  };
  
  // 处理返回首页按钮点击
  const handleBack = () => {
    navigate('/');
  };
  
  // 倒计时逻辑
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          // 倒计时结束后自动返回首页
          handleBack();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [navigate]);
  
  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-4 ${isDark ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      <div className={`w-full max-w-md rounded-2xl p-8 shadow-lg ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="text-center mb-6">
          <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mx-auto mb-4">
            <i className="fa-solid fa-globe text-blue-600 dark:text-blue-400 text-2xl"></i>
          </div>
          <h1 className="text-2xl font-bold mb-2">地域访问限制</h1>
          <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} mb-2`}>关于 "{newsTitle}"</p>
        </div>
        
        <div className={`p-4 rounded-lg mb-6 ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
          <p className="text-sm mb-3">
            您所在的地区目前不提供此内容。这是因为《钢铁雄心4》在中国区Steam商店未正式开售。
          </p>
          <p className="text-sm">
            以下是一些可能的解决方案：
          </p>
          <ul className="list-disc list-inside text-sm mt-2 space-y-1">
            <li>使用VPN或地区切换服务访问Steam</li>
            <li>创建其他地区的Steam账号</li>
            <li>在社区讨论区查找相关内容</li>
          </ul>
        </div>
        
        <div className="flex flex-col space-y-3">
          <button
            onClick={handleContinue}
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center"
          >
            <i className="fa-solid fa-external-link-alt mr-2"></i>
            尝试继续访问
          </button>
          
          <button
            onClick={handleBack}
            className={`w-full py-3 px-4 font-medium rounded-lg transition-colors flex items-center justify-center ${
              isDark ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
            }`}
          >
            <i className="fa-solid fa-arrow-left mr-2"></i>
            返回首页 ({countdown}s)
          </button>
        </div>
      </div>
      
      <p className={`text-xs mt-6 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
        倒计时结束后将自动返回首页
      </p>
    </div>
  );
}