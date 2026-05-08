## 1. General / Global

| #    | Test                          | Expected Result                               | Status | Notes |
| ---- | ----------------------------- | --------------------------------------------- | ------ | ----- |
| 1.1  | App loads in browser          | No console errors on initial load             |        |       |
| 1.2  | Dark mode toggle              | All pages switch cleanly                      |        |       |
| 1.3  | Dark mode persists on refresh | Theme remembered via localStorage             |        |       |
| 1.4  | Light mode is default         | Fresh browser shows light mode                |        |       |
| 1.5  | Favicon shows in tab          | Brand icon visible                            |        |       |
| 1.6  | Page titles correct           | Each page shows correct `%s \| Urban Dish`    |        |       |
| 1.7  | OG meta tags present          | View source shows og:title and og:description |        |       |
| 1.8  | Custom 404 page               | Visit /random-page, custom 404 shown          |        |       |
| 1.9  | Geist font applied globally   | All text renders in Geist                     |        |       |
| 1.10 | No layout shift on load       | Page doesn't jump when assets load            |        |       |
| 1.11 | Mobile layout (375px)         | No overflow on any page                       |        |       |
| 1.12 | Tablet layout (768px)         | No overflow on any page                       |        |       |
| 1.13 | All inter-page links work     | No broken links across the app                |        |       |

---

## 2. Navbar

| #    | Test                                              | Expected Result                                    | Status | Notes |
| ---- | ------------------------------------------------- | -------------------------------------------------- | ------ | ----- |
| 2.1  | Logo visible and sized correctly                  | Brand image loads at correct size                  |        |       |
| 2.2  | Logo centered nav links (desktop)                 | About, Menu, Contact, Creator centered             |        |       |
| 2.3  | Active link highlighted                           | Current page link shows primary color              |        |       |
| 2.4  | Creator link opens LinkedIn                       | New tab, correct URL                               |        |       |
| 2.5  | Cart icon visible                                 | Shows on all pages                                 |        |       |
| 2.6  | Cart badge count                                  | Reflects total item quantity                       |        |       |
| 2.7  | Dark mode toggle works                            | Sun/Moon icon toggles correctly                    |        |       |
| 2.8  | Logged out — Sign In + Sign Up buttons            | Both visible on desktop                            |        |       |
| 2.9  | Logged in — Avatar dropdown                       | Shows name, My Account, Admin (if admin), Sign Out |        |       |
| 2.10 | Sign Out works                                    | Clears session, redirects to home                  |        |       |
| 2.11 | Admin link only for admins                        | Not visible to CUSTOMER role                       |        |       |
| 2.12 | Hamburger on mobile                               | Sheet slides in from right                         |        |       |
| 2.13 | Mobile sheet — nav links                          | All links present                                  |        |       |
| 2.14 | Mobile sheet — Sign In/Sign Up (logged out)       | Both links visible                                 |        |       |
| 2.15 | Mobile sheet — Account/Admin/Sign Out (logged in) | Correct links based on role                        |        |       |
| 2.16 | Mobile cart icon                                  | Visible and functional                             |        |       |
| 2.17 | Navbar scroll effect                              | Background becomes more opaque on scroll           |        |       |
| 2.18 | No navbar redirect loops                          | Navigate between pages without being kicked out    |        |       |

---

## 3. Footer

| #    | Test                                  | Expected Result                               | Status | Notes |
| ---- | ------------------------------------- | --------------------------------------------- | ------ | ----- |
| 3.1  | Footer on static pages only           | Home, About, Contact, FAQs, Legal show footer |        |       |
| 3.2  | No footer on auth pages               | Sign in/up are full screen                    |        |       |
| 3.3  | No footer on menu/order/account/admin | Only main layout has no footer                |        |       |
| 3.4  | Company links navigate correctly      | Menu, FAQs, Privacy Policy, Terms all work    |        |       |
| 3.5  | No Blog link in footer                | Blog removed                                  |        |       |
| 3.6  | Contact info visible                  | Address, phone, email present                 |        |       |
| 3.7  | Social icons clickable                | All four work                                 |        |       |
| 3.8  | Opening hours correct                 | Mon–Sat and Sunday times                      |        |       |
| 3.9  | Newsletter form accepts input         | Email input and subscribe button work         |        |       |
| 3.10 | Bottom bar links                      | Home, About Us, Contact (no Blog)             |        |       |
| 3.11 | Footer stacks on mobile               | Single column layout                          |        |       |

