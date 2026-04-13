# Urban Dish — QA Checklist

> Work through every item below. Mark each as ✅ Pass, ❌ Fail, or ⚠️ Partial.
> Note any bugs, visual issues, or unexpected behaviour in the **Notes** column.

---

## 1. General / Global

| #    | Test                             | Expected Result                                         | Status | Notes |
| ---- | -------------------------------- | ------------------------------------------------------- | ------ | ----- |
| 1.1  | Open the app in a browser        | Home page loads without errors                          | ✅     |       |
| 1.2  | Open browser console             | No red errors on initial load                           | ✅     |       |
| 1.3  | Toggle dark mode                 | All pages switch cleanly, no white flash                | ✅     |       |
| 1.4  | Refresh on dark mode             | Dark mode persists after refresh                        | ✅     |       |
| 1.5  | Resize browser to mobile (375px) | Layout does not break on any page                       | ✅     |       |
| 1.6  | Resize browser to tablet (768px) | Layout does not break on any page                       | ✅     |       |
| 1.7  | Open on a real mobile device     | Touch interactions work, no overflow                    |        |       |
| 1.8  | Check page titles in browser tab | Each page shows correct title e.g. "Menu \| Urban Dish" | ✅     |       |
| 1.9  | Check favicon                    | Brand icon shows in browser tab                         | ❌     |       |
| 1.10 | Navigate between all pages       | No 404s, no broken links                                | ✅     |       |

---

## 2. Navbar

| #    | Test                             | Expected Result                              | Status | Notes            |
| ---- | -------------------------------- | -------------------------------------------- | ------ | ---------------- |
| 2.1  | Logo visible on desktop          | Brand image loads, correct size              | ⚠️     | should be bigger |
| 2.2  | Desktop nav links visible        | About, Menu, Contact, Creator all present    | ✅     |                  |
| 2.3  | Click each nav link              | Navigates to correct page                    | ✅     |                  |
| 2.4  | Creator link                     | Opens LinkedIn in new tab                    | ✅     |                  |
| 2.5  | Dark mode toggle on desktop      | Toggles theme, correct icon shown            | ⚠️     | username wrong   |
| 2.6  | Cart icon on desktop             | Visible with correct badge count             | ✅     |                  |
| 2.7  | Book a Table button (logged out) | Visible, navigates to /reservations          | ✅     |                  |
| 2.8  | User avatar (logged in)          | Shows Google picture or initials             | ✅     |                  |
| 2.9  | User dropdown menu               | Shows My Account, Admin (if admin), Sign Out | ✅     |                  |
| 2.10 | Sign Out from dropdown           | Signs out, redirects to home                 | ✅     |                  |
| 2.11 | Hamburger menu on mobile         | Sheet slides in from right                   | ✅     |                  |
| 2.12 | Mobile sheet nav links           | All links present and functional             | ✅     |                  |
| 2.13 | Cart icon on mobile              | Visible in hamburger area                    | ✅     |                  |
| 2.14 | Dark mode toggle on mobile       | Works inside mobile area                     | ✅     |                  |
| 2.15 | Navbar on scroll                 | Background becomes more opaque with blur     | ✅     |                  |
| 2.16 | Active link highlighting         | Current page link is highlighted             | ✅     |                  |

---

## 3. Footer

| #    | Test                                   | Expected Result                      | Status | Notes |
| ---- | -------------------------------------- | ------------------------------------ | ------ | ----- |
| 3.1  | Footer visible on all static pages     | Renders below content                | ✅     |       |
| 3.2  | Footer not on auth pages               | Sign in/up have no footer            | ✅     |       |
| 3.3  | Footer not on menu/order/account/admin | Only static pages have footer        | ✅     |       |
| 3.4  | Company links                          | All four links navigate correctly    | ✅     |       |
| 3.5  | Contact info visible                   | Address, phone, email all present    | ✅     |       |
| 3.6  | Social icons                           | All four icons visible and clickable | ✅     |       |
| 3.7  | Opening hours                          | Correct days and times shown         | ✅     |       |
| 3.8  | Newsletter input                       | Accepts email input                  | ✅     |       |
| 3.9  | Subscribe button                       | Clickable, no errors                 | ✅     |       |
| 3.10 | Bottom bar copyright                   | Text and links visible               | ✅     |       |
| 3.11 | Footer on mobile                       | Stacks into single column cleanly    | ✅     |       |

