// 等级标签组件
const LevelBadge = ({ level }: { level: string }) => {
  let colorClass = '';
  
  switch(level) {
    case '入门':
      colorClass = 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      break;
    case '中级':
      colorClass = 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      break;
    case '高级':
      colorClass = 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400';
      break;
    default:
      colorClass = 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400';
  }
  
  return (
    <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${colorClass}`}>
      {level}
    </span>
  );
};

// 攻略卡片组件
function GuideCard({ 
  title, 
  description, 
  duration, 
  author, 
  level, 
  variants,
  isDark,
  onEdit,
  id
}: { 
  title: string; 
  description: string; 
  duration: string; 
  author: string; 
  level: string; 
  variants: any;
  isDark: boolean;
  onEdit: (id: number) => void;
  id: number;
}) {
  return (
    <motion.div
      variants={variants}
      className={`rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all ${
        isDark ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50'
      }`}
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-bold">{title}</h3>
          <LevelBadge level={level} />
        </div>
        <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{description}</p>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <i className={`fa-solid fa-user-circle mr-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}></i>
            <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{author}</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center">
              <i className={`fa-solid fa-clock mr-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}></i>
              <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{duration}</span>
            </div>
            <button
              onClick={() => onEdit(id)}
              className={`p-2 rounded-full ${
                isDark 
                  ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
              } transition-colors`}
              aria-label="编辑攻略"
            >
              <i className="fa-solid fa-edit"></i>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// 通用攻略表单组件 - 用于快速生成和编辑攻略
function GuideForm({ 
  onSubmit, 
  isDark, 
  initialData = null, 
  onCancel = null,
  isEditMode = false
}: { 
  onSubmit: (data: any) => void; 
  isDark: boolean; 
  initialData?: any | null;
  onCancel?: (() => void) | null;
  isEditMode?: boolean;
}) {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    level: initialData?.level || '入门',
    duration: initialData?.duration || '5分钟'
  });
  const [imagePreview, setImagePreview] = useState<string | null>(initialData?.imagePreview || null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 处理表单输入变化
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // 处理图片上传
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);
      
      // 创建图片预览
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // 处理表单提交
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 表单验证
    if (!formData.title.trim() || !formData.description.trim()) {
      return;
    }

    setIsSubmitting(true);
    
    // 模拟API调用延迟
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // 提交表单数据
    onSubmit({
      ...formData,
      image: selectedImage,
      imagePreview,
      id: initialData?.id // 如果是编辑模式，传递原ID
    });
    
    setIsSubmitting(false);
  };

  // 处理取消编辑
  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className={`rounded-xl p-6 mb-10 shadow-lg ${
        isDark ? 'bg-gray-800' : 'bg-white'
      }`}
    >
      <h2 className="text-2xl font-bold mb-6">{isEditMode ? '编辑攻略' : '快速生成攻略'}</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           {/* 攻略标题 */}
          <div className="space-y-2">
            <label htmlFor="title" className="block text-sm font-medium">
              攻略标题
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="输入攻略标题"
              className={`w-full px-4 py-2 rounded-lg border ${
                isDark 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              required
            />
          </div>
          
          {/* 难度等级 */}
          <div className="space-y-2">
            <label htmlFor="level" className="block text-sm font-medium">难度等级</label>
            <select
              id="level"
              name="level"
              value={formData.level}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-lg border ${
                isDark 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            >
              <option value="入门">入门</option>
              <option value="中级">中级</option>
              <option value="高级">高级</option>
            </select>
          </div>
          
           {/* 阅读时长 */}
          <div className="space-y-2">
            <label htmlFor="duration" className="block text-sm font-medium">预计阅读时长</label>
            <select
              id="duration"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-lg border ${
                isDark 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            >
              <option value="1分钟">1分钟</option>
              <option value="2分钟">2分钟</option>
              <option value="3分钟">3分钟</option>
              <option value="4分钟">4分钟</option>
              <option value="5分钟">5分钟</option>
              <option value="6分钟">6分钟</option>
              <option value="7分钟">7分钟</option>
              <option value="8分钟">8分钟</option>
              <option value="9分钟">9分钟</option>
              <option value="10分钟">10分钟</option>
            </select>
          </div>
          
          {/* 图片上传 */}
          <div className="space-y-2">
            <label htmlFor="image" className="block text-sm font-medium">上传图片 (可选)</label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageUpload}
              className={`w-full px-4 py-2 rounded-lg border ${
                isDark 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
          </div>
        </div>
        
        {/* 图片预览 */}
        {imagePreview && (
          <div className="mt-4">
            <div className="relative max-w-md rounded-lg overflow-hidden">
              <img 
                src={imagePreview} 
                alt="预览图片" 
                className="w-full h-auto"
              />
              <button
                type="button"
                onClick={() => {
                  setImagePreview(null);
                  setSelectedImage(null);
                }}
                className="absolute top-2 right-2 p-1 rounded-full bg-red-600 text-white"
              >
                <i className="fa-solid fa-times"></i>
              </button>
            </div>
          </div>
        )}
        
         {/* 攻略内容 */}
        <div className="space-y-2">
          <label htmlFor="description" className="block text-sm font-medium">
            攻略内容
            <span className="text-red-500 ml-1">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="详细描述您的攻略内容..."
            rows={5}
            className={`w-full px-4 py-2 rounded-lg border ${
              isDark 
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            required
          ></textarea>
        </div>
        
        {/* 操作按钮 */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center ${
              isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? (
              <>
                <i className="fa-solid fa-circle-notch fa-spin mr-2"></i>
                {isEditMode ? '保存中...' : '生成中...'}
              </>
            ) : (
              <>
                <i className={isEditMode ? "fa-solid fa-check mr-2" : "fa-solid fa-plus mr-2"}></i>
                {isEditMode ? '保存攻略' : '添加攻略'}
              </>
            )}
          </button>
          
          {isEditMode && onCancel && (
            <button
              type="button"
              onClick={handleCancel}
              className={`flex-1 px-6 py-3 ${
                isDark 
                  ? 'bg-gray-700 hover:bg-gray-600' 
                  : 'bg-gray-200 hover:bg-gray-300'
              } text-white font-medium rounded-lg transition-colors flex items-center justify-center`}
            >
              <i className="fa-solid fa-times mr-2"></i>
              取消编辑
            </button>
          )}
        </div>
      </form>
    </motion.div>
  );
}

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/hooks/useTheme';
import { toast } from 'sonner';

export default function Guides() {
  const { isDark } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [guides, setGuides] = useState([
    { 
      id: 1, 
      title: "新手入门指南：游戏基础知识", 
      category: "beginner", 
      description: "从零开始学习钢铁雄心4的基本操作、界面导航和游戏机制",
      duration: "20分钟",
      author: "战略大师",
      level: "入门"
    },
    { 
      id: 2, 
      title: "工业生产最优策略", 
      category: "economy", 
      description: "学习如何最大化您的工业产能，为战争提供坚实的物质基础",
      duration: "15分钟",
      author: "经济专家",
      level: "中级"
    },
    { 
      id: 3, 
      title: "陆军编制与战术指南", 
      category: "military", 
      description: "掌握最有效的师编制配置和战场战术，提升您的陆军战斗力",
      duration: "25分钟",
      author: "战术家",
      level: "高级"
    },
    { 
      id: 4, 
      title: "海军战略与制海权争夺", 
      category: "military", 
      description: "了解海军编制、舰队部署和海战策略，控制关键海上通道",
      duration: "30分钟",
      author: "海军上将",
      level: "高级"
    },
    { 
      id: 5, 
      title: "空军学说与战略轰炸", 
      category: "military", 
      description: "学习如何有效运用空军力量，支持地面作战和实施战略轰炸",
      duration: "22分钟",
      author: "空军元帅",
      level: "中级"
    },
    { 
      id: 6, 
      title: "德国闪电战战术详解", 
      category: "nation", 
      description: "深入分析德国的闪电战战术和实施方法，重现历史上的经典战役",
      duration: "28分钟",
      author: "二战历史学家",
      level: "高级"
    },
    { 
      id: 7, 
      title: "苏联卫国战争指南", 
      category: "nation", 
      description: "学习如何指挥苏联抵御德国入侵，并实施战略反攻",
      duration: "26分钟",
      author: "东线专家",
      level: "中级"
    },
    { 
      id: 8, 
      title: "美国战争动员策略", 
      category: "nation", 
      description: "了解如何发挥美国的工业优势，快速动员并赢得战争",
      duration: "24分钟",
      author: "盟军指挥官",
      level: "中级"
    },
    { 
      id: 9, 
      title: "MOD安装与管理教程", 
      category: "mod", 
      description: "学习如何安装、管理和配置MOD，个性化您的游戏体验",
      duration: "18分钟",
      author: "MOD达人",
      level: "入门"
    }
  ]);
  
  // 编辑状态管理
  const [editingGuideId, setEditingGuideId] = useState<number | null>(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editingGuide, setEditingGuide] = useState<any>(null);
  
  // 添加用户生成的攻略函数
  const handleAddGuide = (formData: any) => {
    // 为新攻略分配ID
    const newId = Math.max(...guides.map(g => g.id)) + 1;
    
    // 创建新攻略对象
    const newGuide = {
      id: newId,
      title: formData.title,
      description: formData.description,
      duration: formData.duration,
      author: "我", // 默认作者为"我"
      level: formData.level,
      category: formData.level === "入门" ? "beginner" : 
                formData.level === "中级" ? "economy" : "military", // 根据难度自动分类
      imagePreview: formData.imagePreview || null
    };
    
    // 更新攻略列表
    setGuides(prev => [newGuide, ...prev]);
    
    // 显示成功提示
    toast('攻略添加成功！');
  };
  
  // 编辑攻略函数
  const handleEditGuide = (guideId: number) => {
    // 查找要编辑的攻略
    const guideToEdit = guides.find(guide => guide.id === guideId);
    
    if (guideToEdit) {
      setEditingGuideId(guideId);
      setEditingGuide(guideToEdit);
      setShowEditForm(true);
      
      // 滚动到页面顶部，确保编辑表单可见
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  // 保存编辑后的攻略
  const handleSaveGuide = (formData: any) => {
    // 更新攻略列表
    setGuides(prev => prev.map(guide => {
      if (guide.id === formData.id) {
        return {
          ...guide,
          title: formData.title,
          description: formData.description,
          duration: formData.duration,
          level: formData.level,
          category: formData.level === "入门" ? "beginner" : 
                    formData.level === "中级" ? "economy" : "military", // 根据难度自动分类
          imagePreview: formData.imagePreview || guide.imagePreview
        };
      }
      return guide;
    }));
    
    // 重置编辑状态
    setEditingGuideId(null);
    setEditingGuide(null);
    setShowEditForm(false);
    
    // 显示成功提示
    toast('攻略更新成功！');
  };
  
  // 取消编辑
  const handleCancelEdit = () => {
    setEditingGuideId(null);
    setEditingGuide(null);
    setShowEditForm(false);
  };
  
  // 分类选项
  const categories = [
    { id: 'all', name: '全部攻略', icon: 'book-open' },
    { id: 'beginner', name: '新手入门', icon: 'child' },
    { id: 'economy', name: '经济管理', icon: 'chart-line' },
    { id: 'military', name: '军事战略', icon: 'shield-alt' },
    { id: 'nation', name: '国家指南', icon: 'flag' },
    { id: 'mod', name: 'MOD教程', icon: 'code' }
  ];
  
  // 过滤攻略
  const filteredGuides = selectedCategory === 'all' 
    ? guides 
    : guides.filter(guide => guide.category === selectedCategory);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
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
          <h1 className="text-3xl md:text-4xl font-bold mb-4">游戏攻略</h1>
          <p className={`max-w-2xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            探索全面的《钢铁雄心4》攻略和教学资源，提升您的游戏技巧
          </p>
        </div>
        
        {/* 显示编辑表单或添加攻略表单 */}
        {showEditForm ? (
          <GuideForm 
            onSubmit={handleSaveGuide} 
            isDark={isDark} 
            initialData={editingGuide} 
            onCancel={handleCancelEdit}
            isEditMode={true}
          />
        ) : (
          <GuideForm onSubmit={handleAddGuide} isDark={isDark} />
        )}
        
        {/* 分类筛选 */}
        <div className="mb-10 overflow-x-auto pb-2">
          <div className="flex space-x-2 min-w-max">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full font-medium transition-all transform hover:scale-105 ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white shadow-md'
                    : `${isDark ? 'bg-gray-800 hover:bg-gray-750 text-gray-300' : 'bg-white hover:bg-gray-50 text-gray-700'} shadow-sm`
                }`}
              >
                <i className={`fa-solid fa-${category.icon}`}></i>
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>
        
        {/* 攻略列表 */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredGuides.map(guide => (
            <GuideCard
              key={guide.id}
              title={guide.title}
              description={guide.description}
              duration={guide.duration}
              author={guide.author}
              level={guide.level}
              variants={itemVariants}
              isDark={isDark}
              onEdit={handleEditGuide}
              id={guide.id}
            />
          ))}
        </motion.div>
        
        {/* 没有结果时的提示 */}
        {filteredGuides.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`mt-12 text-center p-8 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-md`}
          >
            <i className="fa-solid fa-search text-4xl mb-4 text-gray-400"></i>
            <h3 className="text-xl font-bold mb-2">未找到攻略</h3>
            <p className={isDark ? 'text-gray-400' : 'text-gray-500'}>
              当前分类下暂无攻略内容，请尝试选择其他分类。
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}