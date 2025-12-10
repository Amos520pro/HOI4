// 游戏新闻项接口定义
import { useState, useEffect } from 'react';

export interface GameNewsItem {
  id: string;
  title: string;
  url: string;
  date: string;
  contents: string;
  source: string;
  author?: string;
  imageUrl?: string;
}

// Steam游戏ID
const HOI4_GAME_ID = '394360';
// Steam库页面URL格式 - 打开Steam库并跳转到钢铁雄心4界面
export const getSteamLibraryUrl = () => `steam://nav/games/details/${HOI4_GAME_ID}`;
// Steam商店页面URL
export const getSteamStoreUrl = () => `https://store.steampowered.com/app/${HOI4_GAME_ID}/Hearts_of_Iron_IV/`;
// Steam创意工坊页面URL
export const getSteamWorkshopUrl = () => `https://steamcommunity.com/workshop/browse/?appid=${HOI4_GAME_ID}&browsesort=trend&section=readytouseitems`;

// 模拟从Steam页面抓取并解析新闻的函数
const scrapeSteamNews = async (): Promise<GameNewsItem[]> => {
  // 模拟网络请求延迟
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // 模拟从Steam页面抓取的HTML内容解析结果
  // 在实际项目中，这里会使用爬虫或API调用来获取真实数据
  const rawNewsData = [
    {
      id: '1',
      title: '钢铁雄心4 "世纪黎明" DLC正式发布',
      url: getSteamStoreUrl(),
      date: '2025-12-10',
      rawContent: `
        <div class="news_content">
          <h2>钢铁雄心4 "世纪黎明" DLC正式发布</h2>
          <p>Paradox Interactive今日宣布《钢铁雄心4》全新DLC"世纪黎明"(Century Dawn)正式发布。这是游戏历史上规模最大的扩展内容，带来了全新的游戏机制、国家焦点树和历史事件。</p>
          
          <h3>主要内容包括：</h3>
          <ul>
            <li>全面重制的外交系统，新增联盟外交和间谍活动</li>
            <li>10个国家的全新焦点树，包括中国、印度和巴西等</li>
            <li>改进的经济系统，新增资源贸易和全球市场</li>
            <li>全新的科技树分支，专注于冷战前期科技</li>
            <li>超过100个新历史事件和决策</li>
          </ul>
          
          <p>该DLC现已在Steam平台发售，售价128元，同时游戏本体和其他DLC也在进行限时折扣活动。</p>
        </div>
      `,
      source: 'Steam官方',
      author: 'Paradox Interactive',
      imageUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Hearts%20of%20Iron%20IV%20new%20DLC%20Century%20Dawn%20announcement%2C%20strategy%20game%20cover%2C%20world%20map%20military%20themes&sign=f18b407a4c5ab5d22bfff4dc7e27ec7d'
    },
    {
      id: '2',
      title: '钢铁雄心4 2025年冬季更新 - 版本1.18详细说明',
      url: getSteamStoreUrl(),
      date: '2025-12-07',
      rawContent: `
        <div class="news_content">
          <h2>钢铁雄心4 2025年冬季更新 - 版本1.18详细说明</h2>
          <p>随着"世纪黎明"DLC的发布，我们也为所有玩家带来了免费的大型更新。版本1.18包含了大量的游戏改进和平衡性调整。</p>
          
          <h3>主要更新内容：</h3>
          <ul>
            <li>全面优化的AI系统，提高了电脑对手的战略决策能力</li>
            <li>大幅改进的游戏性能，特别是在处理大型战役和多个AI国家时</li>
            <li>重新平衡的陆战系统，使不同单位类型都能发挥重要作用</li>
            <li>全新的UI界面，提升游戏操作体验</li>
            <li>修复了玩家报告的大量bug和问题</li>
          </ul>
          
          <p>本次更新还特别针对中国玩家优化了本地化内容，修复了多处翻译错误，并改进了文本显示效果。</p>
        </div>
      `,
      source: '游戏更新公告',
      author: '开发团队',
      imageUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Hearts%20of%20Iron%20IV%20update%20version%201.18%20announcement%2C%20game%20interface%20improvements%2C%20optimization%20performance&sign=0f4b7cd0c5f4e000111220b9ba1a584b'
    },
    {
      id: '3',
      title: '2025年度钢铁雄心4全球锦标赛即将开始',
      url: getSteamStoreUrl(),
      date: '2025-12-03',
      rawContent: `
        <div class="news_content">
          <h2>2025年度钢铁雄心4全球锦标赛即将开始</h2>
          <p>由Paradox官方赞助的2025年度钢铁雄心4全球锦标赛报名通道现已开启。本届比赛将有来自全球各地的选手参与，总奖金池高达10万美元。</p>
          
          <h3>比赛详情：</h3>
          <ul>
            <li>报名截止日期：2025年12月20日</li>
            <li>预选赛阶段：2025年12月25日-2026年1月5日</li>
            <li>决赛阶段：2026年1月15日-1月20日</li>
            <li>比赛将使用最新的1.18版本和"世纪黎明"DLC</li>
            <li>中国区预选赛将有特别的直播和解说</li>
          </ul>
          
          <p>所有参赛选手都将获得游戏内独家奖励，冠军将获得前往瑞典斯德哥尔摩Paradox工作室参观的机会。</p>
        </div>
      `,
      source: '赛事新闻',
      author: '锦标赛组委会',
      imageUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Hearts%20of%20Iron%20IV%20global%20tournament%202025%2C%20esports%20competition%2C%20gaming%20event%20banner&sign=05864a398e104120419ff097b041e861'
    },
    // 更多历史新闻，实际不会显示
    {
      id: '4',
      title: '钢铁雄心4开发团队分享2026年规划',
      url: getSteamStoreUrl(),
      date: '2025-11-28',
      rawContent: '<div class="news_content">...</div>',
      source: '开发者日志',
      author: 'Johan Andersson',
    }
  ];

  // 模拟解析HTML内容并生成总结
  return rawNewsData.slice(0, 3).map(item => ({
    ...item,
    // 从原始内容中提取和生成简洁的摘要
    contents: extractSummary(item.rawContent)
  }));
};

