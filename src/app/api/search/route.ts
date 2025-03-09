import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { successResponse, errorResponse, serverErrorResponse } from '@/utils/api';

// 基于MySQL的搜索API
export async function GET(request: NextRequest) {
  try {
    // 获取查询参数
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q');
    
    // 如果没有查询参数，返回错误
    if (!query) {
      return errorResponse('搜索关键词不能为空');
    }
    
    // 使用MySQL的LIKE查询搜索服务
    const services = await prisma.service.findMany({
      where: {
        OR: [
          { name: { contains: query } },
          { description: { contains: query } },
        ],
      },
      include: {
        category: {
          select: {
            name: true,
            slug: true,
          },
        },
      },
      orderBy: {
        clickCount: 'desc',
      },
      take: 50,
    });
    
    // 格式化结果
    const formattedServices = services.map(service => ({
      id: service.id,
      name: service.name,
      url: service.url,
      description: service.description,
      icon: service.icon,
      clickCount: service.clickCount,
      categoryId: service.categoryId,
      categoryName: service.category.name,
      categorySlug: service.category.slug,
    }));
    
    return successResponse(formattedServices);
  } catch (error) {
    console.error('搜索失败:', error);
    return serverErrorResponse(error);
  }
} 