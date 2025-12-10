// 星级评分组件
const RatingStars = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <i 
          key={i} 
          className={`fa-solid ${i < Math.floor(rating) ? 'fa-star text-yellow-400' : 'fa-star text-gray-300 dark:text-gray-600'}`}
        ></i>
      ))}
      <span className="ml-1 text-sm font-medium">{rating.toFixed(1)}</span>
    </div>
  );
};

// 标签按钮组件
function TabButton({ 
  active, 
  onClick, 
  icon, 
  text,
  isDark
}: { 
  active: boolean; 
  onClick: () => void; 
  icon: string; 
  text: string;
  isDark: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-3 flex items-center space-x-2 font-medium transition-colors ${
        active 
          ? `border-b-2 border-blue-500 ${isDark ? 'text-blue-400' : 'text-blue-600'}` 
          : `${isDark ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'}`
      }`}
    >
      <i className={`fa-solid fa-${icon}`}></i>
      <span>{text}</span>
    </button>
  );
}

  // 资源卡片组件
  function ResourceCard({ 
    name, 
    description, 
    rating, 
    variants,
    isDark,
    resourceType,
    fileSize,
    id
  }: { 
    name: string; 
    description: string; 
    rating: number; 
    variants: any;
    isDark: boolean;
    resourceType: 'game' | 'dlc' | 'mod';
    fileSize: string;
    id: number;
  }) {
    // 处理下载按钮点击事件
    const handleDownloadClick = () => {
      // 为不同的游戏资源设置不同的下载链接
      let downloadUrl = '';
      
      if (resourceType === 'game') {
        if (id === 1) {
          // 学习版下载链接
          downloadUrl = 'https://example.com/download/hoi4-learn-edition';
        } else if (id === 2) {
          // 正版购买链接（实际项目中应指向官方商店）
          downloadUrl = 'https://store.steampowered.com/app/394360/Hearts_of_Iron_IV/';
        }
        
        // 打开下载链接
        window.open(downloadUrl, '_blank');
        toast(`正在打开${name}的下载/购买页面...`);
      }
    };

    return (
      <motion.div
        variants={variants}
        className={`rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all ${
          isDark ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50'
        }`}
      >
        <div className="p-6">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-lg font-bold">{name}</h3>
            <RatingStars rating={rating} />
          </div>
          <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{description}</p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <i className={`fa-solid fa-file mr-1`}></i>
              <span className="ml-1">{fileSize}</span>
            </div>
            
            {/* 只给游戏本体资源添加下载按钮 */}
            {resourceType === 'game' && (
              <button
                onClick={handleDownloadClick}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium flex items-center transition-colors ${
                  id === 1 
                    ? 'bg-green-600 hover:bg-green-700 text-white' 
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                <i className="fa-solid fa-download mr-1"></i>
                {id === 1 ? '下载' : '购买'}
              </button>
            )}
          </div>
        </div>
      </motion.div>
    );
  }

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/hooks/useTheme';
import { getSteamWorkshopUrl } from '@/hooks/useSteamNews';
import { toast } from 'sonner';

export default function Resources() {
  const { isDark } = useTheme();
  const [activeTab, setActiveTab] = useState<'game' | 'dlc' | 'mod'>('game');
  
  // 模拟数据 - 仅包含学习版和正版两个选项
  const gameResources = [
    { id: 1, name: "钢铁雄心4 学习版 v1.14", description: "包含全部基础游戏内容，已更新至最新版本", rating: 4.8, fileSize: "20 GB" },
    { id: 2, name: "钢铁雄心4 正版", description: "支持官方更新和多人游戏，购买正版支持开发者", rating: 4.9, fileSize: "20 GB" }
  ];
  
    // 最新的DLC内容（按发布时间排序，最新的在顶端）
   const dlcResources = [
     { id: 1, name: "抗战到底", description: "2025年11月21日推出的全新DLC，主打太平洋战场拓展，为中国、日本和菲律宾开辟新历史走向，玩家可自定义阵营发展，还能制定专属军事学说", rating: 4.9, fileSize: "3.5 GB" },
     { id: 2, name: "诸神黄昏", description: "2024年11月发布，改革科研系统并引入\"特殊工程\"机制，玩家可研发原子弹、火箭等超级武器，同时重置德国国策树，不过国区无法单独购买，需通过季票获取", rating: 4.8, fileSize: "3.2 GB" },
     { id: 3, name: "帝国坟场", description: "聚焦中东和南亚，为伊朗、伊拉克、阿富汗、英属印度等势力新增国策树，还调整了地区地图和去殖民化设定，新增多个可操作的小型国家", rating: 4.7, fileSize: "2.8 GB" },
     { id: 4, name: "忠诚试炼", description: "首个南美主题国家包，为巴西、阿根廷、智利等南美国家添加国策树，还设计了意识形态冲突相关事件，填补了南美地区的玩法空白", rating: 4.6, fileSize: "2.5 GB" },
     { id: 5, name: "以力御暴", description: "引入军事工业组织系统和国际军火市场机制，核心围绕北欧国家，为芬兰、瑞典、挪威、丹麦打造专属国策树，拓展了北欧战场的玩法", rating: 4.5, fileSize: "2.3 GB" },
     { id: 6, name: "唯有浴血", description: "新增飞机设计器，重做和平会议系统。为意大利、瑞士、埃塞俄比亚补充国策树，同时加入军事勋章系统，丰富了空战玩法和战后格局设定", rating: 4.4, fileSize: "2.1 GB" },
     { id: 7, name: "寸步不退", description: "重做陆军和补给系统，新增坦克设计器与铁路运输系统。重置苏联国策树，为波兰及波罗的海三国添加专属内容，强化了陆战相关的策略深度", rating: 4.3, fileSize: "2.0 GB" },
     { id: 8, name: "博斯普鲁斯海峡之战", description: "属于国家包，专门为希腊、土耳其、保加利亚三国设计全新国策树，聚焦巴尔干地区的地缘政治与战争博弈", rating: 4.2, fileSize: "1.8 GB" },
     { id: 9, name: "抵抗运动", description: "加入复杂间谍系统，玩家可建立情报机构执行秘密任务。重置法国国策树，还为西班牙、葡萄牙补充内战及后续发展的国策内容", rating: 4.1, fileSize: "1.6 GB" },
     { id: 10, name: "炮手就位", description: "改革海军系统，推出舰船设计器，重做海军学说。同时重置美、英国策树，为墨西哥和荷兰补充新内容，让海洋战场的玩法更具自定义空间", rating: 4.0, fileSize: "1.7 GB" },
     { id: 11, name: "唤醒勇虎", description: "已免费整合进本体。重点完善东亚战场内容，为中国各派系及德、日重置国策树，还新增将军技能和指挥链系统，大幅提升了陆军指挥的策略性", rating: 4.0, fileSize: "1.5 GB" },
     { id: 12, name: "玉碎瓦全", description: "已免费整合进本体。聚焦中欧和巴尔干地区，为捷克斯洛伐克、匈牙利等国设计独特国策树，同时新增装备许可生产机制，丰富了小国的工业发展玩法", rating: 4.0, fileSize: "1.4 GB" },
     { id: 13, name: "共赴胜利", description: "早期DLC，已免费整合进本体。为加拿大、澳大利亚等英联邦国家添加国策树，还引入了自治系统，后续该系统也成为英联邦相关玩法的基础", rating: 4.0, fileSize: "1.2 GB" }
   ];
  
  // MOD资源数据
  const modResources = [
    { 
      id: 1, 
      name: "Kaiserreich", 
      description: "架空历史MOD，重新构想一战后世界格局，拥有详细的国家焦点树和丰富的历史事件", 
      rating: 4.9,
      fileSize: "500 MB"
    },
    { 
      id: 2, 
      name: "The New Order: Last Days of Europe", 
      description: "架空历史MOD，设定在德国赢得二战后的世界，探索这个黑暗而复杂的平行历史", 
      rating: 4.8,
      fileSize: "700 MB"
    },
    { 
      id: 3, 
      name: "Road to 56", 
      description: "扩展原版游戏内容，增加更多国家的国策树，提供更丰富的游戏体验", 
      rating: 4.7,
      fileSize: "300 MB"
    },
    { 
      id: 4, 
      name: "Player-Led Peace Conferences", 
      description: "允许玩家主导和平会议，更好地控制战后格局，按照自己的战略意愿重塑世界", 
      rating: 4.6,
      fileSize: "50 MB"
    }
  ];
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  // 处理跳转到Steam创意工坊的钢铁雄心4页面
  const handleSteamWorkshopClick = () => {
    const workshopUrl = getSteamWorkshopUrl();
    window.open(workshopUrl, '_blank');
    toast('正在打开Steam创意工坊的钢铁雄心4页面...');
  };

  return (
    <div className={`min-h-screen py-12 ${isDark ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">资源中心</h1>
          <p className={`max-w-2xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            探索《钢铁雄心4》的各类资源，包括游戏本体、DLC和热门MOD
          </p>
        </div>
        
        {/* 标签页导航 */}
        <div className="flex justify-center mb-10 border-b border-gray-200 dark:border-gray-800">
          <TabButton 
            active={activeTab === 'game'} 
            onClick={() => setActiveTab('game')}
            icon="gamepad"
            text="游戏本体"
            isDark={isDark}
          />
          <TabButton 
            active={activeTab === 'dlc'} 
            onClick={() => setActiveTab('dlc')}
            icon="disc"
            text="DLC内容"
            isDark={isDark}
          />
          <TabButton 
            active={activeTab === 'mod'} 
            onClick={() => setActiveTab('mod')}
            icon="code-branch"
            text="MOD模组"
            isDark={isDark}
          />
        </div>
        
        {/* MOD标签页的Steam创意工坊跳转按钮 */}
        {activeTab === 'mod' && (
          <div className="mb-8 text-center">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleSteamWorkshopClick}
              className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg shadow-md transition-all flex items-center justify-center mx-auto"
            >
              <i className="fa-brands fa-steam mr-2"></i>
              前往Steam创意工坊 - 钢铁雄心4
            </motion.button>
          </div>
        )}
        
         {/* 资源卡片列表 */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {activeTab === 'game' && gameResources.map(resource => (
            <ResourceCard
              key={resource.id}
              id={resource.id}
              name={resource.name}
              description={resource.description}
              rating={resource.rating}
              variants={itemVariants}
              isDark={isDark}
              resourceType="game"
              fileSize={resource.fileSize}
            />
          ))}
          
          {activeTab === 'dlc' && dlcResources.map(resource => (
            <ResourceCard
              key={resource.id}
              id={resource.id}
              name={resource.name}
              description={resource.description}
              rating={resource.rating}
              variants={itemVariants}
              isDark={isDark}
              resourceType="dlc"
              fileSize={resource.fileSize}
            />
          ))}
          
          {activeTab === 'mod' && modResources.map(resource => (
            <ResourceCard
              key={resource.id}
              id={resource.id}
              name={resource.name}
              description={resource.description}
              rating={resource.rating}
              variants={itemVariants}
              isDark={isDark}
              resourceType="mod"
              fileSize={resource.fileSize}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}