---

## 4. Home Page

| #    | Test                               | Expected Result                      | Status | Notes |
| ---- | ---------------------------------- | ------------------------------------ | ------ | ----- |
| 4.1  | Hero section loads                 | Heading, subtext, buttons visible    |        |       |
| 4.2  | Hero background image              | Semi-transparent image behind text   |        |       |
| 4.3  | Book a Table → /reservations       | Correct navigation                   |        |       |
| 4.4  | Menu → /menu                       | Correct navigation                   |        |       |
| 4.5  | Features section                   | Four cards with icons                |        |       |
| 4.6  | About snippet                      | Text, stats, images visible          |        |       |
| 4.7  | About image grid                   | Uneven layout, hover expand works    |        |       |
| 4.8  | Learn More → /about                | Correct navigation                   |        |       |
| 4.9  | Chefs section                      | Shows chefs from database            |        |       |
| 4.10 | Best Dishes                        | Shows featured dishes from database  |        |       |
| 4.11 | Add to Cart on dish card           | Item added, badge updates            |        |       |
| 4.12 | Buy Now on dish card               | Adds to cart AND navigates to /order |        |       |
| 4.13 | Testimonials carousel              | Shows testimonials from database     |        |       |
| 4.14 | Carousel arrows work               | Previous/next navigate correctly     |        |       |
| 4.15 | Scroll animations                  | Sections animate in on scroll        |        |       |
| 4.16 | Animations replay on search/filter | Items re-animate after filtering     |        |       |

---

## 5. Menu Page

| #    | Test                                    | Expected Result                       | Status | Notes |
| ---- | --------------------------------------- | ------------------------------------- | ------ | ----- |
| 5.1  | Dishes load from database               | Real items shown                      |        |       |
| 5.2  | All tab shows everything                | No filter applied                     |        |       |
| 5.3  | Category tabs filter correctly          | Starters/Mains/Desserts/Drinks        |        |       |
| 5.4  | Search by name                          | Filters in real time                  |        |       |
| 5.5  | Search by description                   | Matches description text              |        |       |
| 5.6  | Clear search restores items             | Items reappear when search is cleared |        |       |
| 5.7  | Empty state shown                       | "No dishes found" when no match       |        |       |
| 5.8  | Featured badge visible                  | On featured items                     |        |       |
| 5.9  | Dietary tag badge                       | Vegetarian/Spicy/etc shown            |        |       |
| 5.10 | Price formatted correctly               | Rs 1,299 format                       |        |       |
| 5.11 | Add to Cart works                       | Cart badge updates                    |        |       |
| 5.12 | Buy Now adds to cart and goes to /order | Both actions happen                   |        |       |
| 5.13 | Dish name links to detail page          | /menu/[slug]                          |        |       |
| 5.14 | Mobile single column                    | Clean layout                          |        |       |

---

## 6. Menu Item Detail Page

| #    | Test                        | Expected Result                | Status | Notes |
| ---- | --------------------------- | ------------------------------ | ------ | ----- |
| 6.1  | Page loads at /menu/[slug]  | Correct dish shown             |        |       |
| 6.2  | Invalid slug → 404          | Custom 404 page shown          |        |       |
| 6.3  | Dish image loads            | Full size image visible        |        |       |
| 6.4  | Category and tag badges     | Below dish name                |        |       |
| 6.5  | Price visible               | Large, bold, primary color     |        |       |
| 6.6  | Description visible         | Full text shown                |        |       |
| 6.7  | Ingredients shown           | Chips/pills layout             |        |       |
| 6.8  | Add to Cart works           | Adds to cart                   |        |       |
| 6.9  | Reviews section visible     | Count and average rating shown |        |       |
| 6.10 | Submit review (logged in)   | Review appears, form clears    |        |       |
| 6.11 | Already reviewed message    | Form replaced after submitting |        |       |
| 6.12 | Delete own review           | Trash icon removes review      |        |       |
| 6.13 | Sign in prompt (logged out) | Shown instead of review form   |        |       |
| 6.14 | Star hover interaction      | Stars highlight on hover       |        |       |

---

## 7. Cart

