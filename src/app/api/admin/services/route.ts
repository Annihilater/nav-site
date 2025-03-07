import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAdmin } from '@/utils/auth';
import { successResponse, unauthorizedResponse, errorResponse, serverErrorResponse } from '@/utils/api';

// 获取所有服务
export async function GET(request: NextRequest) {
  try {
    // 验证管理员身份
    const isAdmin = await verifyAdmin(request);
    if (!isAdmin) {
      return unauthorizedResponse();
    }
    
    // 获取所有服务，包括分类信息
    const services = await prisma.service.findMany({
      include: {
        category: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        id: 'desc',
      },
    });
    
    // 格式化数据，添加分类名称
    const formattedServices = services.map(service => ({
      ...service,
      categoryName: service.category.name,
    }));
    
    return successResponse(formattedServices);
  } catch (error) {
    return serverErrorResponse(error);
  }
}

// 创建服务
export async function POST(request: NextRequest) {
  try {
    // 验证管理员身份
    const isAdmin = await verifyAdmin(request);
    if (!isAdmin) {
      return unauthorizedResponse();
    }
    
    // 解析请求数据
    const body = await request.json();
    const { name, url, description, categoryId, icon } = body;
    
    // 验证数据
    if (!name || typeof name !== 'string') {
      return errorResponse('服务名称不能为空');
    }
    
    if (!url || typeof url !== 'string') {
      return errorResponse('服务网址不能为空');
    }
    
    if (!description || typeof description !== 'string') {
      return errorResponse('服务简介不能为空');
    }
    
    if (!categoryId || typeof categoryId !== 'number') {
      return errorResponse('所属分类不能为空');
    }
    
    // 检查分类是否存在
    const category = await prisma.category.findUnique({
      where: { id: categoryId },
    });
    
    if (!category) {
      return errorResponse('所选分类不存在');
    }
    
    // 创建服务
    const service = await prisma.service.create({
      data: {
        name,
        url,
        description,
        categoryId,
        icon: icon || null,
      },
      include: {
        category: {
          select: {
            name: true,
          },
        },
      },
    });
    
    // 格式化返回数据
    const formattedService = {
      ...service,
      categoryName: service.category.name,
    };
    
    return successResponse(formattedService, '创建服务成功');
  } catch (error) {
    return serverErrorResponse(error);
  }
} 