---

## 4. Home Page

| #    | Test                     | Expected Result                            | Status | Notes          |
| ---- | ------------------------ | ------------------------------------------ | ------ | -------------- |
| 4.1  | Hero section loads       | Heading, subtext, buttons all visible      | ✅     |                |
| 4.2  | Hero background image    | Semi-transparent image visible behind text | ✅     |                |
| 4.3  | Book a Table button      | Navigates to /reservations                 | ✅     |                |
| 4.4  | Menu button              | Navigates to /menu                         | ✅     |                |
| 4.5  | Features section         | Four feature cards visible with icons      | ✅     |                |
| 4.6  | About snippet section    | Text, stats, images visible                | ✅     |                |
| 4.7  | About image grid         | Uneven grid layout, hover effect works     | ✅     |                |
| 4.8  | Learn More button        | Navigates to /about                        | ✅     |                |
| 4.9  | Stats (40, 77, 12)       | Visible with separators                    | ✅     |                |
| 4.10 | Stats on mobile          | Aligned in 2-column grid                   | ✅     |                |
| 4.11 | Chefs section            | Four chef cards with circular images       | ✅     |                |
| 4.12 | Best Dishes section      | Shows featured dishes from database        | ✅     |                |
| 4.13 | Add to Cart on dish card | Item added to cart, badge updates          | ✅     |                |
| 4.14 | Buy Now on dish card     | Navigates to /order                        | ❌     | takes to /menu |
| 4.15 | Testimonials carousel    | Three testimonials visible                 | ✅     |                |
| 4.16 | Carousel navigation      | Previous/next arrows work                  | ✅     |                |
| 4.17 | Scroll animations        | Sections fade/slide in on scroll           | ✅     |                |
| 4.18 | Section label pattern    | Red label with dash visible above headings | ✅     |                |

---

## 5. Menu Page

| #    | Test                   | Expected Result                                    | Status | Notes               |
| ---- | ---------------------- | -------------------------------------------------- | ------ | ------------------- |
| 5.1  | Menu page loads        | Hero + dishes visible                              | ✅     |                     |
| 5.2  | Dishes fetched from DB | Real menu items shown, not hardcoded               | ✅     |                     |
| 5.3  | All tab                | Shows all available menu items                     | ✅     |                     |
| 5.4  | Category tabs          | Starters, Mains, Desserts, Drinks filter correctly | ❌     | i changed code here |
| 5.5  | Search by name         | Filters dishes in real time                        | ✅     |                     |
| 5.6  | Search by description  | Also matches description text                      | ✅     |                     |
| 5.7  | Empty search result    | "No dishes found" message shown                    | ✅     |                     |
| 5.8  | Dish card image        | Image loads or fallback shown                      | ⚠️     | havn't tested image |
| 5.9  | Featured badge         | Shows on featured items                            | ✅     |                     |
| 5.10 | Dietary tag badge      | Shows tag (Vegetarian, Spicy etc.)                 | ✅     |                     |
| 5.11 | Price formatting       | Rs with comma formatting e.g. Rs 1,299             | ✅     |                     |
| 5.12 | Add to Cart button     | Item added to cart, drawer badge updates           | ✅     |                     |
| 5.13 | Dish name link         | Clicking name navigates to /menu/[slug]            | ✅     |                     |
| 5.14 | Buy Now button         | Navigates to /order                                | ❌     | takes to nowhere    |
| 5.15 | Menu on mobile         | Single column layout, no overflow                  | ✅     |                     |

---

## 6. Menu Item Detail Page