| #    | Test                        | Expected Result                       | Status | Notes |
| ---- | --------------------------- | ------------------------------------- | ------ | ----- |
| 7.1  | Empty cart state            | Empty message with Browse Menu button |        |       |
| 7.2  | Add single item             | Badge shows 1                         |        |       |
| 7.3  | Add same item twice         | Quantity increments to 2              |        |       |
| 7.4  | Add multiple items          | All shown in drawer                   |        |       |
| 7.5  | Increase quantity           | Count goes up, total updates          |        |       |
| 7.6  | Decrease to zero            | Item removed                          |        |       |
| 7.7  | Remove with trash icon      | Item removed instantly                |        |       |
| 7.8  | Subtotal calculation        | Correct sum                           |        |       |
| 7.9  | Delivery fee dynamic        | Matches value set in admin settings   |        |       |
| 7.10 | Total = subtotal + delivery | Correct                               |        |       |
| 7.11 | Cart persists on refresh    | localStorage working                  |        |       |
| 7.12 | Cart persists across pages  | Stays intact while navigating         |        |       |
| 7.13 | Proceed to Checkout         | Goes to /order, drawer closes         |        |       |
| 7.14 | Cart badge count            | Total quantity not unique items       |        |       |
| 7.15 | Stale cart items handled    | Error shown if menu item deleted      |        |       |

---

## 8. Order / Checkout Page

| #    | Test                          | Expected Result                          | Status | Notes |
| ---- | ----------------------------- | ---------------------------------------- | ------ | ----- |
| 8.1  | Empty cart → empty state      | Browse Menu button shown                 |        |       |
| 8.2  | Cart items shown              | Images, names, quantities visible        |        |       |
| 8.3  | Quantity controls work        | Update totals in real time               |        |       |
| 8.4  | Remove item                   | Removed from cart                        |        |       |
| 8.5  | Delivery name autofilled      | If logged in, name pre-filled            |        |       |
| 8.6  | Delivery phone autofilled     | If logged in and phone saved, pre-filled |        |       |
| 8.7  | Delivery address field        | Accepts input                            |        |       |
| 8.8  | Form validation               | Errors shown for missing required fields |        |       |
| 8.9  | Order summary sticky          | Stays visible on scroll                  |        |       |
| 8.10 | Pay with Stripe → Stripe page | Redirects correctly                      |        |       |
| 8.11 | Email pre-filled on Stripe    | User email shown on Stripe checkout      |        |       |
| 8.12 | Complete payment              | Redirected to /order/success             |        |       |
| 8.13 | Order in DB as CONFIRMED      | Via webhook after payment                |        |       |
| 8.14 | Cart cleared after success    | Empty after landing on success page      |        |       |
| 8.15 | Success page order ID         | Visible and copyable                     |        |       |
| 8.16 | Copy order ID                 | Copies to clipboard, check icon shows    |        |       |
| 8.17 | Download receipt button       | PDF downloads correctly                  |        |       |
| 8.18 | PDF receipt content           | Name, items, totals, branding correct    |        |       |
| 8.19 | Cancel Stripe checkout        | Returns to /order with cart intact       |        |       |
| 8.20 | Cancelled order in DB         | Status set to CANCELLED                  |        |       |
| 8.21 | View My Orders button         | Goes to /account orders tab              |        |       |

---

## 9. Reservations Page

| #    | Test                          | Expected Result                  | Status | Notes |
| ---- | ----------------------------- | -------------------------------- | ------ | ----- |
| 9.1  | Page loads                    | Form and info cards visible      |        |       |
| 9.2  | Name autofilled if logged in  | Pre-populated from user store    |        |       |
| 9.3  | Email autofilled if logged in | Pre-populated from user store    |        |       |
| 9.4  | Phone autofilled if logged in | Pre-populated if phone saved     |        |       |
| 9.5  | Date picker                   | Past dates disabled              |        |       |
| 9.6  | Time slot selector            | All slots listed                 |        |       |
| 9.7  | Party size selector           | 1–10+ available                  |        |       |
| 9.8  | Zod validation errors         | Shown for invalid/missing fields |        |       |
| 9.9  | Phone validation              | Invalid phone shows error        |        |       |
| 9.10 | Submit valid form             | Success message shown            |        |       |
| 9.11 | Reservation saved to DB       | Status PENDING                   |        |       |
| 9.12 | Linked to user if logged in   | userId set on reservation        |        |       |
| 9.13 | Guest reservation works       | userId null, still saves         |        |       |
| 9.14 | Make another reservation      | Resets form                      |        |       |

