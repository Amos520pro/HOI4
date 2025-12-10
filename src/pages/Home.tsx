import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTheme } from '@/hooks/useTheme';
import { getSteamLibraryUrl } from '@/hooks/useSteamNews';
import { toast } from 'sonner';

// Feature Card Component
function FeatureCard({ 
  icon, 
  title, 
  description,
  variants,
  href
}: { 
  icon: string; 
  title: string; 
  description: string; 
  variants: any;
  href: string;
}) {
  const { isDark } = useTheme();
  
  return (
    <motion.div 
      variants={variants}
      whileHover={{ scale: 1.03 }}
      className={`rounded-xl p-6 shadow-lg transition-all cursor-pointer ${
        isDark ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50'
      }`}
    >
      <Link to={href} className="block w-full h-full">
        <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4">
          <i className={`fa-solid fa-${icon} text-blue-600 dark:text-blue-400 text-xl`}></i>
        </div>
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{description}</p>
      </Link>
    </motion.div>
  );
}

export default function Home() {
  const { isDark } = useTheme();
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
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

  // 处理跳转到Steam库的钢铁雄心4页面
  const handleSteamLibraryClick = () => {
    const steamUrl = getSteamLibraryUrl();
    window.open(steamUrl, '_blank');
    toast('正在打开Steam库的钢铁雄心4页面...');
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center" 
          style={{ 
            backgroundImage: "url('https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Hearts%20of%20Iron%20IV%20game%20scenery%2C%20military%20strategy%20game%2C%20world%20war%20II%20theme&sign=4c0a98ab196a66ce4e60e558e52c150f')",
            filter: isDark ? 'brightness(0.6) contrast(1.1)' : 'brightness(0.9) contrast(1.1)',
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/80 dark:to-gray-900/90"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">钢铁雄心4玩家指南</h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8">
              您的一站式资源、攻略与社区中心
            </p>
            
            {/* Steam库跳转按钮 */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSteamLibraryClick}
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg rounded-lg shadow-lg transition-all flex items-center justify-center mx-auto"
            >
              <i className="fa-brands fa-steam mr-3 text-2xl"></i>
              前往Steam库的钢铁雄心4页面
            </motion.button>
          </motion.div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <FeatureCard 
              icon="database" 
              title="资源导航" 
              description="提供游戏学习版、DLC和MOD资源的参考信息，帮助您扩展游戏体验。" 
              variants={itemVariants}
              href="/resources"
            />
            
            <FeatureCard 
              icon="book" 
              title="攻略索引" 
              description="汇集详尽的游戏攻略和教学资源，提升您的游戏技巧和战略思维。" 
              variants={itemVariants}
              href="/guides"
            />
            
            <FeatureCard 
              icon="users" 
              title="社区交流" 
              description="推荐活跃的游戏社区，帮助您结交志同道合的玩家，分享游戏心得和经验。" 
              variants={itemVariants}
              href="/community"
            />
          </motion.div>
        </div>
      </section>
      
      {/* Featured Image Section */}
      <section className={`py-16 ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold mb-6">钢铁雄心4游戏概览</h2>
            <p className={`max-w-3xl mx-auto mb-10 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              《钢铁雄心4》是一款由Paradox Development Studio开发的二战题材大战略游戏，玩家可以控制任意二战时期的国家，通过军事、外交、经济等手段实现自己的战略目标。
            </p>
            <div className="rounded-xl overflow-hidden shadow-xl max-w-4xl mx-auto">
              <img 
                src="https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Hearts%20of%20Iron%20IV%20game%20interface%2C%20strategy%20map%2C%20military%20units%2C%20world%20war%20II%20era&sign=f27ad062d5842c091a84c9f604be513f" 
                alt="钢铁雄心4游戏界面" 
                className="w-full h-auto"
              />
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}