| #    | Test                       | Expected Result                               | Status | Notes              |
| ---- | -------------------------- | --------------------------------------------- | ------ | ------------------ |
| 6.1  | Page loads at /menu/[slug] | Correct dish shown                            | ✅     |                    |
| 6.2  | Invalid slug               | 404 page shown                                | ❌     | nextjs default 404 |
| 6.3  | Dish image                 | Full size image loads                         | ❌     |                    |
| 6.4  | Category + tag badges      | Visible under image                           | ❌     | visble over name   |
| 6.5  | Price visible              | Large, bold, primary color                    | ✅     |                    |
| 6.6  | Description visible        | Full description shown                        | ✅     |                    |
| 6.7  | Add to Cart button         | Adds item to cart                             | ✅     |                    |
| 6.8  | Reviews section visible    | Shows review count and avg rating             | ✅     |                    |
| 6.9  | Reviews list               | Existing reviews shown with stars and dates   | ✅     |                    |
| 6.10 | Review form (logged in)    | Star selector and text area visible           | ✅     |                    |
| 6.11 | Submit review              | Review appears in list, form clears           | ✅     |                    |
| 6.12 | Already reviewed           | Form replaced with "already reviewed" message | ✅     |                    |
| 6.13 | Delete own review          | Trash icon visible, removes review on click   | ✅     |                    |
| 6.14 | Review form (logged out)   | Sign in prompt shown instead of form          | ✅     |                    |
| 6.15 | Star rating interaction    | Stars highlight on hover and click            | ✅     |                    |

---

## 7. Cart

| #    | Test                         | Expected Result                                  | Status | Notes |
| ---- | ---------------------------- | ------------------------------------------------ | ------ | ----- |
| 7.1  | Cart icon in navbar          | Visible on all pages                             | ✅     |       |
| 7.2  | Empty cart                   | Drawer shows empty state with Browse Menu button | ✅     |       |
| 7.3  | Add single item              | Badge shows 1, item appears in drawer            | ✅     |       |
| 7.4  | Add same item again          | Quantity increments to 2, not duplicate entry    | ✅     |       |
| 7.5  | Add multiple different items | All items show in drawer                         | ✅     |       |
| 7.6  | Increase quantity in drawer  | Count goes up, subtotal updates                  | ✅     |       |
| 7.7  | Decrease quantity to zero    | Item removed from cart                           | ✅     |       |
| 7.8  | Remove item with trash icon  | Item removed instantly                           | ✅     |       |
| 7.9  | Subtotal calculation         | Correct sum of all items                         | ✅     |       |
| 7.10 | Delivery fee shown           | Rs 150 always shown                              | ✅     |       |
| 7.11 | Total calculation            | Subtotal + 150                                   | ✅     |       |
| 7.12 | Cart persists on refresh     | Items still in cart after page refresh           | ✅     |       |
| 7.13 | Cart persists across pages   | Navigate around site, cart stays intact          | ✅     |       |
| 7.14 | Proceed to Checkout button   | Navigates to /order, drawer closes               | ✅     |       |
| 7.15 | Cart badge count             | Reflects total quantity, not unique items        | ✅     |       |

---

## 8. Order / Checkout Page

| #    | Test                            | Expected Result                                         | Status | Notes   |
| ---- | ------------------------------- | ------------------------------------------------------- | ------ | ------- |
| 8.1  | Visit /order with empty cart    | Empty state shown with Browse Menu button               | ✅     |         |
| 8.2  | Visit /order with items         | Cart items shown with images and quantities             | ✅     |         |
| 8.3  | Increase item quantity          | Updates total in real time                              | ✅     |         |
| 8.4  | Decrease item quantity to zero  | Item removed                                            | ✅     |         |
| 8.5  | Remove item with trash icon     | Item removed                                            | ✅     |         |
| 8.6  | Coupon input                    | Accepts text, Apply button clickable                    | ⚠️     | no func |
| 8.7  | Delivery name field             | Accepts input                                           | ✅     |         |
| 8.8  | Delivery phone field            | Accepts input                                           | ✅     |         |
| 8.9  | Delivery address field          | Accepts input                                           | ✅     |         |
| 8.10 | Order notes field               | Optional, accepts text                                  | ✅     |         |
| 8.11 | Order summary sticky            | Stays visible while scrolling on desktop                | ✅     |         |
| 8.12 | Order summary items             | Matches cart contents                                   | ✅     |         |
| 8.13 | Pay with Stripe (empty fields)  | Error shown, no redirect                                | ✅     |         |
| 8.14 | Pay with Stripe (filled fields) | Redirects to Stripe checkout page                       | ✅     |         |
| 8.15 | Stripe checkout page            | Shows correct items and prices                          | ✅     |         |
| 8.16 | Complete payment with test card | Redirected to /order/success                            | ✅     |         |
| 8.17 | Declined card                   | Stripe shows error on their page                        |        |         |
| 8.18 | Order in database               | After success, order exists in DB with CONFIRMED status | ✅     |         |
| 8.19 | Cart cleared after success      | Cart empty after landing on success page                | ✅     |         |
| 8.20 | Success page order ID           | Short order ID visible                                  | ✅     |         |
| 8.21 | View My Orders button           | Navigates to /account orders tab                        | ✅     |         |
| 8.22 | Cancel Stripe checkout          | Redirected back to /order with cart intact              | ✅     |         |