---

## 10. About Page

| #    | Test              | Expected Result                   | Status | Notes |
| ---- | ----------------- | --------------------------------- | ------ | ----- |
| 10.1 | Hero section      | Title and lead visible            |        |       |
| 10.2 | Story section     | Image and text layout             |        |       |
| 10.3 | Stats bar         | 5 stats on red background         |        |       |
| 10.4 | Stats on mobile   | 2-column grid, last item centered |        |       |
| 10.5 | Chefs section     | Shows chefs from database         |        |       |
| 10.6 | Values section    | Four value cards                  |        |       |
| 10.7 | Scroll animations | Work correctly                    |        |       |

---

## 11. Contact Page

| #    | Test                          | Expected Result               | Status | Notes |
| ---- | ----------------------------- | ----------------------------- | ------ | ----- |
| 11.1 | Name autofilled if logged in  | Pre-populated                 |        |       |
| 11.2 | Email autofilled if logged in | Pre-populated                 |        |       |
| 11.3 | Zod validation errors         | Shown for invalid fields      |        |       |
| 11.4 | Submit valid form             | Success message, form clears  |        |       |
| 11.5 | Contact info cards            | Address, phone, email visible |        |       |
| 11.6 | Map loads                     | Google Maps iframe visible    |        |       |
| 11.7 | Mobile layout                 | Stacks cleanly                |        |       |

---

## 12. FAQs Page

| #    | Test                    | Expected Result                      | Status | Notes |
| ---- | ----------------------- | ------------------------------------ | ------ | ----- |
| 12.1 | Four categories shown   | Orders, Reservations, Menu, Payments |        |       |
| 12.2 | Accordion expands       | Click opens answer                   |        |       |
| 12.3 | Only one open at a time | Opening new closes previous          |        |       |
| 12.4 | Animations work         | Fade in on scroll                    |        |       |

---

## 13. Legal Pages

| #    | Test                          | Expected Result                | Status | Notes |
| ---- | ----------------------------- | ------------------------------ | ------ | ----- |
| 13.1 | /terms loads content from DB  | Not hardcoded                  |        |       |
| 13.2 | /privacy-policy loads from DB | Not hardcoded                  |        |       |
| 13.3 | Last updated date dynamic     | Shows real updatedAt date      |        |       |
| 13.4 | Prose styling correct         | Headings and paragraphs styled |        |       |
| 13.5 | Email links clickable         | mailto: links work             |        |       |

---

## 14. Auth — Sign In

| #     | Test                             | Expected Result           | Status | Notes |
| ----- | -------------------------------- | ------------------------- | ------ | ----- |
| 14.1  | Page loads full screen           | No navbar/footer          |        |       |
| 14.2  | Left panel with background image | Image + logo + tagline    |        |       |
| 14.3  | Google OAuth                     | Redirects and completes   |        |       |
| 14.4  | Valid email/password sign in     | Redirects to home         |        |       |
| 14.5  | Wrong password                   | Error message shown       |        |       |
| 14.6  | Zod validation on email          | Invalid email shows error |        |       |
| 14.7  | Show/hide password               | Toggle works              |        |       |
| 14.8  | Forgot password link             | Link present              |        |       |
| 14.9  | Sign up link                     | Navigates to /sign-up     |        |       |
| 14.10 | Already logged in → home         | Redirect works            |        |       |

---

## 15. Auth — Sign Up

| #     | Test                        | Expected Result                       | Status | Notes |
| ----- | --------------------------- | ------------------------------------- | ------ | ----- |
| 15.1  | Google OAuth                | Works same as sign in                 |        |       |
| 15.2  | Valid registration          | Account created, redirected           |        |       |
| 15.3  | Duplicate email             | Clear error message shown             |        |       |
| 15.4  | Password mismatch           | "Passwords do not match" shown        |        |       |
| 15.5  | Password strength indicator | Shows Weak/Fair/Good/Strong           |        |       |
| 15.6  | Password requirements       | Uppercase, lowercase, number required |        |       |
| 15.7  | Name validation             | Letters only, 2–50 chars              |        |       |
| 15.8  | Phone validation on sign up | If included, validates correctly      |        |       |
| 15.9  | Terms & Privacy links       | Both navigate to correct pages        |        |       |
| 15.10 | New user role is CUSTOMER   | Not ADMIN by default                  |        |       |

