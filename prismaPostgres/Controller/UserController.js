import prisma from "../DB/db.config.js";

export const createUser = async (req, res) => {
  try {
    console.log("POST API Called..");
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }
    console.log(req.body);
    const newUser = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: password,
      },
    });

    // const newUser = await prisma.user.createMany({
    //   data: user.map((user) => [
    //     {
    //       name,
    //       email,
    //       password,
    //     },
    //     {
    //       name,
    //       email,
    //       password,
    //     },
    //   ]),
    // });
    // console.log("newUser", newUser);

    return res.status(200).json({ message: "User Created", data: newUser });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllUser = async (req, res) => {
  // if(!req.body.email){
  //     return res.status(400).json({message:"email is required"});
  // }
  try {
    const getData = await prisma.user.findMany();

    // const getData = await prisma.user.findFirst({
    // orderBy: { created_at: 'asc' },
    // // select:{
    // //     email:true,
    // // },
    // //   where: {
    // //     email: req.body.email,
    // //   },
    // });

    // const getData = await prisma.user.findUnique({
    //   where: { email: req.body.email },
    //   select: {
    //     email: true,
    //     name: true,
    //   },
    // });

    // const getData=await prisma.user.findFirstOrThrow({
    //     where:{
    //         email:req.body.email,
    //     }
    // })

    // const getData=await prisma.user.findUniqueOrThrow({
    //     where:{
    //         email:req.body.email,
    //     },
    // })

    console.log(getData);
    return res
      .status(200)
      .json({ message: "get all user data", data: getData });
  } catch (error) {
    console.log("get all user error ", error);

    res.status(400).json({ message: "error are occured!" });
  }
};

export const updateUser = async (req, res) => {
  try {
    console.log("update user function call...");
    // const user = await prisma.user.update({
    //   where: { id: parseInt(req.params.id) },
    //   data: {
    //     name: req.body.name,
    //     email: req.body.email,
    //     password: req.body.password,
    //   },
    // });

    // const user = await prisma.user.updateMany({
    //   data: {
    //     name: "HIREN",
    //   },
    //   where: {
    //     name: req.body.name,
    //   },
    // });

    // const user = await prisma.user.updateManyAndReturn({
    //   data: {
    //     role: "ADMIN",
    //   },
    //   where: {
    //     name: req.body.name,
    //   },
    // });

    const user = await prisma.user.upsert({
      where: {
        email: "hp123@gmail.com",
      },
      update: {
        name: "newUser21",
      },
      create: {
        name: req.body.name,
        email: req.body.email,
      },
    });

    console.log("Updated Data :", user);
    return res
      .status(200)
      .json({ message: "user updated successfully", data: user });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "error occured to update user !" });
  }
};

export const deleteUser = async (req, res) => {
  console.log("delete function call..");
  try {
    const user = await prisma.user.delete({
      where: { id: parseInt(req.params.id) },
    });

    // const user=await prisma.user.deleteMany({
    //     where:{
    //         name:req.body.name,
    //     }
    // })
    console.log("deleted data :", user);
    return res.status(200).json({ message: "deleted success", data: user });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "error are occured to delete.." });
  }
};

// export const findFirstUser = async (req, res) => {
//   console.log("Find First Function..");
//     if(!req.body.email){
//         return res.status(400).json({message:"Email is required !!"})
//     }
//   try {
//     const firstUser = await prisma.user.findFirst({
//       where: {
//         email: req.body.email,
//       },
//     });
//     if(!firstUser){
//         return res.status(404).json({message:"No user found with this email"})
//     }
//     console.log(firstUser);
//     return res
//       .status(200)
//       .json({ message: "find first successfully", data: firstUser });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ message: "Error Find First" });
//   }
// };