---

## 9. Reservations Page

| #    | Test                           | Expected Result                                   | Status | Notes |
| ---- | ------------------------------ | ------------------------------------------------- | ------ | ----- |
| 9.1  | Page loads                     | Hero + form + info cards visible                  | ✅     |       |
| 9.2  | Name field                     | Accepts input                                     | ✅     |       |
| 9.3  | Email field                    | Accepts valid email                               | ✅     |       |
| 9.4  | Phone field                    | Accepts input                                     | ✅     |       |
| 9.5  | Date picker                    | Calendar opens, past dates disabled               | ✅     |       |
| 9.6  | Date selection                 | Selected date shown in button                     | ✅     |       |
| 9.7  | Time slot selector             | All time slots listed                             | ✅     |       |
| 9.8  | Party size selector            | 1–10+ options available                           | ✅     |       |
| 9.9  | Notes field                    | Optional, accepts text                            | ✅     |       |
| 9.10 | Submit without required fields | Validation error shown                            | ✅     |       |
| 9.11 | Submit valid form              | Success message shown, form clears                | ❌     |       |
| 9.12 | Reservation in database        | After submit, reservation exists in DB as PENDING | ❌     |       |
| 9.13 | Logged in user                 | Reservation linked to user ID                     | ❌     |       |
| 9.14 | Guest user                     | Reservation created without user ID               | ❌     |       |
| 9.15 | Info cards visible             | Hours, cancellation, large groups cards shown     | ✅     |       |
| 9.16 | Phone call link                | +92 321 number is a clickable tel: link           | ✅     |       |

---

## 10. About Page

| #    | Test              | Expected Result                             | Status | Notes |
| ---- | ----------------- | ------------------------------------------- | ------ | ----- |
| 10.1 | Hero section      | Title and lead text visible                 | ✅     |       |
| 10.2 | Story section     | Left image, right text layout on desktop    | ✅     |       |
| 10.3 | Story image       | Loads without error                         | ✅     |       |
| 10.4 | Stats bar         | Red background, 5 stats in a row on desktop | ✅     |       |
| 10.5 | Stats on mobile   | 2-column grid, last item centered           | ❌     |       |
| 10.6 | Chefs section     | Same as home page chefs                     | ✅     |       |
| 10.7 | Values section    | Four value cards with icons                 | ✅     |       |
| 10.8 | Scroll animations | Sections animate in on scroll               | ✅     |       |
| 10.9 | Mobile layout     | All sections stack correctly                | ✅     |       |

---

## 11. Contact Page

| #     | Test                 | Expected Result                    | Status | Notes |
| ----- | -------------------- | ---------------------------------- | ------ | ----- |
| 11.1  | Page loads           | Hero + form + info visible         | ✅     |       |
| 11.2  | Name field           | Accepts input                      | ✅     |       |
| 11.3  | Email field          | Accepts valid email                | ✅     |       |
| 11.4  | Subject field        | Accepts input                      | ✅     |       |
| 11.5  | Message field        | Accepts multi-line text            | ✅     |       |
| 11.6  | Submit empty form    | Browser validation triggers        | ✅     |       |
| 11.7  | Submit valid form    | Success message shown, form clears | ✅     |       |
| 11.8  | Send another message | Resets to form after success       | ✅     |       |
| 11.9  | Contact info cards   | Address, phone, email all visible  | ✅     |       |
| 11.10 | Opening hours        | Mon–Sat and Sunday hours shown     | ✅     |       |
| 11.11 | Google Map embed     | Map loads in iframe                | ✅     |       |
| 11.12 | Mobile layout        | Form and info stack cleanly        | ✅     |       |

