import { toast } from "sonner";
import { useTheme } from '@/hooks/useTheme';

// 空状态/开发中组件
export function Empty() {
  const { isDark } = useTheme();
  
  // 添加一些模拟功能和信息
  const featuresUnderDevelopment = [
    "高级搜索功能",
    "用户收藏系统",
    "详细的游戏数据统计",
    "社区论坛互动",
    "个性化推荐"
  ];
  
  return (
    <div 
      className={`min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 text-center cursor-pointer transition-all hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg ${
        isDark ? 'text-gray-300' : 'text-gray-700'
      }`}
      onClick={() => toast('该功能正在开发中，敬请期待！')}
    >
      <div className="w-24 h-24 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-6">
        <i className="fa-solid fa-tools text-blue-600 dark:text-blue-400 text-3xl"></i>
      </div>
      <h2 className="text-2xl font-bold mb-2">开发中</h2>
      <p className={`max-w-md mb-8 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
        这个功能正在紧张开发中，我们将尽快为您带来全新体验！
      </p>
      
      {/* 添加开发计划或即将推出的功能列表 */}
      <div className={`w-full max-w-md p-6 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-md mb-8`}>
        <h3 className="text-lg font-semibold mb-4">即将推出的功能</h3>
        <ul className="space-y-3">
          {featuresUnderDevelopment.map((feature, index) => (
            <li key={index} className="flex items-start">
              <i className="fa-solid fa-circle-notch fa-spin text-blue-500 mt-1 mr-3"></i>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      
      {/* 通知订阅区域 */}
      <div className="flex flex-col items-center">
        <p className="mb-4 text-sm">想在功能上线时收到通知？</p>
        <button 
          className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
          onClick={() => toast('感谢订阅！功能上线时我们会通知您。')}
        >
          <i className="fa-solid fa-bell mr-2"></i>订阅更新
        </button>
      </div>
    </div>
  );
}