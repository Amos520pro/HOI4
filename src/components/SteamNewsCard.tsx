import { useTheme } from '@/hooks/useTheme';
import { GameNewsItem } from '@/hooks/useSteamNews';

interface NewsCardProps {
  newsItem: GameNewsItem;
}

export default function NewsCard({ newsItem }: NewsCardProps) {
  const { isDark } = useTheme();
  
  // 格式化日期显示
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN');
  };
  
  return (
    <div className={`rounded-xl overflow-hidden shadow-md ${
      isDark ? 'bg-gray-900' : 'bg-white'
    } border border-gray-200 dark:border-gray-800`}>
      {/* 新闻图片 */}
      {newsItem.imageUrl && (
        <div className="h-40 overflow-hidden">
          <img 
            src={newsItem.imageUrl} 
            alt={newsItem.title} 
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <div className={`text-xs font-medium px-2 py-1 rounded-full ${
            isDark ? 'bg-red-900/30 text-red-400' : 'bg-red-100 text-red-800'
          }`}>
            {newsItem.source}
          </div>
          <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
           {formatDate(newsItem.date)}
          </span>
        </div>
        
        <h3 className="text-lg font-bold mb-2 line-clamp-2">{newsItem.title}</h3>
        
        {/* 总结性内容展示 */}
        <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} line-clamp-3 mb-4`}>
          {newsItem.contents}
        </p>
        
        <div className="flex justify-between items-center">
          {newsItem.author && (
            <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              作者: {newsItem.author}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}