---

## 12. FAQs Page

| #    | Test                    | Expected Result                               | Status | Notes |
| ---- | ----------------------- | --------------------------------------------- | ------ | ----- |
| 12.1 | Page loads              | Hero and accordion sections visible           | ✅     |       |
| 12.2 | Category groupings      | Orders, Reservations, Menu, Payments sections | ✅     |       |
| 12.3 | Accordion expand        | Click question, answer expands                | ✅     |       |
| 12.4 | Accordion collapse      | Click again, answer collapses                 | ✅     |       |
| 12.5 | Only one open at a time | Opening new one closes previous               | ❌     |       |
| 12.6 | Scroll animations       | Groups fade in on scroll                      | ✅     |       |
| 12.7 | Mobile layout           | Full width, readable                          | ✅     |       |

---

## 13. Legal Pages

| #    | Test                                 | Expected Result                               | Status | Notes |
| ---- | ------------------------------------ | --------------------------------------------- | ------ | ----- |
| 13.1 | /terms loads                         | Hero + prose content visible                  | ✅     |       |
| 13.2 | /privacy-policy loads                | Hero + prose content visible                  | ✅     |       |
| 13.3 | All 9 sections present on both pages | Content complete                              | ✅     |       |
| 13.4 | Email links in content               | mailto: links clickable                       | ✅     |       |
| 13.5 | Last updated date                    | April 2026 shown                              | ✅     |       |
| 13.6 | Typography styling                   | Headings, paragraphs properly styled          | ✅     |       |
| 13.7 | Footer links to both pages           | Terms and Privacy Policy links in footer work | ✅     |       |

---

## 14. Auth — Sign In

| #     | Test                              | Expected Result                           | Status | Notes     |
| ----- | --------------------------------- | ----------------------------------------- | ------ | --------- |
| 14.1  | /sign-in loads                    | Split screen layout visible               | ✅     |           |
| 14.2  | Left panel                        | Background image with brand logo and text | ✅     |           |
| 14.3  | Continue with Google button       | Redirects to Google OAuth                 | ✅     |           |
| 14.4  | Google OAuth completes            | Redirected to home, user signed in        | ✅     |           |
| 14.5  | Email field                       | Accepts input                             | ✅     |           |
| 14.6  | Password field                    | Masked by default                         | ✅     |           |
| 14.7  | Show/hide password toggle         | Eye icon toggles visibility               | ✅     |           |
| 14.8  | Forgot password link              | Link present (page can be placeholder)    | ❌     | need this |
| 14.9  | Sign in with wrong password       | Error message shown                       | ✅     |           |
| 14.10 | Sign in with correct credentials  | Redirected to home, user signed in        | ✅     |           |
| 14.11 | Sign up link                      | Navigates to /sign-up                     | ✅     |           |
| 14.12 | Already signed in visits /sign-in | Redirected to home                        | ✅     |           |
| 14.13 | No navbar/footer                  | Auth page is full screen                  | ✅     |           |

---

## 15. Auth — Sign Up

| #     | Test                              | Expected Result                         | Status | Notes |
| ----- | --------------------------------- | --------------------------------------- | ------ | ----- |
| 15.1  | /sign-up loads                    | Split screen layout visible             | ✅     |       |
| 15.2  | Continue with Google              | Same as sign in Google flow             | ✅     |       |
| 15.3  | All fields present                | Name, email, password, confirm password | ✅     |       |
| 15.4  | Password mismatch                 | Error "Passwords do not match" shown    | ✅     |       |
| 15.5  | Valid registration                | Account created, redirected to home     | ✅     |       |
| 15.6  | Duplicate email                   | Error message shown                     | ❌     |       |
| 15.7  | Show/hide on both password fields | Both toggles work independently         | ✅     |       |
| 15.8  | Terms & Privacy links             | Both navigate to correct pages          | ❌     |       |
| 15.9  | Sign in link                      | Navigates to /sign-in                   | ✅     |       |
| 15.10 | New user role                     | Default role is CUSTOMER not ADMIN      | ✅     |       |

