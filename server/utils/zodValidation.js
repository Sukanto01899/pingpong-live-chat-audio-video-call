const z = require("zod");
const ApiError = require("./ApiError");

const User = z
  .object({
    name: z.string().trim().min(3, "Too short!").optional(),
    username: z.string().trim().optional(),
    email: z.email().optional(),
    phone: z
      .string()
      .regex(/^[0-9]{10,15}$/, "Please enter valid phone number")
      .optional(),
    password: z.string().min(6, "Password length must be 6+ characters"),
  })
  .superRefine((data, ctx) =>{
    const hasEmail = !!data.email;
    const hasPhone = !!data.phone;

    if(hasEmail && hasPhone){
        ctx.addIssue({
            path: ['email'],
            message: "Provide either email or phone number, not both",
            code: 'custom'
        })
    }

    if(!hasEmail && !hasPhone){
        ctx.addIssue({
            path: ['email'],
            message: 'Either email or phone number is required',
            code: 'custom'
        })
    }

  });

 const updataData = z.object({
  name: z.string().trim().min(3, "Too short!").optional(),
  username: z.string().trim().optional(),
  email: z.email().optional(),
  phone: z
      .string()
      .regex(/^[0-9]{10,15}$/, "Please enter valid phone number")
      .optional(),
  bio: z.string().trim().optional()
 }) 

const validUserInput = (data) => {
  const result = User.safeParse(data);
  if(!result.success){
    throw new ApiError(400, 'Input details validation failed!')
  }

  return result.data
};

const updateInputValidation = (data)=>{
  const result = updataData.safeParse(data);
  if(!result.success){
    throw new ApiError(400, 'Input details validation failed!')
  }

  return result.data
}

module.exports = {validUserInput, updateInputValidation}
