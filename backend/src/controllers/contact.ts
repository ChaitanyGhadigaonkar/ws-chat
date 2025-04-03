import expressAsyncHandler from "express-async-handler";
import { ADD_CONTACT_VIA_EMAIL, GET_USER_CONTACTS } from "../schema/contact";
import prisma from "../config/db/prisma";
import { CONTACT_FILTER } from "../types/contact";

const getUserContacts = expressAsyncHandler(async (req, res) => {
  const userId = req.user?.id;

  const queryParams = await GET_USER_CONTACTS.validateAsync(req.query);

  const contacts = await prisma.contact.findMany({
    where: {
      userId: userId,
      contactUser: {
        ...(queryParams.searchText && {
          name: {
            contains: queryParams.searchText,
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
      contactUser: true,
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
  });
  res.status(200).json({
    success: true,
    contact: newContact,
    message: "user added successfully",
  });
});

export { getUserContacts, addContactViaEmail };