---

## 16. Account Page

| #     | Test                      | Expected Result                                | Status | Notes |
| ----- | ------------------------- | ---------------------------------------------- | ------ | ----- |
| 16.1  | Visit /account logged out | Redirected to /sign-in                         | ✅     |       |
| 16.2  | Visit /account logged in  | Page loads with user info                      | ✅     |       |
| 16.3  | Avatar shows correctly    | Google picture or initials fallback            | ✅     |       |
| 16.4  | User name visible         | Correct name from account                      | ✅     |       |
| 16.5  | User email visible        | Correct email shown                            | ✅     |       |
| 16.6  | Role badge                | Shows CUSTOMER or ADMIN                        | ✅     |       |
| 16.7  | Orders tab                | Shows real orders from DB                      | ✅     |       |
| 16.8  | Empty orders state        | "No orders yet" with Browse Menu button        | ✅     |       |
| 16.9  | Order card shows items    | Each order lists its items with quantities     | ✅     |       |
| 16.10 | Order status badge        | Correct color for each status                  | ✅     |       |
| 16.11 | Order total               | Correct amount shown                           | ✅     |       |
| 16.12 | Order date                | Formatted date visible                         | ✅     |       |
| 16.13 | Reservations tab          | Shows real reservations from DB                | ❌     |       |
| 16.14 | Empty reservations state  | "No reservations yet" with Book a Table button | ✅     |       |
| 16.15 | Reservation details       | Date, time, party size all shown               | ❌     |       |
| 16.16 | Cancel reservation button | Status updates to CANCELLED                    | ❌     |       |
| 16.17 | Cancelled reservation     | Cancel button no longer shown                  | ❌     |       |
| 16.18 | Profile tab               | Shows editable name, phone, disabled email     | ✅     |       |
| 16.19 | Save profile changes      | Name/phone update in DB                        | ✅     |       |
| 16.20 | Danger zone visible       | Delete Account button present                  | ✅     |       |

---

## 17. Admin — Access Control

| #    | Test                          | Expected Result                 | Status | Notes |
| ---- | ----------------------------- | ------------------------------- | ------ | ----- |
| 17.1 | Visit /admin logged out       | Redirected to /sign-in          | ✅     |       |
| 17.2 | Visit /admin as CUSTOMER      | Redirected to home              | ✅     |       |
| 17.3 | Visit /admin as ADMIN         | Dashboard loads                 | ✅     |       |
| 17.4 | Admin link in navbar dropdown | Only visible when role is ADMIN | ✅     |       |

---

## 18. Admin — Dashboard

| #    | Test               | Expected Result                           | Status | Notes |
| ---- | ------------------ | ----------------------------------------- | ------ | ----- |
| 18.1 | Total Orders stat  | Shows real count from DB                  | ✅     |       |
| 18.2 | Revenue stat       | Shows real sum from DB                    | ✅     |       |
| 18.3 | Reservations stat  | Shows real count from DB                  | ❌     |       |
| 18.4 | Customers stat     | Shows real count from DB                  | ✅     |       |
| 18.5 | Revenue chart      | Line chart renders with data              | ✅     |       |
| 18.6 | Orders chart       | Bar chart renders with data               | ✅     |       |
| 18.7 | Recent orders list | Shows last 5 orders with status and total | ✅     |       |
| 18.8 | Empty state        | "No orders yet" shown when no data        | ✅     |       |
| 18.9 | Charts on mobile   | Charts resize, do not overflow            | ✅     |       |

---

## 19. Admin — Menu Manager