// 模拟从HTML内容中提取摘要的函数
const extractSummary = (htmlContent: string): string => {
  // 在实际项目中，这里会使用更复杂的HTML解析和文本摘要算法
  // 这里我们模拟简单的摘要提取逻辑
  
  // 移除HTML标签
  const plainText = htmlContent.replace(/<[^>]*>/g, '').trim();
  
  // 截取前200个字符作为摘要
  let summary = plainText.substring(0, 200);
  
  // 确保摘要以完整的句子结束
  const lastPeriodIndex = summary.lastIndexOf('.');
  if (lastPeriodIndex > 50) {
    summary = summary.substring(0, lastPeriodIndex + 1);
  } else {
    summary += '...';
  }
  
  return summary;
};

// 自定义hook - 用于获取和管理Steam钢铁雄心4新闻数据
export function useSteamNews() {
  const [news, setNews] = useState<GameNewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastFetched, setLastFetched] = useState<string>('');
  
  useEffect(() => {
    const getNews = async () => {
      try {
        setLoading(true);
        
        // 模拟从Steam页面抓取数据
        const data = await scrapeSteamNews();
        
        // 按照日期排序，确保最新的在前面
        const sortedNews = data.sort((a, b) => {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        });
        
        // 只保留最新的三条
        const latestThreeNews = sortedNews.slice(0, 3);
        
        setNews(latestThreeNews);
        setLastFetched(new Date().toLocaleString('zh-CN'));
        setError(null);
      } catch (err) {
        setError('获取Steam新闻失败，请稍后再试');
        console.error('Failed to fetch Steam news:', err);
      } finally {
        setLoading(false);
      }
    };
    
    getNews();
  }, []);
  
  return { news, loading, error, lastFetched };
}