---

## 16. Account Page

| #     | Test                                      | Expected Result                       | Status | Notes |
| ----- | ----------------------------------------- | ------------------------------------- | ------ | ----- |
| 16.1  | Logged out → /sign-in                     | Redirect works                        |        |       |
| 16.2  | Avatar shows correctly                    | Google pic or initials                |        |       |
| 16.3  | Name and email visible                    | Correct user data                     |        |       |
| 16.4  | Role badge shown                          | CUSTOMER or ADMIN                     |        |       |
| 16.5  | Orders tab — real data                    | From database                         |        |       |
| 16.6  | Empty orders state                        | Browse Menu button shown              |        |       |
| 16.7  | Order status badge colors                 | Correct colors per status             |        |       |
| 16.8  | View Details opens modal                  | Full order breakdown shown            |        |       |
| 16.9  | View Details — items with images          | Items listed with thumbnails          |        |       |
| 16.10 | View Details — totals                     | Subtotal, delivery, total correct     |        |       |
| 16.11 | View Details — delivery info              | Address, phone, notes shown           |        |       |
| 16.12 | Reorder button                            | Adds items to cart, goes to /order    |        |       |
| 16.13 | Download receipt                          | PDF downloads for that order          |        |       |
| 16.14 | Reservations tab — real data              | From database                         |        |       |
| 16.15 | Reservation details                       | Date, time, party size shown          |        |       |
| 16.16 | Table number shown                        | If assigned by admin                  |        |       |
| 16.17 | Cancel reservation                        | Status updates to CANCELLED instantly |        |       |
| 16.18 | Cancelled reservation hides cancel button | No button after cancellation          |        |       |
| 16.19 | Profile tab — name editable               | Can update name                       |        |       |
| 16.20 | Profile save updates navbar               | Name updates in navbar immediately    |        |       |
| 16.21 | Profile save updates header               | Name updates in account header        |        |       |
| 16.22 | Email field disabled                      | Cannot be edited                      |        |       |
| 16.23 | Phone field editable                      | Can update phone                      |        |       |
| 16.24 | Profile validation                        | Zod errors shown for invalid input    |        |       |
| 16.25 | Danger zone visible                       | Delete Account button present         |        |       |

---

## 17. Admin — Access Control

| #    | Test                         | Expected Result                | Status | Notes |
| ---- | ---------------------------- | ------------------------------ | ------ | ----- |
| 17.1 | /admin logged out → /sign-in | Redirect works                 |        |       |
| 17.2 | /admin as CUSTOMER → /       | Redirect works                 |        |       |
| 17.3 | /admin as ADMIN              | Dashboard loads                |        |       |
| 17.4 | Navigate between admin pages | No random redirects            |        |       |
| 17.5 | Page refresh on admin page   | Stays on admin, not redirected |        |       |
| 17.6 | Admin link only for admins   | Not in navbar for CUSTOMER     |        |       |

---

## 18. Admin — Dashboard

| #    | Test                              | Expected Result             | Status | Notes |
| ---- | --------------------------------- | --------------------------- | ------ | ----- |
| 18.1 | Total Orders                      | Real count from DB          |        |       |
| 18.2 | Revenue                           | Real sum, formatted (K/M/B) |        |       |
| 18.3 | Reservations                      | Real count (non-cancelled)  |        |       |
| 18.4 | Customers                         | Real count                  |        |       |
| 18.5 | Large numbers use K/M suffix      | 40,000 → 40K                |        |       |
| 18.6 | Revenue chart                     | Renders with data           |        |       |
| 18.7 | Orders chart                      | Renders with data           |        |       |
| 18.8 | Recent orders list                | Last 5 orders               |        |       |
| 18.9 | No delivery fee card on dashboard | Moved to Settings           |        |       |

---

## 19. Admin — Menu Manager