| #     | Test                 | Expected Result                                   | Status | Notes |
| ----- | -------------------- | ------------------------------------------------- | ------ | ----- |
| 19.1  | Menu items load      | All DB items shown in grid                        | ✅     |       |
| 19.2  | Search by name       | Filters items in real time                        | ✅     |       |
| 19.3  | Category filter      | Shows only items in selected category             | ✅     |       |
| 19.4  | Featured badge       | Visible on featured items                         | ✅     |       |
| 19.5  | Unavailable badge    | Visible on unavailable items                      | ✅     |       |
| 19.6  | Add Item button      | Opens create dialog                               | ✅     |       |
| 19.7  | Create dialog fields | Name, description, price, category, tags, toggles | ✅     |       |
| 19.8  | Image upload         | File picker opens, image uploads to Vercel Blob   | ✅     |       |
| 19.9  | Image preview        | Uploaded image previews in dialog                 | ✅     |       |
| 19.10 | Save new item        | Item appears in grid, menu page updates           | ✅     |       |
| 19.11 | Edit button          | Opens dialog with pre-filled data                 | ✅     |       |
| 19.12 | Edit and save        | Changes reflected in grid and menu page           | ✅     |       |
| 19.13 | Delete button        | Opens confirmation dialog                         | ✅     |       |
| 19.14 | Confirm delete       | Item removed from grid and DB                     | ❌     |       |
| 19.15 | Cancel delete        | Dialog closes, nothing deleted                    | ✅     |       |
| 19.16 | Featured toggle      | Switches correctly                                | ✅     |       |
| 19.17 | Available toggle     | Switches correctly                                | ✅     |       |

---

## 20. Admin — Order Manager

| #     | Test                        | Expected Result                   | Status | Notes |
| ----- | --------------------------- | --------------------------------- | ------ | ----- |
| 20.1  | Orders load                 | All orders from DB shown          | ✅     |       |
| 20.2  | Search by order ID          | Filters correctly                 | ✅     |       |
| 20.3  | Search by customer name     | Filters correctly                 | ✅     |       |
| 20.4  | Status filter               | Shows only selected status        | ✅     |       |
| 20.5  | Order card shows customer   | Name and phone visible            | ✅     |       |
| 20.6  | Order card shows date       | Formatted date visible            | ✅     |       |
| 20.7  | Order card shows item count | Number of items shown             | ✅     |       |
| 20.8  | Status badge                | Correct color for each status     | ✅     |       |
| 20.9  | Status dropdown             | All statuses available to select  | ✅     |       |
| 20.10 | Change order status         | Updates in DB, badge updates      | ✅     |       |
| 20.11 | Empty state                 | "No orders found" when no results | ✅     |       |

---

## 21. Admin — Reservation Manager

| #     | Test                     | Expected Result                                | Status | Notes |
| ----- | ------------------------ | ---------------------------------------------- | ------ | ----- |
| 21.1  | Reservations load        | All from DB shown                              | ❌     |       |
| 21.2  | Search by name           | Filters correctly                              | ❌     |       |
| 21.3  | Search by email          | Filters correctly                              | ❌     |       |
| 21.4  | Status filter            | Shows only selected status                     | ❌     |       |
| 21.5  | Reservation card details | Name, email, phone, date, time, party size     | ❌     |       |
| 21.6  | Notes visible            | Shows notes if present                         | ❌     |       |
| 21.7  | Confirm button           | Only on PENDING reservations                   | ❌     |       |
| 21.8  | Click Confirm            | Status updates to CONFIRMED, buttons disappear | ❌     |       |
| 21.9  | Click Cancel             | Status updates to CANCELLED, buttons disappear | ❌     |       |
| 21.10 | Empty state              | "No reservations found" message                | ✅     |       |

---

## 22. Admin — Sidebar

| #    | Test                         | Expected Result                      | Status | Notes |
| ---- | ---------------------------- | ------------------------------------ | ------ | ----- |
| 22.1 | Desktop sidebar visible      | Left column with 4 nav items         | ✅     |       |
| 22.2 | Active link highlighted      | Current page link is red/primary     | ✅     |       |
| 22.3 | Navigate between admin pages | All 4 links work                     | ✅     |       |
| 22.4 | Mobile FAB button            | Floating button visible bottom-right | ✅     |       |
| 22.5 | Mobile FAB opens sheet       | Sheet slides in from left            | ✅     |       |
| 22.6 | Mobile nav links work        | All links navigate and close sheet   | ✅     |       |

