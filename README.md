# 导航网站

一个收录AI服务和应用的导航网站，方便用户快速访问和检索AI工具。

## 技术栈

- 前端：Next.js + TypeScript + Tailwind CSS
- 后台：Ant Design
- 数据库：MySQL
- 缓存：Redis

## 功能特点

- 响应式设计，适配各种设备
- 分类展示AI服务
- 实时搜索功能
- 点击统计功能
- 独立的管理后台

## 开发环境准备

### 前提条件

- Node.js 18+
- MySQL 8.0+

### 安装依赖

```bash
npm install
```

### 配置环境变量

根目录创建`.env`文件，并根据实际情况修改配置：

```
# 数据库配置
DATABASE_URL="mysql://用户名:密码@localhost:3306/数据库名"

# 应用配置
NEXT_PUBLIC_API_URL="http://localhost:3000/api"
NEXT_PUBLIC_SITE_NAME="123导航"
NEXT_PUBLIC_UPLOAD_DIR="uploads"
```

Redis 配置文件 /src/lib/redis.ts

```
const redis = new Redis({
  host: 'localhost',
  port: 6379,
  db: 0,
});
```

### 初始化数据库

```bash
npx prisma migrate dev --name init
```

### 启动开发服务器

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看网站。

## 系统初始化

首次运行时，访问 [http://localhost:3000/api/init](http://localhost:3000/api/init) 初始化系统，这将创建默认的管理员账户和分类。

默认管理员账户：

- 用户名：admin
- 密码：admin123

## 管理后台

访问 [http://localhost:3000/admin](http://localhost:3000/admin) 进入管理后台。

## 部署说明

### 构建生产版本

```bash
npm run build
```

### 启动生产服务器

```bash
npm start
```

## 许可证

MIT

[![image](iframe组件截图图片链接)](https://yxvm.com/)
[NodeSupport](https://github.com/NodeSeekDev/NodeSupport)赞助了本项目
