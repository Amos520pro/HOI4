// 社区卡片组件
function CommunityCard({ 
  name, 
  description, 
  members, 
  icon, 
  color,
  variants,
  isDark
}: { 
  name: string; 
  description: string; 
  members: string; 
  icon: string; 
  color: string; 
  variants: any;
  isDark: boolean;
}) {
  return (
    <motion.div
      variants={variants}
      className={`rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1 ${
        isDark ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50'
      }`}
    >
      <div className={`h-2 ${color}`}></div>
      <div className="p-6">
        <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mb-4">
          {icon === 'baidu' ? (
            <span className="font-bold text-xl text-blue-600">百</span>
          ) : (
            <i className={`fa-brands fa-${icon} text-xl ${icon === 'discord' ? 'text-indigo-600' : icon === 'reddit' ? 'text-orange-600' : 'text-pink-600'}`}></i>
          )}
        </div>
        <h3 className="text-lg font-bold mb-2">{name}</h3>
        <p className={`text-sm mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{description}</p>
        <div className="flex items-center">
          <i className={`fa-solid fa-users mr-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}></i>
          <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{members} 成员</span>
        </div>
      </div>
    </motion.div>
  );
}

import { motion } from 'framer-motion';
import { useTheme } from '@/hooks/useTheme';

export default function Community() {
  const { isDark } = useTheme();
  
   // 推荐社区数据
   const communities = [
     { 
       id: 1, 
       name: "百度钢铁雄心4贴吧", 
       description: "国内最大的钢铁雄心4社区，分享心得和讨论游戏问题",
       members: "30,000+",
       icon: "baidu",
       color: "bg-blue-500"
     },
     { 
       id: 2, 
       name: "钢铁雄心4 Bilibili专区", 
       description: "观看游戏视频、直播和教程的最佳平台",
       members: "1,000,000+",
       icon: "bilibili",
       color: "bg-pink-500"
     },
     { 
       id: 3, 
       name: "钢铁雄心4官方Discord", 
       description: "官方Discord服务器，获取最新游戏资讯和与开发者交流",
       members: "50,000+",
       icon: "discord",
       color: "bg-indigo-600"
     },
     { 
       id: 4, 
       name: "钢铁雄心4 QQ交流群", 
       description: "国内玩家交流QQ群，实时讨论游戏问题和分享经验",
       members: "5,000+",
       icon: "qq",
       color: "bg-green-500"
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

  return (
    <div className={`min-h-screen py-12 ${isDark ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">社区推荐</h1>
          <p className={`max-w-2xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            《钢铁雄心4》活跃玩家社区推荐，帮助您找到志同道合的游戏伙伴
          </p>
        </div>
        
        {/* 社区推荐部分 */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {communities.map(community => (
            <CommunityCard
              key={community.id}
              name={community.name}
              description={community.description}
              members={community.members}
              icon={community.icon}
              color={community.color}
              variants={itemVariants}
              isDark={isDark}
            />
          ))}
        </motion.div>
        
        {/* 社区活动介绍 */}
        <div className={`mt-16 p-8 rounded-2xl ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          <h2 className="text-2xl font-bold mb-6 text-center">社区活动</h2>
          
          <div className="max-w-3xl mx-auto">
            <p className={`text-center mb-8 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              钢铁雄心4社区定期举办各类活动，包括线上比赛、mod创作大赛和经验分享会
            </p>
            
            <div className={`p-6 rounded-xl mb-6 ${isDark ? 'bg-gray-750' : 'bg-gray-50'}`}>
              <h3 className="text-xl font-bold mb-3">2025年度钢铁雄心4全球锦标赛</h3>
              <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                由Paradox官方赞助的2025年度钢铁雄心4全球锦标赛将有来自全球各地的选手参与，总奖金池高达10万美元。
                中国区预选赛将有特别的直播和解说。
              </p>
              <div className="flex justify-between text-sm">
                <span className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  <i className="fa-solid fa-calendar-alt mr-1"></i> 2025年12月25日-2026年1月20日
                </span>
                <span className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  <i className="fa-solid fa-users mr-1"></i> 全球参与
                </span>
              </div>
            </div>
            
            <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-750' : 'bg-gray-50'}`}>
              <h3 className="text-xl font-bold mb-3">MOD创作大赛</h3>
              <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                展示您的创意和技术，参与MOD创作大赛，赢取丰厚奖品并让全球玩家体验您的作品。
                比赛分为历史类、架空类和功能增强类三个组别。
              </p>
              <div className="flex justify-between text-sm">
                <span className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  <i className="fa-solid fa-calendar-alt mr-1"></i> 2026年1月-3月
                </span>
                <span className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  <i className="fa-solid fa-code mr-1"></i> 作品提交
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}