| #     | Test                        | Expected Result                       | Status | Notes |
| ----- | --------------------------- | ------------------------------------- | ------ | ----- |
| 19.1  | Items load from DB          | Real items shown                      |        |       |
| 19.2  | Search filters correctly    | Real-time filter                      |        |       |
| 19.3  | Clear search restores items | All items reappear                    |        |       |
| 19.4  | Category filter works       | Correct items shown                   |        |       |
| 19.5  | Add Item opens dialog       | Dialog appears                        |        |       |
| 19.6  | Image upload with cropper   | Cropper opens, crop applied, uploaded |        |       |
| 19.7  | Image preview in dialog     | Shows after upload                    |        |       |
| 19.8  | Form validation (Zod)       | Errors shown for empty/invalid fields |        |       |
| 19.9  | Save new item               | Item appears without page reload      |        |       |
| 19.10 | Edit item                   | Dialog pre-filled, saves changes      |        |       |
| 19.11 | Delete item                 | Confirmation dialog, item removed     |        |       |
| 19.12 | Featured toggle             | Switches correctly                    |        |       |
| 19.13 | Available toggle            | Switches correctly                    |        |       |
| 19.14 | Ingredients saved           | Shows on detail page                  |        |       |

---

## 20. Admin — Order Manager

| #    | Test                       | Expected Result              | Status | Notes |
| ---- | -------------------------- | ---------------------------- | ------ | ----- |
| 20.1 | Orders load from DB        | Real orders shown            |        |       |
| 20.2 | Search by order ID         | Filters correctly            |        |       |
| 20.3 | Search by customer name    | Filters correctly            |        |       |
| 20.4 | Clear search restores list | All orders reappear          |        |       |
| 20.5 | Status filter works        | Shows only selected status   |        |       |
| 20.6 | Change order status        | Updates in DB, badge updates |        |       |
| 20.7 | Customer name and phone    | Visible on card              |        |       |
| 20.8 | Item count shown           | Number of items per order    |        |       |
| 20.9 | Price formatted            | Rs 1,299 format              |        |       |

---

## 21. Admin — Reservation Manager

| #     | Test                                | Expected Result                    | Status | Notes |
| ----- | ----------------------------------- | ---------------------------------- | ------ | ----- |
| 21.1  | Reservations load from DB           | Real data shown                    |        |       |
| 21.2  | Search by name                      | Filters correctly                  |        |       |
| 21.3  | Search by email                     | Filters correctly                  |        |       |
| 21.4  | Clear search restores list          | All reservations reappear          |        |       |
| 21.5  | Status filter works                 | Shows only selected                |        |       |
| 21.6  | Table selector opens                | Available tables listed            |        |       |
| 21.7  | Table assignment works              | Linked to reservation on confirm   |        |       |
| 21.8  | Same table not assignable twice     | For same date and time             |        |       |
| 21.9  | Confirm without table               | Status → CONFIRMED, no table       |        |       |
| 21.10 | Cancel reservation                  | Status → CANCELLED                 |        |       |
| 21.11 | Confirmed reservation hides buttons | Confirm/cancel hidden after action |        |       |

---

## 22. Admin — Home Content Manager

| #     | Test                         | Expected Result                       | Status | Notes |
| ----- | ---------------------------- | ------------------------------------- | ------ | ----- |
| 22.1  | Chefs tab loads              | All chefs from DB shown               |        |       |
| 22.2  | Add chef                     | Photo upload with crop, saves         |        |       |
| 22.3  | Edit chef                    | Pre-filled form, saves changes        |        |       |
| 22.4  | Delete chef                  | Confirmation, removed                 |        |       |
| 22.5  | Toggle chef active/hidden    | Switch updates DB                     |        |       |
| 22.6  | Hidden chef not on home page | Deactivated chef doesn't appear       |        |       |
| 22.7  | Testimonials tab loads       | All testimonials from DB              |        |       |
| 22.8  | Add testimonial              | Form saves, appears in list           |        |       |
| 22.9  | Edit testimonial             | Pre-filled, saves correctly           |        |       |
| 22.10 | Delete testimonial           | Removed                               |        |       |
| 22.11 | Toggle testimonial active    | Hidden ones don't appear on home      |        |       |
| 22.12 | Featured Dishes tab          | All menu items listed with toggle     |        |       |
| 22.13 | Toggle featured dish         | Updates home page Best Dishes section |        |       |

---

## 23. Admin — Pages Manager

