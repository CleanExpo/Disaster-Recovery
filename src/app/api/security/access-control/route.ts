import { NextRequest, NextResponse } from 'next/server';

/**
 * Access Control API
 *
 * GET /api/security/access-control - Get permissions
 * POST /api/security/access-control/check - Check permission
 * POST /api/security/access-control/roles - Manage roles
 */

// Mock implementation - would use accessControl service in production
const rolePermissions = new Map([
  [
    'admin',
    [
      'user:create',
      'user:read',
      'user:update',
      'user:delete',
      'room:create',
      'room:delete',
      'analytics:view_all',
    ],
  ],
  [
    'moderator',
    ['user:read', 'room:read', 'message:delete', 'analytics:view_public'],
  ],
  ['user', ['room:read', 'message:create', 'analytics:view_own']],
]);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action } = body;

    if (action === 'check_permission') {
      const { userId, roleId, permission } = body;

      if (!userId || !roleId || !permission) {
        return NextResponse.json(
          { error: 'Missing required fields' },
          { status: 400 }
        );
      }

      const permissions = rolePermissions.get(roleId) || [];
      const hasPermission = permissions.includes(permission);

      return NextResponse.json(
        {
          userId,
          roleId,
          permission,
          hasPermission,
        },
        { status: 200 }
      );
    }

    if (action === 'get_role_permissions') {
      const { roleId } = body;

      if (!roleId) {
        return NextResponse.json(
          { error: 'roleId is required' },
          { status: 400 }
        );
      }

      const permissions = rolePermissions.get(roleId) || [];

      return NextResponse.json(
        {
          roleId,
          permissions,
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { error: 'Unknown action' },
      { status: 400 }
    );
  } catch (error: any) {
    console.error('Error in access control:', error);
    return NextResponse.json(
      { error: 'Failed to process access control request' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const roleId = searchParams.get('roleId');

    if (!roleId) {
      return NextResponse.json(
        { error: 'roleId is required' },
        { status: 400 }
      );
    }

    const permissions = rolePermissions.get(roleId) || [];

    return NextResponse.json(
      {
        roleId,
        permissions,
        permissionCount: permissions.length,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error fetching permissions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch permissions' },
      { status: 500 }
    );
  }
}
