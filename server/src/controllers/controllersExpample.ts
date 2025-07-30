import { Request, Response } from "express";
import { eq } from "drizzle-orm";
import { db } from "../db/index"; // Adjust path to your DB connection
import { users } from "../db/schema"; // Adjust path to your schema
import { z } from "zod";

// Validation schemas
const createUserSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format"),
  age: z.number().min(0).optional(),
});

const updateUserSchema = z.object({
  name: z.string().min(1).optional(),
  email: z.string().email().optional(),
  age: z.number().min(0).optional(),
});

const idParamSchema = z.object({
  id: z.string().regex(/^\d+$/, "ID must be a number").transform(Number),
});

// Get all users
export const getAllUsers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const allUsers = await db.select().from(users);

    res.status(200).json({
      success: true,
      data: allUsers,
      count: allUsers.length,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Get user by ID
export const getUserById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = idParamSchema.parse(req.params);

    const user = await db.select().from(users).where(eq(users.id, id));

    if (user.length === 0) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: user[0],
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        success: false,
        message: "Invalid user ID",
        errors: error.errors,
      });
      return;
    }

    console.error("Error fetching user:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Create new user
export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const validatedData = createUserSchema.parse(req.body);

    // Check if user with email already exists
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, validatedData.email));

    if (existingUser.length > 0) {
      res.status(409).json({
        success: false,
        message: "User with this email already exists",
      });
      return;
    }

    const newUser = await db.insert(users).values(validatedData).returning();

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: newUser[0],
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        success: false,
        message: "Validation error",
        errors: error.errors,
      });
      return;
    }

    console.error("Error creating user:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Update user
export const updateUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = idParamSchema.parse(req.params);
    const validatedData = updateUserSchema.parse(req.body);

    // Check if user exists
    const existingUser = await db.select().from(users).where(eq(users.id, id));

    if (existingUser.length === 0) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    // Check if email is being updated and already exists
    if (validatedData.email) {
      const emailExists = await db
        .select()
        .from(users)
        .where(eq(users.email, validatedData.email));

      if (emailExists.length > 0 && emailExists[0].id !== id) {
        res.status(409).json({
          success: false,
          message: "Email already exists",
        });
        return;
      }
    }

    const updatedUser = await db
      .update(users)
      .set(validatedData)
      .where(eq(users.id, id))
      .returning();

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: updatedUser[0],
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        success: false,
        message: "Validation error",
        errors: error.errors,
      });
      return;
    }

    console.error("Error updating user:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Delete user
export const deleteUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = idParamSchema.parse(req.params);

    // Check if user exists
    const existingUser = await db.select().from(users).where(eq(users.id, id));

    if (existingUser.length === 0) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    await db.delete(users).where(eq(users.id, id));

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        success: false,
        message: "Invalid user ID",
        errors: error.errors,
      });
      return;
    }

    console.error("Error deleting user:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Example route setup (add this to your routes file)
/*
import express from 'express';
import { getAllUsers, getUserById, createUser, updateUser, deleteUser } from './controllers/userController';

const router = express.Router();

router.get('/users', getAllUsers);
router.get('/users/:id', getUserById);
router.post('/users', createUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

export default router;
*/
