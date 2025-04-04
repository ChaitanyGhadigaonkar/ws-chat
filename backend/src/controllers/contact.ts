import expressAsyncHandler from "express-async-handler";
import {
  ADD_CONTACT_VIA_EMAIL,
  GET_USER_CONTACTS,
  UPDATE_CONTACT_SCHEMA,
} from "../schema/contact";
import prisma from "../config/db/prisma";
import { CONTACT_FILTER } from "../types/contact";

const getUserContacts = expressAsyncHandler(async (req, res) => {
  const userId = req.user?.id;

  const queryParams = await GET_USER_CONTACTS.validateAsync(req.query);

  const searchText = queryParams.searchText.toLowerCase();
  const contacts = await prisma.contact.findMany({
    where: {
      userId: userId,
      contactUser: {
        ...(queryParams.searchText && {
          name: {
            contains: searchText, // TODO: need to update the search
          },
        }),
        ...(queryParams.type === CONTACT_FILTER.BLOCKED && {
          isBlocked: true,
        }),
        ...(queryParams.type === CONTACT_FILTER.FAVORITES && {
          isFavorite: true,
        }),
      },
    },
    include: {
      contactUser: {
        select: {
          id: true,
          email: true,
          name: true,
        },
      },
    },
    omit: {
      createdAt: true,
      updatedAt: true,
    },
  });

  res.status(200).json({
    success: true,
    message: "contacts fetched successfully",
    contacts,
  });
});

const addContactViaEmail = expressAsyncHandler(async (req, res) => {
  const user = req.user;
  const body = await ADD_CONTACT_VIA_EMAIL.validateAsync(req.body);

  const userExists = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
  });

  if (!userExists) {
    throw new Error("User does not exists.");
  }

  const isAlreadyExistsInContact = await prisma.contact.findFirst({
    where: {
      userId: user?.id!,
      contactUserId: userExists.id,
    },
  });
  if (isAlreadyExistsInContact) {
    throw new Error("User already in contact");
  }
  const newContact = await prisma.contact.create({
    data: {
      userId: user?.id!,
      contactUserId: userExists.id,
      // TODO: Add nick name for the user
    },
    omit: {
      createdAt: true,
      updatedAt: true,
    },
  });
  res.status(200).json({
    success: true,
    contact: newContact,
    message: "user added successfully",
  });
});

const getContactDetails = expressAsyncHandler(async (req, res) => {
  const { contactUserId } = req.params;

  const contactExists = await prisma.contact.findUnique({
    where: {
      id: contactUserId,
    },
    omit: {
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!contactExists) {
    throw new Error("Contact does not exists.");
  }

  res.status(200).json({
    success: true,
    contact: contactExists,
    message: "user added successfully",
  });
});

const updateContact = expressAsyncHandler(async (req, res) => {
  const { contactUserId } = req.params;

  const body = await UPDATE_CONTACT_SCHEMA.validateAsync(req.body);

  const contactExists = await prisma.contact.findUnique({
    where: {
      id: contactUserId,
    },
  });

  if (!contactExists) {
    throw new Error("Contact does not exists.");
  }

  const updatedContact = await prisma.contact.update({
    where: {
      id: contactUserId,
    },
    data: {
      ...(body.nickname && {
        nickname: body.nickname,
      }),
      ...(body.isFavorite && {
        isFavorite: body.isFavorite,
      }),
      ...(body.isBlocked && {
        isBlocked: body.isBlocked,
      }),
      omit: {
        createdAt: true,
        updatedAt: true,
      },
    },
  });

  res.status(200).json({
    success: true,
    contact: updatedContact,
    message: "user updated successfully",
  });
});

const deleteContact = expressAsyncHandler(async (req, res) => {
  const { contactUserId } = req.params;

  const contactExists = await prisma.contact.findUnique({
    where: {
      id: contactUserId,
    },
  });

  if (!contactExists) {
    throw new Error("Contact does not exists.");
  }

  await prisma.contact.delete({
    where: {
      id: contactUserId,
    },
  });

  const contacts = await prisma.contact.findMany({
    where: {
      userId: req.user?.id,
    },
    include: {
      contactUser: {
        select: {
          id: true,
          email: true,
          name: true,
        },
      },
    },
    omit: {
      createdAt: true,
      updatedAt: true,
    },
  });

  res.status(200).json({
    success: true,
    contacts,
    message: "user deleted successfully",
  });
});

export {
  getUserContacts,
  addContactViaEmail,
  updateContact,
  getContactDetails,
  deleteContact,
};
