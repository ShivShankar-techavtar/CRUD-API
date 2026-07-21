import User from "../model/userModel.js";

export const create = async (req, res) => {
  try {
    const newUser = new User(req.body);
    const { email } = newUser;

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "User already exists." });
    }
    const savedData = await newUser.save();
    res
      .status(200)
      .json({ message: "User created successfully.", user: savedData });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// GET /api/users
// Optional query params (all optional, fully backward compatible):
//   search   - matches name / email / phone (case-insensitive, partial)
//   status   - "active" | "inactive"
//   sort     - "newest" | "oldest" | "name_asc" | "name_desc"
//   page     - page number (default 1)
//   limit    - page size (default 10)
export const getAllUsers = async (req, res) => {
  try {
    const { search = "", status = "", sort = "newest" } = req.query;
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;

    const query = {};

    if (search && search.trim()) {
      const regex = new RegExp(search.trim(), "i");
      query.$or = [{ name: regex }, { email: regex }, { phone: regex }];
    }

    if (status && ["active", "inactive"].includes(status)) {
      query.status = status;
    }

    let sortOption = { createdAt: -1 };
    if (sort === "oldest") sortOption = { createdAt: 1 };
    if (sort === "name_asc") sortOption = { name: 1 };
    if (sort === "name_desc") sortOption = { name: -1 };

    const total = await User.countDocuments(query);
    const totalAll = await User.countDocuments({});
    const activeCount = await User.countDocuments({ status: "active" });
    const inactiveCount = await User.countDocuments({ status: "inactive" });

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const newCount = await User.countDocuments({
      createdAt: { $gte: sevenDaysAgo },
    });

    const userData = await User.find(query)
      .sort(sortOption)
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json({
      users: userData,
      total,
      page,
      limit,
      totalPages: Math.max(Math.ceil(total / limit), 1),
      stats: {
        total: totalAll,
        active: activeCount,
        inactive: inactiveCount,
        newThisWeek: newCount,
      },
    });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const userExist = await User.findById(id);
    if (!userExist) {
      return res.status(404).json({ message: "User not found." });
    }
    res.status(200).json(userExist);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

export const update = async (req, res) => {
  try {
    const id = req.params.id;
    const userExist = await User.findById(id);
    if (!userExist) {
      return res.status(404).json({ message: "User not found." });
    }
    const updatedData = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res
      .status(200)
      .json({ message: "User Updated successfully.", user: updatedData });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const userExist = await User.findById(id);
    if (!userExist) {
      return res.status(404).json({ message: "User not found." });
    }
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "User deleted successfully." });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};
