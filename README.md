# Packages :

# git branch ---> create and switch --->

1. create branch --> git branch module-57
2. all show branch --> git branch
3. branch switch --> git checkout module-57
4. delete --> at first switch --> (\*main) branch go then remove --->
   -> git branch -D module-57

### 1. packages => password hash -> bcryptjs (ts)

       -> npm install bcryptjs

# Notes :----------------------------------->

1. Generic <T> ব্যবহারের কারণে data যেকোনো type হতে পারে।
2. void কী? --> "এই ফাংশন কিছু return করবে না।

   ```js
   function sayHello(): void {
     console.log("Hello!");
   }
   ```

   ফাংশনটি কিছু return করছে না → তাই টাইপ void।
   তুমি চাইলে return statement দিতে পারো না বা শুধু return; দিতে পারো।

3. env ---> config ---bcryptjs_hash--------------------->
   -> hash_salt string হিসেবে আসবে → পরে Number() দিয়ে convert করতে হবে

4. prisma.$transaction ---------------------------------
   multiple DB queries এক transaction হিসেবে চালায়।

5.

# Cloudnary + Multer compaire img uploaded Thirt-Party ------

### 1. multer ----------------->

npm i multer
imp i @types/multer

```js
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(), "/uploads"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage: storage });
```

### 2. Cloudinary ---------------------------

```js
import multer from "multer";
import path from "path";
import { v2 as cloudinary } from "cloudinary";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(), "/uploads"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});
const upload = multer({ storage: storage });

// cloudinary-------------------------------------------------------------
const uploadToCloudinary = async (file: Express.Multer.File) => {
  cloudinary.config({
    cloud_name: "dlksmhtmq",
    api_key: "928197971661335",
    api_secret: "EmLB5blBQCKCsM36ZzF25ARtlKw",
  });
  // Upload an image
  const uploadResult = await cloudinary.uploader
    .upload(file.path, {
      public_id: file.filename,
    })
    .catch((error) => {
      console.log(error);
    });

  return uploadResult;
};

export const fileUploader = { upload, uploadToCloudinary };
```

#### 2. (void) = কিছু return করে না --> Promise<string> = async ফাংশন, string return করে

# 3. catchAsync(try-catch) 🧩RequestHandler সংক্ষেপে:----------------------------

## ⚙️ ৩️⃣ তাহলে RequestHandler কী?

RequestHandler টাইপটা Express framework থেকেই আসে।
এটা এমন ফাংশন বোঝায় যেটা সাধারণত Express route handler হিসেবে ব্যবহৃত হয়।

অর্থাৎ একটা RequestHandler এইরকম দেখতে হয় 👇
(req: Request, res: Response, next: NextFunction) => void | Promise<void>

মানে এই ফাংশন তিনটা argument নেয়:
req → HTTP Request অবজেক্ট
res → HTTP Response অবজেক্ট
next → Express-এর পরবর্তী middleware ফাংশন কল করার জন্য

এবং এই ফাংশন হয় কিছু return করে না (void), না হয় Promise<void> return করে (যদি async হয়)।
fn = কোনো ফাংশন (যেটা আমরা পাস করবো)
RequestHandler = Express route handler টাইপ
fn: RequestHandler = বোঝায়: fn হচ্ছে এমন ফাংশন যা (req, res, next) নেয় এবং কিছু return করে না বা Promise<void> রিটার্ন করে

⚙️ ৩️⃣ সংক্ষেপে:
অংশ কাজ
fn(req, res, next) Express handler চালায়
await async ফাংশন শেষ না হওয়া পর্যন্ত অপেক্ষা করে
catch (err) = কোনো error হলে ধরে next(err) পাঠায়
next(err) = Express-এর global error handler-এ পাঠায়

# 4. 🧩 dotenv কী?

dotenv হলো একটি Node.js প্যাকেজ, যা .env ফাইলের ভিতরে লেখা environment variables গুলোকে process.env তে লোড করে দেয়।
✅ ব্যাখ্যা:
.env = তোমার গোপন কনফিগারেশন রাখার ফাইল
dotenv.config() = .env ফাইল থেকে ডেটা লোড করে
process.env = লোড করা সব ভ্যারিয়েবল রাখে
path.join(process.cwd(), ".env") = প্রজেক্টের মূল ফোল্ডারে .env ফাইল খুঁজে পায়

# 5. prisma -> instent file ---->

```js
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();
```

# 6. sendResponse--> ১️⃣ Function সংজ্ঞা

const sendResponse = <T>(res: Response, jsonData: { ... }) => { ... }
<T> → Generic type parameter
অর্থাৎ data কোন টাইপের হতে পারে সেটা যেকোনো টাইপ (T) হতে পারে।
res: Response → Express response object।
jsonData → response-এর সব তথ্য (status, message, data, meta) ধরে রাখে।

# 7. Zod -------------> validation

1. schema.parse() → valid না হলে ZodError throw করে
   next() → request pass হবে, controller এ যাবে

2. schema → Zod object schema যা validate করবে
   Returns Express middleware: (req, res, next)

3. Middleware higher-order function → schema inject করা যায়
   Zod validation fail হলে response 400 with error
   Success হলে next() → controller এ চলে যাবে
