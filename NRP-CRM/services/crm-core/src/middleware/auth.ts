import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JWTPayload, UserRole } from '@/types';
import logger from '@/config/logger';
import prisma from '@/config/database';
import cache from '@/utils/cache';

interface AuthenticatedRequest extends Request {
  user?: JWTPayload;
}

export class AuthMiddleware {
  /**
   * Verify JWT token and attach user to request
   */
  public static async authenticate(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader?.startsWith('Bearer ')) {
        res.status(401).json({
          success: false,
          message: 'Access token required',
        });
        return;
      }

      const token = authHeader.split(' ')[1];

      if (!token) {
        res.status(401).json({
          success: false,
          message: 'Access token required',
        });
        return;
      }

      // Check if token is blacklisted
      const isBlacklisted = await cache.exists(`blacklist:${token}`);
      if (isBlacklisted) {
        res.status(401).json({
          success: false,
          message: 'Token has been revoked',
        });
        return;
      }

      // Verify token
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET!
      ) as JWTPayload;

      // Check if user still exists and is active
      const user = await prisma.user.findUnique({
        where: { id: decoded.id },
        select: {
          id: true,
          email: true,
          role: true,
          active: true,
          contractor: {
            select: {
              id: true,
              status: true,
            },
          },
        },
      });

      if (!user || !user.active) {
        res.status(401).json({
          success: false,
          message: 'User not found or inactive',
        });
        return;
      }

      // Attach user info to request
      req.user = {
        id: user.id,
        email: user.email,
        role: user.role,
        contractorId: user.contractor?.id,
      };

      next();
    } catch (error) {
      logger.error('Authentication error:', error);
      
      if (error instanceof jwt.TokenExpiredError) {
        res.status(401).json({
          success: false,
          message: 'Token expired',
        });
        return;
      }

      if (error instanceof jwt.JsonWebTokenError) {
        res.status(401).json({
          success: false,
          message: 'Invalid token',
        });
        return;
      }

      res.status(500).json({
        success: false,
        message: 'Authentication failed',
      });
    }
  }

  /**
   * Check if user has required role(s)
   */
  public static authorize(allowedRoles: UserRole[] | UserRole) {
    return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
      if (!req.user) {
        res.status(401).json({
          success: false,
          message: 'Authentication required',
        });
        return;
      }

      const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];

      if (!roles.includes(req.user.role as UserRole)) {
        res.status(403).json({
          success: false,
          message: 'Insufficient permissions',
        });
        return;
      }

      next();
    };
  }

  /**
   * Check if user can access contractor resource
   */
  public static async authorizeContractor(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({
          success: false,
          message: 'Authentication required',
        });
        return;
      }

      const contractorId = req.params.contractorId || req.params.id;

      // Admins and managers can access any contractor
      if ([UserRole.ADMIN, UserRole.MANAGER].includes(req.user.role as UserRole)) {
        next();
        return;
      }

      // Contractors can only access their own data
      if (req.user.role === UserRole.CONTRACTOR) {
        if (!req.user.contractorId || req.user.contractorId !== contractorId) {
          res.status(403).json({
            success: false,
            message: 'Access denied to this contractor resource',
          });
          return;
        }
      }

      next();
    } catch (error) {
      logger.error('Contractor authorization error:', error);
      res.status(500).json({
        success: false,
        message: 'Authorization failed',
      });
    }
  }

  /**
   * Generate JWT tokens
   */
  public static generateTokens(payload: JWTPayload): {
    accessToken: string;
    refreshToken: string;
  } {
    const accessToken = jwt.sign(payload, process.env.JWT_SECRET!, {
      expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    });

    const refreshToken = jwt.sign(
      { ...payload, type: 'refresh' },
      process.env.JWT_REFRESH_SECRET!,
      {
        expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '30d',
      }
    );

    return { accessToken, refreshToken };
  }

  /**
   * Refresh access token
   */
  public static async refreshToken(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { refreshToken } = req.body;

      if (!refreshToken) {
        res.status(401).json({
          success: false,
          message: 'Refresh token required',
        });
        return;
      }

      // Check if refresh token is blacklisted
      const isBlacklisted = await cache.exists(`blacklist:${refreshToken}`);
      if (isBlacklisted) {
        res.status(401).json({
          success: false,
          message: 'Refresh token has been revoked',
        });
        return;
      }

      // Verify refresh token
      const decoded = jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_SECRET!
      ) as JWTPayload & { type: string };

      if (decoded.type !== 'refresh') {
        res.status(401).json({
          success: false,
          message: 'Invalid refresh token',
        });
        return;
      }

      // Check if user still exists and is active
      const user = await prisma.user.findUnique({
        where: { id: decoded.id },
        select: {
          id: true,
          email: true,
          role: true,
          active: true,
          contractor: {
            select: { id: true },
          },
        },
      });

      if (!user || !user.active) {
        res.status(401).json({
          success: false,
          message: 'User not found or inactive',
        });
        return;
      }

      // Generate new tokens
      const newTokens = AuthMiddleware.generateTokens({
        id: user.id,
        email: user.email,
        role: user.role,
        contractorId: user.contractor?.id,
      });

      // Blacklist old refresh token
      await cache.set(
        `blacklist:${refreshToken}`,
        true,
        30 * 24 * 60 * 60 // 30 days
      );

      res.json({
        success: true,
        data: newTokens,
      });
    } catch (error) {
      logger.error('Token refresh error:', error);

      if (error instanceof jwt.TokenExpiredError) {
        res.status(401).json({
          success: false,
          message: 'Refresh token expired',
        });
        return;
      }

      if (error instanceof jwt.JsonWebTokenError) {
        res.status(401).json({
          success: false,
          message: 'Invalid refresh token',
        });
        return;
      }

      res.status(500).json({
        success: false,
        message: 'Token refresh failed',
      });
    }
  }

  /**
   * Blacklist token on logout
   */
  public static async logout(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const authHeader = req.headers.authorization;
      const { refreshToken } = req.body;

      if (authHeader?.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1];
        // Blacklist access token
        await cache.set(
          `blacklist:${token}`,
          true,
          7 * 24 * 60 * 60 // 7 days
        );
      }

      if (refreshToken) {
        // Blacklist refresh token
        await cache.set(
          `blacklist:${refreshToken}`,
          true,
          30 * 24 * 60 * 60 // 30 days
        );
      }

      res.json({
        success: true,
        message: 'Logged out successfully',
      });
    } catch (error) {
      logger.error('Logout error:', error);
      res.status(500).json({
        success: false,
        message: 'Logout failed',
      });
    }
  }

  /**
   * Rate limiting for sensitive endpoints
   */
  public static rateLimitByUser() {
    return async (
      req: AuthenticatedRequest,
      res: Response,
      next: NextFunction
    ): Promise<void> => {
      try {
        if (!req.user) {
          next();
          return;
        }

        const key = `rate_limit:${req.user.id}:${req.route?.path || req.path}`;
        const limit = 10; // requests
        const window = 60; // seconds

        const current = await cache.increment(key);
        
        if (current === 1) {
          await cache.expire(key, window);
        }

        if (current > limit) {
          res.status(429).json({
            success: false,
            message: 'Rate limit exceeded',
            retryAfter: await cache.getTTL(key),
          });
          return;
        }

        next();
      } catch (error) {
        logger.error('Rate limiting error:', error);
        next(); // Continue on cache errors
      }
    };
  }
}

export default AuthMiddleware;