| #    | Test                     | Expected Result                 | Status | Notes |
| ---- | ------------------------ | ------------------------------- | ------ | ----- |
| 23.1 | Terms tab loads          | Current content shown           |        |       |
| 23.2 | Privacy Policy tab loads | Current content shown           |        |       |
| 23.3 | Edit title               | Saves and updates page          |        |       |
| 23.4 | Edit HTML content        | Saves and renders on live page  |        |       |
| 23.5 | Preview mode             | Renders HTML visually           |        |       |
| 23.6 | View Live button         | Opens /terms or /privacy-policy |        |       |
| 23.7 | Save shows confirmation  | "Saved and published" message   |        |       |

---

## 24. Admin — Settings Page

| #    | Test                  | Expected Result                  | Status | Notes |
| ---- | --------------------- | -------------------------------- | ------ | ----- |
| 24.1 | Settings page loads   | Delivery fee card shown          |        |       |
| 24.2 | Current fee displayed | Matches DB value                 |        |       |
| 24.3 | Update delivery fee   | Saves to DB                      |        |       |
| 24.4 | Cart reflects new fee | After update, cart shows new fee |        |       |
| 24.5 | Checkout uses new fee | Stripe checkout total correct    |        |       |
| 24.6 | Validation on fee     | Negative numbers rejected        |        |       |

---

## 25. Admin — Sidebar

| #    | Test                    | Expected Result                                                      | Status | Notes |
| ---- | ----------------------- | -------------------------------------------------------------------- | ------ | ----- |
| 25.1 | All 7 links present     | Dashboard, Menu, Orders, Reservations, Home Content, Pages, Settings |        |       |
| 25.2 | Active link highlighted | Current page is primary color                                        |        |       |
| 25.3 | Desktop sidebar visible | Left column shown                                                    |        |       |
| 25.4 | Mobile FAB visible      | Bottom right floating button                                         |        |       |
| 25.5 | Mobile FAB opens sheet  | Left slide-in sheet                                                  |        |       |
| 25.6 | Mobile nav links work   | All navigate and close sheet                                         |        |       |

---

## 26. PDF Receipts

| #    | Test                           | Expected Result                   | Status | Notes |
| ---- | ------------------------------ | --------------------------------- | ------ | ----- |
| 26.1 | Download on success page       | PDF generates and downloads       |        |       |
| 26.2 | Download from account orders   | Works for any order               |        |       |
| 26.3 | PDF has correct order ID       | Short ID visible                  |        |       |
| 26.4 | PDF has correct items          | All ordered items listed          |        |       |
| 26.5 | PDF has correct totals         | Subtotal, delivery, total correct |        |       |
| 26.6 | PDF has customer info          | Name, email, address shown        |        |       |
| 26.7 | PDF has Urban Dish branding    | Logo name and tagline             |        |       |
| 26.8 | Only order owner can download  | 403 for other users               |        |       |
| 26.9 | Admin can download any receipt | 200 for admin user                |        |       |

---

## 27. Zustand Stores

| #    | Test                                   | Expected Result                  | Status | Notes |
| ---- | -------------------------------------- | -------------------------------- | ------ | ----- |
| 27.1 | Cart store persists in localStorage    | urban-dish-cart key present      |        |       |
| 27.2 | User store updates on sign in          | Name/role available everywhere   |        |       |
| 27.3 | User store clears on sign out          | Navbar reflects logged out state |        |       |
| 27.4 | Profile update syncs navbar            | Name change reflects immediately |        |       |
| 27.5 | Settings store loads delivery fee      | Cart drawer shows correct fee    |        |       |
| 27.6 | Settings store updates on admin change | No page refresh needed           |        |       |

---

## 28. Validation & Sanitization

| #     | Test                          | Expected Result                 | Status | Notes |
| ----- | ----------------------------- | ------------------------------- | ------ | ----- |
| 28.1  | Sign up — name with numbers   | Validation error shown          |        |       |
| 28.2  | Sign up — invalid email       | Error shown                     |        |       |
| 28.3  | Sign up — weak password       | Strength indicator shows Weak   |        |       |
| 28.4  | Sign up — strong password     | Strength indicator shows Strong |        |       |
| 28.5  | Reservation — invalid phone   | Error shown                     |        |       |
| 28.6  | Contact — message too short   | "At least 10 characters" error  |        |       |
| 28.7  | All inputs have maxLength     | Cannot type beyond limit        |        |       |
| 28.8  | HTML script tag in input      | Sanitized before saving to DB   |        |       |
| 28.9  | XSS attempt in review comment | Escaped in output               |        |       |
| 28.10 | Password strength bar         | Shows 6-segment bar with color  |        |       |