---

## 23. Middleware & Route Protection

| #    | Test                    | Expected Result             | Status | Notes |
| ---- | ----------------------- | --------------------------- | ------ | ----- |
| 23.1 | /account logged out     | → /sign-in                  | ✅     |       |
| 23.2 | /order logged out       | → /sign-in                  | ✅     |       |
| 23.3 | /admin logged out       | → /sign-in                  | ✅     |       |
| 23.4 | /admin as CUSTOMER      | → /                         | ✅     |       |
| 23.5 | /sign-in when logged in | → /                         | ✅     |       |
| 23.6 | /sign-up when logged in | → /                         | ✅     |       |
| 23.7 | Public pages logged out | All accessible without auth | ✅     |       |

---

## 24. Performance & SEO

| #    | Test                           | Expected Result                           | Status | Notes     |
| ---- | ------------------------------ | ----------------------------------------- | ------ | --------- |
| 24.1 | Run Lighthouse on home page    | Score above 80 on all metrics             | ⚠️     | using zen |
| 24.2 | Run Lighthouse on menu page    | Score above 80                            | ⚠️     | using zen |
| 24.3 | Check og:title meta tags       | Present on all pages                      | ❌     |           |
| 24.4 | Check og:description meta tags | Present on all pages                      | ❌     |           |
| 24.5 | Images have alt text           | All images have descriptive alt           | ✅     |           |
| 24.6 | No layout shift on load        | Page does not jump when fonts/images load | ✅     |           |
| 24.7 | Fonts load correctly           | Geist font applied globally               | ✅     |           |
| 24.8 | Images optimised by Next.js    | Using next/image, correct sizes served    | ✅     |           |

---

## 25. Error States

| #    | Test                               | Expected Result                  | Status | Notes         |
| ---- | ---------------------------------- | -------------------------------- | ------ | ------------- |
| 25.1 | Visit non-existent page            | 404 page shown                   | ❌     | dont have one |
| 25.2 | Visit /menu/invalid-slug           | 404 page shown                   | ❌     | dont have one |
| 25.3 | Sign in with wrong password        | Clear error message shown        | ✅     |               |
| 25.4 | Submit reservation without fields  | Validation error shown           | ✅     |               |
| 25.5 | Submit contact form without fields | Browser validation triggers      | ✅     |               |
| 25.6 | Stripe payment declined            | Error shown on Stripe page       |        |               |
| 25.7 | Add to Cart with no image          | Fallback shown, no crash         | ✅     |               |
| 25.8 | Network offline                    | App handles gracefully, no crash |        |               |

---

## Summary

| Category           | Total Tests | Pass | Fail | Partial |
| ------------------ | ----------- | ---- | ---- | ------- |
| General            | 10          |      |      |         |
| Navbar             | 16          |      |      |         |
| Footer             | 11          |      |      |         |
| Home Page          | 18          |      |      |         |
| Menu Page          | 15          |      |      |         |
| Menu Item Detail   | 15          |      |      |         |
| Cart               | 15          |      |      |         |
| Order / Checkout   | 22          |      |      |         |
| Reservations       | 16          |      |      |         |
| About              | 9           |      |      |         |
| Contact            | 12          |      |      |         |
| FAQs               | 7           |      |      |         |
| Legal Pages        | 7           |      |      |         |
| Sign In            | 13          |      |      |         |
| Sign Up            | 10          |      |      |         |
| Account            | 20          |      |      |         |
| Admin Access       | 4           |      |      |         |
| Admin Dashboard    | 9           |      |      |         |
| Admin Menu         | 17          |      |      |         |
| Admin Orders       | 11          |      |      |         |
| Admin Reservations | 10          |      |      |         |
| Admin Sidebar      | 6           |      |      |         |
| Middleware         | 7           |      |      |         |
| Performance & SEO  | 8           |      |      |         |
| Error States       | 8           |      |      |         |
| **Total**          | **305**     |      |      |         |

---

_Generated for Urban Dish — April 2026_
