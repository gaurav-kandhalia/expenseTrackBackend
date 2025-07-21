import {z} from "zod"
import { required } from "zod/mini"

export  const categorySchema = z.object({
    name:z.string({
        required:"Category is required",
        invalid_type_error:"category must be string"
    })
    .min(2,"category must be atleast 2 char")
    .max(50,"category cannot be more that 50 char"),
    
    
})