---

## 29. Middleware & Auth

| #    | Test                              | Expected Result                       | Status | Notes |
| ---- | --------------------------------- | ------------------------------------- | ------ | ----- |
| 29.1 | /account logged out → /sign-in    | Works                                 |        |       |
| 29.2 | /order logged out → /sign-in      | Works                                 |        |       |
| 29.3 | /admin logged out → /sign-in      | Works                                 |        |       |
| 29.4 | /admin as CUSTOMER → /            | Works                                 |        |       |
| 29.5 | /sign-in logged in → /            | Works                                 |        |       |
| 29.6 | /sign-up logged in → /            | Works                                 |        |       |
| 29.7 | No random redirects on navigation | Admin can freely navigate admin pages |        |       |
| 29.8 | Session persists on refresh       | User stays logged in                  |        |       |

---

## 30. Formatting & Currency

| #    | Test                           | Expected Result            | Status | Notes |
| ---- | ------------------------------ | -------------------------- | ------ | ----- |
| 30.1 | All prices use formatCurrency  | Rs 1,299 format everywhere |        |       |
| 30.2 | Dashboard stats use formatStat | 40,000 → 40K               |        |       |
| 30.3 | No hardcoded Rs strings        | All use utility function   |        |       |
| 30.4 | Price on menu cards            | Formatted correctly        |        |       |
| 30.5 | Price in cart drawer           | Formatted correctly        |        |       |
| 30.6 | Price in order summary         | Formatted correctly        |        |       |
| 30.7 | Price in PDF receipt           | Formatted correctly        |        |       |
| 30.8 | Price in account order history | Formatted correctly        |        |       |

---

## 31. SSG / Performance

| #    | Test                          | Expected Result             | Status | Notes |
| ---- | ----------------------------- | --------------------------- | ------ | ----- |
| 31.1 | /contact is static            | No DB call on load          |        |       |
| 31.2 | /faqs is static               | No DB call on load          |        |       |
| 31.3 | /reservations is static       | No DB call on load          |        |       |
| 31.4 | / revalidates every hour      | ISR configured              |        |       |
| 31.5 | /about revalidates every hour | ISR configured              |        |       |
| 31.6 | /terms revalidates every hour | ISR configured              |        |       |
| 31.7 | Lighthouse score home page    | Above 80 on all metrics     |        |       |
| 31.8 | Images use next/image         | Optimized and correct sizes |        |       |
| 31.9 | All images have alt text      | Accessibility check         |        |       |

---

## Summary Table

| Category                  | Total   | Pass | Fail | Partial |
| ------------------------- | ------- | ---- | ---- | ------- |
| General                   | 13      |      |      |         |
| Navbar                    | 18      |      |      |         |
| Footer                    | 11      |      |      |         |
| Home Page                 | 16      |      |      |         |
| Menu Page                 | 14      |      |      |         |
| Menu Item Detail          | 14      |      |      |         |
| Cart                      | 15      |      |      |         |
| Order / Checkout          | 21      |      |      |         |
| Reservations              | 14      |      |      |         |
| About Page                | 7       |      |      |         |
| Contact Page              | 7       |      |      |         |
| FAQs Page                 | 4       |      |      |         |
| Legal Pages               | 5       |      |      |         |
| Sign In                   | 10      |      |      |         |
| Sign Up                   | 10      |      |      |         |
| Account Page              | 25      |      |      |         |
| Admin Access Control      | 6       |      |      |         |
| Admin Dashboard           | 9       |      |      |         |
| Admin Menu Manager        | 14      |      |      |         |
| Admin Order Manager       | 9       |      |      |         |
| Admin Reservation Manager | 11      |      |      |         |
| Admin Home Content        | 13      |      |      |         |
| Admin Pages Manager       | 7       |      |      |         |
| Admin Settings            | 6       |      |      |         |
| Admin Sidebar             | 6       |      |      |         |
| PDF Receipts              | 9       |      |      |         |
| Zustand Stores            | 6       |      |      |         |
| Validation & Sanitization | 10      |      |      |         |
| Middleware & Auth         | 8       |      |      |         |
| Formatting & Currency     | 8       |      |      |         |
| SSG / Performance         | 9       |      |      |         |
| **Total**                 | **343** |      |      |         |

---
